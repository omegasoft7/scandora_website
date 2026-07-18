#!/usr/bin/env node
// Claims guard for the website + app-store metadata — the public-copy counterpart to the
// Dart in-app guard (flutter_app/packages/scandora_localization/test/unit/claims_policy_test.dart).
//
// docs/CLAIMS_POLICY.md applies to every public surface, but until now only the in-app
// strings were auto-checked. This script closes the gap: it scans the visible website copy
// and the fastlane store listings for the same unverifiable marketing claims and fails if
// one appears.
//
// Scanned surfaces:
//   - every website/**/*.html (visible text only — <script>/<style>/comments/tags stripped)
//   - website/translations.js (the bilingual copy served into the pages at runtime)
//   - flutter_app/{android,ios,macos}/fastlane/metadata/**/*.txt (store listings)
//
// Two carve-outs keep the guard honest without flagging sanctioned copy:
//   - NEGATION-AWARE GoBD claims: "GoBD-certified"/"GoBD-Siegel"/… only violate when asserted
//     as a positive claim. The shipped disclaimers ("nicht GoBD-zertifiziert", "kein
//     GoBD-Siegel — ein solches gibt es nicht") negate the claim and are allowed.
//   - ALLOWED phrases: verbatim, pre-vetted product-attribute copy (on-device full-text search
//     is genuinely instant/sofort — a factual local-search attribute, not a speed promise).
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

// A known file with known copy — proves the scan hit the real tree and did not silently
// "pass" on an empty/wrong directory (mirrors the Dart guard's positive anchor).
const ANCHOR_FILE = join(websiteDir, 'translations.js');
const ANCHOR_TEXT = 'Built in Germany';

// Sanctioned, pre-vetted copy. A forbidden pattern matched inside one of these verbatim
// phrases is a factual product attribute, not a claim (see docs/CLAIMS_POLICY.md — product
// attributes are not claims). Keep each entry exact; adding one is a deliberate decision.
const ALLOWED = [
  'Find your scans instantly with on-device full-text search',
  'Finden Sie Ihre Scans sofort mit Volltextsuche',
];

// German + English negations that turn a GoBD claim into an honest disclaimer.
const NEGATION = /\b(kein\w*|nein|nicht|ohne|no|not|never|without)\b/i;
// Chars each side of a match inspected for a negation (covers the FAQ "…? Nein."/"…? No." form).
const NEGATION_WINDOW = 80;

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

const collapse = (text) => text.replace(/\s+/g, ' ');

/** The window of text around index i inspected for a negation. */
function windowAround(text, i, len) {
  return text.slice(Math.max(0, i - NEGATION_WINDOW), Math.min(text.length, i + len + NEGATION_WINDOW));
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
  return files;
}

const violations = [];
let anchorHit = false;

const files = collectFiles();
for (const { path, kind } of files) {
  const raw = readFileSync(path, 'utf8');
  const text = collapse(kind === 'html' ? htmlToText(raw) : raw);
  const rel = relative(repoRoot, path);

  if (path === ANCHOR_FILE && raw.includes(ANCHOR_TEXT)) anchorHit = true;

  for (const { pattern, label, negatable } of forbidden) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const hit = match[0];
      const idx = match.index ?? 0;
      if (ALLOWED.some((phrase) => text.includes(phrase) && withinPhrase(text, idx, hit, phrase))) continue;
      if (negatable && NEGATION.test(windowAround(text, idx, hit.length))) continue;
      violations.push({ rel, label, hit, context: snippet(text, idx, hit.length) });
    }
  }
}

/** True when the match at idx falls inside an occurrence of an allowed verbatim phrase. */
function withinPhrase(text, idx, hit, phrase) {
  let from = 0;
  for (;;) {
    const at = text.indexOf(phrase, from);
    if (at === -1) return false;
    if (idx >= at && idx + hit.length <= at + phrase.length) return true;
    from = at + 1;
  }
}

function snippet(text, idx, len) {
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + len + 40);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}

console.log(`✓ scanned ${files.length} file(s) across the website + fastlane store metadata`);

if (!anchorHit) {
  console.error(
    `\n✗ anchor check failed: "${ANCHOR_TEXT}" was not found in ${relative(repoRoot, ANCHOR_FILE)} — ` +
      'the guard scanned the wrong directory and never checked the real copy.',
  );
  process.exit(1);
}
console.log(`✓ anchor: "${ANCHOR_TEXT}" found in ${relative(repoRoot, ANCHOR_FILE)}`);

if (violations.length) {
  console.error(`\n✗ ${violations.length} unbacked claim(s) found (see docs/CLAIMS_POLICY.md):`);
  for (const v of violations) {
    console.error(`  - ${v.rel}: ${v.label} — matched "${v.hit}"\n      ${v.context}`);
  }
  process.exit(1);
}
console.log('\n✓ No unbacked marketing claims found on the website or in store metadata.');
