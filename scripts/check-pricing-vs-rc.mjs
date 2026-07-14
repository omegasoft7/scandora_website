#!/usr/bin/env node
// Pricing parity guard — keeps the website's shown prices in lock-step with the store catalog
// so the numbers a visitor reads never drift from what they are actually charged at checkout.
// (Trello #251 / Phase 5 task 5.2.)
//
// WHY A DECLARED PRICE MAP INSTEAD OF READING PRICES FROM REVENUECAT:
//   RevenueCat's REST APIs deliberately do NOT serve localized store prices. Prices live in
//   App Store Connect / Google Play Console and are read on-device at runtime by the SDK
//   (`RevenueCatService.getOfferings()`); the repo stores no prices either (see
//   website/STRUCTURED_DATA.md and scandora_core PricingConfig — "features only, no prices").
//   So the store listing is canonical, and the canonical list prices are recorded once here in
//   EXPECTED (ground truth: Trello #150 monetization go-live card). This script:
//     1. verifies the live RevenueCat catalog STRUCTURE (the plans + credit-pack products exist
//        and the current offering serves the pro/business packages) — needs the API key; and
//     2. verifies the website's shown prices (DE + EN) equal EXPECTED and stay §19-UStG compliant
//        — runs offline, and is the core drift guard.
//
// Usage:
//   RC_DEV_KEY=sk_... node website/scripts/check-pricing-vs-rc.mjs   # full check (live + site)
//   node website/scripts/check-pricing-vs-rc.mjs                     # site-only (live check skipped)
//
// The API key is read from an env var (RC_DEV_KEY, or REVENUECAT_API_KEY) — NEVER hardcode it.
// `source .secrets/dev.env` exports RC_DEV_KEY + RC_APP_PROJECT_ID for local runs.
// Exit code 0 = parity holds, 1 = at least one mismatch.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');

// --- Ground truth: the canonical store list prices (EUR). Source: App Store Connect / Google
// Play Console listing, mirrored in Trello #150. Update here whenever a store price changes. ---
const EXPECTED = {
  subscriptions: {
    scandora_pro_monthly: { plan: 'pro', period: 'monthly', eur: 9.99 },
    scandora_pro_yearly: { plan: 'pro', period: 'annual', eur: 89 },
    scandora_business_monthly: { plan: 'business', period: 'monthly', eur: 24.99 },
    scandora_business_yearly: { plan: 'business', period: 'annual', eur: 229 },
  },
  // Credit packs are in-app consumables (not shown on the site), so they are only checked for
  // existence in the live catalog, not against the site.
  creditPacks: {
    scandora_credits_250: { eur: 4.99 },
    scandora_credits_1500: { eur: 19.99 },
  },
  // The current offering must serve these package lookup_keys (the plans the app sells).
  offeringPackages: ['pro-monthly', 'pro-yearly', 'business-monthly', 'business-yearly'],
};

// A free (€0) plan the site shows but the catalog has no product for.
const FREE_PLAN_PRICE = 0;

// §19 UStG (Kleinunternehmer): the price note may say VAT is NOT shown separately, but must
// NEVER claim prices are VAT-inclusive. These are the forbidden phrasings.
const FORBIDDEN_VAT_WORDING =
  /incl(?:uding|\.)?\s*vat|inkl(?:usive|\.)?\s*(?:mwst|ust\.?|mehrwertsteuer)/i;

const problems = [];
const warnings = [];
const fail = (msg) => problems.push(msg);
const warn = (msg) => warnings.push(msg);
const num = (v) => Number.parseFloat(String(v).replace(',', '.'));
const eq = (a, b) => Math.abs(num(a) - num(b)) < 0.005;

