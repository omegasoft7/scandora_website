const CAREERS_EMAIL = 'jobs@scandora.eu';
const CAREERS_SITE = 'https://scandora.eu';
const CAREERS_URL = `${CAREERS_SITE}/careers`;
const CAREERS_POSTED_DATE = '2026-09-15';
const CAREERS_OFFICE_CITY = 'Hamburg';
const CAREERS_OFFICE_COUNTRY = 'DE';
const CAREERS_APPLICANT_AREA = 'European Union';
const CAREERS_EMPLOYMENT_TYPES = [
    [/full[\s-]?time/i, 'FULL_TIME'],
    [/part[\s-]?time/i, 'PART_TIME'],
    [/contract/i, 'CONTRACTOR'],
    [/intern/i, 'INTERN'],
    [/temporary/i, 'TEMPORARY'],
];

function careersEscape(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function careersPair(value) {
    if (value && typeof value === 'object') {
        return { en: value.en ?? '', de: value.de ?? '' };
    }
    return { en: value ?? '', de: '' };
}

function careersText(value) {
    const pair = careersPair(value);
    if (!pair.de) {
        return careersEscape(pair.en);
    }
    return (
        `<span data-lang="en">${careersEscape(pair.en)}</span>` +
        `<span data-lang="de" hidden>${careersEscape(pair.de)}</span>`
    );
}

function careersMailto(subject) {
    return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

function careersPoints(items) {
    return (Array.isArray(items) ? items : []).map((item) => `<li>${careersText(item)}</li>`).join('');
}

function renderJobPosting(job) {
    const chips = [job.location, job.employmentType]
        .filter((value) => careersPair(value).en)
        .map((value) => `<li class="job-chip">${careersText(value)}</li>`)
        .join('');
    return [
        `<article class="job-card" id="${careersEscape(job.id)}" aria-labelledby="${careersEscape(job.id)}-title">`,
        `<h3 class="job-title" id="${careersEscape(job.id)}-title">${careersText(job.title)}</h3>`,
        chips ? `<ul class="job-meta">${chips}</ul>` : '',
        `<p class="job-summary">${careersText(job.summary)}</p>`,
        '<h4 class="job-section-title" data-i18n="careers.responsibilities">What you would do</h4>',
        `<ul class="job-points">${careersPoints(job.responsibilities)}</ul>`,
        '<h4 class="job-section-title" data-i18n="careers.requirements">What we look for</h4>',
        `<ul class="job-points">${careersPoints(job.requirements)}</ul>`,
        `<a class="btn btn-primary btn-sm job-apply" href="${careersMailto(`Application: ${careersPair(job.title).en}`)}" data-i18n="careers.apply">Apply by email</a>`,
        '</article>',
    ].join('');
}

function renderJobPostings(jobs) {
    const list = Array.isArray(jobs) ? jobs : [];
    if (list.length === 0) {
        return [
            '<div class="careers-empty">',
            '<h3 data-i18n="careers.emptyTitle">No open positions right now</h3>',
            '<p data-i18n="careers.emptyBody">No role is advertised at the moment. If you think you belong here anyway, write to us — we read every message.</p>',
            `<a class="btn btn-primary btn-sm" href="${careersMailto('General application')}" data-i18n="careers.generalApply">Send a general application</a>`,
            '</div>',
        ].join('');
    }
    return list.map(renderJobPosting).join('');
}

function mountJobPostings() {
    const container = document.getElementById('job-postings');
    if (!container) {
        return;
    }
    container.innerHTML = renderJobPostings(typeof jobPostings === 'undefined' ? [] : jobPostings);
}

function careersPlainPoints(items) {
    return (Array.isArray(items) ? items : [])
        .map((item) => careersPair(item).en)
        .filter((text) => text.trim() !== '');
}

function careersJobDescription(job) {
    const section = (heading, items) =>
        items.length === 0
            ? ''
            : `<p>${heading}</p><ul>${items.map((text) => `<li>${careersEscape(text)}</li>`).join('')}</ul>`;
    return (
        `<p>${careersEscape(careersPair(job.summary).en)}</p>` +
        section('What you would do', careersPlainPoints(job.responsibilities)) +
        section('What we look for', careersPlainPoints(job.requirements))
    );
}

function careersEmploymentTypes(value) {
    const text = careersPair(value).en;
    return CAREERS_EMPLOYMENT_TYPES.filter(([pattern]) => pattern.test(text)).map(([, type]) => type);
}

function careersJobPosting(job) {
    const location = careersPair(job.location).en;
    const remote = /remote/i.test(location);
    const employmentTypes = careersEmploymentTypes(job.employmentType);
    const posting = {
        '@type': 'JobPosting',
        '@id': `${CAREERS_URL}#${job.id}`,
        title: careersPair(job.title).en,
        description: careersJobDescription(job),
        identifier: { '@type': 'PropertyValue', name: 'Scandora', value: job.id },
        datePosted: job.datePosted || CAREERS_POSTED_DATE,
        hiringOrganization: {
            '@type': 'Organization',
            '@id': `${CAREERS_SITE}/#organization`,
            name: 'Scandora',
            url: CAREERS_SITE,
            logo: `${CAREERS_SITE}/assets/logo.png`,
        },
        applicationContact: { '@type': 'ContactPoint', email: CAREERS_EMAIL, contactType: 'recruitment' },
        url: `${CAREERS_URL}#${job.id}`,
    };
    if (employmentTypes.length > 0) {
        posting.employmentType = employmentTypes.length === 1 ? employmentTypes[0] : employmentTypes;
    }
    if (remote) {
        posting.jobLocationType = 'TELECOMMUTE';
        posting.applicantLocationRequirements = { '@type': 'AdministrativeArea', name: CAREERS_APPLICANT_AREA };
    }
    if (!remote || new RegExp(CAREERS_OFFICE_CITY, 'i').test(location)) {
        posting.jobLocation = {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: CAREERS_OFFICE_CITY,
                addressCountry: CAREERS_OFFICE_COUNTRY,
            },
        };
    }
    return posting;
}

function careersStructuredData(jobs) {
    const list = Array.isArray(jobs) ? jobs : [];
    if (list.length === 0) {
        return '';
    }
    const graph = { '@context': 'https://schema.org', '@graph': list.map(careersJobPosting) };
    return JSON.stringify(graph, null, 4).replace(/</g, '\\u003C');
}

function mountJobPostingsStructuredData() {
    const json = careersStructuredData(typeof jobPostings === 'undefined' ? [] : jobPostings);
    if (!json || !document.head) {
        return;
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = json;
    document.head.appendChild(script);
}

mountJobPostings();
mountJobPostingsStructuredData();
