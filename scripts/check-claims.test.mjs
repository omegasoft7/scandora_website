// Regression test for check-claims.mjs — run with:  node --test website/scripts/check-claims.test.mjs
// (or the whole suite:  node --test 'website/scripts/**/*.test.mjs').
// Dependency-free (Node built-in test runner); no package.json / framework needed, matching
// the rest of the static website tooling (see validate-structured-data.test.mjs).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const guard = join(scriptDir, 'check-claims.mjs');
const websiteDir = join(scriptDir, '..');
const repoRoot = join(websiteDir, '..');

// One swept file per internal-doc root, mirroring INTERNAL_ANCHORS in the guard.
const INTERNAL_ANCHORS = ['docs/BYOM_VS_MANAGED_MODEL.md', 'MONETIZATION_COSTS.md'];

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

const withPlantedDoc = (body, fn) => withPlantedDocIn('docs', body, fn);

/**
 * Same, for the store-slide sweep. `tools/store-assets` loads `config/slides.json` by name, so
 * the reserved fixture name stays out of that package's own runner too.
 */
function withPlantedSlideConfig(value, fn) {
  const stray = join(repoRoot, 'tools/store-assets/config', '__claims_guard_test__.json');
  writeFileSync(stray, JSON.stringify(value, null, 2));
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
  assert.match(result.stdout, /anchor: docs\/BYOM_VS_MANAGED_MODEL\.md is in the internal-doc sweep/);
  assert.match(result.stdout, /internal docs/);
  assert.match(result.stdout, /No unbacked marketing claims found/);
});

test('it reaches every internal-doc root, the root-level file included', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  for (const anchor of INTERNAL_ANCHORS) {
    assert.ok(
      result.stdout.includes(`anchor: ${anchor} is in the internal-doc sweep`),
      `${anchor} is not in the sweep:\n${result.stdout}`,
    );
  }
});

// The anchors are the guard's own tripwire: a dropped root or renamed doc must fail loudly
// instead of passing quietly on a smaller tree. Proven on a copy whose anchor list names a
// file that is not there, so the real guard's list stays untouched.
test('it fails loudly when an internal-doc anchor is not scanned', () => {
  const source = readFileSync(guard, 'utf8');
  const marker = 'const INTERNAL_ANCHORS = [';
  assert.equal(source.split(marker).length - 1, 1, 'anchor list not found in the guard source');
  const probe = join(scriptDir, '__claims_guard_anchor_probe__.mjs');
  writeFileSync(probe, source.replace(marker, `${marker}'docs/__no_such_anchor__.md', `));
  try {
    const result = spawnSync(process.execPath, [probe], { encoding: 'utf8' });
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /anchor check failed: docs\/__no_such_anchor__\.md not scanned/);
  } finally {
    rmSync(probe, { force: true });
  }
});

