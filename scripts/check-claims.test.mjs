// Regression test for check-claims.mjs — run with:  node --test website/scripts/check-claims.test.mjs
// (or the whole suite:  node --test 'website/scripts/**/*.test.mjs').
// Dependency-free (Node built-in test runner); no package.json / framework needed, matching
// the rest of the static website tooling (see validate-structured-data.test.mjs).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const guard = join(scriptDir, 'check-claims.mjs');
const websiteDir = join(scriptDir, '..');
const repoRoot = join(websiteDir, '..');

// One swept file per internal-doc root, mirroring INTERNAL_ANCHORS in the guard.
const INTERNAL_ANCHORS = [
  'legal/data-flow-inventory.md',
  'website/legal/SUBPROCESSORS.md',
  'docs/support/CANNED_ANSWERS.md',
  'business/PRODUCT_MAP.md',
  'MONETIZATION_COSTS.md',
  'LEGAL_REVIEW.md',
];

const run = () => spawnSync(process.execPath, [guard], { encoding: 'utf8' });

/** Drop an HTML fragment into website/ (so the guard scans it), run, then always clean up. */
function withPlantedHtml(body, fn) {
  const stray = join(websiteDir, '__claims_guard_test__.html');
  writeFileSync(stray, `<html><head><title>t</title></head><body>${body}</body></html>`);
  try {
    return fn(run());
  } finally {
    rmSync(stray, { force: true });
  }
}

/**
 * Same, for the internal-doc sweep. The reserved `__*_test__` name and the `.md` extension keep
 * the fixture out of every sibling suite's tree (they all sweep `.html`), so a parallel
 * `node --test` run cannot redden on it.
 */
function withPlantedDocIn(relDir, body, fn) {
  const stray = join(repoRoot, relDir, '__claims_guard_test__.md');
  writeFileSync(stray, `# fixture\n\n${body}\n`);
  try {
    return fn(run());
  } finally {
    rmSync(stray, { force: true });
  }
}

const withPlantedDoc = (body, fn) => withPlantedDocIn('website/legal', body, fn);

test('on the current clean tree it exits 0 and confirms the positive anchor', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /anchor: "Built in Germany" found in website\/translations\.js/);
  assert.match(result.stdout, /anchor: website\/legal\/SUBPROCESSORS\.md is in the internal-doc sweep/);
  assert.match(result.stdout, /internal docs/);
  assert.match(result.stdout, /No unbacked marketing claims found/);
});

test('it reaches every internal-doc root, not only legal/ and docs/support/', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  for (const anchor of INTERNAL_ANCHORS) {
    assert.ok(
      result.stdout.includes(`anchor: ${anchor} is in the internal-doc sweep`),
      `${anchor} is not in the sweep:\n${result.stdout}`,
    );
  }
});

test('it does not flag the claims policy itself for quoting the banned phrasings', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.stderr, /CLAIMS_POLICY\.md/);
});

test('it sweeps the internal docs, not only the website', () => {
  const result = run();
  const scanned = /(\d+) of them internal docs/.exec(result.stdout);
  assert.ok(scanned, result.stdout);
  assert.ok(Number(scanned[1]) >= 8, `expected the legal/support docs in the sweep, got ${scanned[1]}`);
});

