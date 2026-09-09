// Regression test for the price claim outside terms.html — run with:
//   node --test website/scripts/marketing-price-claims.test.mjs
// legal-terms.test.mjs reads terms.html only, so AGB § 4's divergence caveat is guarded
// there and nowhere else. The same statement is hand-edited marketing copy in
// translations.js, in index.html (the static fallbacks and the schema.org FAQPage block
// that ships as structured data) and in help/managed-ai.html. A stale "displayed price =
// amount charged" sentence in any of them is pre-contractual advertising that contradicts
// § 4 and § 5, so it re-creates the § 305c Abs. 2 BGB ambiguity § 4 was rewritten to end.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => readFileSync(join(websiteDir, rel), 'utf8');

const translations = read('translations.js');
const index = read('index.html');
const managedAi = read('help/managed-ai.html');

const sources = [
  ['translations.js', translations],
  ['index.html', index],
  ['help/managed-ai.html', managedAi],
];

/** The two per-language copy tables inside the `const translations = { … };` literal. */
function translationTables() {
  const en = translations.indexOf('\n    en: {');
  const de = translations.indexOf('\n    de: {');
  const end = translations.indexOf('\n};', de);
  assert.notEqual(en, -1, 'translations.js has no "en" table');
  assert.ok(de > en, 'translations.js has no "de" table after the "en" one');
  assert.ok(end > de, 'the translations object literal is never closed');
  return { en: translations.slice(en, de), de: translations.slice(de, end) };
}

const tables = translationTables();

/** The single-line string literal a translation key is bound to. */
function copy(lang, key) {
  const marker = `'${key}':`;
  const start = tables[lang].indexOf(marker);
  assert.notEqual(start, -1, `translations.js "${lang}" has no ${key}`);
  const line = tables[lang].slice(start, tables[lang].indexOf('\n', start));
  const raw = line.slice(line.indexOf(':') + 1).trim().replace(/,$/, '');
  const quote = raw[0];
  assert.ok(quote === "'" || quote === '"', `${lang}.${key} is not a plain string literal`);
  assert.equal(raw[raw.length - 1], quote, `${lang}.${key} is not a single-line string literal`);
  return raw.slice(1, -1);
}

/** The one capture group of `re` in `html`, with its HTML entities resolved. */
function markup(html, re, what) {
  const found = html.match(re);
  assert.ok(found, `index.html no longer carries ${what}`);
  return found[1].replace(/&amp;/g, '&');
}

/** The FAQPage answer schema.org serves for `question`. */
function structuredAnswer(question) {
  for (const [, body] of index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (error) {
      assert.fail(`index.html has an unparseable JSON-LD block: ${error.message}`);
    }
    if (parsed['@type'] !== 'FAQPage') continue;
    const entry = parsed.mainEntity.find((item) => item.name === question);
    assert.ok(entry, `the FAQPage block has no question "${question}"`);
    return entry.acceptedAnswer.text;
  }
  return assert.fail('index.html has no FAQPage JSON-LD block');
}

/** The one <article> that carries a language's copy on a help page. */
function helpBlock(lang) {
  const start = managedAi.indexOf(`<article class="legal-content" data-lang="${lang}"`);
  assert.notEqual(start, -1, `help/managed-ai.html has no "${lang}" article`);
  const end = managedAi.indexOf('</article>', start);
  assert.notEqual(end, -1, `the "${lang}" article is never closed`);
  return managedAi.slice(start, end);
}

const CORRECTED = {
  de: {
    finalPrice: 'sind die Endpreise für das jeweilige Produkt',
    caveat: 'bei einer Testphase, einem Einführungs- oder Aktionsangebot oder einem anteilig verrechneten '
      + 'Wechsel kann der tatsächlich berechnete Betrag abweichen',
    receipt: 'maßgeblich ist der Betrag, den der Store in Ihrem Kaufbeleg ausweist',
  },
  en: {
    finalPrice: 'are the final prices for the respective product',
    caveat: 'with a trial, an introductory or promotional offer, or a prorated plan change the amount actually '
      + 'charged can differ',
    receipt: 'the amount the store states on your receipt is the one that applies',
  },
};

function assertCorrected(text, lang, where) {
  for (const [part, needle] of Object.entries(CORRECTED[lang])) {
    assert.ok(text.includes(needle), `${where} (${lang.toUpperCase()}) is missing the ${part} wording: ${needle}`);
  }
}

test('when the pricing note states a price it should carry section 4 divergence caveat in both languages', () => {
  assertCorrected(copy('en', 'pricing.priceNote'), 'en', 'pricing.priceNote');
  assertCorrected(copy('de', 'pricing.priceNote'), 'de', 'pricing.priceNote');
});

test('when the FAQ answers what a plan costs it should carry the same caveat as the pricing note', () => {
  assertCorrected(copy('en', 'faq.a2'), 'en', 'faq.a2');
  assertCorrected(copy('de', 'faq.a2'), 'de', 'faq.a2');
});

test('when index.html ships static price copy it should repeat translations.js word for word', () => {
  assert.equal(
    markup(
      index,
      /<p class="pricing-note" data-i18n="pricing\.priceNote"><small>([\s\S]*?)<\/small><\/p>/,
      'the static pricing note',
    ),
    copy('en', 'pricing.priceNote'),
    'the rendered pricing note has drifted from translations.js pricing.priceNote',
  );
  assert.equal(
    markup(index, /<p data-i18n="faq\.a2">([\s\S]*?)<\/p>/, 'the static FAQ answer'),
    copy('en', 'faq.a2'),
    'the rendered FAQ answer has drifted from translations.js faq.a2',
  );
});

test('when the FAQ answer ships as structured data it should state the same price claim as the visible copy', () => {
  assert.equal(
    structuredAnswer('Is Scandora free to use?'),
    copy('en', 'faq.a2'),
    'the schema.org FAQPage answer has drifted from translations.js faq.a2',
  );
});

test('when the managed-AI help page points at the pricing section it should carry the caveat in both languages', () => {
  assertCorrected(helpBlock('en'), 'en', 'help/managed-ai.html');
  assertCorrected(helpBlock('de'), 'de', 'help/managed-ai.html');
});

test('when section 4 concedes the charged amount can differ no marketing page should bind the displayed price', () => {
  for (const stale of [
    'Prices are the final amounts charged via the App Store / Google Play',
    'Prices are the final amounts charged via the App Store or Google Play',
    'final prices are the amounts charged via the App Store / Google Play',
    'Die Preise sind die über App Store / Google Play berechneten Endpreise',
    'Die Preise sind die über App Store oder Google Play berechneten Endpreise',
    'die Endpreise sind die über App Store / Google Play berechneten Beträge',
  ]) {
    for (const [name, body] of sources) {
      assert.ok(!body.includes(stale), `${name} still equates the displayed price with the amount charged: ${stale}`);
    }
  }
});
