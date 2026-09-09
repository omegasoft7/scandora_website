// Regression test for the AGB / Terms page — run with:  node --test website/scripts/legal-terms.test.mjs
// Dependency-free (Node built-in test runner); no package.json / framework needed, matching
// the rest of the static website tooling. Guards the statements that carry a legal duty: what
// Scandora stores server-side, the § 356 (4) vs § 356 (5) BGB early-expiry tracks, who sells
// the subscription and who may receive a withdrawal, and the Art. 14 / Art. 16 DSA
// enforcement, redress and reporting routes — each in both language blocks.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const terms = readFileSync(join(websiteDir, 'terms.html'), 'utf8');

/** The one <article> that carries a language's contract text. */
function languageBlock(lang) {
  const start = terms.indexOf(`<article class="legal-content" data-lang="${lang}"`);
  assert.notEqual(start, -1, `terms.html has no "${lang}" article`);
  const end = terms.indexOf('</article>', start);
  assert.notEqual(end, -1, `the "${lang}" article is never closed`);
  return terms.slice(start, end);
}

const blocks = { de: languageBlock('de'), en: languageBlock('en') };

function assertBothLanguages(needles, message) {
  for (const [lang, needle] of Object.entries(needles)) {
    assert.ok(blocks[lang].includes(needle), `${message} — missing in ${lang.toUpperCase()}: ${needle}`);
  }
}

test('when a one-off supply of digital content expires the withdrawal right the terms should require the durable-medium confirmation too', () => {
  assertBothLanguages(
    {
      de: 'eine Bestätigung des Vertrags auf einem dauerhaften Datenträger zur Verfügung gestellt haben',
      en: 'we have provided you with a confirmation of the contract on a durable medium',
    },
    '§ 356 (5) no. 3 BGB condition is not stated',
  );
  assertBothLanguages(
    { de: '§ 356 Abs. 5, § 312f Abs. 2 und 3 BGB', en: '§ 356 (5), § 312f (2) and (3) BGB' },
    'the § 312f (2) deadline for the confirmation is not cited alongside § 312f (3)',
  );
});

test('when a subscription is a digital service the terms should not claim the withdrawal right expires when performance begins', () => {
  assertBothLanguages(
    { de: '§ 356 Abs. 4 BGB', en: '§ 356 (4) BGB' },
    'the subscription track does not cite § 356 (4) BGB',
  );
  assertBothLanguages(
    {
      de: 'Ihr Widerrufsrecht bleibt deshalb während der 14-tägigen Frist bestehen',
      en: 'Your right of withdrawal therefore remains throughout the 14-day period',
    },
    'the terms do not keep the full 14 days for a running subscription',
  );
});

test('when the shipped purchase flow collects the consent the terms should not claim it is never collected', () => {
  for (const stale of [
    'Solange wir diese ausdrückliche Zustimmung und Bestätigung nicht im Bestellvorgang einholen',
    'Until we obtain this express consent and acknowledgment during the order process',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html still carries the stale withdrawal caveat: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'Vor jedem kostenpflichtigen Kauf zeigt Ihnen die App die Erklärung',
      en: 'Before every paid purchase the app shows you the declaration',
    },
    'the terms do not say the consent is taken during the purchase',
  );
});

test('when a confirmation is sent for every contract the terms should promise one for a repeat purchase', () => {
  for (const stale of [
    'Diese Bestätigung versenden wir einmal je Produkt',
    'We send that confirmation once per product',
    'Derzeit erhalten Sie diese Bestätigung nur einmal je Produkt',
    'At present you receive this confirmation only once per product',
    'wenn wir Ihnen keine Bestätigung senden — etwa beim wiederholten Kauf desselben Produkts',
    'if we send you no confirmation — for example when you buy the same product again',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html still carries the once-per-product limit: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'Diese Bestätigung erhalten Sie für jeden Vertrag, den Sie in der App abschließen, also auch dann, wenn '
        + 'Sie dasselbe Produkt später erneut kaufen',
      en: 'You receive that confirmation for every contract you conclude in the app, including when you buy the '
        + 'same product again later',
    },
    'the terms do not promise a confirmation for every contract concluded in the app',
  );
  assertBothLanguages(
    {
      de: 'Verlängert sich Ihr Abonnement automatisch im Store, senden wir keine neue Bestätigung',
      en: 'If your subscription renews automatically in the store we send no new confirmation',
    },
    'the terms do not say a store renewal owes no new confirmation',
  );
});