test('it sweeps the internal docs, not only the website', () => {
  const result = run();
  const scanned = /(\d+) of them internal docs/.exec(result.stdout);
  assert.ok(scanned, result.stdout);
  assert.ok(Number(scanned[1]) >= 8, `expected the docs/ tree in the sweep, got ${scanned[1]}`);
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
  {
    name: 'bring-your-own-AI offered as a plan bullet',
    body: '<p>- Bring your own AI: connect your own Google Gemini key, or use managed AI credits.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German bring-your-own-AI plan bullet',
    body: '<p>- Eigene KI nutzen: Verbinden Sie Ihren eigenen Google-Gemini-Schlüssel.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'model provider presented as the user’s choice',
    body: '<p>Your scans go only to the cloud services and AI provider you choose.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German model provider presented as the user’s own',
    body: '<p>Mit eigenem Schlüssel gehen Anfragen direkt an Ihren KI-Anbieter.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'shipped English data-handling sentence whose own trailing "not" used to disarm the rule',
    body:
      '<p>Data handling: your documents are processed for extraction using the AI provider you choose. ' +
      'With bring-your-own-key, requests go directly to your provider and are not stored on our servers.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'shipped German data-handling sentence whose own trailing "nicht" used to disarm the rule',
    body:
      '<p>Datenverarbeitung: Mit eigenem Schlüssel gehen Anfragen direkt an Ihren KI-Anbieter und werden ' +
      'nicht auf unseren Servern gespeichert.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'model provider named before the choosing clause',
    body: '<p>Your scans go only to the AI provider and cloud services you choose.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'model provider written as the user’s chosen one',
    body: '<p>You only need a connection when your chosen AI provider processes a scan.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German model provider written as the one you selected',
    body: '<p>Ihre Scans gehen nur an den von Ihnen gewählten KI-Anbieter und Ihre Cloud-Dienste.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German model provider written with a bare possessive',
    body: '<p>Eine Verbindung brauchen Sie nur, wenn Ihr gewählter KI-Anbieter einen Scan verarbeitet.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'the AI presented as the user’s own in the how-it-works line',
    body: '<p>Scan it, let your AI understand it, send it into your own tools.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German AI presented as the user’s own in the how-it-works line',
    body: '<p>Scannen, von Ihrer KI verstehen lassen, in Ihre eigenen Tools senden.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'bare possessive in the how-it-works step heading',
    body: '<h3>Your AI Understands It</h3>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German bare possessive in the how-it-works step heading',
    body: '<h3>Ihre KI versteht es</h3>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'bare possessive in a blog step lead-in',
    body: '<li><strong>Your AI reads it.</strong> Scandora recognises the booking date.</li>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German bare possessive in a blog step lead-in',
    body: '<li><strong>Ihre KI liest den Beleg.</strong> Scandora erkennt das Belegdatum.</li>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'bare possessive as a relative clause about the scanner output',
    body: '<p>Scandora turns them into one document your AI can read.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German bare possessive as a relative clause about the scanner output',
    body: '<p>Scandora macht daraus ein Dokument, das Ihre KI lesen kann.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'bare possessive as an imperative next step',
    body: '<p>Process it just like a phone scan — have your AI read it and export it to Trello.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German bare possessive in the dative after a preposition',
    body: '<p>Das Dokument können Sie von Ihrer KI auslesen lassen.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'bring-your-own-key question hidden in a JSON-LD FAQ block',
    body:
      '<script type="application/ld+json">{"@type":"FAQPage","mainEntity":[{"@type":"Question",' +
      '"name":"Can I bring my own AI key?"}]}</script>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'withdrawn add-on still kept for holders who already connected a key',
    body:
      '<p>Scandora has a <em>Bring your own AI</em> add-on, which it does not currently offer for ' +
      'purchase: it stays usable only for customers who already connected their own key.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'German withdrawn add-on still kept for existing key holders',
    body:
      '<p>Scandora verfügt über das Add-on <em>Eigener KI-Schlüssel</em>, das es derzeit nicht zum ' +
      'Erwerb anbietet: Es bleibt nur für Kunden nutzbar, die ihren eigenen Schlüssel bereits ' +
      'verbunden haben.</p>',
    label: /bring-your-own-AI offered as a user choice/,
  },
  {
    name: 'paid plan advertised as adding DATEV, lexoffice and sevDesk export',
    body:
      '<p>Business / DATEV (€24.99/month) adds DATEV, lexoffice and sevDesk export ' +
      'designed for GoBD &amp; DSGVO record-keeping.</p>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'German paid plan advertised as adding the same three exports',
    body:
      '<p>Business / DATEV (24,99 €/Monat) ergänzt DATEV-, lexoffice- und sevDesk-Export ' +
      'für die GoBD- &amp; DSGVO-Aufbewahrung.</p>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'FAQ answering "Yes" to the DATEV export question',
    body:
      '<p>Yes. On the Business / DATEV plan you can export your scanned receipts in DATEV format ' +
      '(an EXTF posting batch), plus lexoffice and sevDesk voucher export.</p>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'German FAQ whose "Ja." is a sentence of its own',
    body:
      '<p>Ja. Im Tarif Business / DATEV exportieren Sie Ihre gescannten Belege im DATEV-Format ' +
      '(EXTF-Buchungsstapel), dazu lexoffice- und sevDesk-Belegexport.</p>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'pricing-card bullet that names the export with no availability word at all',
    body:
      '<h3>Business / DATEV</h3><div>€24.99/month</div><ul>' +
      '<li>5,000 AI credits/month</li><li>DATEV export for your tax advisor</li>' +
      '<li>lexoffice &amp; sevDesk voucher export</li></ul>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'German pricing-card bullet whose thousands separator breaks the sentence window',
    body:
      '<h3>Business / DATEV</h3><div>24,99 €/Monat</div><ul>' +
      '<li>5.000 KI-Credits/Monat</li><li>DATEV-Export für Ihren Steuerberater</li></ul>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'machine-readable Offer for the paid plan',
    body:
      '<script type="application/ld+json">{"@type":"Offer","name":"Business / DATEV Plan",' +
      '"description":"DATEV, lexoffice & sevDesk export, designed for GoBD & DSGVO record-keeping."}</script>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'comparison-table cell answering "Yes" for DATEV export',
    body: '<table><tr><td>DATEV export</td><td>Yes</td><td>No</td></tr></table>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'GoBD layer with Verfahrensdokumentation listed as included',
    body: '<p>- Business / DATEV plan: the GoBD layer with Verfahrensdokumentation is included.</p>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'German "gehören zum Tarif" phrasing that names no availability word',
    body:
      '<p>Ein DATEV-Format-Export sowie ein lexoffice- und sevDesk-Belegexport ' +
      'gehören zum Tarif Business / DATEV.</p>',
    label: /DATEV \/ lexoffice \/ sevDesk export or the GoBD layer sold as available/,
  },
  {
    name: 'store-listing plan bullet promising team seats',
    body: '<p>- Business / DATEV: team seats and a data processing agreement.</p>',
    label: /team seats offered/,
  },
  {
    name: 'German store-listing plan bullet promising Team-Sitze',
    body: '<p>- Business / DATEV: Team-Sitze und ein Auftragsverarbeitungsvertrag.</p>',
    label: /team seats offered/,
  },
  {
    name: 'singular team seat written without the hyphen',
    body: '<p>Add a second team seat whenever your business grows.</p>',
    label: /team seats offered/,
  },
  {
    name: 'seats offered without the word "team" in front',
    body: '<p>The plan includes seats for your team.</p>',
    label: /team seats offered/,
  },
  {
    name: 'German Team-Plätze phrasing of the same offer',
    body: '<p>Der Tarif bringt zusätzliche Team-Plätze für Ihr Büro.</p>',
    label: /team seats offered/,
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
    name: 'device-only AI described without naming the free plan',
    body: '<p>In offline mode the AI runs on your device and never touches our servers.</p>',
  },
  {
    name: 'shipped disclaimer that there is no bring-your-own-key mode',
    body: '<p>There is no bring-your-own-key mode, so there is no API key to obtain or enter.</p>',
  },
  {
    name: 'English contraction denying the bring-your-own-key mode',
    body: '<p>With managed AI you don’t bring your own key.</p>',
  },
  {
    name: 'German disclaimer that no key of your own is needed',
    body: '<p>Die Extraktion läuft über die verwaltete KI — kein eigener Schlüssel nötig.</p>',
  },
  {
    name: 'Scandora’s own AI gateway, which is not a key the user brings',
    body: '<p>Scandoras eigenes KI-Gateway leitet die Anfrage an Google Gemini weiter.</p>',
  },
  {
    name: 'integration key the user really does supply',
    body: '<p>Hinterlegen Sie Ihren lexoffice-API-Schlüssel in den Integrationen.</p>',
  },
  {
    name: 'shipped terms clause denying the bring-your-own-API-key option',
    body: '<p>A bring-your-own-API-key option is not part of this version.</p>',
  },
  {
    name: 'shipped German terms clause denying the Mitbring-Funktion',
    body: '<p>Eine Mitbring-Funktion für eigene API-Schlüssel ist nicht Bestandteil dieser Version.</p>',
  },
  {
    name: 'FAQ question asking for the mode, answered by the disclaimer below it',
    body: '<h3>Do I need my own API key to use the AI?</h3><p>No. Scandora runs on managed AI.</p>',
  },
  {
    name: 'German FAQ question asking for the mode, answered by the disclaimer below it',
    body: '<h3>Brauche ich einen eigenen API-Schlüssel für die KI?</h3><p>Nein.</p>',
  },
  {
    name: 'German disclaimer that no own-key mode exists',
    body: '<p>Einen Modus für eigene Schlüssel gibt es nicht.</p>',
  },
  {
    name: 'Scandora’s own AI models, which are not a model the user brings',
    body: '<p>Wir verwenden Ihre Dokumente nicht, um eigene KI-Modelle zu trainieren.</p>',
  },
  {
    name: 'credit allowance that really does belong to the user',
    body: '<p>Your AI credits cover document extraction and the opt-in AI document search.</p>',
  },
  {
    name: 'German credit allowance that really does belong to the user',
    body: '<p>Ihre KI-Credits decken die Dokumentextraktion sowie die optionale KI-Dokumentensuche.</p>',
  },
  {
    name: 'shipped store bullet naming the monthly allowance',
    body: '<p>- Managed AI included: your monthly AI credits cover document extraction.</p>',
  },
  {
    name: 'shipped store line marking the three exports coming soon',
    body:
      '<p>- DATEV, lexoffice and sevDesk export for your bookkeeping and your Steuerberater: ' +
      'coming soon, not available in this version yet.</p>',
  },
  {
    name: 'shipped German store line marking the three exports coming soon',
    body:
      '<p>- Export nach DATEV, lexoffice und sevDesk, für Ihre Buchhaltung und Ihren Steuerberater: ' +
      'kommt in Kürze, in dieser Version noch nicht verfügbar.</p>',
  },
  {
    name: 'pricing-card bullets that carry the coming-soon marker',
    body:
      '<h3>Business / DATEV</h3><div>€24.99/month</div><ul>' +
      '<li>DATEV export for your tax advisor (coming soon)</li>' +
      '<li>lexoffice &amp; sevDesk voucher export (coming soon)</li></ul>',
  },
  {
    name: 'German pricing-card bullets that carry the demnächst marker',
    body:
      '<h3>Business / DATEV</h3><div>24,99 €/Monat</div><ul>' +
      '<li>DATEV-Export für Ihren Steuerberater (demnächst)</li>' +
      '<li>lexoffice- &amp; sevDesk-Belegexport (demnächst)</li></ul>',
  },
  {
    name: 'shipped FAQ answer that leads with the coming-soon status',
    body:
      '<p>Coming soon. DATEV export (an EXTF posting batch together with the document images) and the ' +
      'lexoffice and sevDesk voucher export are being prepared for the Business / DATEV plan and are ' +
      'not available in this version yet.</p>',
  },
  {
    name: 'help-page step that only describes what the screen does',
    body: "<p>Open the DATEV export from the profile's export options and pick a date range.</p>",
  },
  {
    name: 'GoBD record-keeping the capture really is designed for',
    body: '<h3>Business / DATEV</h3><ul><li>Designed for GoBD &amp; DSGVO record-keeping</li></ul>',
  },
  {
    name: 'lexoffice named as a recipient in the processing table',
    body: '<p>lexoffice (Lexware / Haufe Group) — export to your own lexoffice account (user-authorized).</p>',
  },
  {
    name: 'shipped Business / DATEV bullet that offers the DPA and no seats',
    body: '<p>- Business / DATEV: a data processing agreement for your business.</p>',
  },
  {
    name: 'single-seat wording that promises no second seat',
    body: '<p>Every plan is a single-user plan.</p>',
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

// The internal docs under docs/ carry the same two AI-index facts, so a claim fixed on the
// site cannot be left standing in a plan table or a runbook.
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
      assert.match(result.stderr, /docs\/__claims_guard_test__\.md/);
      assert.match(result.stderr, label);
    });
  });
}

