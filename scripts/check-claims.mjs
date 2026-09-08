#!/usr/bin/env node
// Claims guard for the website + app-store metadata — the public-copy counterpart to the
// Dart in-app guard (flutter_app/packages/scandora_localization/test/unit/claims_policy_test.dart).
//
// CONTRIBUTING.md "Public-facing copy: claims need a source" applies to every public
// surface, but until now only the in-app strings were auto-checked. This script closes the
// gap: it scans the visible website copy and the fastlane store listings for the same
// unverifiable marketing claims and fails if one appears.
//
// Public surfaces (every rule applies):
//   - every website/**/*.html: visible text (<script>/<style>/comments/tags stripped) plus the
//     string values of its application/ld+json blocks, which the visible-text pass drops
//   - website/translations.js (the bilingual copy served into the pages at runtime)
//   - flutter_app/{android,ios,macos}/fastlane/metadata/**/*.txt (store listings)
//   - tools/store-assets/config/*.json: the string values only — the headlines, sublines and
//     chips rendered into the uploaded store screenshots, which the listings never repeat
//
// Internal doc surfaces (only the AI-index facts below apply — the hype bans are scoped to
// marketing copy by CONTRIBUTING.md): every *.md under docs/, plus the root-level
// MONETIZATION_COSTS.md. These carry the same claims to customers and to auditors, so a tier
// gate or a wrong index location cannot be fixed on the site and left behind here (Trello #537).
//
// Three carve-outs keep the guard honest without flagging sanctioned copy:
//   - NEGATION-AWARE GoBD claims: "GoBD-certified"/"GoBD-Siegel"/… only violate when asserted
//     as a positive claim. The shipped disclaimers ("nicht GoBD-zertifiziert", "kein
//     GoBD-Siegel — ein solches gibt es nicht") negate the claim and are allowed.
//   - The paid-tier gate on the AI search index is only a violation when the tier wording and
//     the feature share one sentence, so naming a tier for a genuinely paid feature is fine. The
//     bare "paid"/"kostenpflichtig" rule narrows that to PAID_QUALIFIER_WINDOW characters, so a
//     price word elsewhere in the same sentence does not read as a gate on the index.
//   - The index-location rule only fires when the feature and "Frankfurt" sit within
//     INDEX_LOCATION_WINDOW characters of each other, so naming Frankfurt for what really is
//     there — Vertex AI / Firestore `europe-west3` — in its own clause stays allowed.
//   - The bring-your-own-AI rule is NOT negation-aware. It clears a hit only when the hit sits
//     inside one of the BYO_DISCLAIMERS phrases, so a nearby "not"/"nicht" in an unrelated clause
//     cannot green-light an offer of the mode.
//
// Usage:  node website/scripts/check-claims.mjs
// Exit code 0 = no unbacked claims found, 1 = at least one violation (or a wrong-directory run).

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(websiteDir, '..');

const FASTLANE_METADATA = [
  'flutter_app/android/fastlane/metadata',
  'flutter_app/ios/fastlane/metadata',
  'flutter_app/macos/fastlane/metadata',
];

// The store-screenshot copy: rendered into the images the stores show above the listing text.
const STORE_ASSET_CONFIG_DIRS = ['tools/store-assets/config'];

// Repo docs that repeat the same customer-facing claims outside the website.
const INTERNAL_DOC_DIRS = ['docs'];
// The same, for claim-carrying docs that sit at the repo root instead of in a swept directory.
const INTERNAL_DOC_FILES = ['MONETIZATION_COSTS.md'];

// A known file with known copy — proves the scan hit the real tree and did not silently
// "pass" on an empty/wrong directory (mirrors the Dart guard's positive anchor).
const ANCHOR_FILE = join(websiteDir, 'translations.js');
const ANCHOR_TEXT = 'Built in Germany';

