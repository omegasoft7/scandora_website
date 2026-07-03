#!/usr/bin/env node
// Validates the website's structured data so the audit (Trello 1.2) stays repeatable.
//
// Checks, across every page in website/:
//   1. Every <script type="application/ld+json"> block is syntactically valid JSON.
//   2. Every schema.org Offer has a `price` and a `priceCurrency`.
//   3. No Offer carries a `priceValidUntil` that is already in the past.
//   4. The visible pricing-card prices (the €-prefixed .amount spans) match the JSON-LD
//      Offer prices, so the human-readable site and the machine-readable structured data
//      never drift apart.
//   5. No aggregateRating/review markup anywhere (must stay out until real reviews exist).
//
// Prices themselves come from RevenueCat / App Store Connect (see STRUCTURED_DATA.md);
// this script guards consistency and validity, not the absolute price values.
//
// Usage:  node website/scripts/validate-structured-data.mjs
// Exit code 0 = all good, 1 = at least one problem.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index.html', 'privacy.html', 'terms.html', 'imprint.html', 'contact.html'];
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (ISO dates sort chronologically)

const problems = [];
const report = (page, msg) => problems.push(`${page}: ${msg}`);

/** Recursively collect every node whose @type is (or includes) "Offer". */
function collectOffers(node, out = []) {
  if (Array.isArray(node)) {
    for (const n of node) collectOffers(n, out);
  } else if (node && typeof node === 'object') {
    const type = node['@type'];
    if (type === 'Offer' || (Array.isArray(type) && type.includes('Offer'))) out.push(node);
    for (const v of Object.values(node)) collectOffers(v, out);
  }
  return out;
}

const num = (v) => Number.parseFloat(String(v).replace(',', '.'));

for (const page of PAGES) {
  const html = readFileSync(join(websiteDir, page), 'utf8');

  // 1. Parse every JSON-LD block.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const jsonLdOfferPrices = [];
  for (const [i, block] of blocks.entries()) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (e) {
      report(page, `JSON-LD block #${i + 1} is invalid JSON: ${e.message}`);
      continue;
    }
    // 2 + 3. Offer integrity.
    for (const offer of collectOffers(data)) {
      const label = offer.name || offer['@type'];
      if (offer.price === undefined) report(page, `Offer "${label}" has no price`);
      if (!offer.priceCurrency) report(page, `Offer "${label}" has no priceCurrency`);
      if (offer.priceCurrency && offer.priceCurrency !== 'EUR') {
        report(page, `Offer "${label}" priceCurrency is "${offer.priceCurrency}", expected EUR`);
      }
      if (offer.priceValidUntil && offer.priceValidUntil < today) {
        report(page, `Offer "${label}" priceValidUntil ${offer.priceValidUntil} is in the past (today ${today})`);
      }
      if (offer.price !== undefined) jsonLdOfferPrices.push(num(offer.price));
    }
  }

  // 4. Visible pricing-card prices must match the JSON-LD offers.
  const visiblePrices = [
    ...html.matchAll(/<span class="currency"[^>]*>€<\/span><span class="amount"[^>]*>([^<]+)</g),
  ].map((m) => num(m[1]));
  // Visible cards and JSON-LD offers are both authored in the same plan order
  // (Free → Pro → Business), so compare them position-by-position. An order-sensitive
  // compare also catches a price *swap* between two plans, which a sorted compare misses.
  if (jsonLdOfferPrices.length && visiblePrices.length) {
    const seq = (arr) => arr.join(',');
    if (seq(jsonLdOfferPrices) !== seq(visiblePrices)) {
      report(
        page,
        `visible card prices [${seq(visiblePrices)}] do not match JSON-LD offer prices [${seq(jsonLdOfferPrices)}] (compared in document order)`,
      );
    }
  }

  // 5. The FAQ free-text repeats the paid prices as "€9.99/month"; keep it in sync too.
  for (const price of new Set(jsonLdOfferPrices.filter((p) => p > 0))) {
    if (!html.includes(`€${price}`)) {
      report(page, `paid price €${price} from the JSON-LD offers is not mentioned in the page text (FAQ may be stale)`);
    }
  }

  // 6. Rating/review markup must stay removed until real, citable reviews exist.
  if (/aggregateRating|"review"|itemprop="review"/.test(html)) {
    report(page, 'aggregateRating/review markup found — must stay removed until real, citable reviews exist');
  }

  const offerCount = jsonLdOfferPrices.length;
  console.log(`✓ ${page}: ${blocks.length} JSON-LD block(s), ${offerCount} offer(s), ${visiblePrices.length} visible price(s)`);
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} structured-data problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('\n✓ All structured data is valid, price-consistent, and free of expired offer dates.');