// The swept root is only guarded if the rules actually run there, not merely if the files are
// counted — subdirectories of docs/ included.
for (const relDir of ['docs', 'docs/ops', 'docs/deployment']) {
  test(`it fails when a paid-tier gate is planted in ${relDir}/`, () => {
    withPlantedDocIn(relDir, '- The AI document search index is Pro / Business only.', (result) => {
      assert.equal(result.status, 1, `expected non-zero exit for a gate planted in ${relDir}/`);
      assert.match(result.stderr, new RegExp(`${relDir}/__claims_guard_test__\\.md`));
      assert.match(result.stderr, /restricted to a paid tier/);
    });
  });
}

// The hype bans stay scoped to marketing copy: a doc that quotes the banned phrases in order
// to forbid them must not fail the guard.
const internalAllowedCases = [
  {
    name: 'hype phrases quoted by a claims-review doc',
    body: 'Never write "99% accuracy", "guaranteed" or "instant" results — see CONTRIBUTING.md.',
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

// The store screenshots carry headlines the listing text never repeats, so the same bans apply
// to the slide config they are rendered from.
test('when a store slide headline carries a banned claim it should fail with the config path', () => {
  const slide = { slides: [{ headline: { 'en-US': 'Find anything, instantly', 'de-DE': 'Alles sofort finden' } }] };
  withPlantedSlideConfig(slide, (result) => {
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /tools\/store-assets\/config\/__claims_guard_test__\.json/);
    assert.match(result.stderr, /"instant\/instantly" speed claim/);
    assert.match(result.stderr, /"sofort" speed claim/);
  });
});

// Only the string values are copy. Keys name the layout, numbers are canvas geometry, and two
// sibling strings are two separate lines on the slide — never one sentence.
test('when a store slide config holds structure, not copy, it should scan the string values only', () => {
  const slide = {
    guaranteed: { instantly: [1080, 1920] },
    slides: [{ chips: { 'en-US': ['Pro and above', 'AI document chat'] } }],
  };
  withPlantedSlideConfig(slide, (result) => {
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /No unbacked marketing claims found/);
  });
});

