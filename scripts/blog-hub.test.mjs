// Regression test for the /blog/ (Ratgeber) hub — run with:  node --test website/scripts/
// Dependency-free (Node built-in test runner); no package.json / framework needed, matching
// the rest of the static website tooling. Guards the Phase-5 "internally linked" DoD:
// the hub must list every cornerstone guide, and the homepage + sitemap must reach the hub.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(websiteDir, p), 'utf8');

const CORNERSTONE_SLUGS = [
  'datev-export-aus-dem-smartphone',
  'dsgvo-sichere-camscanner-alternative',
  'gobd-konform-scannen',
  'netzwerkscanner-escl-einrichten',
  'scandora-vs-fileee',
  'scan-to-trello-workflow',
];

test('when the blog hub renders it should link every cornerstone guide (no orphans)', () => {
  const hub = read('blog/index.html');
  for (const slug of CORNERSTONE_SLUGS) {
    // Each guide is linked once per language block (EN + DE) → at least two references.
    const count = hub.split(`href="/blog/${slug}"`).length - 1;
    assert.ok(count >= 2, `hub links /blog/${slug} ${count} time(s), expected >= 2 (EN + DE cards)`);
  }
});

test('when the blog hub is authored it should be bilingual with German-primary metadata', () => {
  const hub = read('blog/index.html');
  assert.match(hub, /<link rel="canonical" href="https:\/\/scandora\.eu\/blog\/">/);
  assert.match(hub, /hreflang="de" href="https:\/\/scandora\.eu\/blog\/\?lang=de"/);
  assert.match(hub, /hreflang="x-default" href="https:\/\/scandora\.eu\/blog\/"/);
  assert.match(hub, /property="og:locale" content="de_DE"/);
  assert.ok(hub.includes('data-lang="en"') && hub.includes('data-lang="de"'), 'hub must carry EN + DE blocks');
});

test('when the homepage renders it should link the blog hub from nav and footer', () => {
  const home = read('index.html');
  const count = home.split('href="/blog/"').length - 1;
  assert.ok(count >= 2, `homepage links /blog/ ${count} time(s), expected >= 2 (nav + footer)`);
  assert.match(home, /data-i18n="nav\.blog"/);
});

test('when translations are loaded nav.blog should exist in both languages', () => {
  const t = read('translations.js');
  assert.match(t, /'nav\.blog': 'Guides'/);
  assert.match(t, /'nav\.blog': 'Ratgeber'/);
});

test('when the sitemap is generated it should register /blog/ with hreflang alternates', () => {
  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /<loc>https:\/\/scandora\.eu\/blog\/<\/loc>/);
  assert.match(sitemap, /hreflang="de" href="https:\/\/scandora\.eu\/blog\/\?lang=de"/);
  assert.match(sitemap, /hreflang="x-default" href="https:\/\/scandora\.eu\/blog\/"/);
});
