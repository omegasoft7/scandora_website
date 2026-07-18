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

test('on the current clean tree it exits 0 and confirms the positive anchor', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /anchor: "Built in Germany" found in website\/translations\.js/);
  assert.match(result.stdout, /No unbacked marketing claims found/);
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
  { name: 'on-device instant search attribute', body: '<p>Find your scans instantly with on-device full-text search.</p>' },
];

for (const { name, body } of allowedCases) {
  test(`it allows the sanctioned "${name}"`, () => {
    withPlantedHtml(body, (result) => {
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /No unbacked marketing claims found/);
    });
  });
}
