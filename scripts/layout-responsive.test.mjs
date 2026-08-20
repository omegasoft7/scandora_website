// Regression test for the Scandora website layout — run with:
//   node --test website/scripts/layout-responsive.test.mjs
// Dependency-free (Node built-in test runner), matching the rest of the static website tooling.
// Guards the two failure modes fixed in Trello #486: a hero that pushed its content hundreds of
// pixels below the fixed navigation bar on tall desktop screens, and mobile breakpoints that let
// wide tables, unloaded images and unpadded buttons break the phone layout.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(websiteDir, p), 'utf8');
const css = read('styles.css');

const MIN_TOUCH_PX = 44;
const PHONE_BREAKPOINT = 768;
const SMALL_PHONE_BREAKPOINT = 400;
const LARGE_PHONE = 414;
const NARROWEST_PHONE = 320;

// Rendered widths measured in headless Chromium at 320-414px. Both boxes are sized by their own
// text, so the stylesheet alone cannot derive them.
const BRAND_WIDTH_PX = 154; // 34px icon + 8px gap + "Scandora" at 24px/700
const LANG_TOGGLE_WIDTH_PX = 46; // "EN" at 14px/600 inside 12px of side padding

/** Every declaration block in the stylesheet, tagged with the media query it sits in. */
function parseRules(source) {
  const text = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  let media = null;
  let buffer = '';
  let depth = 0;
  for (const ch of text) {
    if (ch === '{') {
      depth += 1;
      if (depth === 1) {
        const prelude = buffer.trim();
        buffer = '';
        if (prelude.startsWith('@media')) {
          media = prelude;
          depth = 0;
        } else {
          rules.push({ media, selectors: prelude.split(',').map((s) => s.trim()), body: '' });
        }
        continue;
      }
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        rules[rules.length - 1].body = buffer;
        buffer = '';
        continue;
      }
      if (depth < 0) {
        depth = 0;
        media = null;
        buffer = '';
        continue;
      }
    }
    buffer += ch;
  }
  return rules;
}

const rules = parseRules(css);

/** Max-width in a media prelude, or Infinity for stylesheet-wide rules. */
function mediaMaxWidth(media) {
  if (!media) return Infinity;
  const match = media.match(/max-width:\s*(\d+)px/);
  return match ? Number(match[1]) : Infinity;
}

/**
 * Declarations that apply to `selector` at `viewport`, later rules winning — the cascade as far
 * as this stylesheet is concerned, which is enough because every rule here has one class.
 */
function declarationsFor(selector, viewport = Infinity) {
  const merged = {};
  for (const rule of rules) {
    if (mediaMaxWidth(rule.media) < viewport) continue;
    if (!rule.selectors.includes(selector)) continue;
    for (const decl of rule.body.split(';')) {
      const idx = decl.indexOf(':');
      if (idx === -1) continue;
      merged[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
    }
  }
  return merged;
}

/** Declarations for any rule whose selector list mentions `selector`, at `viewport`. */
function declarationsMentioning(selector, viewport = Infinity) {
  const merged = {};
  for (const rule of rules) {
    if (mediaMaxWidth(rule.media) < viewport) continue;
    if (!rule.selectors.some((s) => s === selector || s.endsWith(` ${selector}`))) continue;
    for (const decl of rule.body.split(';')) {
      const idx = decl.indexOf(':');
      if (idx === -1) continue;
      merged[decl.slice(0, idx).trim()] = decl.slice(idx + 1).trim();
    }
  }
  return merged;
}

/** The custom properties declared on :root, so var() lengths can be resolved to numbers. */
const rootVariables = (() => {
  const map = {};
  for (const rule of rules) {
    if (!rule.selectors.includes(':root')) continue;
    for (const decl of rule.body.split(';')) {
      const idx = decl.indexOf(':');
      if (idx === -1) continue;
      const name = decl.slice(0, idx).trim();
      if (name.startsWith('--')) map[name] = decl.slice(idx + 1).trim();
    }
  }
  return map;
})();

const resolveVars = (value) =>
  (value ?? '').replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g, (_, name) => rootVariables[name] ?? '');

const px = (value) => (value ? Number.parseFloat(value) : NaN);

/** The width a rule reserves for a box: an explicit width, or its minimum. */
function reservedWidth(decls) {
  return Math.max(px(resolveVars(decls.width)) || 0, px(resolveVars(decls['min-width'])) || 0);
}

/** The tappable height a rule guarantees: an explicit box, or padding plus one line of text. */
function tapHeight(decls) {
  const fixed = Math.max(px(decls.height) || 0, px(decls['min-height']) || 0);
  if (fixed) return fixed;
  const padding = decls.padding ? decls.padding.trim().split(/\s+/) : [];
  const vertical = padding.length ? px(padding[0]) : 0;
  return Number.isFinite(vertical) ? vertical * 2 : 0;
}