test('when a contract is concluded in the store the terms should not promise a confirmation the app never sends', () => {
  for (const stale of [
    'Diese Bestätigung erhalten Sie für jeden geschlossenen Vertrag',
    'You receive that confirmation for every contract concluded,',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html promises a confirmation for contracts the code never sees: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'Schließen Sie einen Vertrag ohne Kaufvorgang in der App — etwa durch erneutes Abonnieren unmittelbar im '
        + 'Store oder durch Einlösen eines Angebotscodes im Store —, senden wir keine Bestätigung',
      en: 'If you conclude a contract without a purchase in the app — for example by resubscribing directly in the '
        + 'store or by redeeming a store offer code — we send no confirmation',
    },
    'the terms do not name the store-side conclusion that produces no confirmation',
  );
});

test('when the confirmation email states the price the terms should list it among the contents', () => {
  for (const stale of [
    'dauerhaften Datenträger mit den Bestelldaten',
    'durable medium containing the order details',
    'Den Endpreis nennt diese E-Mail nicht',
    'That email does not state the final price',
    'den im Store gezahlten Preis',
    'the price charged by the store',
    'Der genannte Preis ist der Preis, den der Store Ihnen im Kaufvorgang angezeigt und berechnet hat',
    'The price stated is the one the store showed and charged you during the purchase',
    'den Abrechnungszeitraum, Ihre Erklärung samt Zeitpunkt',
    'the billing period, your declaration with its timestamp',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html misstates what the confirmation email carries: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'Sie enthält die Angaben zum gekauften Produkt, den vom Store angezeigten Preis und bei einem Abonnement '
        + 'den Abrechnungszeitraum, soweit die App uns diese Angaben übermittelt hat, Ihre Erklärung samt '
        + 'Zeitpunkt, die Widerrufsbelehrung und die Anbieterangaben',
      en: 'It contains the details of the purchased product, the price the store showed for that product and, for '
        + 'a subscription, the billing period, insofar as the app has sent us those details, your declaration with '
        + 'its timestamp, the withdrawal instruction and the provider details',
    },
    'the terms do not condition the price and billing period on the app having sent them',
  );
  assertBothLanguages(
    {
      de: 'Der genannte Preis ist der Preis, den der Store im Kaufvorgang für dieses Produkt angezeigt hat',
      en: 'The price stated is the one the store showed for that product during the purchase',
    },
    'the terms do not name the store-shown list price as the one the email states',
  );
  assertBothLanguages(
    {
      de: 'bei einer Testphase, einem Einführungs- oder Aktionsangebot oder einem anteilig verrechneten Wechsel '
        + 'kann der tatsächlich berechnete Betrag abweichen — maßgeblich ist der Kaufbeleg des Stores',
      en: 'with a trial, an introductory or promotional offer, or a prorated plan change the amount actually '
        + "charged can differ — the store's receipt (section 1) governs",
    },
    'the terms do not warn that the charged amount can differ from the price the email states',
  );
});

test('when a paid purchase needs an account the terms should say so and never describe a purchase without one', () => {
  for (const stale of [
    'etwa bei einem Kauf ohne Konto',
    'because you purchased without an account',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html still describes a purchase the app refuses: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'Ein kostenpflichtiger Kauf setzt ein Scandora-Konto voraus; ohne Anmeldung lässt sich in der App kein '
        + 'kostenpflichtiger Vertrag schließen',
      en: 'A paid purchase requires a Scandora account; without signing in, no paid contract can be concluded in '
        + 'the app',
    },
    'the terms do not require an account for a paid purchase',
  );
});

