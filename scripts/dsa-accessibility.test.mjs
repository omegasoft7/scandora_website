// Regression test for the DSA notice-and-action page and the accessibility statement — run with:
//   node --test website/scripts/dsa-accessibility.test.mjs
// Dependency-free (Node built-in test runner), matching the rest of the static website tooling.
// Guards the statements that carry a legal duty: the Art. 16 (2) notice fields, the Art. 11 / Art. 12
// points of contact with their accepted languages, the Art. 16 (4)-(6) handling promise, and the
// § 3 (3) BFSG micro-enterprise note that makes the accessibility statement a voluntary one — each in
// both language blocks. It also guards the wiring that carries the extra notice fields to the contact
// endpoint, which only accepts name, email, subject and message.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, sep } from 'node:path';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(websiteDir, p), 'utf8');

const report = read('report-content.html');
const accessibility = read('accessibility.html');
const privacy = read('privacy.html');
const sitemap = read('sitemap.xml');
const translations = read('translations.js');
const mainJs = read('main.js');

/** The German and the English body of a bilingual legal page, keyed by language. */
function languageBlocks(html) {
  const blocks = { de: '', en: '' };
  const pattern = /<article class="legal-content" data-lang="(de|en)"[^>]*>([\s\S]*?)<\/article>/g;
  let match = pattern.exec(html);
  while (match !== null) {
    blocks[match[1]] += match[2];
    match = pattern.exec(html);
  }
  return blocks;
}

const reportBlocks = languageBlocks(report);
const accessibilityBlocks = languageBlocks(accessibility);

function assertBothLanguages(blocks, page, phrases, message) {
  for (const lang of ['de', 'en']) {
    assert.ok(blocks[lang].length > 0, `${page}: the ${lang.toUpperCase()} block is missing`);
    assert.ok(blocks[lang].includes(phrases[lang]), `${page} (${lang.toUpperCase()}): ${message}`);
  }
}

function htmlPages() {
  return readdirSync(websiteDir, { recursive: true })
    .filter((rel) => typeof rel === 'string' && rel.endsWith('.html'))
    .map((rel) => rel.split(sep).join('/'));
}

const contactEndpoint = readFileSync(
  join(websiteDir, '..', 'infra', 'hetzner', 'userdata', 'src', 'mail', 'contactMessage.ts'),
  'utf8',
);
const ENDPOINT_MESSAGE_CAP = Number(
  (/message:\s*(\d+)/.exec(contactEndpoint.slice(contactEndpoint.indexOf('FIELD_LIMITS = {'))) ?? [])[1],
);
assert.ok(Number.isInteger(ENDPOINT_MESSAGE_CAP), 'the contact endpoint no longer states a message length cap');

const BONA_FIDE_VALUE = (/id="bona-fide"[^>]*\svalue="([^"]+)"/.exec(report) ?? [])[1];
assert.ok(BONA_FIDE_VALUE, 'report-content.html: the bona-fide checkbox carries no value to compose into the notice');

/** `composeMessage` lifted out of the `main.js` IIFE, so its behavior can be exercised directly. */
function loadComposeMessage() {
  const start = mainJs.indexOf('function composeMessage(');
  assert.notEqual(start, -1, 'main.js no longer defines composeMessage');
  const end = mainJs.indexOf('\n    }\n', start);
  assert.notEqual(end, -1, 'the composeMessage body does not close at the expected indentation');
  return new Function(`${mainJs.slice(start, end + 6)}\nreturn composeMessage;`)();
}

/** A form stand-in: `composeMessage` only queries the labelled fields and reads their state. */
function formWith(fields) {
  return {
    querySelectorAll(selector) {
      assert.equal(selector, '[data-compose-label]', `composeMessage queried ${selector}`);
      return fields.map((field) => ({
        type: field.type ?? 'textarea',
        value: field.value,
        checked: field.checked,
        getAttribute: (name) => (name === 'data-compose-label' ? field.label : null),
      }));
    },
  };
}

/** The Art. 13 GDPR note under the notice form, keyed by language. */
function formPrivacyNote(html) {
  const start = html.indexOf('class="form-privacy-note"');
  assert.notEqual(start, -1, 'report-content.html: the notice form carries no Art. 13 GDPR note');
  const note = html.slice(start, html.indexOf('</small>', start));
  const blocks = { de: '', en: '' };
  const pattern = /<span data-lang="(de|en)"[^>]*>([\s\S]*?)<\/span>/g;
  let match = pattern.exec(note);
  while (match !== null) {
    blocks[match[1]] += match[2];
    match = pattern.exec(note);
  }
  return blocks;
}