// The same positive anchors for the internal-doc sweep — one per swept root, so a renamed
// directory or a dropped root file fails loudly instead of silently leaving the scan.
const INTERNAL_ANCHORS = ['docs/BYOM_VS_MANAGED_MODEL.md', 'MONETIZATION_COSTS.md'];

// German + English negations that turn a claim into an honest disclaimer.
const NEGATION = /\b(kein\w*|nein|nicht|ohne|no|not|never|without)\b/i;
// Chars each side of a match inspected for a negation (covers the FAQ "…? Nein."/"…? No." form).
const NEGATION_WINDOW = 80;

// The opt-in AI search index / document chat, and wording that restricts it to a paid tier.
const INDEX_FEATURE = String.raw`(?:AI )?document (?:search|chat|index)|search index|smart search|cited answer|Dokument(?:en)?suche|Dokument(?:en)?-?(?:Suchindex|Index|Chat)|Suchindex|belegte Antwort`;
const PAID_TIER_GATE = String.raw`Pro and above|Pro or above|Pro und höher|\bab Pro\b|requires Pro|Pro plan required|Pro\+|\bonly Pro\b|paid \(Pro|\bnur ab Pro\b|Pro\s*(?:/|&|and|und)\s*Business`;

// A bare "paid"/"kostenpflichtig" next to the feature gates it just as effectively as a tier name.
const PAID_QUALIFIER = String.raw`\bpaid\b|kostenpflichtig\w*`;
// Chars allowed between the qualifier and the feature before it reads as a gate on the feature.
const PAID_QUALIFIER_WINDOW = 60;

// The store listings and the plan tables write the gate as a plan-list label instead of prose
// ("- Pro: managed AI credits, cloud document search and chat"), which no tier-gate wording above
// matches. Only a label followed by the feature counts, so a paid plan may still be named after it.
const PLAN_LABEL = String.raw`\b(?:Starter|Pro|Business|Enterprise)\b(?:\s*/\s*DATEV)?\s*:`;
// Chars allowed between the label and the feature before the feature reads as that plan's own.
const PLAN_LABEL_WINDOW = 80;

// FREE seeds `ai.quality: premium` with 10 managed credits, so copy that makes the free plan
// device-only or own-key-only understates what it grants.
const FREE_TIER = String.raw`\bfree(?:\s+(?:plan|tier))?\b|kostenlose\w*(?:\s+Tarif\w*)?`;
const DEVICE_ONLY_AI = String.raw`device-only AI|AI[^.!?]{0,30}?runs on your device|gerätelokale KI|KI[^.!?]{0,40}?auf (?:Ihrem|dem) Gerät`;
// Chars allowed between the plan and the device-only wording before it reads as that plan's limit.
const FREE_DEVICE_ONLY_WINDOW = 80;

// The index runs on Hetzner in Falkenstein; Frankfurt is the Vertex AI / Firestore region.
// Chars allowed between the feature and "Frankfurt" before it reads as the index's location.
const INDEX_LOCATION_WINDOW = 20;