function htmlPages() {
  return readdirSync(websiteDir, { recursive: true })
    .filter((rel) => typeof rel === 'string' && rel.endsWith('.html'))
    .map((rel) => rel.split(sep).join('/'));
}

function readIfPresent(page) {
  try {
    return read(page);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

test('when the hero is taller than its content it should not center that content in a full-viewport box', () => {
  const hero = declarationsFor('.hero');
  const stretches = /100(vh|dvh|svh|lvh)/.test(hero['min-height'] ?? '') || /100(vh|dvh|svh|lvh)/.test(hero.height ?? '');
  const centers = (hero['align-items'] ?? '') === 'center' && (hero.display ?? '').includes('flex');
  assert.ok(
    !(stretches && centers),
    'the hero stretches to the viewport height and centers its content, so half the leftover space lands between the fixed navigation bar and the headline',
  );
});

test('when a page renders its first section it should clear the fixed navigation bar by the same distance everywhere', () => {
  for (const viewport of [Infinity, PHONE_BREAKPOINT]) {
    const tops = ['.hero', '.legal-page', '.contact-hero'].map((selector) => {
      const padding = declarationsFor(selector, viewport).padding;
      assert.ok(padding, `${selector} declares no padding at viewport ${viewport}`);
      return { selector, top: px(padding.trim().split(/\s+/)[0]) };
    });
    const distinct = [...new Set(tops.map((t) => t.top))];
    assert.equal(
      distinct.length,
      1,
      `top sections clear the navigation bar by different amounts at viewport ${viewport}: ${tops.map((t) => `${t.selector}=${t.top}px`).join(', ')}`,
    );
  }
});

test('when an image has not loaded yet it should keep the width and height attributes as its aspect ratio', () => {
  assert.ok(
    !/aspect-ratio:\s*attr\(/.test(css),
    'aspect-ratio: attr() is not supported, and declaring it on img overrides the browser rule that derives the ratio from the width/height attributes, collapsing unloaded images to zero width',
  );
});

test('when a store badge is still loading it should reserve its own width', () => {
  const badges = [];
  for (const page of htmlPages()) {
    const html = readIfPresent(page);
    if (html === null) continue;
    for (const anchor of html.match(/<a[^>]*class="[^"]*store-badge[^"]*"[\s\S]*?<\/a>/g) ?? []) {
      for (const img of anchor.match(/<img[^>]*>/g) ?? []) badges.push({ page, img });
    }
  }
  assert.ok(badges.length >= 3, `only ${badges.length} store badge image(s) found, expected at least 3`);
  for (const { page, img } of badges) {
    assert.match(img, /\swidth="\d+"/, `${page}: store badge image has no width attribute → ${img}`);
    assert.match(img, /\sheight="\d+"/, `${page}: store badge image has no height attribute → ${img}`);
  }
});

test('when a button carries no size modifier it should still be padded and tappable', () => {
  const base = declarationsFor('.btn');
  assert.ok(px(base.padding) > 0, `.btn declares no padding of its own (${base.padding ?? 'none'})`);
  assert.ok(
    tapHeight(base) >= MIN_TOUCH_PX,
    `.btn guarantees only ${tapHeight(base)}px of height, below the ${MIN_TOUCH_PX}px touch target`,
  );

  const unsized = [];
  for (const page of htmlPages()) {
    const html = readIfPresent(page);
    if (html === null) continue;
    for (const attr of html.match(/class="[^"]*\bbtn\b[^"]*"/g) ?? []) {
      const classes = attr.slice(7, -1).split(/\s+/);
      if (!classes.some((c) => c === 'btn-sm' || c === 'btn-lg' || c === 'btn-submit')) unsized.push(`${page}: ${attr}`);
    }
  }
  assert.ok(unsized.length > 0, 'no unsized .btn found, so the base padding is untested');
});

test('when a wide table renders on a phone it should scroll inside itself instead of widening the page', () => {
  const phone = declarationsFor('.cookie-table', PHONE_BREAKPOINT);
  assert.equal(phone.display, 'block', '.cookie-table stays a table on phones, so its columns push the page wider than the screen');
  assert.match(phone.overflow ?? phone['overflow-x'] ?? '', /auto|scroll/, '.cookie-table has no horizontal scrolling of its own on phones');

  const desktop = declarationsFor('.cookie-table');
  assert.notEqual(desktop.display, 'block', '.cookie-table is forced to block on desktop too, which shrinks it away from the full content width');

  const pagesWithTables = htmlPages().filter((page) => (readIfPresent(page) ?? '').includes('class="cookie-table"'));
  assert.ok(pagesWithTables.length >= 6, `only ${pagesWithTables.length} page(s) use .cookie-table, expected at least 6`);
});

test('when legal copy contains a long unbreakable token it should wrap instead of widening the page', () => {
  const codeDecls = declarationsMentioning('code');
  assert.match(
    codeDecls['overflow-wrap'] ?? '',
    /break-word|anywhere/,
    'inline code in legal copy does not wrap, so a long URL scrolls the whole page sideways on a phone',
  );
});

test('when a navigation control is tapped on a phone it should offer a 44px target', () => {
  const controls = {
    '.mobile-menu-toggle': declarationsFor('.mobile-menu-toggle', PHONE_BREAKPOINT),
    '.lang-toggle': declarationsFor('.lang-toggle', PHONE_BREAKPOINT),
    '.nav-links a': declarationsFor('.nav-links a', PHONE_BREAKPOINT),
    '.footer-col a': declarationsFor('.footer-col a', PHONE_BREAKPOINT),
  };
  for (const [selector, decls] of Object.entries(controls)) {
    assert.ok(
      tapHeight(decls) >= MIN_TOUCH_PX,
      `${selector} guarantees only ${tapHeight(decls)}px of height, below the ${MIN_TOUCH_PX}px touch target`,
    );
  }
  const toggle = controls['.mobile-menu-toggle'];
  const toggleWidth = Math.max(px(toggle.width) || 0, px(toggle['min-width']) || 0);
  assert.ok(toggleWidth >= MIN_TOUCH_PX, `.mobile-menu-toggle is only ${toggleWidth}px wide, below the ${MIN_TOUCH_PX}px touch target`);
  assert.equal(toggle['flex-shrink'], '0', '.mobile-menu-toggle can shrink below its target width when the navigation row runs out of space');
});

test('when the navigation row runs short of room it should not squeeze the brand under its neighbour', () => {
  const logo = declarationsFor('.logo', PHONE_BREAKPOINT);
  assert.equal(
    logo['flex-shrink'],
    '0',
    '.logo is the only navigation child sized by its own text, so it absorbs every squeeze; nothing clips it, and the "Scandora" wordmark then paints on top of the opaque control beside it',
  );
});

test('when the navigation row renders on a large phone it should keep the header download button', () => {
  const cta = declarationsFor('.nav-actions .btn', LARGE_PHONE);
  assert.notEqual(
    cta.display,
    'none',
    `the header drops its Download button at ${LARGE_PHONE}px, a width where the navigation children still fit side by side`,
  );
});

test('when the navigation row renders on the narrowest phone its children should all fit side by side', () => {
  const cta = declarationsFor('.nav-actions .btn', SMALL_PHONE_BREAKPOINT);
  assert.equal(
    cta.display,
    'none',
    'the header keeps its Download button below 400px, and that label leaves the brand less room than the wordmark needs',
  );

  const container = declarationsFor('.nav-container', NARROWEST_PHONE);
  const gutter = px(resolveVars(container['padding-left'])) + px(resolveVars(container['padding-right']));
  assert.ok(Number.isFinite(gutter), '.nav-container declares no horizontal padding on a narrow phone');

  const children = [
    { name: '.logo', width: BRAND_WIDTH_PX },
    {
      name: '.lang-toggle',
      width: Math.max(reservedWidth(declarationsFor('.lang-toggle', NARROWEST_PHONE)), LANG_TOGGLE_WIDTH_PX),
    },
    { name: '.mobile-menu-toggle', width: reservedWidth(declarationsFor('.mobile-menu-toggle', NARROWEST_PHONE)) },
  ];
  const needed = gutter + children.reduce((sum, child) => sum + child.width, 0);

  assert.ok(
    needed <= NARROWEST_PHONE,
    `the navigation row needs ${needed}px at ${NARROWEST_PHONE}px: ${children
      .map((child) => `${child.name}=${child.width}px`)
      .join(' + ')} plus ${gutter}px of gutter, so the children cannot sit side by side and paint over each other`,
  );
});

test('when a long word or a wide control renders on a narrow phone it should not widen the page', () => {
  assert.match(
    declarationsFor('.legal-title')['overflow-wrap'] ?? '',
    /break-word|anywhere/,
    'a legal page heading does not wrap, so a long German compound word such as "DSGVO-Dokumentenscanner" scrolls the whole page sideways',
  );

  const billing = declarationsFor('.billing-toggle');
  assert.equal(billing['max-width'], '100%', '.billing-toggle is sized by its content with no cap, so it grows wider than a narrow phone');
  assert.equal(billing['flex-wrap'], 'wrap', '.billing-toggle cannot wrap, so its two labels stay on one line and push the page sideways');
});