const noteBlocks = formPrivacyNote(report);

/** The section 11 retention entry on Art. 16 DSA notices in `privacy.html`, keyed by language. */
function privacyNoticeEntry(html) {
  const labels = {
    de: 'Meldungen rechtswidriger Inhalte (Art. 16 DSA):',
    en: 'Illegal-content notices (Art. 16 DSA):',
  };
  const entries = {};
  for (const lang of ['de', 'en']) {
    const start = html.indexOf(labels[lang]);
    assert.notEqual(start, -1, `privacy.html (${lang.toUpperCase()}): section 11 has no entry for Art. 16 DSA notices`);
    entries[lang] = html.slice(start, html.indexOf('</li>', start));
  }
  return entries;
}

const privacyNoticeBlocks = privacyNoticeEntry(privacy);

/** The Art. 14 GDPR promise to the user a notice accuses, which both pages have to carry. */
const ART_14_INFORMATION = {
  de:
    'informieren wir Sie über die Meldung und über die Verarbeitung Ihrer Daten spätestens innerhalb '
    + 'eines Monats (Art. 14 DSGVO) — unabhängig davon, ob wir aufgrund der Meldung Maßnahmen ergreifen',
  en:
    'we inform you of the notice and of the processing of your data within one month at the latest '
    + '(Art. 14 GDPR) — whether or not we act on the notice',
};

/** The `maxlength` the notice form puts on a control, which budgets the composed message. */
function fieldMaxLength(id) {
  const match = new RegExp(`id="${id}"[^>]*\\smaxlength="(\\d+)"`).exec(report);
  assert.ok(match, `report-content.html: #${id} has no maxlength, so a long notice can overrun the endpoint`);
  return Number(match[1]);
}

test('when the report page states what a notice must contain it should list every Art. 16 (2) field', () => {
  const fields = [
    {
      de: 'eine klare Angabe des genauen elektronischen Fundorts',
      en: 'a clear indication of the exact electronic location',
      what: 'the exact electronic location of the content is not asked for',
    },
    {
      de: 'eine hinreichend begründete Erläuterung',
      en: 'a sufficiently substantiated explanation',
      what: 'the substantiated explanation of the alleged illegality is not asked for',
    },
    {
      de: 'Ihren Namen und Ihre E-Mail-Adresse',
      en: 'your name and your email address',
      what: "the notifier's name and email address are not asked for",
    },
    {
      de: 'nach bestem Wissen und Gewissen richtig und vollständig',
      en: 'accurate and complete',
      what: 'the bona-fide accuracy declaration is missing',
    },
  ];
  for (const field of fields) {
    assertBothLanguages(reportBlocks, 'report-content.html', field, field.what);
  }
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Art. 16 Abs. 2', en: 'Art. 16(2) DSA' },
    'the notice-content list does not cite Art. 16 (2) DSA',
  );
});

test('when a notice concerns a child-abuse offence the page should waive the name and email', () => {
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Richtlinie 2011/93/EU', en: 'Directive 2011/93/EU' },
    'the Art. 16 (2) (c) carve-out for offences under Articles 3 to 7 of Directive 2011/93/EU is missing, '
      + 'so the page demands identification the DSA does not allow us to demand',
  );
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'nicht angeben', en: 'do not have to give your name' },
    'the carve-out does not say that the name and email may be left out',
  );
});

test('when the report form is filled in it should ask for exactly the four Art. 16 (2) inputs', () => {
  const form = report.slice(report.indexOf('<form id="contact-form"'), report.indexOf('</form>'));
  for (const control of [
    'id="location"',
    'id="message"',
    'id="name"',
    'id="email"',
    'id="bona-fide"',
  ]) {
    assert.ok(form.includes(control), `report-content.html: the notice form has no ${control} control`);
  }
  assert.match(
    form,
    /<input type="checkbox" id="bona-fide"[^>]*\brequired\b/,
    'the bona-fide statement is not a required checkbox, so a notice can be filed without it',
  );
});

test('when the report form is submitted it should post to the contact endpoint under its own subject', () => {
  assert.ok(
    report.includes('action="https://userdata.scandora.eu/api/contact"'),
    'report-content.html does not post to the contact endpoint contact.html uses',
  );
  assert.match(
    report,
    /<input type="hidden" name="subject" value="DSA Illegal Content Report">/,
    'the notice form carries no distinct subject, so a DSA notice is indistinguishable from a support message',
  );
});