// applyPageMeta() in translations.js overwrites <title>, meta[name=description],
// og:description and twitter:description on every page load, so the static tag and its
// pageMeta twin are two copies of one claim. Neither claim rule above sees a meta attribute
// (the visible-text pass strips tags) or a pageMeta sentence (no availability word, no plan
// name), which is why an unmarked twin can hide behind a green matrix.

/** Drop a page with a chosen <head> into website/, so the guard resolves its canonical route. */
function withPlantedPage(head, fn) {
  const stray = join(websiteDir, '__claims_guard_page_test__.html');
  writeFileSync(stray, `<!DOCTYPE html><html lang="en"><head>${head}</head><body></body></html>`);
  try {
    return fn(run());
  } finally {
    rmSync(stray, { force: true });
  }
}

/** Run a guard copy whose pageMeta table is read from `body` instead of translations.js. */
function withPatchedPageMetaSource(body, fn) {
  const source = readFileSync(guard, 'utf8');
  const marker = "const PAGE_META_SOURCE = join(websiteDir, 'translations.js');";
  assert.equal(source.split(marker).length - 1, 1, 'pageMeta source not found in the guard source');
  const fixture = join(scriptDir, '__claims_guard_pagemeta_fixture__.js');
  const probe = join(scriptDir, '__claims_guard_pagemeta_probe__.mjs');
  writeFileSync(fixture, body);
  writeFileSync(probe, source.replace(marker, `const PAGE_META_SOURCE = ${JSON.stringify(fixture)};`));
  try {
    return fn(spawnSync(process.execPath, [probe], { encoding: 'utf8' }));
  } finally {
    rmSync(probe, { force: true });
    rmSync(fixture, { force: true });
  }
}