// Bring-your-own-AI: a user-supplied model key, a user-owned AI, or a user-picked model
// provider. Managed AI is the only shipped mode (website/terms.html § 6), so an offer of it is a
// dead claim. NOT negation-aware: the shipped store sentence carried its own "not"/"nicht" in the
// trailing clause and disarmed the rule, so the sanctioned disclaimers are whitelisted verbatim in
// BYO_DISCLAIMERS instead. "eigenes KI-Gateway" and "eigene KI-Modelle" are Scandora's own, not the
// user's, so the German own-AI branch excludes both. The bare possessive ("your AI", "Ihre KI") is
// the same claim without the word "own", so it is matched too; the credits really are the user's,
// so "your AI credits" / "Ihre KI-Credits" stay out of that branch.
const BYO_AI_MODE = String.raw`bring[-\s](?:your|my|their)[-\s]own[-\s](?:ai|key|api[-\s]?key|model|llm)|\bBYO(?:AI|K|M)\b|Mitbring[-\s]?(?:Funktion|Modus)`;
const OWN_AI_KEY =
  String.raw`(?:your|my|their)\s+own\s+(?:[\w-]+\s+){0,2}(?:AI|Gemini|model|LLM)[-\s]?keys?\b` +
  String.raw`|(?:your|my|their)\s+own\s+(?:API\s+)?keys?\b|(?:your|my|their)\s+own\s+AI\b` +
  String.raw`|let\s+(?:your|my|their)\s+AI\b|von\s+Ihrer\s+(?:eigenen\s+)?KI\b` +
  String.raw`|eigene[mnrs]?\s+(?:[\w-]+[-\s]){0,2}(?:KI|Gemini|Modell)[-\s]?Schlüssel` +
  String.raw`|eigene[mnrs]?\s+(?:API[-\s]?)?Schlüssel\b|eigene[mnrs]?\s+KI\b(?![-\s]?(?:Gateway|Modell))` +
  String.raw`|(?:your|my|their)\s+AI\b(?![-\s]?(?:credits?|gateway|model))` +
  String.raw`|Ihre[mnr]?\s+KI\b(?![-\s]?(?:Gateway|Modell|Credits?))`;
// The provider may be named before or after the choosing clause, and German writes the choice as
// either "Ihr (gewählter) KI-Anbieter" or "der von Ihnen gewählte KI-Anbieter".
const OWN_AI_PROVIDER =
  String.raw`(?:your|my|their)\s+(?:own\s+|chosen\s+)?AI\s+provider` +
  String.raw`|AI\s+provider\b[^.!?]{0,60}?\b(?:you|they|I)\s+choose` +
  String.raw`|Ihre?[mnrs]?\s+(?:gewählte[mnrs]?\s+)?KI-Anbieter` +
  String.raw`|von\s+(?:Ihnen|mir|ihnen)\s+gewählte[mnrs]?\s+(?:[\w-]+\s+){0,2}KI-Anbieter`;