test('when the notice form carries fields the endpoint drops it should fold them into the message', () => {
  const form = report.slice(report.indexOf('<form id="contact-form"'), report.indexOf('</form>'));
  const labelled = [...form.matchAll(/data-compose-label="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(
    labelled,
    ['Location of the content', 'Bona fide statement'],
    'the fields the contact endpoint does not accept are not marked for composition, so the exact location '
      + 'and the bona-fide statement would never reach the mailbox',
  );
  assert.ok(
    mainJs.includes('payload.message = composeMessage('),
    'main.js does not fold the marked fields into the posted message',
  );
});

test('when composeMessage runs on the notice form it should prefix each labelled field and keep the explanation last', () => {
  const compose = loadComposeMessage();
  const composed = compose(
    formWith([
      { label: 'Location of the content', value: 'https://scandora.eu/p/42' },
      { label: 'Bona fide statement', type: 'checkbox', checked: true, value: BONA_FIDE_VALUE },
    ]),
    'The document reproduces my photograph without a licence.',
  );
  assert.equal(
    composed,
    `Location of the content: https://scandora.eu/p/42\n\nBona fide statement: ${BONA_FIDE_VALUE}\n\n`
      + 'The document reproduces my photograph without a licence.',
    'the composed notice loses a label, an order or a separator, so the mailbox does not receive the exact '
      + 'location and the bona-fide statement as their own Art. 16 (2) elements',
  );
});

test('when the bona-fide box is left unchecked it should add nothing to the composed message', () => {
  const compose = loadComposeMessage();
  const composed = compose(
    formWith([
      { label: 'Location of the content', value: '  https://scandora.eu/p/42  ' },
      { label: 'Bona fide statement', type: 'checkbox', checked: false, value: BONA_FIDE_VALUE },
    ]),
    'The explanation.',
  );
  assert.equal(
    composed,
    'Location of the content: https://scandora.eu/p/42\n\nThe explanation.',
    'an unchecked declaration is composed into the notice anyway, which would assert a bona-fide belief '
      + 'the notifier never gave',
  );
});

test('when a form marks no field for composition it should get its message back unchanged', () => {
  const compose = loadComposeMessage();
  assert.equal(
    compose(formWith([]), 'A plain support question.'),
    'A plain support question.',
    'composeMessage rewrites the message of a form that marks no fields',
  );
  for (const page of ['contact.html', 'delete-account.html']) {
    assert.ok(
      !read(page).includes('data-compose-label'),
      `${page} marks a field for composition, so this guard no longer covers the plain forms`,
    );
  }
});

test('when a notice is retried after a failed submit it should not double up the composed fields', () => {
  const compose = loadComposeMessage();
  const messageField = { value: 'The explanation.' };
  const form = formWith([
    { label: 'Location of the content', value: 'https://scandora.eu/p/42' },
    { label: 'Bona fide statement', type: 'checkbox', checked: true, value: BONA_FIDE_VALUE },
  ]);
  const first = compose(form, messageField.value);
  const second = compose(form, messageField.value);
  assert.equal(second, first, 'a retry composes a different notice than the first attempt');
  assert.equal(messageField.value, 'The explanation.', 'composeMessage wrote back into the form');
  assert.equal(
    second.match(/Location of the content: /g).length,
    1,
    'the location is composed twice, so a retry sends a doubled-up notice',
  );
});

test('when the notice fields are filled to their maximum the composed message should stay under the endpoint cap', () => {
  const compose = loadComposeMessage();
  const locationMax = fieldMaxLength('location');
  const messageMax = fieldMaxLength('message');
  const composed = compose(
    formWith([
      { label: 'Location of the content', value: 'x'.repeat(locationMax) },
      { label: 'Bona fide statement', type: 'checkbox', checked: true, value: BONA_FIDE_VALUE },
    ]),
    'y'.repeat(messageMax),
  );
  assert.ok(
    composed.length <= ENDPOINT_MESSAGE_CAP,
    `a notice filled to the form's own limits composes to ${composed.length} characters, over the endpoint's `
      + `${ENDPOINT_MESSAGE_CAP}-character cap, so the notifier loses the text after writing it`,
  );
});

test('when the report page names the DSA contacts it should give the article, the address and the languages', () => {
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Art. 11 DSA', en: 'Art. 11 DSA' },
    'the point of contact for authorities does not cite Art. 11 DSA',
  );
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Art. 12 DSA', en: 'Art. 12 DSA' },
    'the point of contact for users does not cite Art. 12 DSA',
  );
  for (const lang of ['de', 'en']) {
    const contacts = reportBlocks[lang].slice(reportBlocks[lang].indexOf('Art. 11 DSA'));
    assert.ok(
      contacts.includes('mailto:legal@scandora.eu'),
      `report-content.html (${lang.toUpperCase()}): legal@scandora.eu is not named as the Art. 11 contact`,
    );
    assert.ok(
      contacts.includes('mailto:support@scandora.eu'),
      `report-content.html (${lang.toUpperCase()}): support@scandora.eu is not named as the Art. 12 contact`,
    );
  }
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Deutsch und Englisch', en: 'German and English' },
    'the languages accepted by the points of contact are not stated',
  );
});