// ---------------------------------------------------------------------------
// 1. Website price parity (offline — the core drift guard).
// ---------------------------------------------------------------------------
function checkSitePrices() {
  const html = readFileSync(join(websiteDir, 'index.html'), 'utf8');

  // Isolate the #pricing section so we only read the plan cards.
  const pricingSection = (html.match(/<section id="pricing"[\s\S]*?<\/section>/) || [null])[0];
  if (!pricingSection) {
    fail('index.html: could not locate the <section id="pricing"> block');
    return;
  }

  // Per-card: plan key from data-i18n="pricing.<key>.name", plus the monthly + annual amounts.
  const cards = [...pricingSection.matchAll(/<article class="pricing-card[^"]*"[\s\S]*?<\/article>/g)];
  const seen = new Set();
  for (const [card] of cards) {
    const keyMatch = card.match(/data-i18n="pricing\.(\w+)\.name"/);
    if (!keyMatch) continue;
    const plan = keyMatch[1];
    const monthly = card.match(/class="price-monthly">\s*<span class="amount"[^>]*>([^<]+)/);
    const annual = card.match(/class="price-annual">\s*<span class="amount"[^>]*>([^<]+)/);

    if (plan === 'free') {
      seen.add('free');
      if (monthly && !eq(monthly[1], FREE_PLAN_PRICE)) fail(`Free monthly price is €${monthly[1]}, expected €0`);
      if (annual && !eq(annual[1], FREE_PLAN_PRICE)) fail(`Free annual price is €${annual[1]}, expected €0`);
      continue;
    }

    const expMonthly = Object.values(EXPECTED.subscriptions).find((s) => s.plan === plan && s.period === 'monthly');
    const expAnnual = Object.values(EXPECTED.subscriptions).find((s) => s.plan === plan && s.period === 'annual');
    if (!expMonthly || !expAnnual) {
      warn(`site shows a "${plan}" card with no matching plan in EXPECTED — is it a new tier?`);
      continue;
    }
    seen.add(plan);
    if (!monthly) fail(`${plan}: could not read the monthly price from the card`);
    else if (!eq(monthly[1], expMonthly.eur)) fail(`${plan} monthly price is €${monthly[1]}, expected €${expMonthly.eur}`);
    if (!annual) fail(`${plan}: could not read the annual price from the card`);
    else if (!eq(annual[1], expAnnual.eur)) fail(`${plan} annual price is €${annual[1]}, expected €${expAnnual.eur}`);
  }
  for (const plan of new Set(Object.values(EXPECTED.subscriptions).map((s) => s.plan))) {
    if (!seen.has(plan)) fail(`index.html #pricing has no card for the "${plan}" plan`);
  }

  // JSON-LD Offer prices (Pro/Business monthly) must match too.
  for (const [prodPlan, expEur] of [['Pro', 9.99], ['Business', 24.99]]) {
    const expected = Object.values(EXPECTED.subscriptions).find((s) => s.plan === prodPlan.toLowerCase() && s.period === 'monthly');
    const re = new RegExp(`"name":\\s*"${prodPlan}[^"]*",\\s*"price":\\s*"([\\d.]+)"`);
    const m = html.match(re);
    if (!m) warn(`index.html: no JSON-LD Offer named "${prodPlan}…" found`);
    else if (expected && !eq(m[1], expected.eur)) fail(`JSON-LD "${prodPlan}" Offer price is €${m[1]}, expected €${expected.eur}`);
  }

  // §19 UStG wording: the note must exist, cite § 19 UStG, and never claim VAT-inclusive prices.
  const priceNote = pricingSection.match(/class="pricing-note"[^>]*data-i18n="pricing\.priceNote"[\s\S]*?<\/p>/);
  if (!priceNote) fail('index.html #pricing has no data-i18n="pricing.priceNote" note');
  if (FORBIDDEN_VAT_WORDING.test(pricingSection)) {
    fail('index.html #pricing contains VAT-inclusive wording (forbidden under § 19 UStG — see docs/CLAIMS_POLICY.md)');
  }
}

// ---------------------------------------------------------------------------
// 2. Translation (DE + EN) parity for the price note + save badges (offline).
// ---------------------------------------------------------------------------
function checkTranslations() {
  const js = readFileSync(join(websiteDir, 'translations.js'), 'utf8');
  const notes = [...js.matchAll(/'pricing\.priceNote':\s*'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
  if (notes.length < 2) {
    fail(`translations.js: expected a pricing.priceNote in both languages, found ${notes.length}`);
  }
  notes.forEach((note, i) => {
    if (FORBIDDEN_VAT_WORDING.test(note)) {
      fail(`translations.js pricing.priceNote #${i + 1} claims VAT-inclusive prices (forbidden under § 19 UStG)`);
    }
    if (!/§\s*19\s*UStG/.test(note)) {
      warn(`translations.js pricing.priceNote #${i + 1} does not cite "§ 19 UStG"`);
    }
  });

  // Annual "save X%" badges must match the real monthly→annual discount, per language.
  const discount = (plan) => {
    const m = Object.values(EXPECTED.subscriptions).find((s) => s.plan === plan && s.period === 'monthly');
    const y = Object.values(EXPECTED.subscriptions).find((s) => s.plan === plan && s.period === 'annual');
    return Math.round((1 - y.eur / (m.eur * 12)) * 100);
  };
  for (const [plan, key] of [['pro', 'pricing.pro.save'], ['business', 'pricing.business.save']]) {
    const want = discount(plan);
    const labels = [...js.matchAll(new RegExp(`'${key.replace('.', '\\.')}':\\s*'([^']*)'`, 'g'))].map((m) => m[1]);
    for (const label of labels) {
      const pct = num((label.match(/(\d+)\s*%/) || [])[1]);
      if (Number.isFinite(pct) && pct !== want) {
        fail(`${key} says "${label}" but the real ${plan} annual discount is ${want}%`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Live RevenueCat catalog structure (needs the API key; skipped without it).
// ---------------------------------------------------------------------------
async function checkLiveCatalog() {
  const apiKey = process.env.RC_DEV_KEY || process.env.REVENUECAT_API_KEY;
  const projectId = process.env.RC_APP_PROJECT_ID || 'projd36f68b7';
  if (!apiKey) {
    console.log('ℹ RevenueCat API key not set (RC_DEV_KEY / REVENUECAT_API_KEY) — live catalog check skipped.');
    console.log('  Run `source .secrets/dev.env` first to include it.');
    return;
  }

  const base = `https://api.revenuecat.com/v2/projects/${projectId}`;
  const get = async (path) => {
    const res = await fetch(`${base}${path}`, { headers: { Authorization: `Bearer ${apiKey}` } });
    if (!res.ok) throw new Error(`RevenueCat ${path} -> HTTP ${res.status}`);
    return res.json();
  };

  let products;
  let offerings;
  try {
    products = (await get('/products?limit=100')).items || [];
    offerings = (await get('/offerings?limit=50')).items || [];
  } catch (e) {
    fail(`live catalog fetch failed: ${e.message}`);
    return;
  }

  // Every expected product id must exist and be active.
  const active = new Map(products.filter((p) => p.state === 'active').map((p) => [p.store_identifier, p]));
  for (const id of [...Object.keys(EXPECTED.subscriptions), ...Object.keys(EXPECTED.creditPacks)]) {
    if (!active.has(id)) fail(`RevenueCat catalog is missing an active product with store_identifier "${id}"`);
  }

  // The current offering must serve the expected subscription packages.
  const current = offerings.find((o) => o.is_current);
  if (!current) {
    fail('RevenueCat has no current offering');
    return;
  }
  const pkgs = (await get(`/offerings/${current.id}/packages?limit=50`)).items || [];
  const served = new Set(pkgs.map((p) => p.lookup_key));
  for (const key of EXPECTED.offeringPackages) {
    if (!served.has(key)) fail(`current offering "${current.lookup_key}" does not serve package "${key}"`);
  }
  // Surface any extra/legacy packages the current offering still serves (observation, not a failure).
  for (const key of served) {
    if (!EXPECTED.offeringPackages.includes(key) && !key.startsWith('$rc_')) {
      warn(`current offering also serves an unrecognized package "${key}" (legacy? review the catalog)`);
    }
  }
  const legacyRc = [...served].filter((k) => k.startsWith('$rc_'));
  if (legacyRc.length) warn(`current offering still serves legacy default packages [${legacyRc.join(', ')}] (Starter tier)`);

  console.log(`✓ live catalog: ${active.size} active product(s), current offering "${current.lookup_key}" serves [${[...served].join(', ')}]`);
}

// ---------------------------------------------------------------------------
async function main() {
  checkSitePrices();
  checkTranslations();
  await checkLiveCatalog();

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }
  if (problems.length) {
    console.error(`\n✗ ${problems.length} pricing-parity problem(s):`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log('\n✓ Website pricing matches the store catalog ground truth (DE + EN) and stays § 19-UStG compliant.');
}

main().catch((e) => {
  console.error(`✗ check-pricing-vs-rc failed: ${e.message}`);
  process.exit(1);
});