// The sanctioned denials of the mode, matched as whole phrases: a BYO hit inside one of these is
// the disclaimer itself, not an offer. Anything outside them is a violation even when a "not"
// happens to sit nearby.
const BYO_DISCLAIMERS = [
  /\b(?:no|kein\w*)\s+bring[-\s](?:your|my|their)[-\s]own[-\s](?:ai|key|api[-\s]?key|model|llm)[-\s]mode\b/gi,
  /bring[-\s](?:your|my|their)[-\s]own[-\s](?:ai|key|api[-\s]?key|model|llm)\s+option is not part of this version/gi,
  /\b(?:do not|don['’]t|does not|doesn['’]t|never)\s+(?:need\s+)?(?:to\s+)?(?:bring|set up|enter|manage)?\s*(?:your|my|their)\s+own\s+(?:[\w-]+\s+){0,2}keys?\b/gi,
  /\bwithout\s+(?:your|my|their)\s+own\s+(?:[\w-]+\s+){0,2}keys?\b/gi,
  /\b(?:Can I|Do I need)\s+(?:to\s+)?(?:bring\s+)?(?:my|your)\s+own\s+(?:[\w-]+\s+){0,2}keys?\b[\s\S]{0,60}?(?:\bNo\b|\b(?:do|does) not\b|\bdo(?:es)?n['’]t\b)/gi,
  /Mitbring[-\s]?(?:Funktion|Modus)[^.!?]{0,60}?ist nicht Bestandteil dieser Version/gi,
  /\b(?:kein\w*|ohne)\s+(?:[^\s.!?]+\s+){0,3}?eigene[mnrs]?\s+(?:[^\s.!?]+[-\s]){0,2}Schlüssel/gi,
  /\bModus für eigene\s+(?:[^\s.!?]+[-\s]){0,2}Schlüssel[^.!?]{0,40}?gibt es nicht/gi,
  /\b(?:Brauche ich|Kann ich)\s+(?:[^\s.!?]+\s+){0,3}?(?:einen|meinen)\s+eigene[mnrs]?\s+(?:[^\s.!?]+[-\s]){0,2}Schlüssel[\s\S]{0,60}?(?:\bNein\b|\bkein\w*\b)/gi,
];

// The Business / DATEV features production Remote Config keeps switched off — `datev_export`,
// `voucher_lexoffice`, `voucher_sevdesk` and `gobd_layer` (read with
// `python3 infra/remote_config_flags.py list`). The app renders each of them as "coming soon"
// at those values (`settings_datev_export_tile.dart`, `feature_comparison_sheet.dart`,
// `plan_card.dart`, `profile_management_screen.dart`), and the voucher connectors are not even
// registered (`scandora_integrations/lib/src/di/setup.dart`), so public copy may name them only
// with the same marker. The plan name "Business / DATEV" carries no export word and stays free.
const GATED_FEATURE = String.raw`DATEV[-\s]?(?:format|export|EXTF)|\bEXTF\b|lexoffice|sevDesk|GoBD[-\s]?(?:layer|Schicht|Ebene)|Verfahrensdokumentation`;
// Wording that sells the feature as shipped: an availability or inclusion word, a plan that
// "adds" it, or the "Yes"/"Ja" of an FAQ answer and of a comparison-table cell. How-to prose
// that only describes what the screen does ("Scandora generates the EXTF file") is not an
// availability claim and stays out, so a help page keeps its steps and carries the
// coming-soon status once, where it states the plan.
const AVAILABILITY_CLAIM = String.raw`\bavailable\b|\binclude[sd]?\b|\boffers?\b|\bprovides?\b|\bsupports\b|\badds\b|\bcomes with\b|\bYes\b|verfügbar|enthält|enthalten|umfasst|bietet|unterstützt|ergänzt|\bJa\b`;
// Chars allowed between the claim and the feature before the claim reads as being about it.
const GATED_CLAIM_WINDOW = 120;
// The second claim shape: the feature named next to the paid tier that is supposed to grant it.
// A pricing-card bullet ("DATEV export for your tax advisor") and a German FAQ answer
// ("Ja. Im Tarif Business / DATEV exportieren Sie …") carry no availability word at all — the
// plan beside the feature is what makes them an offer. Sentence punctuation is no boundary here:
// the price "€24.99" and the German "5.000 KI-Credits" both contain a period.
const PAID_PLAN = String.raw`Business\s*\/\s*DATEV|Business[-\s](?:plan|Tarif)|Tarif Business|24[.,]99`;
const PLAN_OFFER_WINDOW = 160;
// The markers that turn the claim into an honest announcement. "(coming soon)" / "(demnächst)" are
// the app's own words (`comingSoonFeature` in strings_en.dart / strings_de.dart).
const COMING_SOON =
  /coming soon|not (?:yet )?available|in preparation|demnächst|in Kürze|in Vorbereitung|noch nicht verfügbar|noch nicht enthalten|geplant/i;
// Chars each side of the claim inspected for a coming-soon marker.
const COMING_SOON_WINDOW = 200;

// The head tags applyPageMeta() (translations.js) rewrites from the pageMeta table on every
// page load. The static tag is what a non-JS crawler reads; the pageMeta twin is what the
// reader ends up with, so the two copies must carry the same availability status — which here
// means every gated feature named in either copy carries a coming-soon marker in the same
// string. Neither claim rule above sees this shape: a meta description names no availability
// word and no plan, and the visible-text pass strips tags before the attributes are read.
const PAGE_META_SOURCE = join(websiteDir, 'translations.js');
const PAGE_META_TABLE = /const pageMeta = (\{[\s\S]*?\n\});/;
const CANONICAL_HREF = /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i;
const HEAD_TAGS = [
  { name: '<title>', pattern: /<title>([\s\S]*?)<\/title>/i },
  { name: 'meta[name="description"]', pattern: /<meta[^>]+name="description"[^>]+content="([^"]*)"/i },
  { name: 'meta[property="og:description"]', pattern: /<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i },
  { name: 'meta[name="twitter:description"]', pattern: /<meta[^>]+name="twitter:description"[^>]+content="([^"]*)"/i },
];
const GATED_FEATURE_RE = new RegExp(GATED_FEATURE, 'i');