const CANONICAL = '<link rel="canonical" href="https://scandora.eu/help/datev-export">';

test('when a static meta description sells a gated feature it should fail on the pageMeta parity rule', () => {
  const head = `${CANONICAL}<title>t</title><meta name="description" content="Create a DATEV EXTF export your tax advisor can import: pick a profile and a date range.">`;
  withPlantedPage(head, (result) => {
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /__claims_guard_page_test__\.html/);
    assert.match(result.stderr, /static meta\[name="description"\] for \/help\/datev-export sells a gated feature/);
    assert.match(result.stderr, /same coming-soon status/);
  });
});

test('when a static og:description sells a gated feature it should fail on the pageMeta parity rule', () => {
  const head = `${CANONICAL}<title>t</title><meta property="og:description" content="Send scanned vouchers straight into lexoffice and sevDesk.">`;
  withPlantedPage(head, (result) => {
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /static meta\[property="og:description"\] for \/help\/datev-export sells a gated feature/);
  });
});

test('when a static head marks the gated feature it should pass the pageMeta parity rule', () => {
  const head =
    `${CANONICAL}<title>DATEV-Export (EXTF) — in Vorbereitung | Scandora Hilfe</title>` +
    '<meta name="description" content="The DATEV EXTF export your tax advisor can import is coming soon: pick a profile and a date range.">';
  withPlantedPage(head, (result) => {
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /pageMeta ↔ static head: \d+ route\(s\)/);
    assert.match(result.stdout, /No unbacked marketing claims found/);
  });
});

