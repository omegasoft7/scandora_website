const jobPostings = [
    {
        id: 'senior-flutter-engineer',
        title: 'Senior Flutter Engineer (Dart)',
        location: 'Remote within the EU, or Hamburg, Germany',
        employmentType: 'Full-time',
        summary:
            'Scandora ships one Flutter codebase to iOS, macOS and Android, split into feature packages inside a melos monorepo. You would own a large part of it, from the capture screen to the offline queue.',
        responsibilities: [
            'Build features across the Flutter packages: capture, document history, profiles, settings and subscriptions.',
            'Keep the package boundaries honest, so a feature change stays inside one package.',
            'Write unit tests for every behavior change, and mocked scenario tests for the flows people actually see.',
            'Work the offline-first paths: local capture, a queue that survives a dropped connection, and sync that resolves conflicts predictably.',
            'Keep the app readable on a small screen and usable with a screen reader.',
        ],
        requirements: [
            'Several years of Dart and Flutter in production, shipped to at least two of iOS, macOS and Android.',
            'You have worked in a package-per-feature monorepo and know why dependency injection matters there.',
            'You write tests without being asked, and treat a failing lint as a real failure.',
            'Working English. German is welcome, not required.',
        ],
    },
    {
        id: 'backend-engineer-typescript',
        title: 'Backend Engineer (TypeScript, Firebase)',
        location: 'Remote within the EU',
        employmentType: 'Full-time',
        summary:
            'Our backend is TypeScript Cloud Functions pinned to europe-west3 in Frankfurt, Firestore, and a Postgres database holding accounts, entitlements and AI credits. You would own the gateway that meters managed AI and the rules that protect customer documents.',
        responsibilities: [
            'Extend the AI gateway: request metering, credit settlement, and honest error paths when a model call fails.',
            'Own the Firestore security rules and the suite that proves them.',
            'Build webhook delivery and the endpoints third-party tools call.',
            'Keep every function in its EU region, and keep customer content out of the logs.',
        ],
        requirements: [
            'Strong TypeScript on Node, with production experience of Firebase Functions and Firestore or a comparable serverless stack.',
            'SQL you can reason about: schema changes, migrations, and the index that makes the query cheap.',
            'You think about idempotency, retries and billing correctness before you think about frameworks.',
            'Working English.',
        ],
    },
    {
        id: 'platform-engineer-eu-hosting',
        title: 'Platform Engineer (EU hosting, search infrastructure)',
        location: 'Remote within the EU, occasional days in Hamburg',
        employmentType: 'Part-time or contract',
        summary:
            'Scandora runs its own server in Falkenstein, Germany: Coolify, Docker, a Postgres database with pgvector behind document search, and cookieless analytics. We want that box boring, documented and restorable.',
        responsibilities: [
            'Own the Hetzner host: provisioning, hardening, backups and upgrades.',
            'Run the Postgres and pgvector instance behind document search, including sizing, indexes and restores you have rehearsed.',
            'Keep every deployment scripted, so no server is configured by hand.',
            'Set up alerting that wakes a person only when a person is needed.',
        ],
        requirements: [
            'Linux, Docker and Postgres in production, and the patience to write the runbook afterwards.',
            'You have kept customer data inside the EU before and know what that costs in practice.',
            'Bash or Python for automation, with the infrastructure described in files rather than in memory.',
            'Working English.',
        ],
    },
    {
        id: 'content-seo-marketer',
        title: 'Content and SEO Marketer (German and English)',
        location: 'Remote within the EU',
        employmentType: 'Part-time',
        summary:
            'Our marketing site is hand-written HTML with a bilingual string table, and our store listings run in German and English. We need someone who writes both languages well and keeps every sentence defensible.',
        responsibilities: [
            'Write and maintain the bilingual site copy, the guide pages and the app store listings.',
            'Answer the questions people ask before they scan a document, one page at a time.',
            'Keep every claim backed by something we can show: an automated guard fails our build when a claim is not.',
            'Report on what brings installs, using our cookieless analytics.',
        ],
        requirements: [
            'Native-level German and strong English, or the other way round.',
            'You have written for a technical product and can read a changelog without help.',
            'SEO that answers a question rather than repeating a keyword.',
            'You are comfortable editing HTML and a JavaScript string table in a pull request.',
        ],
    },
];