const forbidden = [
  { pattern: /\b99\s*%/gi, label: '"99%" precision claim' },
  {
    pattern: /\b100\s*%\s*(accuracy|accurate|genau\w*|reliable|zuverlässig)/gi,
    label: '"100% accuracy/reliability" claim',
  },
  { pattern: /\b\d[\d,.]{2,}\+/g, label: 'inflated "N+" count (e.g. 10,000+)' },
  { pattern: /\b\d+\s*k\+/gi, label: 'inflated "Nk+" count (e.g. 10k+)' },
  { pattern: /\bguaranteed\b/gi, label: '"guaranteed" promise' },
  { pattern: /\bgarantiert\b/gi, label: '"garantiert" promise' },
  { pattern: /\binstant(ly)?\b/gi, label: '"instant/instantly" speed claim' },
  { pattern: /\bsofort\b/gi, label: '"sofort" speed claim' },
  {
    pattern: /inkl\.?\s*(mwst|mehrwertsteuer)|incl\.?\s*vat|including\s+vat|vat\s+included/gi,
    label: '"inkl. MwSt / incl. VAT" claim (forbidden for a § 19 UStG Kleinunternehmer)',
  },
  {
    pattern: /\bGoBD[-\s]?(zertifiziert|certified|approved|Siegel|Zertifizierung|certification|certificate)\b/gi,
    label: 'GoBD certification/seal asserted as a positive claim',
    negatable: true,
  },
  {
    pattern: new RegExp(
      `(?:${PAID_TIER_GATE})[^.!?]{0,120}?(?:${INDEX_FEATURE})` +
        `|(?:${INDEX_FEATURE})[^.!?]{0,120}?(?:${PAID_TIER_GATE})`,
      'gi',
    ),
    label: 'opt-in AI search index/document chat restricted to a paid tier (every plan grants it)',
    appliesToDocs: true,
  },
  {
    pattern: new RegExp(
      `(?:${PAID_QUALIFIER})[^.!?]{0,${PAID_QUALIFIER_WINDOW}}?(?:${INDEX_FEATURE})` +
        `|(?:${INDEX_FEATURE})[^.!?]{0,${PAID_QUALIFIER_WINDOW}}?(?:${PAID_QUALIFIER})`,
      'gi',
    ),
    label: 'opt-in AI search index/document chat called a paid feature (every plan grants it)',
    appliesToDocs: true,
  },
  {
    pattern: new RegExp(`(?:${PLAN_LABEL})[^.!?]{0,${PLAN_LABEL_WINDOW}}?(?:${INDEX_FEATURE})`, 'gi'),
    label: "opt-in AI search index/document chat listed as a paid plan's feature (every plan grants it)",
    appliesToDocs: true,
  },
  {
    pattern: new RegExp(
      `(?:${FREE_TIER})[^.!?]{0,${FREE_DEVICE_ONLY_WINDOW}}?(?:${DEVICE_ONLY_AI})` +
        `|(?:${DEVICE_ONLY_AI})[^.!?]{0,${FREE_DEVICE_ONLY_WINDOW}}?(?:${FREE_TIER})`,
      'gi',
    ),
    label: 'free plan described as device-only/own-key-only AI (it grants managed AI credits)',
    appliesToDocs: true,
  },
  {
    pattern: new RegExp(
      `(?:${INDEX_FEATURE})[^.!?]{0,${INDEX_LOCATION_WINDOW}}?Frankfurt` +
        `|Frankfurt[^.!?]{0,${INDEX_LOCATION_WINDOW}}?(?:${INDEX_FEATURE})`,
      'gi',
    ),
    label: 'AI search index placed in Frankfurt (it is EU-resident in Falkenstein, Germany)',
    appliesToDocs: true,
  },
  {
    pattern: new RegExp(`${BYO_AI_MODE}|${OWN_AI_KEY}|${OWN_AI_PROVIDER}`, 'gi'),
    label: 'bring-your-own-AI offered as a user choice (managed AI is the only shipped mode)',
    allow: BYO_DISCLAIMERS,
  },
  {
    pattern: new RegExp(
      `(?:${AVAILABILITY_CLAIM})[^.!?]{0,${GATED_CLAIM_WINDOW}}?(?:${GATED_FEATURE})` +
        `|(?:${GATED_FEATURE})[^.!?]{0,${GATED_CLAIM_WINDOW}}?(?:${AVAILABILITY_CLAIM})` +
        `|(?:${PAID_PLAN})[\\s\\S]{0,${PLAN_OFFER_WINDOW}}?(?:${GATED_FEATURE})` +
        `|(?:${GATED_FEATURE})[\\s\\S]{0,${PLAN_OFFER_WINDOW}}?(?:${PAID_PLAN})`,
      'gi',
    ),
    label:
      'DATEV / lexoffice / sevDesk export or the GoBD layer sold as available ' +
      '(all four are switched off in production; say "coming soon" / „demnächst")',
    clearedBy: COMING_SOON,
    clearedByWindow: COMING_SOON_WINDOW,
  },
];

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&euro;': '€' };