// The other half of the pin: the table itself. Proven on a copy that reads a fixture table, so
// the real translations.js stays untouched while a parallel suite runs.
test('when a pageMeta description sells a gated feature it should fail and name the route', () => {
  const table = `const pageMeta = {
    "/help/datev-export": {
        "en": {
            "title": "DATEV export (EXTF) | Scandora Help",
            "description": "Create a DATEV EXTF export your tax advisor can import: pick a profile and a date range."
        },
        "de": {
            "title": "DATEV-Export (EXTF) — in Vorbereitung | Scandora Hilfe",
            "description": "DATEV-EXTF-Export für Ihren Steuerberater (in Vorbereitung): Profil und Zeitraum wählen."
        }
    }
};
`;
  withPatchedPageMetaSource(table, (result) => {
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /pageMeta en\.title for \/help\/datev-export sells a gated feature as shipped/);
    assert.match(result.stderr, /pageMeta en\.description for \/help\/datev-export sells a gated feature as shipped/);
    assert.match(result.stderr, /applyPageMeta\(\) writes it over the marked static head tag/);
    assert.doesNotMatch(result.stderr, /pageMeta de\./);
  });
});

test('when a pageMeta entry marks the gated feature in both languages it should pass', () => {
  const table = `const pageMeta = {
    "/help/datev-export": {
        "en": {
            "title": "DATEV export (EXTF) — coming soon | Scandora Help",
            "description": "The DATEV EXTF export your tax advisor can import is coming soon: pick a profile and a date range."
        },
        "de": {
            "title": "DATEV-Export (EXTF) — in Vorbereitung | Scandora Hilfe",
            "description": "DATEV-EXTF-Export für Ihren Steuerberater (in Vorbereitung): Profil und Zeitraum wählen."
        }
    }
};
`;
  withPatchedPageMetaSource(table, (result) => {
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /pageMeta ↔ static head: 1 route\(s\)/);
  });
});

// The check's own tripwire: a renamed or reshaped table must fail loudly, not leave the head
// copy unchecked while the rest of the guard reports success.
test('when the pageMeta table cannot be parsed it should fail loudly instead of skipping', () => {
  withPatchedPageMetaSource('const somethingElse = {};\n', (result) => {
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /pageMeta check failed: no parseable/);
    assert.match(result.stderr, /went unchecked/);
  });
});

test('when no page matches a pageMeta route it should fail loudly instead of skipping', () => {
  withPatchedPageMetaSource('const pageMeta = {\n    "/no-such-route": { "en": {}, "de": {} }\n};\n', (result) => {
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, /pageMeta check failed: none of the \d+ page\(s\) matched a pageMeta route/);
  });
});
