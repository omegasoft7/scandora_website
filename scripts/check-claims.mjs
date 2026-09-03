#!/usr/bin/env node
// Claims guard for the website + app-store metadata — the public-copy counterpart to the
// Dart in-app guard (flutter_app/packages/scandora_localization/test/unit/claims_policy_test.dart).
//
// docs/CLAIMS_POLICY.md applies to every public surface, but until now only the in-app
// strings were auto-checked. This script closes the gap: it scans the visible website copy
// and the fastlane store listings for the same unverifiable marketing claims and fails if
// one appears.
//
// Public surfaces (every rule applies):
//   - every website/**/*.html: visible text (<script>/<style>/comments/tags stripped) plus the
//     string values of its application/ld+json blocks, which the visible-text pass drops
//   - website/translations.js (the bilingual copy served into the pages at runtime)
//   - flutter_app/{android,ios,macos}/fastlane/metadata/**/*.txt (store listings)
//
// Internal doc surfaces (only the AI-index facts below apply — the hype bans are scoped to
// marketing copy by docs/CLAIMS_POLICY.md, and legal/ holds two docs that quote the banned
// phrases on purpose): every *.md under legal/, website/legal/, docs/ and business/, plus the
// root-level MONETIZATION_COSTS.md and LEGAL_REVIEW.md. These carry the same claims to
// customers and to auditors, so a tier gate or a wrong index location cannot be fixed on the
// site and left behind here (Trello #537).
//
// Four carve-outs keep the guard honest without flagging sanctioned copy:
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
//   - POLICY_DOCS: docs/CLAIMS_POLICY.md spells out every banned phrasing in order to forbid it,
//     so the AI-index rules skip it exactly as the hype bans skip legal/'s claim-review docs.
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

// Repo docs that repeat the same customer-facing claims outside the website.
const INTERNAL_DOC_DIRS = ['legal', 'website/legal', 'docs', 'business'];
// The same, for claim-carrying docs that sit at the repo root instead of in a swept directory.
const INTERNAL_DOC_FILES = ['MONETIZATION_COSTS.md', 'LEGAL_REVIEW.md'];

// A known file with known copy — proves the scan hit the real tree and did not silently
// "pass" on an empty/wrong directory (mirrors the Dart guard's positive anchor).
const ANCHOR_FILE = join(websiteDir, 'translations.js');
const ANCHOR_TEXT = 'Built in Germany';

// The same positive anchors for the internal-doc sweep — one per swept root, so a renamed
// directory or a dropped root file fails loudly instead of silently leaving the scan.
const INTERNAL_ANCHORS = [
  'legal/data-flow-inventory.md',
  'website/legal/SUBPROCESSORS.md',
  'docs/support/CANNED_ANSWERS.md',
  'business/PRODUCT_MAP.md',
  'MONETIZATION_COSTS.md',
  'LEGAL_REVIEW.md',
];

// German + English negations that turn a GoBD claim into an honest disclaimer.
const NEGATION = /\b(kein\w*|nein|nicht|ohne|no|not|never|without)\b/i;
// Chars each side of a match inspected for a negation (covers the FAQ "…? Nein."/"…? No." form).
const NEGATION_WINDOW = 80;

// The opt-in AI search index / document chat, and wording that restricts it to a paid tier.
const INDEX_FEATURE = String.raw`(?:AI )?document (?:search|chat|index)|search index|smart search|cited answer|Dokument(?:en)?suche|Dokument(?:en)?-?(?:Suchindex|Index|Chat)|Suchindex|belegte Antwort`;
const PAID_TIER_GATE = String.raw`Pro and above|Pro or above|Pro und höher|\bab Pro\b|requires Pro|Pro plan required|Pro\+|\bonly Pro\b|paid \(Pro|\bnur ab Pro\b|Pro\s*(?:/|&|and|und)\s*Business`;

// docs/CLAIMS_POLICY.md quotes every phrasing below in order to forbid it, so the AI-index rules
// skip it the same way the hype bans skip legal/'s claim-review docs.
const POLICY_DOCS = ['docs/CLAIMS_POLICY.md'];

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
  const text = collapse(kind === 'html' ? `${htmlToText(raw)} . ${ldJsonText(raw)}` : raw);
  const rel = relative(repoRoot, path);
  const relPosix = rel.split(sep).join('/');

  if (path === ANCHOR_FILE && raw.includes(ANCHOR_TEXT)) anchorHit = true;
  if (INTERNAL_ANCHORS.includes(relPosix)) internalAnchorsHit.add(relPosix);

  const isPolicyDoc = POLICY_DOCS.includes(relPosix);
  for (const { pattern, label, negatable, appliesToDocs } of forbidden) {
    if (internal && (!appliesToDocs || isPolicyDoc)) continue;
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) {
      const hit = match[0];
      const idx = match.index ?? 0;
      if (negatable && NEGATION.test(windowAround(text, idx, hit.length))) continue;
      violations.push({ rel, label, hit, context: snippet(text, idx, hit.length) });
    }
  }
}

function snippet(text, idx, len) {
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + len + 40);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}

console.log(
  `✓ scanned ${scannedCount} file(s) across the website + fastlane store metadata, ` +
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

if (violations.length) {
  console.error(`\n✗ ${violations.length} unbacked claim(s) found (see docs/CLAIMS_POLICY.md):`);
  for (const v of violations) {
    console.error(`  - ${v.rel}: ${v.label} — matched "${v.hit}"\n      ${v.context}`);
  }
  process.exit(1);
}
console.log('\n✓ No unbacked marketing claims found on the website or in store metadata.');