/** Reduce an HTML document to its visible text: drop script/style/comments, then tags. */
function htmlToText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#?\w+;/g, (e) => ENTITIES[e] ?? ' ');
}

/** Every string leaf of a parsed JSON value, flattened into `out`. */
function collectStrings(node, out) {
  if (typeof node === 'string') out.push(node);
  else if (Array.isArray(node)) for (const item of node) collectStrings(item, out);
  else if (node && typeof node === 'object') for (const value of Object.values(node)) collectStrings(value, out);
  return out;
}

/** The JSON-LD copy on a page — structured data the visible-text pass drops with <script>. */
function ldJsonText(html) {
  const parts = [];
  const blocks = html.matchAll(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi);
  for (const [, block] of blocks) {
    try {
      collectStrings(JSON.parse(block), parts);
    } catch {
      parts.push(block);
    }
  }
  return parts.join(' . ');
}

/**
 * A JSON config reduced to its string values, one sentence apart. Keys, numbers and the file's
 * punctuation are structure, not copy, so scanning them would flag layout data as a claim and
 * let a window rule span two unrelated strings.
 */
function jsonText(raw) {
  try {
    return collectStrings(JSON.parse(raw), []).join(' . ');
  } catch {
    return raw;
  }
}

const collapse = (text) => text.replace(/\s+/g, ' ');

/** The window of `width` chars each side of the match at [i, i+len). */
function windowAround(text, i, len, width = NEGATION_WINDOW) {
  return text.slice(Math.max(0, i - width), Math.min(text.length, i + len + width));
}

/** True when the match at [i, i+len) lies wholly inside one of the sanctioned phrases. */
function insideAllowedPhrase(text, i, len, allow) {
  for (const phrase of allow) {
    phrase.lastIndex = 0;
    for (const match of text.matchAll(phrase)) {
      const start = match.index ?? 0;
      if (start <= i && i + len <= start + match[0].length) return true;
    }
  }
  return false;
}