// Each forbidden pattern, planted as visible copy, must fail with the file + a clear label.
const forbiddenCases = [
  { name: '99% precision claim', body: '<p>Scandora delivers 99% accuracy.</p>', label: /"99%" precision claim/ },
  { name: '100% accuracy claim', body: '<p>100% accurate, always.</p>', label: /100% accuracy\/reliability/ },
  { name: 'inflated N+ count', body: '<p>Trusted by 10,000+ businesses.</p>', label: /inflated "N\+" count/ },
  { name: 'inflated Nk+ count', body: '<p>Join 50k+ users.</p>', label: /inflated "Nk\+" count/ },
  { name: 'guaranteed promise', body: '<p>Results are guaranteed.</p>', label: /"guaranteed" promise/ },
  { name: 'garantiert promise', body: '<p>Ergebnisse sind garantiert.</p>', label: /"garantiert" promise/ },
  { name: 'instant speed claim', body: '<p>Get instant results.</p>', label: /"instant\/instantly" speed claim/ },
  { name: 'sofort speed claim', body: '<p>Sofort einsatzbereit.</p>', label: /"sofort" speed claim/ },
  { name: 'inkl. MwSt claim', body: '<p>Alle Preise inkl. MwSt.</p>', label: /inkl\. MwSt \/ incl\. VAT/ },
  { name: 'incl. VAT claim', body: '<p>All prices incl. VAT.</p>', label: /inkl\. MwSt \/ incl\. VAT/ },
  { name: 'GoBD-certified positive claim', body: '<p>Scandora is GoBD-certified.</p>', label: /GoBD certification\/seal/ },
  { name: 'GoBD-Siegel positive claim', body: '<p>Wir bieten ein GoBD-Siegel an.</p>', label: /GoBD certification\/seal/ },
  {
    name: 'paid-tier gate on the AI search index',
    body: '<p>An optional, opt-in AI document search feature (Pro and above) stores derived text only.</p>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'German paid-tier gate on the AI search index',
    body: '<p>Eine optionale KI-Dokumentensuche (ab Pro) speichert nur abgeleiteten Text.</p>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'paid-tier gate written after the feature',
    body: '<p>The opt-in search index requires Pro.</p>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'paid-tier gate hidden in a JSON-LD featureList',
    body: '<script type="application/ld+json">{"@type":"SoftwareApplication","featureList":["AI document chat with cited answers (Pro and above)"]}</script>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'Pro+ shorthand tier gate on the index',
    body: '<p>The AI document chat is a Pro+ feature.</p>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'Pro / Business tier gate on the index',
    body: '<p>Managed AI and the document chat are a Pro / Business feature.</p>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'Pro & Business tier gate on the index',
    body: '<p>The opt-in search index ships on Pro &amp; Business plans.</p>',
    label: /restricted to a paid tier/,
  },
  {
    name: 'bare "paid" qualifier on the index',
    body: '<p>Only the paid server features (managed AI, the document index, and RAG chat) sit behind a plan.</p>',
    label: /called a paid feature/,
  },
  {
    name: 'bare "kostenpflichtig" qualifier on the index',
    body: '<p>Nur die kostenpflichtigen Server-Funktionen (Managed AI, der Dokumenten-Index) sind an einen Tarif gebunden.</p>',
    label: /called a paid feature/,
  },
  {
    name: 'plan-list label gating the document search on Pro',
    body: '<p>- Pro: managed AI credits, cloud document search and chat, network scanner (eSCL).</p>',
    label: /listed as a paid plan's feature/,
  },
  {
    name: 'German plan-list label gating the document search on Pro',
    body: '<p>- Pro: verwaltete KI-Credits, Cloud-Dokumentsuche und -Chat, Netzwerkscanner (eSCL).</p>',
    label: /listed as a paid plan's feature/,
  },
  {
    name: 'free plan sold as device-only AI',
    body: '<p>- Free: device-only AI with your own keys, sync to your own Trello.</p>',
    label: /device-only\/own-key-only/,
  },
  {
    name: 'German free plan sold as device-local AI',
    body: '<p>- Free: gerätelokale KI mit eigenen Schlüsseln, Sync in Ihr eigenes Trello.</p>',
    label: /device-only\/own-key-only/,
  },
  {
    name: 'free tier told to run all AI on the device',
    body: '<p>On the free tier (BYOM) all AI runs on your device with your own key.</p>',
    label: /device-only\/own-key-only/,
  },
  {
    name: 'Frankfurt named as the search index location',
    body: '<p>An optional EU-resident search index (Frankfurt) stores derived text only.</p>',
    label: /placed in Frankfurt/,
  },
  {
    name: 'German Frankfurt index location',
    body: '<p>Ein in der EU (Frankfurt) gehosteter Suchindex speichert nur abgeleiteten Text.</p>',
    label: /placed in Frankfurt/,
  },
];

for (const { name, body, label } of forbiddenCases) {
  test(`it fails when a ${name} is planted in the website`, () => {
    withPlantedHtml(body, (result) => {
      assert.equal(result.status, 1, `expected non-zero exit for planted ${name}`);
      assert.match(result.stderr, /__claims_guard_test__\.html/);
      assert.match(result.stderr, label);
    });
  });
}

// The acceptance-criteria example: a reviewer plants "99% accuracy" in a real scanned page.
test('it names the offending file and phrase for a planted 99% accuracy string', () => {
  withPlantedHtml('<p>Now with 99% accuracy on every document.</p>', (result) => {
    assert.equal(result.status, 1);
    assert.match(result.stderr, /matched "99%"/);
  });
});