test('when the report page describes the process it should promise the Art. 16 (4)-(6) handling', () => {
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'bestätigen wir Ihnen den Eingang', en: 'we confirm receipt of the notice' },
    'the acknowledgement of receipt required by Art. 16 (4) DSA is not promised',
  );
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    {
      de: 'zeitnah, sorgfältig, frei von Willkür und objektiv',
      en: 'timely, diligent, non-arbitrary and objective',
    },
    'the Art. 16 (6) DSA standard for handling a notice is not stated',
  );
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Rechtsbehelfe', en: 'redress possibilities' },
    'the redress information required by Art. 16 (5) DSA is missing',
  );
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'keine automatisierten Mittel', en: 'no automated means' },
    'the page does not say whether automated means are used, which Art. 16 (6) DSA requires',
  );
});

test('when the notice form states its purpose it should name every recipient of a notice', () => {
  assertBothLanguages(
    noteBlocks,
    'report-content.html',
    { de: 'Art. 17 DSA', en: 'Art. 17 DSA' },
    'the note does not say that the reported user receives the statement of reasons',
  );
  assertBothLanguages(
    noteBlocks,
    'report-content.html',
    { de: 'Art. 18 DSA', en: 'Art. 18 DSA' },
    'the note does not say that a notice can go to law enforcement',
  );
  assert.ok(
    !noteBlocks.en.includes('here only to assess'),
    'report-content.html (EN): the note still describes a closed set of purposes and recipients',
  );
  assert.ok(
    !noteBlocks.de.includes('ausschließlich zur Prüfung'),
    'report-content.html (DE): the note still describes a closed set of purposes and recipients',
  );
});

test('when the notice form cannot be used it should offer an email route with the same effect', () => {
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    {
      de: 'senden Sie Ihre Meldung mit denselben Angaben an <a href="mailto:legal@scandora.eu">',
      en: 'send your notice with the same details to <a href="mailto:legal@scandora.eu">',
    },
    'a notifier who cannot use the form is left without a route to give notice',
  );
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    { de: 'Spam-Schutz', en: 'spam filter' },
    'the automated filter in front of the form is not disclosed, contradicting "no automated means"',
  );
});

test('when a notice accuses a user of ours that user should be promised the Art. 14 GDPR information', () => {
  assertBothLanguages(
    reportBlocks,
    'report-content.html',
    ART_14_INFORMATION,
    'the reported user is promised nothing about the notice unless we act on it',
  );
  for (const lang of ['de', 'en']) {
    assert.ok(
      privacyNoticeBlocks[lang].includes(ART_14_INFORMATION[lang]),
      `privacy.html (${lang.toUpperCase()}): the Art. 16 DSA entry omits the Art. 14 GDPR information duty`,
    );
  }
});

test('when the accessibility statement explains itself it should call out the § 3 (3) BFSG exemption', () => {
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: '§ 3 Abs. 3 BFSG', en: '§ 3(3) BFSG' },
    'the micro-enterprise exemption is not cited, so a voluntary statement reads as a legal duty',
  );
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'freiwillig', en: 'voluntary' },
    'the statement does not say that it is voluntary',
  );
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'Einzelunternehmen ohne Beschäftigte', en: 'sole proprietorship with no employees' },
    'the statement does not say why Scandora is inside the micro-enterprise threshold',
  );
});

test('when the accessibility statement names a standard it should aim at it rather than claim conformity', () => {
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'EN 301 549', en: 'EN 301 549' },
    'the standard aimed at is not named',
  );
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'WCAG) 2.1 auf Stufe AA', en: 'WCAG) 2.1 at level AA' },
    'the WCAG 2.1 AA target is not named',
  );
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'keine Konformitätserklärung', en: 'not a declaration of conformity' },
    'the page claims conformity instead of naming a target we have not had audited',
  );
});

