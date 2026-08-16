// Regression test for the Scandora brand lockup — run with:  node --test website/scripts/
// Dependency-free (Node built-in test runner), matching the rest of the static website tooling.
// Google OAuth branding verification matches the consent-screen app logo and app name against
// the home page, so the visible logo, the Organization JSON-LD logo and the app icon shipped to
// the stores must all stay the same artwork, and the home page must name and describe the app.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(websiteDir, p), 'utf8');

/** Read a page, or null when a sibling suite's temporary file disappeared mid-sweep. */
function readIfPresent(page) {
  try {
    return read(page);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

const APP_ICON = '/assets/logo.png';
const RETIRED_MARK = '/assets/logo-mark.svg';

function htmlPages() {
  return readdirSync(websiteDir, { recursive: true })
    .filter((rel) => typeof rel === 'string' && rel.endsWith('.html'))
    .map((rel) => rel.split(sep).join('/'));
}

/** Every way a page's brand lockup can drift away from the app icon. */
function lockupViolations(html) {
  const violations = [];
  if (html.includes(RETIRED_MARK)) violations.push(`references the retired mark ${RETIRED_MARK}`);
  for (const tag of html.match(/<img class="logo-icon"[^>]*>/g) ?? []) {
    if (!tag.includes(`src="${APP_ICON}"`)) violations.push(`lockup image is not the app icon → ${tag}`);
    if (!tag.includes('alt="Scandora app icon"')) violations.push(`lockup image has no Scandora alt text → ${tag}`);
  }
  return violations;
}

test('when a page renders the brand lockup it should use the app icon artwork', () => {
  const pages = htmlPages()
    .map((page) => [page, readIfPresent(page)])
    .filter(([, html]) => html !== null && html.includes('class="logo-icon"'));
  assert.ok(pages.length >= 25, `only ${pages.length} page(s) carry the brand lockup, expected >= 25`);
  for (const [page, html] of pages) {
    assert.deepEqual(lockupViolations(html), [], `${page} drifted from the app icon lockup`);
  }
});

test('when a page is authored it should not reference the retired standalone mark', () => {
  for (const page of htmlPages()) {
    const html = readIfPresent(page);
    assert.ok(html === null || !html.includes(RETIRED_MARK), `${page} still references ${RETIRED_MARK}`);
  }
});

test('when a lockup drifts back to the old mark it should be reported', () => {
  const drifted = `<a class="logo"><img class="logo-icon" src="${RETIRED_MARK}" alt="" width="34" height="24"></a>`;
  assert.deepEqual(lockupViolations(drifted), [
    `references the retired mark ${RETIRED_MARK}`,
    `lockup image is not the app icon → <img class="logo-icon" src="${RETIRED_MARK}" alt="" width="34" height="24">`,
    `lockup image has no Scandora alt text → <img class="logo-icon" src="${RETIRED_MARK}" alt="" width="34" height="24">`,
  ]);
});

test('when the app icon is referenced it should exist as a shipped asset', () => {
  assert.ok(existsSync(join(websiteDir, APP_ICON.slice(1))), `${APP_ICON} is missing from website/assets`);
});

test('when the homepage loads it should show the app icon above the fold', () => {
  const home = read('index.html');
  const hero = home.slice(home.indexOf('class="hero-content"'), home.indexOf('class="hero-actions"'));
  assert.match(hero, /<img class="hero-brand-icon" src="\/assets\/logo\.png" alt="Scandora app icon"/);
  assert.match(hero, /<p class="hero-brand-name">Scandora<\/p>/);
});

test('when the homepage declares its Organization logo it should be the visible app icon', () => {
  const home = read('index.html');
  assert.match(home, /"logo": "https:\/\/scandora\.eu\/assets\/logo\.png"/);
});

test('when the homepage headline renders it should carry the OAuth app name Scandora', () => {
  const home = read('index.html');
  const headline = home.slice(home.indexOf('id="hero-title"'), home.indexOf('class="hero-description"'));
  assert.ok(headline.includes('Scandora'), 'the hero headline does not name the app');
  assert.match(home, /<title>Scandora\b/);
});

const heroCopy = (translations, key) =>
  [...translations.matchAll(new RegExp(`'hero\\.${key}': '([^']*)'`, 'g'))].map((m) => m[1]);

/** Hero copy that fails Google's "name matches, purpose explained" check. */
function heroCopyViolations(translations) {
  const violations = [];
  const titles = heroCopy(translations, 'titleLine1');
  const descriptions = heroCopy(translations, 'description');
  if (titles.length !== 2) violations.push(`expected an English and a German hero headline, got ${titles.length}`);
  if (descriptions.length !== 2) {
    violations.push(`expected an English and a German hero description, got ${descriptions.length}`);
  }
  for (const title of titles) {
    if (!title.includes('Scandora')) violations.push(`hero headline does not name the app: ${title}`);
  }
  for (const description of descriptions) {
    if (!description.startsWith('Scandora')) violations.push(`hero description does not name the app: ${description}`);
  }
  return violations;
}

test('when the hero copy is translated it should name and explain the app in both languages', () => {
  const translations = read('translations.js');
  assert.deepEqual(heroCopyViolations(translations), []);
  const descriptions = heroCopy(translations, 'description');
  assert.ok(descriptions[0].startsWith('Scandora is an AI document scanner'), descriptions[0]);
  assert.ok(descriptions[1].startsWith('Scandora ist ein KI-Dokumentenscanner'), descriptions[1]);
});

test('when the hero copy stops naming the app it should be reported', () => {
  const drifted = "'hero.titleLine1': 'Turn every document',\n'hero.description': 'Scan with your phone.',";
  assert.deepEqual(heroCopyViolations(drifted), [
    'expected an English and a German hero headline, got 1',
    'expected an English and a German hero description, got 1',
    'hero headline does not name the app: Turn every document',
    'hero description does not name the app: Scan with your phone.',
  ]);
});

test('when the homepage hero is rendered it should match the translated hero copy', () => {
  const home = read('index.html');
  const translations = read('translations.js');
  const [title] = heroCopy(translations, 'titleLine1');
  const [description] = heroCopy(translations, 'description');
  assert.ok(home.includes(`>${title}</span>`), `index.html hero headline drifted from '${title}'`);
  assert.ok(home.includes(description), 'index.html hero description drifted from translations.js');
});