function collectFiles() {
  const files = [];
  for (const rel of readdirSync(websiteDir, { recursive: true })) {
    if (typeof rel === 'string' && rel.endsWith('.html')) {
      files.push({ path: join(websiteDir, rel.split(sep).join('/')), kind: 'html' });
    }
  }
  files.push({ path: join(websiteDir, 'translations.js'), kind: 'text' });
  for (const base of FASTLANE_METADATA) {
    const dir = join(repoRoot, base);
    if (!existsSync(dir)) continue;
    for (const rel of readdirSync(dir, { recursive: true })) {
      if (typeof rel === 'string' && rel.endsWith('.txt')) {
        files.push({ path: join(dir, rel.split(sep).join('/')), kind: 'text' });
      }
    }
  }
  for (const base of STORE_ASSET_CONFIG_DIRS) {
    const dir = join(repoRoot, base);
    if (!existsSync(dir)) continue;
    for (const rel of readdirSync(dir, { recursive: true })) {
      if (typeof rel === 'string' && rel.endsWith('.json')) {
        files.push({ path: join(dir, rel.split(sep).join('/')), kind: 'json' });
      }
    }
  }
  for (const base of INTERNAL_DOC_DIRS) {
    const dir = join(repoRoot, base);
    if (!existsSync(dir)) continue;
    for (const rel of readdirSync(dir, { recursive: true })) {
      if (typeof rel === 'string' && rel.endsWith('.md')) {
        files.push({ path: join(dir, rel.split(sep).join('/')), kind: 'text', internal: true });
      }
    }
  }
  for (const base of INTERNAL_DOC_FILES) {
    const path = join(repoRoot, base);
    if (existsSync(path)) files.push({ path, kind: 'text', internal: true });
  }
  return files;
}