test('when the accessibility statement is published it should carry limitations, a contact and a date', () => {
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'Bekannte Einschränkungen', en: 'Known limitations' },
    'the known limitations section is missing',
  );
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'mailto:support@scandora.eu', en: 'mailto:support@scandora.eu' },
    'no feedback address is offered',
  );
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: '7. September 2026', en: '7 September 2026' },
    'the date of the assessment is missing',
  );
  assert.match(
    accessibility,
    /<time datetime="2026-09-07">/,
    'the assessment date is not machine-readable',
  );
});

test('when the accessibility statement mentions BFSG enforcement it should leave the call to the authority', () => {
  assertBothLanguages(
    accessibilityBlocks,
    'accessibility.html',
    { de: 'Marktüberwachungsbehörde', en: 'market-surveillance authority' },
    'the statement does not say who decides whether the exemption applies',
  );
  assert.ok(
    !accessibility.includes('kein Durchsetzungsverfahren'),
    'accessibility.html (DE): the page still rules out an enforcement procedure on its own authority',
  );
  assert.ok(
    !accessibility.includes('no BFSG enforcement procedure'),
    'accessibility.html (EN): the page still rules out an enforcement procedure on its own authority',
  );
});

test('when a page renders its Legal footer column it should link both new legal pages', () => {
  const pages = htmlPages().filter((page) => read(page).includes('data-i18n="footer.imprint"'));
  assert.ok(pages.length >= 25, `only ${pages.length} page(s) carry the Legal footer column, expected >= 25`);
  for (const page of pages) {
    const html = read(page);
    assert.ok(
      html.includes('data-i18n="footer.reportContent"') && html.includes('href="/report-content.html"'),
      `${page} does not link the DSA report page from its Legal footer column`,
    );
    assert.ok(
      html.includes('data-i18n="footer.accessibility"') && html.includes('href="/accessibility.html"'),
      `${page} does not link the accessibility statement from its Legal footer column`,
    );
  }
});

test('when a footer link is translated it should have copy in both languages', () => {
  for (const key of ['footer.reportContent', 'footer.accessibility']) {
    const values = [...translations.matchAll(new RegExp(`'${key}': '([^']*)'`, 'g'))].map((m) => m[1]);
    assert.equal(values.length, 2, `${key} is not translated into exactly English and German`);
    assert.notEqual(values[0], values[1], `${key} carries the same string in both languages`);
  }
});

test('when a new legal page is rendered in German it should carry a German title and description', () => {
  const meta = translations.slice(translations.indexOf('const pageMeta = {'));
  for (const path of ['/report-content', '/accessibility']) {
    const entry = new RegExp(`"${path}": \\{([\\s\\S]*?)\\n    \\},`).exec(meta);
    assert.ok(
      entry,
      `translations.js: pageMeta has no "${path}" entry, so the German render keeps the English <title> and `
        + 'meta description on a page that declares the German version binding',
    );
    const localized = {};
    for (const lang of ['en', 'de']) {
      const block = new RegExp(`"${lang}": \\{([\\s\\S]*?)\\n        \\}`).exec(entry[1]);
      assert.ok(block, `translations.js: pageMeta "${path}" has no ${lang.toUpperCase()} block`);
      const title = /"title": "([^"]+)"/.exec(block[1]);
      const description = /"description": "([^"]+)"/.exec(block[1]);
      assert.ok(title, `translations.js: pageMeta "${path}" (${lang.toUpperCase()}) has no title`);
      assert.ok(description, `translations.js: pageMeta "${path}" (${lang.toUpperCase()}) has no description`);
      localized[lang] = { title: title[1], description: description[1] };
    }
    assert.notEqual(
      localized.de.title,
      localized.en.title,
      `translations.js: pageMeta "${path}" carries the English title in the German block`,
    );
    assert.notEqual(
      localized.de.description,
      localized.en.description,
      `translations.js: pageMeta "${path}" carries the English description in the German block`,
    );
  }
});

test('when a new legal page ships it should be listed in the sitemap', () => {
  for (const path of ['report-content', 'accessibility']) {
    assert.ok(
      sitemap.includes(`<loc>https://scandora.eu/${path}</loc>`),
      `sitemap.xml does not list /${path}`,
    );
    assert.ok(
      sitemap.includes(`href="https://scandora.eu/${path}?lang=de"`),
      `sitemap.xml has no German alternate for /${path}`,
    );
  }
});
