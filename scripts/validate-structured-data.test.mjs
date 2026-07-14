// Regression test for validate-structured-data.mjs — run with:  node --test website/scripts/
// Dependency-free (Node built-in test runner); no package.json / framework needed, matching
// the rest of the static website tooling.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const validator = join(scriptDir, 'validate-structured-data.mjs');
const websiteDir = join(scriptDir, '..');

const run = () => spawnSync(process.execPath, [validator], { encoding: 'utf8' });

test('when all JSON-LD pages are registered it should exit 0 and cover every live page', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  // The 9 currently-live JSON-LD pages plus the drift-guard summary must all report clean.
  assert.match(result.stdout, /drift guard: \d+ JSON-LD page\(s\) on disk, 0 unregistered/);
  assert.match(result.stdout, /All structured data is valid/);
});

test('when a page carries JSON-LD but is not registered it should fail loudly', () => {
  const stray = join(websiteDir, '__drift_guard_test__.html');
  writeFileSync(
    stray,
    '<html><head><script type="application/ld+json">' +
      '{"@context":"https://schema.org","@type":"WebPage","name":"stray"}' +
      '</script></head><body></body></html>',
  );
  try {
    const result = run();
    assert.equal(result.status, 1);
    assert.match(result.stdout, /1 unregistered/);
    assert.match(result.stderr, /__drift_guard_test__\.html: carries a JSON-LD block but is not in the PAGES list/);
  } finally {
    rmSync(stray, { force: true });
  }
});