/** Read a file, or null when it disappeared between the listing and the read. */
function readIfPresent(path) {
  try {
    return readFileSync(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

const violations = [];
let anchorHit = false;
const internalAnchorsHit = new Set();
let scannedCount = 0;
let internalCount = 0;

const files = collectFiles();
for (const { path, kind, internal } of files) {
  const raw = readIfPresent(path);
  if (raw === null) continue;
  scannedCount += 1;
  if (internal) internalCount += 1;
  let text = raw;
  if (kind === 'html') text = `${htmlToText(raw)} . ${ldJsonText(raw)}`;
  else if (kind === 'json') text = jsonText(raw);
  text = collapse(text);
  const rel = relative(repoRoot, path);
  const relPosix = rel.split(sep).join('/');

  if (path === ANCHOR_FILE && raw.includes(ANCHOR_TEXT)) anchorHit = true;
  if (INTERNAL_ANCHORS.includes(relPosix)) internalAnchorsHit.add(relPosix);

  for (const { pattern, label, negatable, appliesToDocs, allow, clearedBy, clearedByWindow } of forbidden) {
    if (internal && !appliesToDocs) continue;
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const hit = match[0];
      const idx = match.index ?? 0;
      if (negatable && NEGATION.test(windowAround(text, idx, hit.length))) continue;
      if (clearedBy && clearedBy.test(windowAround(text, idx, hit.length, clearedByWindow))) continue;
      if (allow && insideAllowedPhrase(text, idx, hit.length, allow)) continue;
      violations.push({ rel, label, hit, context: snippet(text, idx, hit.length) });
    }
  }
}

function snippet(text, idx, len) {
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + len + 40);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}

/** The gated features named in `value` without a coming-soon marker in that same string. */
function unmarkedGatedFeatures(value) {
  if (typeof value !== 'string' || !GATED_FEATURE_RE.test(value) || COMING_SOON.test(value)) return [];
  return [...value.matchAll(new RegExp(GATED_FEATURE, 'gi'))].map((match) => match[0]);
}

/** The pageMeta table read out of translations.js, or null when it is gone or unparseable. */
function readPageMeta() {
  const raw = readIfPresent(PAGE_META_SOURCE);
  const table = raw && raw.match(PAGE_META_TABLE);
  if (!table) return null;
  try {
    return JSON.parse(table[1]);
  } catch {
    return null;
  }
}

/** The canonical pathname a page declares, the same way applyPageMeta() resolves it. */
function canonicalRoute(html) {
  const href = html.match(CANONICAL_HREF);
  if (!href) return null;
  try {
    return new URL(href[1], 'https://scandora.eu').pathname;
  } catch {
    return null;
  }
}

function checkPageMetaParity(htmlFiles) {
  const pageMeta = readPageMeta();
  if (!pageMeta) {
    console.error(
      `\n✗ pageMeta check failed: no parseable "const pageMeta = { … };" table in ` +
        `${relative(repoRoot, PAGE_META_SOURCE)} — the head copy applyPageMeta() serves went unchecked.`,
    );
    process.exit(1);
  }
  const metaRel = relative(repoRoot, PAGE_META_SOURCE);
  for (const [route, langs] of Object.entries(pageMeta)) {
    for (const [lang, copy] of Object.entries(langs)) {
      for (const field of ['title', 'description']) {
        for (const hit of unmarkedGatedFeatures(copy?.[field])) {
          violations.push({
            rel: metaRel,
            label: `pageMeta ${lang}.${field} for ${route} sells a gated feature as shipped (applyPageMeta() writes it over the marked static head tag)`,
            hit,
            context: copy[field],
          });
        }
      }
    }
  }
  let matched = 0;
  for (const { path } of htmlFiles) {
    const html = readIfPresent(path);
    if (html === null) continue;
    const route = canonicalRoute(html);
    if (!route || !pageMeta[route]) continue;
    matched += 1;
    for (const { name, pattern } of HEAD_TAGS) {
      const tag = html.match(pattern);
      for (const hit of unmarkedGatedFeatures(tag?.[1])) {
        violations.push({
          rel: relative(repoRoot, path),
          label: `static ${name} for ${route} sells a gated feature as shipped (it and its pageMeta twin must carry the same coming-soon status)`,
          hit,
          context: tag[1],
        });
      }
    }
  }
  if (matched === 0) {
    console.error(
      `\n✗ pageMeta check failed: none of the ${htmlFiles.length} page(s) matched a pageMeta route — ` +
        'the canonical links and the table keys have drifted apart.',
    );
    process.exit(1);
  }
  console.log(
    `✓ pageMeta ↔ static head: ${Object.keys(pageMeta).length} route(s) in ${metaRel}, ${matched} page(s) matched`,
  );
}

console.log(
  `✓ scanned ${scannedCount} file(s) across the website + fastlane store metadata + store slide copy, ` +
    `${internalCount} of them internal docs`,
);

const missingAnchors = INTERNAL_ANCHORS.filter((anchor) => !internalAnchorsHit.has(anchor));
if (missingAnchors.length) {
  console.error(
    `\n✗ anchor check failed: ${missingAnchors.join(', ')} not scanned — the internal-doc sweep ` +
      `(${[...INTERNAL_DOC_DIRS, ...INTERNAL_DOC_FILES].join(', ')}) missed them.`,
  );
  process.exit(1);
}
for (const anchor of INTERNAL_ANCHORS) {
  console.log(`✓ anchor: ${anchor} is in the internal-doc sweep`);
}

if (!anchorHit) {
  console.error(
    `\n✗ anchor check failed: "${ANCHOR_TEXT}" was not found in ${relative(repoRoot, ANCHOR_FILE)} — ` +
      'the guard scanned the wrong directory and never checked the real copy.',
  );
  process.exit(1);
}
console.log(`✓ anchor: "${ANCHOR_TEXT}" found in ${relative(repoRoot, ANCHOR_FILE)}`);

checkPageMetaParity(files.filter(({ kind }) => kind === 'html'));

if (violations.length) {
  console.error(`\n✗ ${violations.length} unbacked claim(s) found (see CONTRIBUTING.md "claims need a source"):`);
  for (const v of violations) {
    console.error(`  - ${v.rel}: ${v.label} — matched "${v.hit}"\n      ${v.context}`);
  }
  process.exit(1);
}
console.log('\n✓ No unbacked marketing claims found on the website or in store metadata.');
