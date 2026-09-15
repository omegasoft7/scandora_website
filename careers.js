const CAREERS_EMAIL = 'jobs@scandora.eu';

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

mountJobPostings();