// Sanctioned copy must NOT be flagged (no false positives).
const allowedCases = [
  { name: 'negated GoBD certification disclaimer', body: '<p>Scandora ist nicht GoBD-zertifiziert.</p>' },
  { name: 'kein GoBD-Siegel disclaimer', body: '<p>Scandora führt kein GoBD-Siegel — ein solches gibt es nicht.</p>' },
  { name: 'FAQ-form GoBD disclaimer', body: '<p>Gibt es eine GoBD-Zertifizierung für Scandora? Nein.</p>' },
  { name: 'paid tier named for a genuinely paid feature', body: '<p>Pro and above add priority email support.</p>' },
  { name: 'German paid tier named for a credit allowance', body: '<p>Ab Pro erhalten Sie eine größere Credit-Menge.</p>' },
  {
    name: 'search index and a paid tier in separate sentences',
    body: '<p>Smart Search covers every document you scan. Pro and above add priority email support.</p>',
  },
  { name: 'search index described without any tier wording', body: '<p>The opt-in AI document search index stores derived text only.</p>' },
  {
    name: 'a paid plan named in the sentence after the index',
    body: '<p>The opt-in EU server document index is on every plan. A paid plan buys a larger credit allowance.</p>',
  },
  {
    name: 'Frankfurt named for managed generation in its own sentence',
    body:
      '<p>The search index is EU-resident in Falkenstein, Germany. Managed AI generation runs on ' +
      'Vertex AI europe-west3 (Frankfurt, Germany).</p>',
  },
  {
    name: 'plan-list label naming only what the paid plan really adds',
    body: '<p>- Pro: 1,000 AI credits a month, network scanner (eSCL), multiple profiles.</p>',
  },
  {
    name: 'free plan listing the document chat it grants',
    body: '<p>- Free: 10 AI credits a month shared across extraction, indexing and AI document chat.</p>',
  },
  {
    name: 'BYOM described as device-only without naming the free plan',
    body: '<p>With your own key the AI runs on your device and never touches our servers.</p>',
  },
];

for (const { name, body } of allowedCases) {
  test(`it allows the sanctioned "${name}"`, () => {
    withPlantedHtml(body, (result) => {
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /No unbacked marketing claims found/);
    });
  });
}

// The internal docs (legal/, website/legal/, docs/support/) carry the same two AI-index facts,
// so a claim fixed on the site cannot be left standing in a register or a canned answer.
const internalForbiddenCases = [
  {
    name: 'paid-tier gate on the AI search index',
    body: '- **The optional AI document search index** (Pro and above, opt-in) stores only derived text.',
    label: /restricted to a paid tier/,
  },
  {
    name: 'Pro+ shorthand tier gate',
    body: '| **Ask your documents (AI document chat)** | answer with source | ✅ (Pro+) |',
    label: /restricted to a paid tier/,
  },
  {
    name: 'Pro / Business tier gate',
    body: '- **Pro / Business (managed AI):** the document chat answers with sources.',
    label: /restricted to a paid tier/,
  },
  {
    name: 'bare "paid" qualifier on the index',
    body: 'Only the paid server features (managed AI, the document index, and RAG chat) sit behind a plan.',
    label: /called a paid feature/,
  },
  {
    name: 'Frankfurt named as the index location',
    body: 'The opt-in search index (Frankfurt) stores derived text only.',
    label: /placed in Frankfurt/,
  },
  {
    name: 'plan-list label gating the document search',
    body: '- **Pro:** managed AI credits, cloud document search and chat, eSCL, multiple profiles.',
    label: /listed as a paid plan's feature/,
  },
  {
    name: 'free plan sold as device-only AI',
    body: '- **Free:** device-only AI with your own keys, sync to your own Trello and Drive.',
    label: /device-only\/own-key-only/,
  },
];

for (const { name, body, label } of internalForbiddenCases) {
  test(`it fails when a ${name} is planted in an internal doc`, () => {
    withPlantedDoc(body, (result) => {
      assert.equal(result.status, 1, `expected non-zero exit for planted ${name}`);
      assert.match(result.stderr, /legal\/__claims_guard_test__\.md/);
      assert.match(result.stderr, label);
    });
  });
}

// The widened roots are only guarded if the rules actually run there, not merely if the files
// are counted — and the policy-doc carve-out must not spill over to its neighbours in docs/.
for (const relDir of ['business', 'docs', 'docs/support']) {
  test(`it fails when a paid-tier gate is planted in ${relDir}/`, () => {
    withPlantedDocIn(relDir, '- The AI document search index is Pro / Business only.', (result) => {
      assert.equal(result.status, 1, `expected non-zero exit for a gate planted in ${relDir}/`);
      assert.match(result.stderr, new RegExp(`${relDir}/__claims_guard_test__\\.md`));
      assert.match(result.stderr, /restricted to a paid tier/);
    });
  });
}

// The hype bans stay scoped to marketing copy: legal/ holds claim-review docs that quote the
// banned phrases in order to forbid them, and those must not fail the guard.
const internalAllowedCases = [
  {
    name: 'hype phrases quoted by a claims-review doc',
    body: 'Never write "99% accuracy", "guaranteed" or "instant" results — see docs/CLAIMS_POLICY.md.',
  },
  {
    name: 'Frankfurt named for the Vertex AI region, not the index',
    body: 'Index storage on Hetzner (Falkenstein); AI generation on Vertex AI `europe-west3` (Frankfurt, Germany).',
  },
  {
    name: 'a tier named for a genuinely paid feature',
    body: 'Pro and above add priority email support. The opt-in AI document search index is on every plan.',
  },
];

for (const { name, body } of internalAllowedCases) {
  test(`it allows the sanctioned "${name}" in an internal doc`, () => {
    withPlantedDoc(body, (result) => {
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /No unbacked marketing claims found/);
    });
  });
}