test('when the confirmation can fail to arrive at all the terms should keep the 14 days for any other reason', () => {
  assertBothLanguages(
    {
      de: 'oder wenn Sie aus einem anderen Grund keine Bestätigung von uns erhalten',
      en: 'or if for any other reason no confirmation reaches you',
    },
    'the terms do not keep the full 14 days when no confirmation reaches the buyer for any other reason',
  );
});

test('when the app shows the declaration on every in-app buy the terms should name each case that skips it', () => {
  for (const stale of [
    'erhalten Sie keine weitere Bestätigung und sehen die Erklärung nicht noch einmal',
    'you receive no further confirmation and are not shown the declaration again',
    'nur bei einer automatischen Verlängerung im Store',
    'only for an automatic renewal in the store',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html misstates when the declaration is not shown again: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'Die Erklärung selbst zeigt Ihnen die App bei jedem Kauf erneut an',
      en: 'The app does show you the declaration itself again on every purchase',
    },
    'the terms do not say the declaration is shown again on every in-app purchase',
  );
  assertBothLanguages(
    {
      de: 'nicht erneut angezeigt wird sie bei einer automatischen Verlängerung im Store und bei einem '
        + 'Vertragsschluss ohne Kaufvorgang in der App',
      en: 'it is not shown again for an automatic renewal in the store, nor for a contract concluded without a '
        + 'purchase in the app',
    },
    'the terms do not cover both cases in which the declaration is not shown again',
  );
});

test('when section 5 concedes the charged amount can differ section 4 should not bind the displayed price', () => {
  for (const stale of [
    'Die angezeigten Preise sind die im jeweiligen Store berechneten Endpreise',
    'The prices shown are the final amounts charged by the respective store',
    'maßgeblich ist der im Kaufvorgang angezeigte Preis',
    'the price shown during the purchase is the one that applies',
  ]) {
    assert.ok(!terms.includes(stale), `section 4 still equates the displayed price with the amount charged: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'bei einer Testphase, einem Einführungs- oder Aktionsangebot oder einem anteilig verrechneten Wechsel '
        + 'kann der tatsächlich berechnete Betrag davon abweichen',
      en: 'with a trial, an introductory or promotional offer, or a prorated plan change the amount actually '
        + 'charged can differ from them',
    },
    'section 4 does not admit that the charged amount can differ from the displayed price',
  );
  assertBothLanguages(
    {
      de: 'maßgeblich ist der Betrag, den der Store Ihnen im Kaufvorgang berechnet und im Kaufbeleg ausweist',
      en: 'the amount the store charges you during the purchase and states on your receipt is the one that applies',
    },
    'section 4 does not make the amount on the store receipt the governing figure',
  );
});

test('when the buyer requests performance during the withdrawal period the terms should state the Wertersatz consequence', () => {
  assertBothLanguages(
    {
      de: 'Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen',
      en: 'If you requested to begin the performance of services during the withdrawal period, you shall pay us an amount which is in proportion to what has been provided',
    },
    'the Anlage 1 EGBGB Wertersatz information is missing',
  );
  assertBothLanguages(
    { de: 'schulden Sie keinen Wertersatz', en: 'you owe no such payment' },
    'the terms do not exempt one-off digital content from the proportionate payment',
  );
});

test('when a withdrawal is reimbursed the terms should name the means of payment and rule out fees', () => {
  assertBothLanguages(
    {
      de: 'Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart',
      en: 'We will carry out such reimbursement using the same means of payment as you used for the initial transaction, unless you have expressly agreed otherwise',
    },
    'the Anlage 1 EGBGB refund-method sentence is missing',
  );
  assertBothLanguages(
    {
      de: 'in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet',
      en: 'in any event, you will not incur any fees as a result of such reimbursement',
    },
    'the terms do not rule out fees for the reimbursement',
  );
});

test('when the withdrawal instruction names the addressee it should insert the trader identity, not link the imprint', () => {
  for (const stale of ['Kontaktdaten siehe <a href="/imprint.html">Impressum</a>', 'contact details in the <a href="/imprint.html">Imprint</a>']) {
    assert.ok(!terms.includes(stale), `the Widerrufsbelehrung defers its trader identity to another page: ${stale}`);
  }
  assertBothLanguages(
    {
      de: '(Farhad Sanaei seresht, Burgunderweg 19G, 22453 Hamburg, Deutschland, E-Mail: <a href="mailto:legal@scandora.eu">legal@scandora.eu</a>)',
      en: '(Farhad Sanaei seresht, Burgunderweg 19G, 22453 Hamburg, Germany; email: <a href="mailto:legal@scandora.eu">legal@scandora.eu</a>)',
    },
    'the Widerrufsbelehrung does not insert name, address and email per Anlage 1 EGBGB',
  );
});

test('when the model withdrawal form must be posted it should carry the trader identity and both contract objects', () => {
  for (const stale of ['[Betreiber gemäß Impressum]', '[operator per the Imprint]']) {
    assert.ok(!terms.includes(stale), `the model withdrawal form still carries a placeholder addressee: ${stale}`);
  }
  assertBothLanguages(
    {
      de: '— An: Farhad Sanaei seresht, Burgunderweg 19G, 22453 Hamburg, Deutschland, E-Mail: legal@scandora.eu',
      en: '— To: Farhad Sanaei seresht, Burgunderweg 19G, 22453 Hamburg, Germany, email: legal@scandora.eu',
    },
    'the model withdrawal form does not name the trader per Anlage 2 EGBGB',
  );
  assertBothLanguages(
    {
      de: 'über die Bereitstellung der folgenden digitalen Inhalte (*)',
      en: 'for the supply of the following digital content (*)',
    },
    'the model withdrawal form has no line for a one-off purchase of digital content',
  );
  assertBothLanguages(
    {
      de: '— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): __________',
      en: '— Signature of consumer(s) (only if this form is notified on paper): __________',
    },
    'the model withdrawal form has no signature line per Anlage 2 EGBGB',
  );
  for (const [lang, [signature, date]] of Object.entries({
    de: ['— Unterschrift des/der Verbraucher(s)', '— Datum:'],
    en: ['— Signature of consumer(s)', '— Date:'],
  })) {
    assert.ok(
      blocks[lang].indexOf(signature) < blocks[lang].indexOf(date),
      `${lang.toUpperCase()}: the signature line does not precede the date line as Anlage 2 EGBGB orders them`,
    );
  }
});

test('when the scan history is uploaded for every signed-in user section 8 should license that processing', () => {
  assertBothLanguages(
    {
      de: 'mit der Speicherung Ihres Scan-Verlaufs in Ihrem angemeldeten Konto',
      en: 'by having your scan history stored in your signed-in account',
    },
    'the content licence does not cover the scan-history upload',
  );
  assertBothLanguages(
    {
      de: 'Wir verwenden Ihre Dokumente nicht, um eigene KI-Modelle zu trainieren',
      en: 'We do not use your documents to train our own AI models',
    },
    'the content licence dropped the no-training statement',
  );
});

test('when the explanatory note is not model text it should sit below the model withdrawal form', () => {
  for (const [lang, [form, note]] of Object.entries({
    de: ['<h3>Muster-Widerrufsformular</h3>', '<h3>Zustimmung und Bestätigung im Kaufvorgang</h3>'],
    en: ['<h3>Model withdrawal form</h3>', '<h3>Consent and confirmation during the purchase</h3>'],
  })) {
    const formAt = blocks[lang].indexOf(form);
    const noteAt = blocks[lang].indexOf(note);
    assert.notEqual(noteAt, -1, `${lang.toUpperCase()}: the consent note has no heading of its own`);
    assert.ok(
      noteAt > formAt,
      `${lang.toUpperCase()}: the consent note sits inside the Widerrufsbelehrung instead of below the model form`,
    );
  }
});

test('when a subscription is bought in a store the terms should name that store as the seller of record', () => {
  assertBothLanguages(
    { de: 'als Verkäufer (Seller of Record) auf', en: 'act as the seller of record' },
    'the stores are not identified as the seller of record',
  );
  assertBothLanguages(
    { de: 'bleibt der Betreiber Ihr Vertragspartner', en: 'the operator remains your contracting party' },
    'the terms do not say who provides the service itself',
  );
  assertBothLanguages(
    {
      de: 'Wir nehmen ihn für den Store entgegen und leiten ihn unverzüglich weiter',
      en: "we accept it on the store's behalf and pass it on without undue delay",
    },
    'the terms do not say a withdrawal declared to the operator reaches the seller of record',
  );
});

test('when the scan history is uploaded to Scandora the terms should not claim nothing is stored server-side', () => {
  for (const stale of [
    'Scandora stellt keinen allgemeinen Cloud-Speicher für Ihre Dokumente bereit',
    'Scandora does not provide general cloud storage for your documents',
  ]) {
    assert.ok(!terms.includes(stale), `terms.html still denies server-side storage: ${stale}`);
  }
  assertBothLanguages(
    {
      de: 'auch der aus dem Dokument erkannte Text und ein kleines Vorschaubild',
      en: 'this includes the text recognized in the document and a small preview image',
    },
    'the service description does not disclose what the scan history stores',
  );
});

test('when the terms restrict how the service may be used they should say how that is enforced and how to object', () => {
  assertBothLanguages(
    { de: 'Art. 14 DSA', en: 'Art. 14 DSA' },
    'the restriction clause does not cite Art. 14 DSA',
  );
  assertBothLanguages(
    { de: 'Kündigung aus wichtigem Grund nach Abschnitt 12', en: 'termination for good cause under section 12' },
    'the enforcement measures do not end at termination for good cause',
  );
  for (const lang of ['de', 'en']) {
    assert.ok(
      blocks[lang].includes('mailto:legal@scandora.eu'),
      `${lang.toUpperCase()}: no legal@scandora.eu route to object to a measure`,
    );
  }
});

test('when the terms name an illegal-content report route that route should exist', () => {
  assertBothLanguages(
    { de: 'Art. 16 DSA', en: 'Art. 16 DSA' },
    'the illegal-content reporting notice does not cite Art. 16 DSA',
  );
  for (const lang of ['de', 'en']) {
    assert.ok(
      blocks[lang].includes('mailto:legal@scandora.eu'),
      `${lang.toUpperCase()}: no email route to report illegal content`,
    );
  }
  assertBothLanguages(
    {
      de: 'eine hinreichend begründete Erläuterung, warum Sie den Inhalt für rechtswidrig halten',
      en: 'a sufficiently substantiated explanation of why you consider the content illegal',
    },
    'the notice route does not facilitate the Art. 16 (2)(a) explanation of illegality',
  );
  assertBothLanguages(
    {
      de: 'nach bestem Wissen und Gewissen von der Richtigkeit und Vollständigkeit Ihrer Angaben überzeugt',
      en: 'a statement confirming your good-faith belief that the information in your notice is accurate and complete',
    },
    'the notice route does not facilitate the Art. 16 (2)(d) good-faith statement',
  );
  assertBothLanguages(
    {
      de: 'Ihren Namen und eine E-Mail-Adresse für Rückfragen',
      en: 'your name and an email address for follow-up questions',
    },
    'the notice route does not ask for the Art. 16 (2)(c) name of the notifier',
  );
  assertBothLanguages(
    {
      de: 'bei Meldungen zu Straftaten des sexuellen Kindesmissbrauchs sind Name und E-Mail-Adresse nicht erforderlich',
      en: 'for notices concerning child sexual abuse offences neither your name nor your email address is required',
    },
    'the notice route does not carry the Art. 16 (2)(c) exception',
  );
  assertBothLanguages(
    {
      de: 'informieren wir Sie auch über die Rechtsbehelfe, die Ihnen dagegen offenstehen',
      en: 'we also inform you of the redress available to you against it',
    },
    'the decision does not carry the Art. 16 (5) redress information',
  );
  assertBothLanguages(
    { de: 'scandora.eu/report-content.html', en: 'scandora.eu/report-content.html' },
    'the Art. 16 notice route does not name the electronic reporting form',
  );
  assert.ok(
    existsSync(join(websiteDir, 'report-content.html')),
    'terms.html points to report-content.html, but that page does not ship — the DSA report route would 404',
  );
});
