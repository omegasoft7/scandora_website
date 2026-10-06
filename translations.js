/**
 * Scandora Website Translations
 * Supports: every language keyed in `translations` below; the first key is the default.
 */

const translations = {
    en: {
        // Language
        'language.name': 'English',
        'language.englishName': 'English',
        'language.locale': 'en_US',
        'language.menu': 'Language',
        'language.search': 'Search languages',
        'languageBanner.text': 'This page is also available in English.',
        'languageBanner.link': 'Read it in English',
        'languageBanner.dismiss': 'Close',

        // Navigation
        'nav.features': 'Features',
        'nav.howItWorks': 'How It Works',
        'nav.pricing': 'Pricing',
        'nav.blog': 'Guides',
        'nav.download': 'Download',

        // Hero
        'hero.brandDescriptor': 'AI document scanner',
        'hero.badge': 'GDPR-first · EU servers · No ads',
        'hero.titleLine1': 'Scan documents with Scandora.',
        'hero.titleLine2': 'Then ask them anything.',
        'hero.lede': 'Scandora is an AI document scanner for iPhone, iPad, Mac and Android whose output you can talk to.',
        'hero.description': 'Scan an invoice with your phone or your real office scanner, then ask it when the invoice is due or what its IBAN is. The AI pulls out supplier, amount, IBAN, due date and to-dos without a template, your files land in your own Google Drive and Trello, and every scan stays searchable on your device. Scandora is GDPR-first, runs on EU servers and carries no ads.',
        'hero.getStarted': 'Get Started Free',
        'hero.seeHow': 'See How It Works',
        'hero.stat1': 'Ask your document',
        'hero.stat1sub': 'Answers from your scan',
        'hero.stat2': 'AI reads the details',
        'hero.stat2sub': 'Supplier, amount, IBAN, due date',
        'hero.stat3': 'Your cloud, not ours',
        'hero.stat3sub': 'Straight into Drive and Trello',

        // Features
        'features.badge': 'What Makes Scandora Different',
        'features.title': 'Built for Action, Not Just Scanning',
        'features.description': 'AI reads every document, connect a real scanner, and turn each scan into a task or file you can act on — with your data under your control.',
        'features.scan.title': 'Phone or Real Scanner',
        'features.scan.desc': 'Scan with your phone camera or connect a real network scanner over eSCL/AirScan (such as Brother and Epson). Automatic edge detection on every page.',
        'features.ai.title': 'AI That Reads Every Document',
        'features.ai.desc': 'Managed AI reads every scan and pulls out dates, amounts, and suppliers so you skip manual entry. Credits cover extraction, indexing, and AI chat — no key to manage.',
        'features.cloud.title': 'Straight Into Trello & Drive',
        'features.cloud.desc': 'Every scan can become a Trello card or a filed Google Drive document, connected to your own accounts. Your documents become actions, not just PDFs.',
        'features.search.title': 'Intelligent Search',
        'features.search.desc': 'Ask the AI a question and get a cited answer from your own documents, with a link to the source it used.',
        'features.profiles.title': 'Multiple Profiles',
        'features.profiles.desc': 'Separate personal and business documents with distinct profiles. Each with its own settings and cloud connections.',
        'features.privacy.title': 'Your Data Stays Yours',
        'features.privacy.desc': "Your documents are yours. We don't store your full documents or page images on our servers — they go only to the managed AI service we operate and to the cloud services you choose. While you're signed in, your scan history syncs to our servers in Germany: the history details, a small low-resolution preview and the text we extracted from the pages. Scandora is designed with GoBD and DSGVO in mind.",

        // How It Works
        'howItWorks.badge': 'From Scan to Action',
        'howItWorks.title': 'From Paper to Action in Three Steps',
        'howItWorks.description': 'Scan it, let managed AI understand it, send it into your own tools. Your original scans stay on your device and in the storage you choose.',
        'howItWorks.step1.title': 'Scan It',
        'howItWorks.step1.desc': 'Use your phone camera or a network scanner (eSCL/AirScan). Automatic edge detection keeps every page clean.',
        'howItWorks.step2.title': 'Managed AI Understands It',
        'howItWorks.step2.desc': 'Scandora\u2019s managed AI reads the document, recognizes its type, and pulls out the key details. Only a low-resolution preview and the extracted text are stored on our EU servers \u2014 never your original files.',
        'howItWorks.step3.title': 'It Becomes an Action',
        'howItWorks.step3.desc': 'The result syncs straight into your own Trello and Google Drive — a card, a filed document, ready to act on. Scandora is privacy-first and comes with GoBD record-keeping features.',

        // Pricing
        'pricing.badge': 'Flexible Pricing',
        'pricing.title': 'Choose Your Perfect Plan',
        'pricing.description': 'Start free, upgrade as you grow. Managed AI and cloud integrations on every plan.',
        'pricing.perMonth': '/month',
        'pricing.perYear': '/year',
        'pricing.billingMonthly': 'Monthly',
        'pricing.billingAnnual': 'Annual · save up to 26%',
        'pricing.popular': 'Most Popular',
        'pricing.free.name': 'Free',
        'pricing.free.tagline': 'Get started',
        'pricing.free.f1': 'Managed AI extraction (10 credits/month)',
        'pricing.free.f2': 'Unlimited scans, unlimited pages',
        'pricing.free.f3': '10 AI credits/month (1 credit = 1 document analysis or AI chat answer; shared: extraction, indexing & AI chat)',
        'pricing.free.f5': 'Cloud integrations (Trello, Google Drive)',
        'pricing.free.cta': 'Get Started',
        'pricing.pro.name': 'Pro',
        'pricing.pro.tagline': 'For professionals',
        'pricing.pro.f1': '1,000 AI credits/month (1 credit = 1 document analysis or AI chat answer; shared: extraction, indexing & AI chat)',
        'pricing.pro.f2': 'Network scanner support (eSCL/AirScan)',
        'pricing.pro.f3': 'AI document chat with cited answers',
        'pricing.pro.f4': 'Cloud integrations',
        'pricing.pro.f5': 'Priority support',
        'pricing.pro.cta': 'Get Pro',
        'pricing.pro.save': 'Save 26%',
        'pricing.business.name': 'Business / DATEV',
        'pricing.business.tagline': 'For small businesses & tax advisors',
        'pricing.business.f1': '5,000 AI credits/month (1 credit = 1 document analysis or AI chat answer; shared: extraction, indexing & AI chat)',
        'pricing.business.f2': 'DATEV export for your tax advisor (coming soon)',
        'pricing.business.f3': 'lexoffice & sevDesk voucher export (coming soon)',
        'pricing.business.f4': 'Designed for GoBD & DSGVO record-keeping',
        'pricing.business.f5': 'Dedicated support',
        'pricing.business.cta': 'Get Business',
        'pricing.business.save': 'Save 24%',
        'pricing.byo': '💡 Managed AI covers extraction, indexing, and AI chat — no API key to set up.',
        'pricing.aiSplit.title': 'What the AI does for you',
        'pricing.aiSplit.ownKey': 'AI reads each scan and pulls out dates, amounts, and suppliers — covered by your monthly credits.',
        'pricing.aiSplit.scandoraAi': "Document-chat and search run on your device and Scandora's AI, and spend Scandora credits.",
        'pricing.priceNote': 'The prices shown in the App Store / Google Play are the final prices for the respective product (small-business operator — no separate VAT shown, § 19 UStG); with a trial, an introductory or promotional offer, or a prorated plan change the amount actually charged can differ, and the amount the store states on your receipt is the one that applies. Prices may vary by region and store.',

        // Download
        'download.title': 'Ready to Ask Your Documents Anything?',
        'download.description': 'Download Scandora, scan your first document and ask it a question — your data stays yours. Available on iOS, macOS, and Android.',

        // Footer
        'footer.tagline': 'Intelligent document scanning for modern businesses.',
        'footer.product': 'Product',
        'footer.legal': 'Legal',
        'footer.support': 'Support',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.avv': 'AVV / DPA',
        'footer.imprint': 'Imprint',
        'footer.help': 'Help Center',
        'footer.contact': 'Contact Us',
        'footer.paperlessSmb': 'Paperless for small business',
        'footer.paperlessHome': 'Paperless office at home',
        'footer.invoiceData': 'Invoice data extraction',
        'footer.scanTrello': 'Scan to Trello',
        'footer.euServers': 'Scanner on EU servers',
        'footer.rights': 'All rights reserved.',
        'footer.legalNotice': '{imprint}, {terms} and {avv} are available in English and German.',

        // Contact Page
        'contact.badge': 'Get in Touch',
        'contact.title': "We'd Love to Hear From You",
        'contact.subtitle': 'Have a question, feedback, or need support? Our team is here to help you get the most out of Scandora.',
        'contact.formTitle': 'Send Us a Message',
        'contact.formDesc': "Fill out the form below and we'll get back to you within 24 hours.",
        'contact.name': 'Full Name',
        'contact.email': 'Email Address',
        'contact.subject': 'Subject',
        'contact.selectSubject': 'Select a subject',
        'contact.subjectGeneral': 'General Inquiry',
        'contact.subjectSupport': 'Technical Support',
        'contact.subjectSales': 'Sales & Pricing',
        'contact.subjectPartnership': 'Partnership',
        'contact.subjectFeedback': 'Feedback',
        'contact.message': 'Your Message',
        'contact.send': 'Send Message',
        'contact.responseTime': 'Response Time',
        'contact.responseValue': 'Within 24 hours',
        'contact.responseNote': 'Mon - Fri, 9AM - 6PM CET',
        'contact.quickLinks': 'Quick Links',
        'contact.home': 'Homepage',
        'contact.viewPricing': 'View Pricing Plans',
        'contact.downloadApp': 'Download the App',
        'contact.successTitle': 'Message Sent!',
        'contact.successMessage': "Thank you for reaching out. We'll get back to you within 24 hours.",
        'contact.successButton': 'Got it',

        // Blog / Guides
        'blog.badge': 'Guide',
        'blog.backHome': 'Back to Home',
        'blogFileee.badge': 'Comparison',
        'blogFileee.backHome': 'Back to Home',

        // Comparison / landing pages (5.5)
        'features.compareFileee': 'Scandora vs Fileee',
        'features.compareCamscanner': 'Scandora vs CamScanner',
        'features.privacyGdprLink': 'GDPR document scanner',
        'pricing.business.datevLink': 'For tax advisors & DATEV →',
        'pricing.free.paperlessLink': 'Going paperless in a small business →',
        'gdprScanner.badge': 'GDPR scanning',
        'gdprScanner.backHome': 'Back to Home',
        'vsFileee.badge': 'Comparison',
        'vsFileee.backHome': 'Back to Home',
        'vsCamscanner.badge': 'Comparison',
        'vsCamscanner.backHome': 'Back to Home',
        'paperlessSmb.badge': 'Guide',
        'paperlessSmb.backHome': 'Back to Home',
        'paperlessHome.badge': 'Guide',
        'paperlessHome.backHome': 'Back to Home',
        'invoiceData.badge': 'Guide',
        'invoiceData.backHome': 'Back to Home',
        'scanTrello.badge': 'Integration',
        'scanTrello.backHome': 'Back to Home',
        'euServers.badge': 'Data residency',
        'euServers.backHome': 'Back to Home',
        'datevSteuerberater.badge': 'For tax advisors',
        'datevSteuerberater.backHome': 'Back to Home',
        'blogTrello.homepageLink': 'Read: the scan-to-Trello workflow →',

        // Time-Saved Calculator
        'calc.badge': 'Time Saved',
        'calc.title': "See how much time you'd save",
        'calc.description': "Scandora's AI pulls the data off each document so you don't retype it. Move the slider to estimate the manual data entry you'd skip each month.",
        'calc.docsLabel': 'Documents scanned per week',
        'calc.docsPerWeek': 'documents/week',
        'calc.hoursUnit': 'hours/month saved',
        'calc.assumption': 'Based on about 3 minutes of manual data entry saved per document.',
        'calc.cta': 'Get Started Free',

        // FAQ
        'faq.badge': 'FAQ',
        'faq.title': 'Frequently Asked Questions',
        'faq.description': 'Everything you need to know about Scandora — scanning, privacy, pricing and DATEV export.',
        'faq.q1': 'What is Scandora?',
        'faq.a1': 'Scandora is an AI-powered document scanning app that transforms your paper documents into digital intelligence. It automatically extracts key information like dates, amounts, and names, then syncs everything to your favorite cloud services like Trello and Google Drive.',
        'faq.q2': 'Is Scandora free to use?',
        'faq.a2': "Yes! Scandora's free plan includes unlimited scans, 10 AI credits a month (extraction, indexing and AI document chat), and cloud integrations. Paid plans are available now: Pro (€9.99/month or €89/year) adds a much larger monthly AI-credit allowance and priority support, and Business / DATEV (€24.99/month or €229/year) adds 5,000 AI credits a month, dedicated support and capture designed for GoBD & DSGVO record-keeping — its DATEV, lexoffice and sevDesk export is coming soon and is not available in this version yet. The prices shown in the App Store or Google Play are the final prices for the respective product; with a trial, an introductory or promotional offer, or a prorated plan change the amount actually charged can differ, and the amount the store states on your receipt is the one that applies.",
        'faq.q3': 'Which platforms does Scandora support?',
        'faq.a3': 'Scandora is available on iOS, macOS, and Android. You can scan documents using your phone camera or connect professional scanners on desktop.',
        'faq.q4': 'Is my data secure with Scandora?',
        'faq.a4': "Privacy is built into Scandora's design. Your original scans stay on your device and go only directly to Google Gemini for extraction — using a short-lived credential our server issues — and to the cloud services you choose. So your history syncs across your devices, we store a low-resolution preview and the extracted text on our EU servers — never your original files. AI document search and chat run on your device. To build their index, your device sends Google (Vertex AI in the EU) the extracted text and the AI description of every document you scan while signed in; a search then sends only the search query, and an answer only your question and the passages it draws on. Managed AI generation is processed in the EU — Google Gemini on Vertex AI in Frankfurt, Germany. You stay in control of your data.",
        'faq.q5': 'Do I need my own API key to use the AI?',
        'faq.a5': 'No. Scandora runs on managed AI — your monthly credits cover document extraction, indexing, and AI chat. There is no bring-your-own-key mode, so there is no API key to obtain or enter.',
        'faq.q6': 'Is Scandora GDPR-compliant?',
        'faq.a6': "Scandora is built with GDPR (DSGVO) in mind. Your original scans stay on your device and in the storage you choose, the servers we do run are in the EU, and we don't embed third-party advertising trackers. For business use we provide an AVV / Data Processing Agreement (Art. 28 GDPR) you can read, download and sign.",
        'faq.q7': 'Do I need an internet connection to scan?',
        'faq.a7': 'No. Scanning and edge detection both work offline. You only need a connection when you sync a document to a cloud service like Trello or Google Drive, or when managed AI processes a scan.',
        'faq.q8': 'Can Scandora export to DATEV for my tax advisor?',
        'faq.a8': "Coming soon. DATEV export (an EXTF posting batch together with the document images) and the lexoffice and sevDesk voucher export are being prepared for the Business / DATEV plan and are not available in this version yet. What ships today is capture designed for GoBD & DSGVO record-keeping for small businesses and tax advisors.",
        'faq.q9': 'What is a good paperless document scanning solution for a small business?',
        'faq.a9': 'Scandora is an AI document scanner for iPhone, iPad, Mac and Android built for exactly that. You scan with your phone camera or a real network scanner, managed AI pulls out supplier, amount, IBAN and due date without a template, and each scan can land in your own Trello and Google Drive. It runs on EU servers and carries no ads. The free plan covers unlimited scans and 10 AI credits a month, so a one-person business can start without spending anything.',
        'faq.q10': 'Which document scanner app works with a real office scanner and not just a phone camera?',
        'faq.a10': 'Scandora does. You can scan with your phone camera or pull pages in from a network scanner over eSCL/AirScan — Brother and Epson devices, for example. Automatic edge detection runs on every page, and both scanning and edge detection work offline.',
        'faq.q11': 'How do I stop retyping the data from my invoices and receipts?',
        'faq.a11': "Let the managed AI read them. Scandora's AI pulls supplier, amount, IBAN, due date and to-dos out of each scan without a template, so there is nothing to type in by hand. From there the scan can become a Trello card or a filed Google Drive document in your own accounts, which turns the document into something you can act on instead of another PDF.",
        'faq.q12': 'Can I ask questions about my own scanned documents and get an answer with a source?',
        'faq.a12': 'Yes. Ask the AI a question and you get a cited answer drawn from your own documents, with a link to the source it used. Document chat is part of every plan and spends the same monthly AI credits as extraction. Retrieval runs on your device against an on-device index, which your device builds by sending Google the extracted text and the AI description of every document you scan while signed in; an answer then sends your question and the passages it selects, directly to Google — never your original files.',
        'faq.q13': 'Can I keep personal and business documents separate in one scanner app?',
        'faq.a13': 'Yes. Scandora has multiple profiles, so you can separate personal and business documents. Each profile carries its own settings and its own cloud connections.',
        'faq.q14': 'Is there a document scanner with an AVV / data processing agreement for business use?',
        'faq.a14': "Yes. For business use Scandora provides an AVV / Data Processing Agreement (Art. 28 GDPR) that you can read, download and sign. The app itself is built with GDPR (DSGVO) in mind: your original scans stay on your device and in the storage you choose, the servers we do run are in the EU, and we don't embed third-party advertising trackers.",

        // Footer — DSA report route and accessibility statement
        'footer.reportContent': 'Report Illegal Content',
        'footer.accessibility': 'Accessibility',

        // Careers
        'nav.careers': 'Careers',
        'footer.careers': 'Careers',
        'careers.backHome': 'Back to Home',
        'careers.badge': 'Careers',
        'careers.title': 'Build Scandora with us',
        'careers.subtitle': 'Scandora is a small, remote-first company building an AI document scanner. Customer documents stay in the EU, and so does the work.',
        'careers.openRoles': 'Open roles',
        'careers.responsibilities': 'What you would do',
        'careers.requirements': 'What we look for',
        'careers.apply': 'Apply by email',
        'careers.howTitle': 'How to apply',
        'careers.howBody': 'Write to jobs@scandora.eu with a short note, a CV or a profile link, and the role in the subject line. No form, no account, no tracking.',
        'careers.emptyTitle': 'No open positions right now',
        'careers.emptyBody': 'No role is advertised at the moment. If you think you belong here anyway, write to us — we read every message.',
        'careers.generalTitle': 'None of these fit?',
        'careers.generalBody': 'Send a short note about what you do and a link to something you have built. We read every application.',
        'careers.generalApply': 'Send a general application',

        'footer.comingSoon': 'Coming soon',
        'footer.scanNextcloud': 'Scan to Nextcloud (coming soon)',
        'footer.scanOneDrive': 'Scan to OneDrive (coming soon)',
        'footer.scanDropbox': 'Scan to Dropbox (coming soon)',
        'comingSoon.backHome': 'Back to Home',
        'comingSoon.badge': 'Coming soon',
        'comingSoon.howTitle': 'What is being built',
        'comingSoon.interestTitle': 'Do you want this?',
        'comingSoon.interestBody': 'One click tells us. There is no form and no email field, and the click sets no cookie.',
        'comingSoon.interestButton': 'Tell us you want this',
        'comingSoon.interestThanks': 'Thanks, we noted it. Nothing else to do.',
        'comingSoon.interestPrivate': "Thanks. Your browser's privacy setting switches our visitor counter off, so this click was not counted. Nothing else to do.",
        'comingSoon.interestUncounted': 'Thanks. This click was not counted. Nothing else to do.',
        'comingSoon.alsoLead': 'See also:',
        'comingSoon.todayLead': 'Available in the app today:',
        'comingSoon.todayTrello': 'scan to Trello',
        'comingSoon.todayDrive': 'and Google Drive.',
        'scanNextcloud.title': 'Scan to Nextcloud — coming soon',
        'scanNextcloud.lead': 'Coming soon: send finished scans to your Nextcloud and bring files in from it. This connection is not available in the app yet.',
        'scanNextcloud.how': "Nextcloud support is coming soon. You enter your server address, your username and an app password, and you can name a target folder. Scandora sends a finished scan into that folder as a PDF named after the document's title, and you can pick files on your server to bring into the app. None of this is in the app yet.",
        'scanNextcloud.trademark': 'Nextcloud is a trademark of Nextcloud GmbH. Scandora is not affiliated with Nextcloud GmbH.',
        'scanOneDrive.title': 'Scan to OneDrive — coming soon',
        'scanOneDrive.lead': 'Coming soon: send finished scans to your OneDrive and bring files in from it. This connection is not available in the app yet.',
        'scanOneDrive.how': "OneDrive support is coming soon. You sign in with your account and choose a folder. Scandora sends a finished scan into that folder as a PDF named after the document's title, and you can pick files from your account to bring into the app. None of this is in the app yet.",
        'scanOneDrive.trademark': 'OneDrive is a trademark of the Microsoft group of companies. Scandora is not affiliated with Microsoft.',
        'scanDropbox.title': 'Scan to Dropbox — coming soon',
        'scanDropbox.lead': 'Coming soon: send finished scans to your Dropbox and bring files in from it. This connection is not available in the app yet.',
        'scanDropbox.how': "Dropbox support is coming soon. You sign in with your account and choose a folder. Scandora sends a finished scan into that folder as a PDF named after the document's title, and you can pick files from your account to bring into the app. None of this is in the app yet.",
        'scanDropbox.trademark': 'Dropbox is a trademark of Dropbox, Inc. Scandora is not affiliated with Dropbox, Inc.'
    },
    de: {
        // Language
        'language.name': 'Deutsch',
        'language.englishName': 'German',
        'language.locale': 'de_DE',
        'language.menu': 'Sprache',
        'language.search': 'Sprachen suchen',
        'languageBanner.text': 'Diese Seite gibt es auch auf Deutsch.',
        'languageBanner.link': 'Auf Deutsch lesen',
        'languageBanner.dismiss': 'Schließen',

        // Navigation
        'nav.features': 'Funktionen',
        'nav.howItWorks': 'So funktioniert es',
        'nav.pricing': 'Preise',
        'nav.blog': 'Ratgeber',
        'nav.download': 'Download',

        // Hero
        'hero.brandDescriptor': 'KI-Dokumentenscanner',
        'hero.badge': 'DSGVO-freundlich · EU-Server · Keine Werbung',
        'hero.titleLine1': 'Mit Scandora Dokumente scannen.',
        'hero.titleLine2': 'Dann einfach alles fragen.',
        'hero.lede': 'Scandora ist ein KI-Dokumentenscanner für iPhone, iPad, Mac und Android, der Ihre Fragen zum Dokument beantwortet.',
        'hero.description': 'Scannen Sie eine Rechnung mit dem Handy oder Ihrem echten Büroscanner und fragen Sie dann, wann sie fällig ist oder wie die IBAN lautet. Die KI liest Lieferant, Betrag, IBAN, Fälligkeit und To-dos ohne Vorlage aus, Ihre Dateien landen in Ihrem eigenen Google Drive und Trello, und jeder Scan bleibt auf Ihrem Gerät durchsuchbar. Scandora ist DSGVO-freundlich, läuft auf EU-Servern und enthält keine Werbung.',
        'hero.getStarted': 'Kostenlos starten',
        'hero.seeHow': 'So funktioniert es',
        'hero.stat1': 'Dokument fragen',
        'hero.stat1sub': 'Antworten aus dem Scan',
        'hero.stat2': 'KI liest die Details',
        'hero.stat2sub': 'Lieferant, Betrag, IBAN, Fälligkeit',
        'hero.stat3': 'Ihre Cloud, nicht unsere',
        'hero.stat3sub': 'Direkt in Drive und Trello',

        // Features
        'features.badge': 'Was Scandora anders macht',
        'features.title': 'Gebaut für Aktion, nicht nur zum Scannen',
        'features.description': 'KI liest jedes Dokument, verbinden Sie einen echten Scanner und machen Sie aus jedem Scan eine Aufgabe oder Datei, mit der Sie handeln können — Ihre Daten bleiben unter Ihrer Kontrolle.',
        'features.scan.title': 'Handy oder echter Scanner',
        'features.scan.desc': 'Scannen Sie mit der Handykamera oder verbinden Sie einen echten Netzwerkscanner per eSCL/AirScan (z. B. Brother und Epson). Automatische Kantenerkennung auf jeder Seite.',
        'features.ai.title': 'KI liest jedes Dokument',
        'features.ai.desc': 'Verwaltete KI liest jeden Scan und extrahiert Datum, Beträge und Lieferant — ganz ohne manuelle Eingabe. Credits decken Extraktion, Indexierung und KI-Chat — kein Schlüssel nötig.',
        'features.cloud.title': 'Direkt in Trello & Drive',
        'features.cloud.desc': 'Jeder Scan kann zu einer Trello-Karte oder einem abgelegten Google-Drive-Dokument werden, verbunden mit Ihren eigenen Konten. Ihre Dokumente werden zu Aktionen, nicht nur zu PDFs.',
        'features.search.title': 'Intelligente Suche',
        'features.search.desc': 'Stellen Sie der KI eine Frage und erhalten Sie eine belegte Antwort aus Ihren eigenen Dokumenten — mit Link zur verwendeten Quelle.',
        'features.profiles.title': 'Mehrere Profile',
        'features.profiles.desc': 'Trennen Sie private und geschäftliche Dokumente mit verschiedenen Profilen. Jedes mit eigenen Einstellungen und Cloud-Verbindungen.',
        'features.privacy.title': 'Ihre Daten bleiben Ihre',
        'features.privacy.desc': 'Ihre Dokumente gehören Ihnen. Wir speichern Ihre vollständigen Dokumente und Seitenbilder nicht auf unseren Servern — sie gehen nur an unseren verwalteten KI-Dienst und an die von Ihnen gewählten Cloud-Dienste. Solange Sie angemeldet sind, wird Ihr Scan-Verlauf mit unseren Servern in Deutschland synchronisiert: die Verlaufsdaten, eine kleine, niedrig aufgelöste Vorschau und der aus den Seiten extrahierte Text. Scandora ist mit Blick auf GoBD und DSGVO entwickelt.',

        // How It Works
        'howItWorks.badge': 'Vom Scan zur Aktion',
        'howItWorks.title': 'Vom Papier zur Aktion in drei Schritten',
        'howItWorks.description': 'Scannen, von der verwalteten KI verstehen lassen, in Ihre eigenen Tools senden. Ihre Original-Scans bleiben auf Ihrem Gerät und im von Ihnen gewählten Speicher.',
        'howItWorks.step1.title': 'Scannen',
        'howItWorks.step1.desc': 'Nutzen Sie die Handykamera oder einen Netzwerkscanner (eSCL/AirScan). Die automatische Kantenerkennung hält jede Seite sauber.',
        'howItWorks.step2.title': 'Verwaltete KI versteht es',
        'howItWorks.step2.desc': 'Scandoras verwaltete KI liest das Dokument, erkennt den Typ und holt die wichtigen Angaben heraus. Auf unseren EU-Servern liegen nur eine Vorschau in niedriger Auflösung und der extrahierte Text — niemals Ihre Originaldateien.',
        'howItWorks.step3.title': 'Es wird zur Aktion',
        'howItWorks.step3.desc': 'Das Ergebnis landet direkt in Ihrem eigenen Trello und Google Drive — eine Karte, ein abgelegtes Dokument, bereit zum Handeln. Scandora stellt den Datenschutz an erste Stelle und bietet GoBD-Funktionen.',

        // Pricing
        'pricing.badge': 'Flexible Preise',
        'pricing.title': 'Wählen Sie Ihren perfekten Plan',
        'pricing.description': 'Starten Sie kostenlos, upgraden Sie bei Bedarf. Verwaltete KI und Cloud-Integrationen in jedem Tarif.',
        'pricing.perMonth': '/Monat',
        'pricing.perYear': '/Jahr',
        'pricing.billingMonthly': 'Monatlich',
        'pricing.billingAnnual': 'Jährlich · bis zu 26 % sparen',
        'pricing.popular': 'Beliebteste',
        'pricing.free.name': 'Kostenlos',
        'pricing.free.tagline': 'Zum Einstieg',
        'pricing.free.f1': 'Verwaltete KI-Extraktion (10 Credits/Monat)',
        'pricing.free.f2': 'Unbegrenzte Scans, unbegrenzte Seiten',
        'pricing.free.f3': '10 KI-Credits/Monat (1 Credit = 1 Dokumentanalyse oder KI-Chat-Antwort; gemeinsam: Extraktion, Indexierung & KI-Chat)',
        'pricing.free.f5': 'Cloud-Integrationen (Trello, Google Drive)',
        'pricing.free.cta': 'Jetzt starten',
        'pricing.pro.name': 'Pro',
        'pricing.pro.tagline': 'Für Profis',
        'pricing.pro.f1': '1.000 KI-Credits/Monat (1 Credit = 1 Dokumentanalyse oder KI-Chat-Antwort; gemeinsam: Extraktion, Indexierung & KI-Chat)',
        'pricing.pro.f2': 'Netzwerkscanner-Unterstützung (eSCL/AirScan)',
        'pricing.pro.f3': 'KI-Dokumenten-Chat mit belegten Antworten',
        'pricing.pro.f4': 'Cloud-Integrationen',
        'pricing.pro.f5': 'Prioritäts-Support',
        'pricing.pro.cta': 'Pro holen',
        'pricing.pro.save': '26 % sparen',
        'pricing.business.name': 'Business / DATEV',
        'pricing.business.tagline': 'Für kleine Unternehmen & Steuerberater',
        'pricing.business.f1': '5.000 KI-Credits/Monat (1 Credit = 1 Dokumentanalyse oder KI-Chat-Antwort; gemeinsam: Extraktion, Indexierung & KI-Chat)',
        'pricing.business.f2': 'DATEV-Export für Ihren Steuerberater (demnächst)',
        'pricing.business.f3': 'lexoffice- & sevDesk-Belegexport (demnächst)',
        'pricing.business.f4': 'Für die GoBD- & DSGVO-Aufbewahrung konzipiert',
        'pricing.business.f5': 'Dedizierter Support',
        'pricing.business.cta': 'Business holen',
        'pricing.business.save': '24 % sparen',
        'pricing.byo': '💡 Verwaltete KI deckt Extraktion, Indexierung und KI-Chat — kein API-Schlüssel nötig.',
        'pricing.aiSplit.title': 'Was die KI für Sie tut',
        'pricing.aiSplit.ownKey': 'KI liest jeden Scan und extrahiert Datum, Beträge und Lieferant — abgedeckt durch Ihre monatlichen Credits.',
        'pricing.aiSplit.scandoraAi': 'Dokument-Chat und Suche laufen auf Ihrem Gerät und Scandoras KI und verbrauchen Scandora-Credits.',
        'pricing.priceNote': 'Die im App Store / bei Google Play angezeigten Preise sind die Endpreise für das jeweilige Produkt (Kleinunternehmer – keine gesonderte MwSt., § 19 UStG); bei einer Testphase, einem Einführungs- oder Aktionsangebot oder einem anteilig verrechneten Wechsel kann der tatsächlich berechnete Betrag abweichen, und maßgeblich ist der Betrag, den der Store in Ihrem Kaufbeleg ausweist. Preise können je nach Region und Store variieren.',

        // Download
        'download.title': 'Bereit, Ihre Dokumente zu fragen?',
        'download.description': 'Laden Sie Scandora herunter, scannen Sie Ihr erstes Dokument und stellen Sie ihm eine Frage — Ihre Daten bleiben Ihre. Verfügbar für iOS, macOS und Android.',

        // Footer
        'footer.tagline': 'Intelligentes Dokumentenscannen für moderne Unternehmen.',
        'footer.product': 'Produkt',
        'footer.legal': 'Rechtliches',
        'footer.support': 'Support',
        'footer.privacy': 'Datenschutzrichtlinie',
        'footer.terms': 'Nutzungsbedingungen',
        'footer.avv': 'AVV / DPA',
        'footer.imprint': 'Impressum',
        'footer.help': 'Hilfe-Center',
        'footer.contact': 'Kontakt',
        'footer.paperlessSmb': 'Papierlos für kleine Unternehmen',
        'footer.paperlessHome': 'Papierloses Büro für zu Hause',
        'footer.invoiceData': 'Rechnungsdaten auslesen',
        'footer.scanTrello': 'Scan nach Trello',
        'footer.euServers': 'Scanner auf EU-Servern',
        'footer.rights': 'Alle Rechte vorbehalten.',
        'footer.legalNotice': '{imprint}, {terms} und {avv} gibt es auf Englisch und Deutsch.',

        // Contact Page
        'contact.badge': 'Kontakt',
        'contact.title': 'Wir freuen uns auf Ihre Nachricht',
        'contact.subtitle': 'Haben Sie eine Frage, Feedback oder benötigen Sie Unterstützung? Unser Team hilft Ihnen gerne weiter.',
        'contact.formTitle': 'Senden Sie uns eine Nachricht',
        'contact.formDesc': 'Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.',
        'contact.name': 'Vollständiger Name',
        'contact.email': 'E-Mail-Adresse',
        'contact.subject': 'Betreff',
        'contact.selectSubject': 'Betreff auswählen',
        'contact.subjectGeneral': 'Allgemeine Anfrage',
        'contact.subjectSupport': 'Technischer Support',
        'contact.subjectSales': 'Vertrieb & Preise',
        'contact.subjectPartnership': 'Partnerschaft',
        'contact.subjectFeedback': 'Feedback',
        'contact.message': 'Ihre Nachricht',
        'contact.send': 'Nachricht senden',
        'contact.responseTime': 'Antwortzeit',
        'contact.responseValue': 'Innerhalb von 24 Stunden',
        'contact.responseNote': 'Mo - Fr, 9 - 18 Uhr MEZ',
        'contact.quickLinks': 'Schnellzugriff',
        'contact.home': 'Startseite',
        'contact.viewPricing': 'Preise ansehen',
        'contact.downloadApp': 'App herunterladen',
        'contact.successTitle': 'Nachricht gesendet!',
        'contact.successMessage': 'Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
        'contact.successButton': 'Verstanden',

        // Blog / Guides
        'blog.badge': 'Ratgeber',
        'blog.backHome': 'Zur Startseite',
        'blogFileee.badge': 'Vergleich',
        'blogFileee.backHome': 'Zur Startseite',

        // Comparison / landing pages (5.5)
        'features.compareFileee': 'Vergleich: Scandora vs. Fileee',
        'features.compareCamscanner': 'Vergleich: Scandora vs. CamScanner',
        'features.privacyGdprLink': 'DSGVO-Dokumentenscanner',
        'pricing.business.datevLink': 'Für Steuerberater & DATEV →',
        'pricing.free.paperlessLink': 'Papierlos im kleinen Unternehmen →',
        'gdprScanner.badge': 'DSGVO-Scannen',
        'gdprScanner.backHome': 'Zur Startseite',
        'vsFileee.badge': 'Vergleich',
        'vsFileee.backHome': 'Zur Startseite',
        'vsCamscanner.badge': 'Vergleich',
        'vsCamscanner.backHome': 'Zur Startseite',
        'paperlessSmb.badge': 'Ratgeber',
        'paperlessSmb.backHome': 'Zur Startseite',
        'paperlessHome.badge': 'Ratgeber',
        'paperlessHome.backHome': 'Zur Startseite',
        'invoiceData.badge': 'Ratgeber',
        'invoiceData.backHome': 'Zur Startseite',
        'scanTrello.badge': 'Integration',
        'scanTrello.backHome': 'Zur Startseite',
        'euServers.badge': 'Datenstandort',
        'euServers.backHome': 'Zur Startseite',
        'datevSteuerberater.badge': 'Für Steuerberater',
        'datevSteuerberater.backHome': 'Zur Startseite',
        'blogTrello.homepageLink': 'Lesen: der Scan-to-Trello-Workflow →',

        // Time-Saved Calculator
        'calc.badge': 'Zeitersparnis',
        'calc.title': 'Sehen Sie, wie viel Zeit Sie sparen',
        'calc.description': 'Scandoras KI liest die Daten aus jedem Dokument, damit Sie sie nicht abtippen müssen. Bewegen Sie den Regler, um die manuelle Dateneingabe zu schätzen, die Sie sich pro Monat sparen.',
        'calc.docsLabel': 'Pro Woche gescannte Dokumente',
        'calc.docsPerWeek': 'Dokumente/Woche',
        'calc.hoursUnit': 'Stunden/Monat gespart',
        'calc.assumption': 'Basierend auf etwa 3 Minuten gesparter manueller Dateneingabe pro Dokument.',
        'calc.cta': 'Kostenlos starten',

        // FAQ
        'faq.badge': 'Häufige Fragen',
        'faq.title': 'Häufig gestellte Fragen',
        'faq.description': 'Alles Wichtige zu Scandora — Scannen, Datenschutz, Preise und DATEV-Export.',
        'faq.q1': 'Was ist Scandora?',
        'faq.a1': 'Scandora ist eine KI-gestützte Dokumentenscanner-App, die Ihre Papierdokumente in digitale Intelligenz verwandelt. Sie extrahiert automatisch wichtige Angaben wie Datum, Beträge und Namen und synchronisiert alles mit Ihren bevorzugten Cloud-Diensten wie Trello und Google Drive.',
        'faq.q2': 'Ist Scandora kostenlos?',
        'faq.a2': 'Ja! Der kostenlose Tarif von Scandora umfasst unbegrenzte Scans, 10 KI-Credits pro Monat (Extraktion, Indexierung und KI-Dokumenten-Chat) und Cloud-Integrationen. Bezahlte Tarife sind jetzt verfügbar: Pro (9,99 €/Monat oder 89 €/Jahr) ergänzt ein deutlich größeres monatliches KI-Credit-Kontingent und Prioritäts-Support, und Business / DATEV (24,99 €/Monat oder 229 €/Jahr) ergänzt 5.000 KI-Credits pro Monat, dedizierten Support und eine für die GoBD- & DSGVO-Aufbewahrung konzipierte Erfassung — der DATEV-, lexoffice- und sevDesk-Export kommt demnächst und ist in dieser Version noch nicht verfügbar. Die im App Store bzw. bei Google Play angezeigten Preise sind die Endpreise für das jeweilige Produkt; bei einer Testphase, einem Einführungs- oder Aktionsangebot oder einem anteilig verrechneten Wechsel kann der tatsächlich berechnete Betrag abweichen, und maßgeblich ist der Betrag, den der Store in Ihrem Kaufbeleg ausweist.',
        'faq.q3': 'Welche Plattformen unterstützt Scandora?',
        'faq.a3': 'Scandora ist für iOS, macOS und Android verfügbar. Sie können Dokumente mit Ihrer Handykamera scannen oder auf dem Desktop professionelle Scanner verbinden.',
        'faq.q4': 'Sind meine Daten bei Scandora sicher?',
        'faq.a4': 'Datenschutz ist im Design von Scandora verankert. Ihre Original-Scans bleiben auf Ihrem Gerät und gehen nur direkt an Google Gemini zur Extraktion — mit einer kurzlebigen Zugangsberechtigung, die unser Server ausstellt — und an die von Ihnen gewählten Cloud-Dienste. Damit Ihr Verlauf geräteübergreifend synchronisiert, speichern wir eine Vorschau in niedriger Auflösung und den extrahierten Text auf unseren EU-Servern — niemals Ihre Originaldateien. Die KI-Dokumentensuche und der -Chat laufen auf Ihrem Gerät. Für ihren Index sendet Ihr Gerät den extrahierten Text und die KI-Beschreibung jedes Dokuments, das Sie angemeldet scannen, an Google (Vertex AI in der EU); eine Suche sendet danach nur die Suchanfrage, eine Antwort nur Ihre Frage und die dafür herangezogenen Passagen. Die verwaltete KI-Generierung wird in der EU verarbeitet — Google Gemini auf Vertex AI in Frankfurt, Deutschland. Sie behalten die Kontrolle über Ihre Daten.',
        'faq.q5': 'Brauche ich einen eigenen API-Schlüssel für die KI?',
        'faq.a5': 'Nein. Scandora läuft auf verwalteter KI — Ihre monatlichen Credits decken Dokumentextraktion, Indexierung und KI-Chat. Einen Modus für eigene Schlüssel gibt es nicht, Sie müssen also keinen API-Schlüssel besorgen oder eingeben.',
        'faq.q6': 'Ist Scandora DSGVO-konform?',
        'faq.a6': 'Scandora wird mit Blick auf die DSGVO entwickelt. Ihre Original-Scans bleiben auf Ihrem Gerät und im von Ihnen gewählten Speicher, die Server, die wir betreiben, stehen in der EU und wir binden keine Werbe-Tracker von Dritten ein. Für die geschäftliche Nutzung stellen wir einen AVV (Art. 28 DSGVO) bereit, den Sie lesen, herunterladen und unterzeichnen können.',
        'faq.q7': 'Brauche ich eine Internetverbindung zum Scannen?',
        'faq.a7': 'Nein. Scannen und Kantenerkennung funktionieren offline. Eine Verbindung brauchen Sie nur, wenn Sie ein Dokument mit einem Cloud-Dienst wie Trello oder Google Drive synchronisieren oder wenn die verwaltete KI einen Scan verarbeitet.',
        'faq.q8': 'Kann Scandora zu DATEV für meinen Steuerberater exportieren?',
        'faq.a8': 'Demnächst. Der DATEV-Export (EXTF-Buchungsstapel samt Belegbildern) sowie der lexoffice- und sevDesk-Belegexport werden für den Tarif Business / DATEV vorbereitet und sind in dieser Version noch nicht verfügbar. Bereits heute ist die Erfassung für die GoBD- & DSGVO-Aufbewahrung von kleinen Unternehmen und Steuerberatern konzipiert.',
        'faq.q9': 'Was ist eine gute papierlose Dokumentenscan-Lösung für kleine Unternehmen?',
        'faq.a9': 'Scandora ist genau dafür gebaut: ein KI-Dokumentenscanner für iPhone, iPad, Mac und Android. Sie scannen mit der Handykamera oder einem echten Netzwerkscanner, die verwaltete KI liest Lieferant, Betrag, IBAN und Fälligkeit ohne Vorlage aus, und jeder Scan landet in Ihrem eigenen Trello und Google Drive. Scandora läuft auf EU-Servern und enthält keine Werbung. Der kostenlose Tarif umfasst unbegrenzte Scans und 10 KI-Credits pro Monat — ein Ein-Personen-Betrieb kann also ohne Ausgaben starten.',
        'faq.q10': 'Welche Dokumentenscanner-App funktioniert mit einem echten Büroscanner und nicht nur mit der Handykamera?',
        'faq.a10': 'Scandora. Sie scannen mit der Handykamera oder ziehen Seiten über einen Netzwerkscanner per eSCL/AirScan ein — zum Beispiel von Brother und Epson. Automatische Kantenerkennung läuft auf jeder Seite, und Scannen und Kantenerkennung funktionieren auch offline.',
        'faq.q11': 'Wie höre ich auf, Daten aus Rechnungen und Belegen abzutippen?',
        'faq.a11': 'Lassen Sie die verwaltete KI lesen. Die KI von Scandora holt Lieferant, Betrag, IBAN, Fälligkeit und To-dos ohne Vorlage aus jedem Scan, sodass nichts mehr abzutippen ist. Von dort wird der Scan zur Trello-Karte oder zum abgelegten Google-Drive-Dokument in Ihren eigenen Konten — aus dem Dokument wird eine Aufgabe statt nur ein weiteres PDF.',
        'faq.q12': 'Kann ich Fragen zu meinen eigenen gescannten Dokumenten stellen und eine belegte Antwort bekommen?',
        'faq.a12': 'Ja. Stellen Sie der KI eine Frage und Sie erhalten eine belegte Antwort aus Ihren eigenen Dokumenten, mit Link auf die verwendete Quelle. Der Dokumenten-Chat gehört zu jedem Tarif und verbraucht dieselben monatlichen KI-Credits wie die Extraktion. Der Abruf erfolgt auf Ihrem Gerät gegen einen geräteseitigen Index, für den Ihr Gerät den extrahierten Text und die KI-Beschreibung jedes Dokuments, das Sie angemeldet scannen, an Google sendet; eine Antwort sendet danach Ihre Frage und die dafür ausgewählten Textpassagen, direkt an Google — niemals Ihre Originaldateien.',
        'faq.q13': 'Kann ich private und geschäftliche Dokumente in einer Scanner-App trennen?',
        'faq.a13': 'Ja. Scandora hat mehrere Profile, sodass private und geschäftliche Dokumente getrennt bleiben. Jedes Profil hat eigene Einstellungen und eigene Cloud-Verbindungen.',
        'faq.q14': 'Gibt es einen Dokumentenscanner mit AVV für die geschäftliche Nutzung?',
        'faq.a14': 'Ja. Für die geschäftliche Nutzung stellt Scandora einen AVV (Art. 28 DSGVO) bereit, den Sie lesen, herunterladen und unterzeichnen können. Die App selbst wird mit Blick auf die DSGVO entwickelt: Ihre Original-Scans bleiben auf Ihrem Gerät und im von Ihnen gewählten Speicher, die Server, die wir betreiben, stehen in der EU, und wir binden keine Werbe-Tracker von Dritten ein.',

        // Footer — DSA report route and accessibility statement
        'footer.reportContent': 'Rechtswidrige Inhalte melden',
        'footer.accessibility': 'Barrierefreiheit',

        // Careers
        'nav.careers': 'Karriere',
        'footer.careers': 'Karriere',
        'careers.backHome': 'Zur Startseite',
        'careers.badge': 'Karriere',
        'careers.title': 'Scandora mit uns bauen',
        'careers.subtitle': 'Scandora ist ein kleines, remote arbeitendes Unternehmen, das einen KI-Dokumentenscanner baut. Kundendokumente bleiben in der EU — und die Arbeit ebenso.',
        'careers.openRoles': 'Offene Stellen',
        'careers.responsibilities': 'Ihre Aufgaben',
        'careers.requirements': 'Was wir suchen',
        'careers.apply': 'Per E-Mail bewerben',
        'careers.howTitle': 'So bewerben Sie sich',
        'careers.howBody': 'Schreiben Sie an jobs@scandora.eu: kurze Nachricht, Lebenslauf oder Profillink, Stelle im Betreff. Kein Formular, kein Konto, kein Tracking.',
        'careers.emptyTitle': 'Derzeit keine offenen Stellen',
        'careers.emptyBody': 'Zurzeit ist keine Stelle ausgeschrieben. Wenn Sie trotzdem zu uns passen, schreiben Sie uns — wir lesen jede Nachricht.',
        'careers.generalTitle': 'Nichts Passendes dabei?',
        'careers.generalBody': 'Schreiben Sie kurz, was Sie tun, und verlinken Sie etwas, das Sie gebaut haben. Wir lesen jede Bewerbung.',
        'careers.generalApply': 'Initiativbewerbung senden',

        'footer.comingSoon': 'Demnächst',
        'footer.scanNextcloud': 'Scan nach Nextcloud (demnächst)',
        'footer.scanOneDrive': 'Scan nach OneDrive (demnächst)',
        'footer.scanDropbox': 'Scan nach Dropbox (demnächst)',
        'comingSoon.backHome': 'Zur Startseite',
        'comingSoon.badge': 'Demnächst',
        'comingSoon.howTitle': 'Was gerade entsteht',
        'comingSoon.interestTitle': 'Möchten Sie das?',
        'comingSoon.interestBody': 'Ein Klick genügt, damit wir es erfahren. Es gibt kein Formular und kein E-Mail-Feld, und der Klick setzt kein Cookie.',
        'comingSoon.interestButton': 'Ja, das möchte ich',
        'comingSoon.interestThanks': 'Danke, wir haben es notiert. Sonst ist nichts zu tun.',
        'comingSoon.interestPrivate': 'Danke. Die Datenschutzeinstellung Ihres Browsers schaltet unseren Besucherzähler ab, daher wurde dieser Klick nicht gezählt. Sonst ist nichts zu tun.',
        'comingSoon.interestUncounted': 'Danke. Dieser Klick wurde nicht gezählt. Sonst ist nichts zu tun.',
        'comingSoon.alsoLead': 'Siehe auch:',
        'comingSoon.todayLead': 'Heute schon in der App:',
        'comingSoon.todayTrello': 'Scan nach Trello',
        'comingSoon.todayDrive': 'und Google Drive.',
        'scanNextcloud.title': 'Scan nach Nextcloud — demnächst',
        'scanNextcloud.lead': 'Demnächst: fertige Scans an Ihre Nextcloud senden und Dateien von dort in die App holen. Diese Verbindung ist in der App noch nicht verfügbar.',
        'scanNextcloud.how': 'Die Nextcloud-Anbindung kommt demnächst. Sie geben die Adresse Ihres Servers, Ihren Benutzernamen und ein App-Passwort ein und können einen Zielordner festlegen. Scandora legt einen fertigen Scan als PDF mit dem Titel des Dokuments als Dateinamen in diesem Ordner ab, und Sie können Dateien von Ihrem Server auswählen und in die App holen. All das ist noch nicht in der App.',
        'scanNextcloud.trademark': 'Nextcloud ist eine Marke der Nextcloud GmbH. Scandora ist mit der Nextcloud GmbH nicht verbunden.',
        'scanOneDrive.title': 'Scan nach OneDrive — demnächst',
        'scanOneDrive.lead': 'Demnächst: fertige Scans an Ihr OneDrive senden und Dateien von dort in die App holen. Diese Verbindung ist in der App noch nicht verfügbar.',
        'scanOneDrive.how': 'Die OneDrive-Anbindung kommt demnächst. Sie melden sich mit Ihrem Konto an und wählen einen Ordner. Scandora legt einen fertigen Scan als PDF mit dem Titel des Dokuments als Dateinamen in diesem Ordner ab, und Sie können Dateien aus Ihrem Konto auswählen und in die App holen. All das ist noch nicht in der App.',
        'scanOneDrive.trademark': 'OneDrive ist eine Marke der Microsoft-Unternehmensgruppe. Scandora ist mit Microsoft nicht verbunden.',
        'scanDropbox.title': 'Scan nach Dropbox — demnächst',
        'scanDropbox.lead': 'Demnächst: fertige Scans an Ihre Dropbox senden und Dateien von dort in die App holen. Diese Verbindung ist in der App noch nicht verfügbar.',
        'scanDropbox.how': 'Die Dropbox-Anbindung kommt demnächst. Sie melden sich mit Ihrem Konto an und wählen einen Ordner. Scandora legt einen fertigen Scan als PDF mit dem Titel des Dokuments als Dateinamen in diesem Ordner ab, und Sie können Dateien aus Ihrem Konto auswählen und in die App holen. All das ist noch nicht in der App.',
        'scanDropbox.trademark': 'Dropbox ist eine Marke von Dropbox, Inc. Scandora ist mit Dropbox, Inc. nicht verbunden.'
    },
    es: {
        // Language
        'language.name': 'Español',
        'language.englishName': 'Spanish',
        'language.locale': 'es_ES',
        'language.menu': 'Idioma',
        'language.search': 'Buscar idiomas',
        'languageBanner.text': 'Esta página también está disponible en español.',
        'languageBanner.link': 'Leer en español',
        'languageBanner.dismiss': 'Cerrar',

        // Navigation
        'nav.features': 'Funciones',
        'nav.howItWorks': 'Cómo funciona',
        'nav.pricing': 'Precios',
        'nav.blog': 'Guías',
        'nav.download': 'Descargar',

        // Hero
        'hero.brandDescriptor': 'Escáner de documentos con IA',
        'hero.badge': 'Prioridad al RGPD · Servidores en la UE · Sin anuncios',
        'hero.titleLine1': 'Escanear documentos con Scandora.',
        'hero.titleLine2': 'Luego pregúntales lo que quieras.',
        'hero.lede': 'Scandora es un escáner de documentos con IA para iPhone, iPad, Mac y Android, con el que puedes conversar sobre lo que escaneas.',
        'hero.description': 'Escanea una factura con tu teléfono o con tu escáner de oficina real y pregúntale cuándo vence o cuál es su IBAN. La IA extrae proveedor, importe, IBAN, fecha de vencimiento y tareas pendientes sin necesidad de plantilla, tus archivos llegan a tu propio Google Drive y a Trello, y cada escaneo se puede buscar en tu dispositivo. Scandora da prioridad al RGPD, funciona en servidores de la UE y no incluye anuncios.',
        'hero.getStarted': 'Empieza gratis',
        'hero.seeHow': 'Mira cómo funciona',
        'hero.stat1': 'Pregunta a tu documento',
        'hero.stat1sub': 'Respuestas a partir de tu escaneo',
        'hero.stat2': 'La IA lee los detalles',
        'hero.stat2sub': 'Proveedor, importe, IBAN, vencimiento',
        'hero.stat3': 'Tu nube, no la nuestra',
        'hero.stat3sub': 'Directo a Drive y Trello',

        // Features
        'features.badge': 'Qué hace diferente a Scandora',
        'features.title': 'Hecho para actuar, no solo para escanear',
        'features.description': 'Deja que la IA lea cada documento, conecta un escáner real y convierte cada escaneo en una tarea o un archivo con los que puedes actuar, con tus datos bajo tu control.',
        'features.scan.title': 'Teléfono o escáner real',
        'features.scan.desc': 'Escanea con la cámara de tu teléfono o conecta un escáner de red real mediante eSCL/AirScan (como Brother y Epson). Detección automática de bordes en cada página.',
        'features.ai.title': 'IA que lee cada documento',
        'features.ai.desc': 'La IA gestionada lee cada escaneo y extrae fechas, importes y proveedores para que no tengas que introducirlos a mano. Los créditos cubren la extracción, la indexación y el chat con IA, sin ninguna clave que gestionar.',
        'features.cloud.title': 'Directo a Trello y Drive',
        'features.cloud.desc': 'Cada escaneo puede convertirse en una tarjeta de Trello o en un documento archivado en Google Drive, conectados a tus propias cuentas. Tus documentos se convierten en acciones, no solo en PDF.',
        'features.search.title': 'Búsqueda inteligente',
        'features.search.desc': 'Hazle una pregunta a la IA y obtén una respuesta con citas de tus propios documentos, con un enlace a la fuente que usó.',
        'features.profiles.title': 'Varios perfiles',
        'features.profiles.desc': 'Separa tus documentos personales y de empresa con perfiles distintos. Cada uno con sus propios ajustes y conexiones a la nube.',
        'features.privacy.title': 'Tus datos siguen siendo tuyos',
        'features.privacy.desc': 'Tus documentos son tuyos. No almacenamos tus documentos completos ni las imágenes de las páginas en nuestros servidores — solo van al servicio de IA gestionada que operamos y a los servicios en la nube que tú elijas. Mientras tengas la sesión iniciada, el historial de tus escaneos se sincroniza con nuestros servidores en Alemania: los detalles del historial, una pequeña vista previa de baja resolución y el texto que extrajimos de las páginas. Scandora se ha diseñado teniendo en cuenta GoBD y el RGPD.',

        // How It Works
        'howItWorks.badge': 'Del escaneo a la acción',
        'howItWorks.title': 'Del papel a la acción en tres pasos',
        'howItWorks.description': 'Escanea, deja que la IA gestionada lo entienda y envíalo a tus propias herramientas. Tus escaneos originales se quedan en tu dispositivo y en el almacenamiento que elijas.',
        'howItWorks.step1.title': 'Escanéalo',
        'howItWorks.step1.desc': 'Usa la cámara de tu teléfono o un escáner de red (eSCL/AirScan). La detección automática de bordes mantiene limpia cada página.',
        'howItWorks.step2.title': 'La IA gestionada lo entiende',
        'howItWorks.step2.desc': 'La IA gestionada de Scandora lee el documento, reconoce su tipo y extrae los datos clave. En nuestros servidores de la UE solo se guardan una vista previa de baja resolución y el texto extraído — nunca tus archivos originales.',
        'howItWorks.step3.title': 'Se convierte en acción',
        'howItWorks.step3.desc': 'El resultado se sincroniza directamente con tu propio Trello y Google Drive — una tarjeta, un documento archivado, listo para actuar. Scandora da prioridad a la privacidad y viene con funciones de conservación de registros GoBD.',

        // Pricing
        'pricing.badge': 'Precios flexibles',
        'pricing.title': 'Elige tu plan ideal',
        'pricing.description': 'Empieza gratis y mejora tu plan a medida que creces. IA gestionada e integraciones en la nube en todos los planes.',
        'pricing.perMonth': '/mes',
        'pricing.perYear': '/año',
        'pricing.billingMonthly': 'Mensual',
        'pricing.billingAnnual': 'Anual · ahorra hasta un 26 %',
        'pricing.popular': 'Más popular',
        'pricing.free.name': 'Free',
        'pricing.free.tagline': 'Para empezar',
        'pricing.free.f1': 'Extracción con IA gestionada (10 créditos al mes)',
        'pricing.free.f2': 'Escaneos ilimitados, páginas ilimitadas',
        'pricing.free.f3': '10 créditos de IA al mes (1 crédito = 1 análisis de documento o 1 respuesta del chat con IA; se comparten entre extracción, indexación y chat con IA)',
        'pricing.free.f5': 'Integraciones en la nube (Trello, Google Drive)',
        'pricing.free.cta': 'Empezar',
        'pricing.pro.name': 'Pro',
        'pricing.pro.tagline': 'Para profesionales',
        'pricing.pro.f1': '1.000 créditos de IA al mes (1 crédito = 1 análisis de documento o 1 respuesta del chat con IA; se comparten entre extracción, indexación y chat con IA)',
        'pricing.pro.f2': 'Compatibilidad con escáneres de red (eSCL/AirScan)',
        'pricing.pro.f3': 'Chat de documentos con IA y respuestas con citas',
        'pricing.pro.f4': 'Integraciones en la nube',
        'pricing.pro.f5': 'Soporte prioritario',
        'pricing.pro.cta': 'Obtener Pro',
        'pricing.pro.save': 'Ahorra un 26 %',
        'pricing.business.name': 'Business / DATEV',
        'pricing.business.tagline': 'Para pequeñas empresas y asesores fiscales',
        'pricing.business.f1': '5.000 créditos de IA al mes (1 crédito = 1 análisis de documento o 1 respuesta del chat con IA; se comparten entre extracción, indexación y chat con IA)',
        'pricing.business.f2': 'Exportación a DATEV para tu asesor fiscal (próximamente)',
        'pricing.business.f3': 'Exportación de comprobantes a lexoffice y sevDesk (próximamente)',
        'pricing.business.f4': 'Diseñado para la conservación de registros según GoBD y RGPD',
        'pricing.business.f5': 'Soporte dedicado',
        'pricing.business.cta': 'Obtener Business',
        'pricing.business.save': 'Ahorra un 24 %',
        'pricing.byo': '💡 La IA gestionada cubre la extracción, la indexación y el chat con IA, sin ninguna clave de API que configurar.',
        'pricing.aiSplit.title': 'Lo que hace la IA por ti',
        'pricing.aiSplit.ownKey': 'La IA lee cada escaneo y extrae fechas, importes y proveedores — lo cubren tus créditos mensuales.',
        'pricing.aiSplit.scandoraAi': 'El chat de documentos y la búsqueda se ejecutan en tu dispositivo y con la IA de Scandora, y consumen créditos de Scandora.',
        'pricing.priceNote': 'Los precios que se muestran en App Store / Google Play son los precios finales de cada producto (pequeño empresario: no se muestra el IVA por separado, § 19 UStG); con un periodo de prueba, una oferta introductoria o promocional, o un cambio de plan con prorrateo, el importe que realmente se cobra puede ser distinto, y el que se aplica es el importe que la tienda indica en tu recibo. Los precios pueden variar según la región y la tienda.',

        // Download
        'download.title': '¿Listo para preguntarle cualquier cosa a tus documentos?',
        'download.description': 'Descarga Scandora, escanea tu primer documento y hazle una pregunta: tus datos siguen siendo tuyos. Disponible en iOS, macOS y Android.',

        // Footer
        'footer.tagline': 'Escaneo inteligente de documentos para empresas modernas.',
        'footer.product': 'Producto',
        'footer.legal': 'Legal',
        'footer.support': 'Soporte',
        'footer.privacy': 'Política de privacidad',
        'footer.terms': 'Términos del servicio',
        'footer.avv': 'AVV / DPA',
        'footer.imprint': 'Aviso legal',
        'footer.help': 'Centro de ayuda',
        'footer.contact': 'Contacto',
        'footer.paperlessSmb': 'Sin papel para pequeñas empresas',
        'footer.paperlessHome': 'Oficina sin papel en casa',
        'footer.invoiceData': 'Extracción de datos de facturas',
        'footer.scanTrello': 'Escanear a Trello',
        'footer.euServers': 'Escáner en servidores de la UE',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.legalNotice': '{imprint}, {terms} y {avv} están disponibles en inglés y alemán.',

        // Contact Page
        'contact.badge': 'Ponte en contacto',
        'contact.title': 'Nos encantará saber de ti',
        'contact.subtitle': '¿Tienes una pregunta o comentarios, o necesitas soporte? Nuestro equipo está aquí para ayudarte a sacar el máximo partido a Scandora.',
        'contact.formTitle': 'Envíanos un mensaje',
        'contact.formDesc': 'Completa el formulario de abajo y te responderemos en un plazo de 24 horas.',
        'contact.name': 'Nombre completo',
        'contact.email': 'Correo electrónico',
        'contact.subject': 'Asunto',
        'contact.selectSubject': 'Selecciona un asunto',
        'contact.subjectGeneral': 'Consulta general',
        'contact.subjectSupport': 'Soporte técnico',
        'contact.subjectSales': 'Ventas y precios',
        'contact.subjectPartnership': 'Colaboración',
        'contact.subjectFeedback': 'Comentarios',
        'contact.message': 'Tu mensaje',
        'contact.send': 'Enviar mensaje',
        'contact.responseTime': 'Tiempo de respuesta',
        'contact.responseValue': 'En un plazo de 24 horas',
        'contact.responseNote': 'De lunes a viernes, de 9:00 a 18:00 CET',
        'contact.quickLinks': 'Enlaces rápidos',
        'contact.home': 'Página de inicio',
        'contact.viewPricing': 'Ver los planes y precios',
        'contact.downloadApp': 'Descargar la app',
        'contact.successTitle': '¡Mensaje enviado!',
        'contact.successMessage': 'Gracias por escribirnos. Te responderemos en un plazo de 24 horas.',
        'contact.successButton': 'Entendido',

        // Blog / Guides
        'blog.badge': 'Guía',
        'blog.backHome': 'Volver al inicio',
        'blogFileee.badge': 'Comparativa',
        'blogFileee.backHome': 'Volver al inicio',

        // Comparison / landing pages (5.5)
        'features.compareFileee': 'Scandora vs Fileee',
        'features.compareCamscanner': 'Scandora vs CamScanner',
        'features.privacyGdprLink': 'Escáner de documentos RGPD',
        'pricing.business.datevLink': 'Para asesores fiscales y DATEV →',
        'pricing.free.paperlessLink': 'Cómo ir sin papel en una pequeña empresa →',
        'gdprScanner.badge': 'Escaneo y RGPD',
        'gdprScanner.backHome': 'Volver al inicio',
        'vsFileee.badge': 'Comparativa',
        'vsFileee.backHome': 'Volver al inicio',
        'vsCamscanner.badge': 'Comparativa',
        'vsCamscanner.backHome': 'Volver al inicio',
        'paperlessSmb.badge': 'Guía',
        'paperlessSmb.backHome': 'Volver al inicio',
        'paperlessHome.badge': 'Guía',
        'paperlessHome.backHome': 'Volver al inicio',
        'invoiceData.badge': 'Guía',
        'invoiceData.backHome': 'Volver al inicio',
        'scanTrello.badge': 'Integración',
        'scanTrello.backHome': 'Volver al inicio',
        'euServers.badge': 'Ubicación de los datos',
        'euServers.backHome': 'Volver al inicio',
        'datevSteuerberater.badge': 'Para asesores fiscales',
        'datevSteuerberater.backHome': 'Volver al inicio',
        'blogTrello.homepageLink': 'Lee: el flujo de trabajo de escaneo a Trello →',

        // Time-Saved Calculator
        'calc.badge': 'Tiempo ahorrado',
        'calc.title': 'Descubre cuánto tiempo ahorrarías',
        'calc.description': 'La IA de Scandora extrae los datos de cada documento para que no tengas que volver a escribirlos. Mueve el control deslizante para estimar la introducción manual de datos que te ahorrarías cada mes.',
        'calc.docsLabel': 'Documentos escaneados por semana',
        'calc.docsPerWeek': 'documentos/semana',
        'calc.hoursUnit': 'horas/mes ahorradas',
        'calc.assumption': 'Se basa en unos 3 minutos de introducción manual de datos que se ahorran por documento.',
        'calc.cta': 'Empieza gratis',

        // FAQ
        'faq.badge': 'Preguntas frecuentes',
        'faq.title': 'Preguntas frecuentes',
        'faq.description': 'Todo lo que necesitas saber sobre Scandora: escaneo, privacidad, precios y exportación a DATEV.',
        'faq.q1': '¿Qué es Scandora?',
        'faq.a1': 'Scandora es una aplicación de escaneo de documentos con IA que transforma tus documentos en papel en inteligencia digital. Extrae automáticamente datos clave como fechas, importes y nombres, y lo sincroniza todo con tus servicios en la nube favoritos, como Trello y Google Drive.',
        'faq.q2': '¿Se puede usar Scandora gratis?',
        'faq.a2': '¡Sí! El plan gratuito de Scandora incluye escaneos ilimitados, 10 créditos de IA al mes (extracción, indexación y chat de documentos con IA) e integraciones en la nube. Los planes de pago ya están disponibles: Pro (9,99 €/mes o 89 €/año) añade una asignación mensual de créditos de IA mucho mayor y soporte prioritario, y Business / DATEV (24,99 €/mes o 229 €/año) añade 5.000 créditos de IA al mes, soporte dedicado y una captura diseñada para la conservación de registros según GoBD y RGPD. Su exportación a DATEV, lexoffice y sevDesk llega próximamente y todavía no está disponible en esta versión. Los precios que se muestran en App Store o Google Play son los precios finales de cada producto; con un periodo de prueba, una oferta introductoria o promocional, o un cambio de plan con prorrateo, el importe que realmente se cobra puede ser distinto, y el que se aplica es el importe que la tienda indica en tu recibo.',
        'faq.q3': '¿Qué plataformas admite Scandora?',
        'faq.a3': 'Scandora está disponible en iOS, macOS y Android. Puedes escanear documentos con la cámara de tu teléfono o conectar escáneres profesionales en el escritorio.',
        'faq.q4': '¿Están seguros mis datos con Scandora?',
        'faq.a4': 'La privacidad forma parte del diseño de Scandora. Tus escaneos originales se quedan en tu dispositivo y solo van directamente a Google Gemini para la extracción — con una credencial de corta duración que emite nuestro servidor — y a los servicios en la nube que elijas. Para que tu historial se sincronice entre tus dispositivos, guardamos una vista previa de baja resolución y el texto extraído en nuestros servidores de la UE — nunca tus archivos originales. La búsqueda y el chat de documentos con IA se ejecutan en tu dispositivo. Para crear su índice, tu dispositivo envía a Google (Vertex AI en la UE) el texto extraído y la descripción de IA de cada documento que escaneas con la sesión iniciada; después, una búsqueda envía solo la consulta, y una respuesta, solo tu pregunta y los pasajes en los que se basa. La generación de la IA gestionada se procesa en la UE — Google Gemini en Vertex AI en Fráncfort, Alemania. Tú mantienes el control de tus datos.',
        'faq.q5': '¿Necesito mi propia clave de API para usar la IA?',
        'faq.a5': 'No. Scandora funciona con IA gestionada: tus créditos mensuales cubren la extracción de documentos, la indexación y el chat con IA. No existe un modo para usar tu propia clave, así que no hay ninguna clave de API que obtener ni introducir.',
        'faq.q6': '¿Scandora cumple el RGPD?',
        'faq.a6': 'Scandora se desarrolla teniendo en cuenta el RGPD (DSGVO). Tus escaneos originales se quedan en tu dispositivo y en el almacenamiento que elijas, los servidores que operamos están en la UE y no incorporamos rastreadores publicitarios de terceros. Para el uso empresarial proporcionamos un acuerdo de tratamiento de datos (AVV; art. 28 del RGPD) que puedes leer, descargar y firmar.',
        'faq.q7': '¿Necesito conexión a internet para escanear?',
        'faq.a7': 'No. El escaneo y la detección de bordes funcionan sin conexión. Solo necesitas conexión cuando sincronizas un documento con un servicio en la nube como Trello o Google Drive, o cuando la IA gestionada procesa un escaneo.',
        'faq.q8': '¿Puede Scandora exportar a DATEV para mi asesor fiscal?',
        'faq.a8': 'Próximamente. La exportación a DATEV (un lote de asientos EXTF junto con las imágenes de los documentos) y la exportación de comprobantes a lexoffice y sevDesk se están preparando para el plan Business / DATEV y todavía no están disponibles en esta versión. Lo que ya existe hoy es una captura diseñada para la conservación de registros según GoBD y RGPD para pequeñas empresas y asesores fiscales.',
        'faq.q9': '¿Qué es una buena solución de escaneo de documentos sin papel para una pequeña empresa?',
        'faq.a9': 'Scandora es un escáner de documentos con IA para iPhone, iPad, Mac y Android pensado justo para eso. Escaneas con la cámara de tu teléfono o con un escáner de red real, la IA gestionada extrae proveedor, importe, IBAN y fecha de vencimiento sin plantilla, y cada escaneo puede llegar a tu propio Trello y Google Drive. Funciona en servidores de la UE y no incluye anuncios. El plan gratuito cubre escaneos ilimitados y 10 créditos de IA al mes, así que un negocio de una sola persona puede empezar sin gastar nada.',
        'faq.q10': '¿Qué app de escáner de documentos funciona con un escáner de oficina real y no solo con la cámara del teléfono?',
        'faq.a10': 'Scandora sí. Puedes escanear con la cámara de tu teléfono o traer páginas desde un escáner de red mediante eSCL/AirScan — por ejemplo, dispositivos Brother y Epson. La detección automática de bordes se aplica a cada página, y tanto el escaneo como la detección de bordes funcionan sin conexión.',
        'faq.q11': '¿Cómo dejo de volver a escribir los datos de mis facturas y recibos?',
        'faq.a11': 'Deja que la IA gestionada los lea. La IA de Scandora extrae proveedor, importe, IBAN, fecha de vencimiento y tareas pendientes de cada escaneo sin plantilla, así que no hay nada que escribir a mano. A partir de ahí, el escaneo puede convertirse en una tarjeta de Trello o en un documento archivado en Google Drive en tus propias cuentas, y así el documento pasa a ser algo con lo que puedes actuar en lugar de otro PDF más.',
        'faq.q12': '¿Puedo hacer preguntas sobre mis propios documentos escaneados y recibir una respuesta con su fuente?',
        'faq.a12': 'Sí. Hazle una pregunta a la IA y obtendrás una respuesta con citas de tus propios documentos, con un enlace a la fuente que usó. El chat de documentos forma parte de todos los planes y gasta los mismos créditos de IA mensuales que la extracción. La recuperación de pasajes se ejecuta en tu dispositivo sobre un índice local, que tu dispositivo crea enviando a Google el texto extraído y la descripción de IA de cada documento que escaneas con la sesión iniciada; después, una respuesta envía tu pregunta y los pasajes que selecciona, directamente a Google — nunca tus archivos originales.',
        'faq.q13': '¿Puedo mantener separados mis documentos personales y de empresa en una sola app de escáner?',
        'faq.a13': 'Sí. Scandora tiene varios perfiles, así que puedes separar los documentos personales de los de empresa. Cada perfil tiene sus propios ajustes y sus propias conexiones a la nube.',
        'faq.q14': '¿Existe un escáner de documentos con acuerdo de tratamiento de datos (AVV) para uso empresarial?',
        'faq.a14': 'Sí. Para el uso empresarial, Scandora proporciona un acuerdo de tratamiento de datos (AVV; art. 28 del RGPD) que puedes leer, descargar y firmar. La propia app se desarrolla teniendo en cuenta el RGPD (DSGVO): tus escaneos originales se quedan en tu dispositivo y en el almacenamiento que elijas, los servidores que operamos están en la UE y no incorporamos rastreadores publicitarios de terceros.',

        // Footer — DSA report route and accessibility statement
        'footer.reportContent': 'Notificar contenido ilegal',
        'footer.accessibility': 'Accesibilidad',

        // Careers
        'nav.careers': 'Empleo',
        'footer.careers': 'Empleo',
        'careers.backHome': 'Volver al inicio',
        'careers.badge': 'Empleo',
        'careers.title': 'Construye Scandora con nosotros',
        'careers.subtitle': 'Scandora es una empresa pequeña que prioriza el trabajo remoto y crea un escáner de documentos con IA. Los documentos de los clientes se quedan en la UE, y el trabajo también.',
        'careers.openRoles': 'Puestos abiertos',
        'careers.responsibilities': 'Lo que harías',
        'careers.requirements': 'Lo que buscamos',
        'careers.apply': 'Envía tu candidatura por correo electrónico',
        'careers.howTitle': 'Cómo presentar tu candidatura',
        'careers.howBody': 'Escribe a jobs@scandora.eu con una nota breve, un currículum o un enlace a tu perfil, e indica el puesto en el asunto. Sin formulario, sin cuenta, sin seguimiento.',
        'careers.emptyTitle': 'No hay puestos abiertos por ahora',
        'careers.emptyBody': 'Ahora mismo no hay ningún puesto anunciado. Si crees que encajas aquí de todos modos, escríbenos: leemos todos los mensajes.',
        'careers.generalTitle': '¿Ninguno te encaja?',
        'careers.generalBody': 'Envíanos una nota breve sobre lo que haces y un enlace a algo que hayas creado. Leemos todas las candidaturas.',
        'careers.generalApply': 'Enviar una candidatura espontánea',

        'footer.comingSoon': 'Próximamente',
        'footer.scanNextcloud': 'Escanear a Nextcloud (próximamente)',
        'footer.scanOneDrive': 'Escanear a OneDrive (próximamente)',
        'footer.scanDropbox': 'Escanear a Dropbox (próximamente)',
        'comingSoon.backHome': 'Volver al inicio',
        'comingSoon.badge': 'Próximamente',
        'comingSoon.howTitle': 'Qué estamos construyendo',
        'comingSoon.interestTitle': '¿Quieres esto?',
        'comingSoon.interestBody': 'Con un clic nos enteramos. No hay formulario ni campo de correo electrónico, y el clic no establece ninguna cookie.',
        'comingSoon.interestButton': 'Dinos que lo quieres',
        'comingSoon.interestThanks': 'Gracias, lo anotamos. No tienes que hacer nada más.',
        'comingSoon.interestPrivate': 'Gracias. El ajuste de privacidad de tu navegador desactiva nuestro contador de visitas, así que este clic no se contó. No tienes que hacer nada más.',
        'comingSoon.interestUncounted': 'Gracias. Este clic no se contó. No tienes que hacer nada más.',
        'comingSoon.alsoLead': 'Consulta también:',
        'comingSoon.todayLead': 'Disponible hoy en la app:',
        'comingSoon.todayTrello': 'escanear a Trello',
        'comingSoon.todayDrive': 'y Google Drive.',
        'scanNextcloud.title': 'Escanear a Nextcloud — próximamente',
        'scanNextcloud.lead': 'Próximamente: enviar los escaneos terminados a tu Nextcloud y traer archivos desde allí. Esta conexión aún no está en la app.',
        'scanNextcloud.how': 'La compatibilidad con Nextcloud llegará próximamente. Introduces la dirección de tu servidor, tu nombre de usuario y una contraseña de aplicación, y puedes indicar una carpeta de destino. Scandora envía un escaneo terminado a esa carpeta como un PDF cuyo nombre es el título del documento, y puedes elegir archivos de tu servidor para traerlos a la app. Nada de esto está aún en la app.',
        'scanNextcloud.trademark': 'Nextcloud es una marca comercial de Nextcloud GmbH. Scandora no está afiliada a Nextcloud GmbH.',
        'scanOneDrive.title': 'Escanear a OneDrive — próximamente',
        'scanOneDrive.lead': 'Próximamente: enviar los escaneos terminados a tu OneDrive y traer archivos desde allí. Esta conexión aún no está en la app.',
        'scanOneDrive.how': 'La compatibilidad con OneDrive llegará próximamente. Inicias sesión con tu cuenta y eliges una carpeta. Scandora envía un escaneo terminado a esa carpeta como un PDF cuyo nombre es el título del documento, y puedes elegir archivos de tu cuenta para traerlos a la app. Nada de esto está aún en la app.',
        'scanOneDrive.trademark': 'OneDrive es una marca comercial del grupo de empresas Microsoft. Scandora no está afiliada a Microsoft.',
        'scanDropbox.title': 'Escanear a Dropbox — próximamente',
        'scanDropbox.lead': 'Próximamente: enviar los escaneos terminados a tu Dropbox y traer archivos desde allí. Esta conexión aún no está en la app.',
        'scanDropbox.how': 'La compatibilidad con Dropbox llegará próximamente. Inicias sesión con tu cuenta y eliges una carpeta. Scandora envía un escaneo terminado a esa carpeta como un PDF cuyo nombre es el título del documento, y puedes elegir archivos de tu cuenta para traerlos a la app. Nada de esto está aún en la app.',
        'scanDropbox.trademark': 'Dropbox es una marca comercial de Dropbox, Inc. Scandora no está afiliada a Dropbox, Inc.'
    },
    'pt-BR': {
        'language.name': 'Português (Brasil)',
        'language.englishName': 'Portuguese (Brazil)',
        'language.locale': 'pt_BR',
        'language.menu': 'Idioma',
        'language.search': 'Buscar idiomas',
        'languageBanner.text': 'Esta página também está disponível em português.',
        'languageBanner.link': 'Ler em português',
        'languageBanner.dismiss': 'Fechar',

        'nav.features': 'Recursos',
        'nav.howItWorks': 'Como funciona',
        'nav.pricing': 'Preços',
        'nav.blog': 'Guias',
        'nav.download': 'Baixar',

        'hero.brandDescriptor': 'Scanner de documentos com IA',
        'hero.badge': 'GDPR em primeiro lugar · Servidores na UE · Sem anúncios',
        'hero.titleLine1': 'Escanear documentos com o Scandora.',
        'hero.titleLine2': 'Depois, pergunte o que quiser.',
        'hero.lede': 'Scandora é um scanner de documentos com IA para iPhone, iPad, Mac e Android, e você pode conversar com o que ele digitaliza.',
        'hero.description': 'Escaneie uma fatura com o celular ou com o scanner real do seu escritório e pergunte quando ela vence ou qual é o IBAN dela. A IA extrai fornecedor, valor, IBAN, data de vencimento e tarefas pendentes sem precisar de template, seus arquivos vão para o seu próprio Google Drive e Trello, e cada digitalização pode ser pesquisada no seu dispositivo. O Scandora coloca o GDPR em primeiro lugar, funciona em servidores na UE e não tem anúncios.',
        'hero.getStarted': 'Comece grátis',
        'hero.seeHow': 'Veja como funciona',
        'hero.stat1': 'Pergunte ao seu documento',
        'hero.stat1sub': 'Respostas a partir da sua digitalização',
        'hero.stat2': 'A IA lê os detalhes',
        'hero.stat2sub': 'Fornecedor, valor, IBAN, vencimento',
        'hero.stat3': 'Sua nuvem, não a nossa',
        'hero.stat3sub': 'Direto no Drive e no Trello',

        'features.badge': 'O que diferencia o Scandora',
        'features.title': 'Feito para agir, não só para escanear',
        'features.description': 'Deixe a IA ler cada documento, conecte um scanner real e transforme cada digitalização em uma tarefa ou em um arquivo sobre os quais você possa agir — com seus dados sob seu controle.',
        'features.scan.title': 'Celular ou scanner real',
        'features.scan.desc': 'Escaneie com a câmera do celular ou conecte um scanner de rede real via eSCL/AirScan (como Brother e Epson). Detecção automática de bordas em cada página.',
        'features.ai.title': 'IA que lê cada documento',
        'features.ai.desc': 'A IA gerenciada lê cada digitalização e extrai datas, valores e fornecedores para você não precisar digitar manualmente. Os créditos cobrem leitura de dados, indexação e chat com IA — sem chave para gerenciar.',
        'features.cloud.title': 'Direto no Trello e no Drive',
        'features.cloud.desc': 'Cada digitalização pode virar um cartão do Trello ou um documento arquivado no Google Drive, conectados às suas próprias contas. Seus documentos viram ações, não apenas PDFs.',
        'features.search.title': 'Busca inteligente',
        'features.search.desc': 'Faça uma pergunta à IA e receba uma resposta com citações dos seus próprios documentos, com um link para a fonte usada.',
        'features.profiles.title': 'Vários perfis',
        'features.profiles.desc': 'Separe documentos pessoais e comerciais com perfis distintos. Cada um com suas próprias configurações e conexões de nuvem.',
        'features.privacy.title': 'Seus dados continuam sendo seus',
        'features.privacy.desc': 'Seus documentos são seus. Não armazenamos seus documentos completos nem as imagens das páginas em nossos servidores — eles vão apenas para o serviço de IA gerenciada que operamos e para os serviços de nuvem que você escolher. Enquanto você estiver com a sessão iniciada, seu histórico de digitalizações é sincronizado com nossos servidores na Alemanha: os detalhes do histórico, uma pequena pré-visualização de baixa resolução e o texto que extraímos das páginas. O Scandora foi projetado com o GoBD e o GDPR em mente.',

        'howItWorks.badge': 'Da digitalização à ação',
        'howItWorks.title': 'Do papel à ação em três passos',
        'howItWorks.description': 'Escaneie, deixe a IA gerenciada entender e envie para as suas próprias ferramentas. Suas digitalizações originais ficam no seu dispositivo e no armazenamento que você escolher.',
        'howItWorks.step1.title': 'Escaneie',
        'howItWorks.step1.desc': 'Use a câmera do celular ou um scanner de rede (eSCL/AirScan). A detecção automática de bordas mantém cada página limpa.',
        'howItWorks.step2.title': 'A IA gerenciada entende',
        'howItWorks.step2.desc': 'A IA gerenciada do Scandora lê o documento, reconhece o tipo e extrai os principais detalhes. Apenas uma pré-visualização de baixa resolução e o texto extraído ficam armazenados em nossos servidores na UE — nunca seus arquivos originais.',
        'howItWorks.step3.title': 'Vira uma ação',
        'howItWorks.step3.desc': 'O resultado é sincronizado direto com o seu Trello e o seu Google Drive — um cartão, um documento arquivado, pronto para agir. O Scandora coloca a privacidade em primeiro lugar e vem com recursos de conservação de registros GoBD.',

        'pricing.badge': 'Preços flexíveis',
        'pricing.title': 'Escolha o plano ideal',
        'pricing.description': 'Comece grátis e faça upgrade conforme crescer. IA gerenciada e integrações com a nuvem em todos os planos.',
        'pricing.perMonth': '/mês',
        'pricing.perYear': '/ano',
        'pricing.billingMonthly': 'Mensal',
        'pricing.billingAnnual': 'Anual · economize até 26%',
        'pricing.popular': 'Mais popular',
        'pricing.free.name': 'Free',
        'pricing.free.tagline': 'Para começar',
        'pricing.free.f1': 'Extração com IA gerenciada (10 créditos por mês)',
        'pricing.free.f2': 'Digitalizações ilimitadas, páginas ilimitadas',
        'pricing.free.f3': '10 créditos de IA por mês (1 crédito = 1 análise de documento ou 1 resposta do chat com IA; compartilhados entre leitura de dados, indexação e chat com IA)',
        'pricing.free.f5': 'Integrações com a nuvem (Trello, Google Drive)',
        'pricing.free.cta': 'Começar',
        'pricing.pro.name': 'Pro',
        'pricing.pro.tagline': 'Para profissionais',
        'pricing.pro.f1': '1.000 créditos de IA por mês (1 crédito = 1 análise de documento ou 1 resposta do chat com IA; compartilhados entre leitura de dados, indexação e chat com IA)',
        'pricing.pro.f2': 'Suporte a scanners de rede (eSCL/AirScan)',
        'pricing.pro.f3': 'Chat de documentos com IA e respostas com citações',
        'pricing.pro.f4': 'Integrações com a nuvem',
        'pricing.pro.f5': 'Suporte prioritário',
        'pricing.pro.cta': 'Obter Pro',
        'pricing.pro.save': 'Economize 26%',
        'pricing.business.name': 'Business / DATEV',
        'pricing.business.tagline': 'Para pequenas empresas e consultores tributários',
        'pricing.business.f1': '5.000 créditos de IA por mês (1 crédito = 1 análise de documento ou 1 resposta do chat com IA; compartilhados entre leitura de dados, indexação e chat com IA)',
        'pricing.business.f2': 'Exportação DATEV para o seu consultor tributário (em breve)',
        'pricing.business.f3': 'Exportação de comprovantes para lexoffice e sevDesk (em breve)',
        'pricing.business.f4': 'Projetado para a conservação de registros conforme GoBD e GDPR',
        'pricing.business.f5': 'Suporte dedicado',
        'pricing.business.cta': 'Obter Business',
        'pricing.business.save': 'Economize 24%',
        'pricing.byo': '💡 A IA gerenciada cobre leitura de dados, indexação e chat com IA — sem chave de API para configurar.',
        'pricing.aiSplit.title': 'O que a IA faz por você',
        'pricing.aiSplit.ownKey': 'A IA lê cada digitalização e extrai datas, valores e fornecedores — isso é coberto pelos seus créditos mensais.',
        'pricing.aiSplit.scandoraAi': 'O chat de documentos e a busca rodam no seu dispositivo e na IA do Scandora, e consomem créditos do Scandora.',
        'pricing.priceNote': 'Os preços exibidos na App Store / Google Play são os preços finais de cada produto (pequeno empresário — o IVA não é exibido separadamente, § 19 UStG); com um período de teste, uma oferta introdutória ou promocional, ou uma mudança de plano com cobrança proporcional, o valor efetivamente cobrado pode ser diferente, e o valor que vale é o que a loja informa no seu recibo. Os preços podem variar conforme a região e a loja.',

        'download.title': 'Pronto para perguntar qualquer coisa aos seus documentos?',
        'download.description': 'Baixe o Scandora, escaneie seu primeiro documento e faça uma pergunta a ele — seus dados continuam sendo seus. Disponível para iOS, macOS e Android.',

        'footer.tagline': 'Digitalização inteligente de documentos para empresas modernas.',
        'footer.product': 'Produto',
        'footer.legal': 'Legal',
        'footer.support': 'Suporte',
        'footer.privacy': 'Política de Privacidade',
        'footer.terms': 'Termos de Serviço',
        'footer.avv': 'AVV / DPA',
        'footer.imprint': 'Informações legais',
        'footer.help': 'Central de Ajuda',
        'footer.contact': 'Fale conosco',
        'footer.paperlessSmb': 'Sem papel para pequenas empresas',
        'footer.paperlessHome': 'Escritório sem papel em casa',
        'footer.invoiceData': 'Extração de dados de faturas',
        'footer.scanTrello': 'Escanear para o Trello',
        'footer.euServers': 'Scanner em servidores na UE',
        'footer.rights': 'Todos os direitos reservados.',
        'footer.legalNotice': '{imprint}, {terms} e {avv} estão disponíveis em inglês e alemão.',

        'contact.badge': 'Entre em contato',
        'contact.title': 'Adoraríamos ouvir você',
        'contact.subtitle': 'Tem uma pergunta, um comentário ou precisa de suporte? Nossa equipe está aqui para ajudar você a aproveitar ao máximo o Scandora.',
        'contact.formTitle': 'Envie uma mensagem para nós',
        'contact.formDesc': 'Preencha o formulário abaixo e responderemos em até 24 horas.',
        'contact.name': 'Nome completo',
        'contact.email': 'Endereço de e-mail',
        'contact.subject': 'Assunto',
        'contact.selectSubject': 'Selecione um assunto',
        'contact.subjectGeneral': 'Dúvida geral',
        'contact.subjectSupport': 'Suporte técnico',
        'contact.subjectSales': 'Vendas e preços',
        'contact.subjectPartnership': 'Parceria',
        'contact.subjectFeedback': 'Feedback',
        'contact.message': 'Sua mensagem',
        'contact.send': 'Enviar mensagem',
        'contact.responseTime': 'Tempo de resposta',
        'contact.responseValue': 'Em até 24 horas',
        'contact.responseNote': 'De segunda a sexta, das 9h às 18h CET',
        'contact.quickLinks': 'Links rápidos',
        'contact.home': 'Página inicial',
        'contact.viewPricing': 'Ver planos e preços',
        'contact.downloadApp': 'Baixar o app',
        'contact.successTitle': 'Mensagem enviada!',
        'contact.successMessage': 'Obrigado por entrar em contato. Responderemos em até 24 horas.',
        'contact.successButton': 'Entendi',

        'blog.badge': 'Guia',
        'blog.backHome': 'Voltar ao início',
        'blogFileee.badge': 'Comparativo',
        'blogFileee.backHome': 'Voltar ao início',

        'features.compareFileee': 'Scandora vs Fileee',
        'features.compareCamscanner': 'Scandora vs CamScanner',
        'features.privacyGdprLink': 'Scanner de documentos GDPR',
        'pricing.business.datevLink': 'Para consultores tributários e DATEV →',
        'pricing.free.paperlessLink': 'Eliminar o papel em uma pequena empresa →',
        'gdprScanner.badge': 'Digitalização e GDPR',
        'gdprScanner.backHome': 'Voltar ao início',
        'vsFileee.badge': 'Comparativo',
        'vsFileee.backHome': 'Voltar ao início',
        'vsCamscanner.badge': 'Comparativo',
        'vsCamscanner.backHome': 'Voltar ao início',
        'paperlessSmb.badge': 'Guia',
        'paperlessSmb.backHome': 'Voltar ao início',
        'paperlessHome.badge': 'Guia',
        'paperlessHome.backHome': 'Voltar ao início',
        'invoiceData.badge': 'Guia',
        'invoiceData.backHome': 'Voltar ao início',
        'scanTrello.badge': 'Integração',
        'scanTrello.backHome': 'Voltar ao início',
        'euServers.badge': 'Residência de dados',
        'euServers.backHome': 'Voltar ao início',
        'datevSteuerberater.badge': 'Para consultores tributários',
        'datevSteuerberater.backHome': 'Voltar ao início',
        'blogTrello.homepageLink': 'Leia: o fluxo de escanear para o Trello →',

        'calc.badge': 'Tempo economizado',
        'calc.title': 'Veja quanto tempo você economizaria',
        'calc.description': 'A IA do Scandora extrai os dados de cada documento para que você não precise digitá-los de novo. Mova o controle deslizante para estimar a digitação manual de dados que você deixaria de fazer a cada mês.',
        'calc.docsLabel': 'Documentos escaneados por semana',
        'calc.docsPerWeek': 'documentos/semana',
        'calc.hoursUnit': 'horas/mês economizadas',
        'calc.assumption': 'Com base em cerca de 3 minutos de digitação manual de dados economizados por documento.',
        'calc.cta': 'Comece grátis',

        'faq.badge': 'FAQ',
        'faq.title': 'Perguntas frequentes',
        'faq.description': 'Tudo o que você precisa saber sobre o Scandora — digitalização, privacidade, preços e exportação para o DATEV.',
        'faq.q1': 'O que é o Scandora?',
        'faq.a1': 'O Scandora é um app de digitalização de documentos com IA que transforma seus documentos em papel em inteligência digital. Ele extrai automaticamente informações importantes, como datas, valores e nomes, e depois sincroniza tudo com seus serviços de nuvem favoritos, como Trello e Google Drive.',
        'faq.q2': 'O Scandora é gratuito?',
        'faq.a2': "Sim! O plano gratuito do Scandora inclui digitalizações ilimitadas, 10 créditos de IA por mês (leitura de dados, indexação e chat de documentos com IA) e integrações com a nuvem. Os planos pagos já estão disponíveis: o Pro (9,99 €/mês ou 89 €/ano) acrescenta uma cota mensal de créditos de IA muito maior e suporte prioritário, e o Business / DATEV (24,99 €/mês ou 229 €/ano) acrescenta 5.000 créditos de IA por mês, suporte dedicado e uma captura projetada para a guarda de registros de acordo com GoBD e GDPR — em breve chega a exportação para DATEV, lexoffice e sevDesk, que ainda não está disponível nesta versão. Os preços exibidos na App Store ou no Google Play são os preços finais de cada produto; com um período de teste, uma oferta introdutória ou promocional ou uma mudança de plano com cobrança proporcional, o valor efetivamente cobrado pode ser diferente, e o valor que a loja informa no seu recibo é o que se aplica.",
        'faq.q3': 'Em quais plataformas o Scandora funciona?',
        'faq.a3': 'O Scandora está disponível para iOS, macOS e Android. Você pode escanear documentos com a câmera do celular ou conectar scanners profissionais no computador.',
        'faq.q4': 'Meus dados estão seguros no Scandora?',
        'faq.a4': 'A privacidade faz parte do design do Scandora. Suas digitalizações originais ficam no seu dispositivo e só são enviadas diretamente ao Google Gemini, para extração — usando uma credencial de curta duração emitida pelo nosso servidor — e aos serviços de nuvem que você escolher. Para sincronizar seu histórico entre seus dispositivos, armazenamos uma pré-visualização em baixa resolução e o texto extraído em nossos servidores na UE — nunca seus arquivos originais. A busca e o chat de documentos com IA funcionam no seu dispositivo. Para criar o índice de busca, seu dispositivo envia ao Google (Vertex AI na UE) o texto extraído e a descrição de IA de cada documento que você escanear com a sessão iniciada; depois, uma busca envia apenas a consulta, e uma resposta envia apenas a sua pergunta e as passagens em que se baseia. A geração de IA gerenciada é tratada na UE — Google Gemini no Vertex AI em Frankfurt, na Alemanha. Você mantém o controle dos seus dados.',
        'faq.q5': 'Preciso de uma chave de API própria para usar a IA?',
        'faq.a5': 'Não. O Scandora funciona com IA gerenciada — seus créditos mensais cobrem a leitura dos documentos, a indexação e o chat com IA. Não existe modo com chave própria, então não há chave de API para obter nem para inserir.',
        'faq.q6': 'O Scandora está em conformidade com o GDPR?',
        'faq.a6': 'O Scandora foi projetado levando em conta o GDPR (DSGVO). Suas digitalizações originais ficam no seu dispositivo e no armazenamento que você escolher, os servidores que de fato operamos ficam na UE e não incorporamos rastreadores publicitários de terceiros. Para uso empresarial, fornecemos um acordo de tratamento de dados (AVV; art. 28 do GDPR) que você pode ler, baixar e assinar.',
        'faq.q7': 'Preciso de conexão com a internet para escanear?',
        'faq.a7': 'Não. Tanto a digitalização quanto a detecção de bordas funcionam offline. Você só precisa de conexão quando sincroniza um documento com um serviço de nuvem, como Trello ou Google Drive, ou quando a IA gerenciada processa uma digitalização.',
        'faq.q8': 'O Scandora pode exportar para o DATEV, para o meu consultor tributário?',
        'faq.a8': 'Em breve. A exportação para o DATEV (um lote de lançamentos EXTF junto com as imagens dos documentos) e a exportação de comprovantes para lexoffice e sevDesk estão em preparação para o plano Business / DATEV e ainda não estão disponíveis nesta versão. O que o app entrega hoje é uma captura projetada para a guarda de registros de acordo com GoBD e GDPR, para pequenas empresas e consultores tributários.',
        'faq.q9': 'Qual é uma boa solução de digitalização de documentos sem papel para uma pequena empresa?',
        'faq.a9': 'O Scandora é um scanner de documentos com IA para iPhone, iPad, Mac e Android, criado exatamente para isso. Você escaneia com a câmera do celular ou com um scanner de rede de verdade, a IA gerenciada extrai fornecedor, valor, IBAN e data de vencimento sem precisar de template, e cada digitalização pode ir para o seu próprio Trello e Google Drive. Ele funciona em servidores na UE e não exibe anúncios. O plano gratuito cobre digitalizações ilimitadas e 10 créditos de IA por mês, então uma empresa de uma única pessoa pode começar sem gastar nada.',
        'faq.q10': 'Qual app de scanner de documentos funciona com um scanner de escritório de verdade, e não só com a câmera do celular?',
        'faq.a10': 'O Scandora funciona. Você pode escanear com a câmera do celular ou trazer páginas de um scanner de rede por eSCL/AirScan — dispositivos Brother e Epson, por exemplo. A detecção automática de bordas é executada em cada página, e tanto a digitalização quanto a detecção de bordas funcionam offline.',
        'faq.q11': 'Como parar de digitar de novo os dados das minhas faturas e recibos?',
        'faq.a11': 'Deixe a IA gerenciada ler as faturas e os recibos. A IA do Scandora extrai fornecedor, valor, IBAN, data de vencimento e tarefas pendentes de cada digitalização sem precisar de template, então não há nada para digitar à mão. A partir daí, a digitalização pode virar um cartão do Trello ou um documento arquivado no Google Drive, nas suas próprias contas, o que transforma o documento em algo em que você pode agir, em vez de mais um PDF.',
        'faq.q12': 'Posso fazer perguntas sobre meus próprios documentos escaneados e receber uma resposta com a fonte?',
        'faq.a12': 'Sim. Faça uma pergunta à IA e você recebe uma resposta com citações, baseada nos seus próprios documentos, com um link para a fonte usada. O chat de documentos faz parte de todos os planos e gasta os mesmos créditos de IA mensais que a leitura dos dados. A recuperação de trechos é executada no seu dispositivo, sobre um índice de busca no dispositivo, que ele cria enviando ao Google o texto extraído e a descrição de IA de cada documento que você escanear com a sessão iniciada; depois, uma resposta envia a sua pergunta e os trechos que ela seleciona, diretamente ao Google — nunca seus arquivos originais.',
        'faq.q13': 'Posso manter documentos pessoais e comerciais separados em um único app de scanner?',
        'faq.a13': 'Sim. O Scandora tem vários perfis, para que você separe documentos pessoais e comerciais. Cada perfil tem suas próprias configurações e suas próprias conexões com a nuvem.',
        'faq.q14': 'Existe um scanner de documentos com acordo de tratamento de dados (AVV) para uso empresarial?',
        'faq.a14': 'Sim. Para uso empresarial, o Scandora fornece um acordo de tratamento de dados (AVV; art. 28 do GDPR) que você pode ler, baixar e assinar. O próprio app foi projetado levando em conta o GDPR (DSGVO): suas digitalizações originais ficam no seu dispositivo e no armazenamento que você escolher, os servidores que de fato operamos ficam na UE e não incorporamos rastreadores publicitários de terceiros.',

        'footer.reportContent': 'Denunciar conteúdo ilegal',
        'footer.accessibility': 'Acessibilidade',

        'nav.careers': 'Carreiras',
        'footer.careers': 'Carreiras',
        'careers.backHome': 'Voltar ao início',
        'careers.badge': 'Carreiras',
        'careers.title': 'Construa o Scandora conosco',
        'careers.subtitle': 'Somos uma empresa pequena que prioriza o trabalho remoto e desenvolve o Scandora, um scanner de documentos com IA. Os documentos dos clientes ficam na UE, e o trabalho também.',
        'careers.openRoles': 'Vagas abertas',
        'careers.responsibilities': 'O que você faria',
        'careers.requirements': 'O que procuramos',
        'careers.apply': 'Candidate-se por e-mail',
        'careers.howTitle': 'Como se candidatar',
        'careers.howBody': 'Escreva para jobs@scandora.eu com uma nota curta, um currículo ou um link do seu perfil, e indique a vaga no assunto. Sem formulário, sem conta, sem rastreamento.',
        'careers.emptyTitle': 'Nenhuma vaga aberta no momento',
        'careers.emptyBody': 'No momento, nenhuma vaga está anunciada. Se você acha que se encaixa aqui mesmo assim, escreva para nós — lemos todas as mensagens.',
        'careers.generalTitle': 'Nenhuma dessas vagas combina com você?',
        'careers.generalBody': 'Envie uma nota curta sobre o que você faz e um link para algo que você criou. Lemos todas as candidaturas.',
        'careers.generalApply': 'Enviar uma candidatura espontânea',

        'footer.comingSoon': 'Em breve',
        'footer.scanNextcloud': 'Escanear para o Nextcloud (em breve)',
        'footer.scanOneDrive': 'Escanear para o OneDrive (em breve)',
        'footer.scanDropbox': 'Escanear para o Dropbox (em breve)',
        'comingSoon.backHome': 'Voltar ao início',
        'comingSoon.badge': 'Em breve',
        'comingSoon.howTitle': 'O que estamos construindo',
        'comingSoon.interestTitle': 'Você quer isso?',
        'comingSoon.interestBody': 'Um clique nos avisa. Não há formulário nem campo de e-mail, e o clique não define nenhum cookie.',
        'comingSoon.interestButton': 'Avise-nos que você quer isso',
        'comingSoon.interestThanks': 'Obrigado, anotamos. Não há mais nada a fazer.',
        'comingSoon.interestPrivate': 'Obrigado. A configuração de privacidade do seu navegador desliga nosso contador de visitantes, então este clique não foi contado. Não há mais nada a fazer.',
        'comingSoon.interestUncounted': 'Obrigado. Este clique não foi contado. Não há mais nada a fazer.',
        'comingSoon.alsoLead': 'Veja também:',
        'comingSoon.todayLead': 'Disponível hoje no app:',
        'comingSoon.todayTrello': 'escanear para o Trello',
        'comingSoon.todayDrive': 'e para o Google Drive.',
        'scanNextcloud.title': 'Escanear para o Nextcloud — em breve',
        'scanNextcloud.lead': 'Em breve: enviar as digitalizações concluídas para o seu Nextcloud e trazer arquivos de lá. Esta conexão ainda não está no app.',
        'scanNextcloud.how': 'O suporte ao Nextcloud chega em breve. Você informa o endereço do seu servidor, seu nome de usuário e uma senha de aplicativo, e pode indicar uma pasta de destino. O Scandora envia uma digitalização concluída para essa pasta como um PDF com o título do documento como nome, e você pode escolher arquivos do seu servidor para trazer ao app. Nada disso está no app ainda.',
        'scanNextcloud.trademark': 'Nextcloud é uma marca comercial da Nextcloud GmbH. O Scandora não é afiliado à Nextcloud GmbH.',
        'scanOneDrive.title': 'Escanear para o OneDrive — em breve',
        'scanOneDrive.lead': 'Em breve: enviar as digitalizações concluídas para o seu OneDrive e trazer arquivos de lá. Esta conexão ainda não está no app.',
        'scanOneDrive.how': 'O suporte ao OneDrive chega em breve. Você entra com sua conta e escolhe uma pasta. O Scandora envia uma digitalização concluída para essa pasta como um PDF com o título do documento como nome, e você pode escolher arquivos da sua conta para trazer ao app. Nada disso está no app ainda.',
        'scanOneDrive.trademark': 'OneDrive é uma marca comercial do grupo de empresas Microsoft. O Scandora não é afiliado à Microsoft.',
        'scanDropbox.title': 'Escanear para o Dropbox — em breve',
        'scanDropbox.lead': 'Em breve: enviar as digitalizações concluídas para o seu Dropbox e trazer arquivos de lá. Esta conexão ainda não está no app.',
        'scanDropbox.how': 'O suporte ao Dropbox chega em breve. Você entra com sua conta e escolhe uma pasta. O Scandora envia uma digitalização concluída para essa pasta como um PDF com o título do documento como nome, e você pode escolher arquivos da sua conta para trazer ao app. Nada disso está no app ainda.',
        'scanDropbox.trademark': 'Dropbox é uma marca comercial da Dropbox, Inc. O Scandora não é afiliado à Dropbox, Inc.'
    },
    it: {
        // Language
        'language.name': 'Italiano',
        'language.englishName': 'Italian',
        'language.locale': 'it_IT',
        'language.menu': 'Lingua',
        'language.search': 'Cerca lingue',
        'languageBanner.text': 'Questa pagina è disponibile anche in italiano.',
        'languageBanner.link': 'Leggi in italiano',
        'languageBanner.dismiss': 'Chiudi',

        // Navigation
        'nav.features': 'Funzioni',
        'nav.howItWorks': 'Come funziona',
        'nav.pricing': 'Prezzi',
        'nav.blog': 'Guide',
        'nav.download': 'Scarica',

        // Hero
        'hero.brandDescriptor': 'Scanner di documenti con IA',
        'hero.badge': 'Priorità al GDPR · Server nell’UE · Senza pubblicità',
        'hero.titleLine1': 'Scansione documenti con Scandora.',
        'hero.titleLine2': 'Poi chiedi loro qualsiasi cosa.',
        'hero.lede': 'Scandora è uno scanner di documenti con IA per iPhone, iPad, Mac e Android, con cui puoi conversare su ciò che scansioni.',
        'hero.description': 'Scansiona una fattura con il telefono o con il tuo vero scanner da ufficio, poi chiedile quando scade o qual è il suo IBAN. L’IA estrae fornitore, importo, IBAN, data di scadenza e attività da svolgere senza bisogno di modelli, i tuoi file arrivano nel tuo Google Drive e nel tuo Trello, e ogni scansione resta ricercabile sul tuo dispositivo. Scandora dà priorità al GDPR, funziona su server nell’UE e non ha pubblicità.',
        'hero.getStarted': 'Inizia gratis',
        'hero.seeHow': 'Scopri come funziona',
        'hero.stat1': 'Chiedi al tuo documento',
        'hero.stat1sub': 'Risposte dalla tua scansione',
        'hero.stat2': 'L’IA legge i dettagli',
        'hero.stat2sub': 'Fornitore, importo, IBAN, scadenza',
        'hero.stat3': 'Il tuo cloud, non il nostro',
        'hero.stat3sub': 'Direttamente su Drive e Trello',

        // Features
        'features.badge': 'Cosa rende diversa Scandora',
        'features.title': 'Pensata per agire, non solo per scansionare',
        'features.description': 'Lascia che l’IA legga ogni documento, collega uno scanner vero e trasforma ogni scansione in un’attività o in un file su cui puoi agire — con i tuoi dati sotto il tuo controllo.',
        'features.scan.title': 'Telefono o scanner vero',
        'features.scan.desc': 'Scansiona con la fotocamera del telefono o collega uno scanner di rete vero tramite eSCL/AirScan (come Brother ed Epson). Rilevamento automatico dei bordi su ogni pagina.',
        'features.ai.title': 'IA che legge ogni documento',
        'features.ai.desc': 'L’IA gestita legge ogni scansione ed estrae date, importi e fornitori, così eviti l’inserimento manuale. I crediti coprono estrazione, indicizzazione e chat con l’IA — nessuna chiave da gestire.',
        'features.cloud.title': 'Direttamente su Trello e Drive',
        'features.cloud.desc': 'Ogni scansione può diventare una scheda Trello o un documento archiviato in Google Drive, collegati ai tuoi account. I tuoi documenti diventano azioni, non solo PDF.',
        'features.search.title': 'Ricerca intelligente',
        'features.search.desc': 'Fai una domanda all’IA e ricevi una risposta con citazioni dai tuoi documenti, con un link alla fonte usata.',
        'features.profiles.title': 'Più profili',
        'features.profiles.desc': 'Separa i documenti personali e quelli aziendali con profili distinti. Ognuno con le proprie impostazioni e connessioni cloud.',
        'features.privacy.title': 'I tuoi dati restano tuoi',
        'features.privacy.desc': 'I tuoi documenti sono tuoi. Non conserviamo sui nostri server i tuoi documenti completi né le immagini delle pagine — vanno solo al servizio di IA gestita che operiamo noi e ai servizi cloud che scegli tu. Finché hai effettuato l’accesso, la cronologia delle tue scansioni si sincronizza con i nostri server in Germania: i dettagli della cronologia, una piccola anteprima a bassa risoluzione e il testo che abbiamo estratto dalle pagine. Scandora è progettata tenendo conto di GoBD e DSGVO.',

        // How It Works
        'howItWorks.badge': 'Dalla scansione all’azione',
        'howItWorks.title': 'Dalla carta all’azione in tre passaggi',
        'howItWorks.description': 'Scansiona, lascia che l’IA gestita lo comprenda, invialo ai tuoi strumenti. Le tue scansioni originali restano sul tuo dispositivo e nell’archiviazione che scegli.',
        'howItWorks.step1.title': 'Scansionalo',
        'howItWorks.step1.desc': 'Usa la fotocamera del telefono o uno scanner di rete (eSCL/AirScan). Il rilevamento automatico dei bordi mantiene pulita ogni pagina.',
        'howItWorks.step2.title': 'L’IA gestita lo comprende',
        'howItWorks.step2.desc': 'L’IA gestita di Scandora legge il documento, ne riconosce il tipo ed estrae i dettagli chiave. Sui nostri server nell’UE vengono conservati solo un’anteprima a bassa risoluzione e il testo estratto — mai i tuoi file originali.',
        'howItWorks.step3.title': 'Diventa un’azione',
        'howItWorks.step3.desc': 'Il risultato si sincronizza direttamente con il tuo Trello e il tuo Google Drive — una scheda, un documento archiviato, pronti per agire. Scandora mette la privacy al primo posto e include funzioni di tenuta dei registri GoBD.',

        // Pricing
        'pricing.badge': 'Prezzi flessibili',
        'pricing.title': 'Scegli il piano giusto per te',
        'pricing.description': 'Inizia gratis, passa a un piano superiore quando cresci. IA gestita e integrazioni cloud in ogni piano.',
        'pricing.perMonth': '/mese',
        'pricing.perYear': '/anno',
        'pricing.billingMonthly': 'Mensile',
        'pricing.billingAnnual': 'Annuale · risparmia fino al 26%',
        'pricing.popular': 'Più popolare',
        'pricing.free.name': 'Free',
        'pricing.free.tagline': 'Per iniziare',
        'pricing.free.f1': 'Estrazione con IA gestita (10 crediti al mese)',
        'pricing.free.f2': 'Scansioni illimitate, pagine illimitate',
        'pricing.free.f3': '10 crediti IA al mese (1 credito = 1 analisi di documento o 1 risposta della chat con l’IA; condivisi tra estrazione, indicizzazione e chat con l’IA)',
        'pricing.free.f5': 'Integrazioni cloud (Trello, Google Drive)',
        'pricing.free.cta': 'Inizia',
        'pricing.pro.name': 'Pro',
        'pricing.pro.tagline': 'Per i professionisti',
        'pricing.pro.f1': '1.000 crediti IA al mese (1 credito = 1 analisi di documento o 1 risposta della chat con l’IA; condivisi tra estrazione, indicizzazione e chat con l’IA)',
        'pricing.pro.f2': 'Supporto per scanner di rete (eSCL/AirScan)',
        'pricing.pro.f3': 'Chat con l’IA sui documenti, con risposte citate',
        'pricing.pro.f4': 'Integrazioni cloud',
        'pricing.pro.f5': 'Assistenza prioritaria',
        'pricing.pro.cta': 'Ottieni Pro',
        'pricing.pro.save': 'Risparmia il 26%',
        'pricing.business.name': 'Business / DATEV',
        'pricing.business.tagline': 'Per piccole imprese e consulenti fiscali',
        'pricing.business.f1': '5.000 crediti IA al mese (1 credito = 1 analisi di documento o 1 risposta della chat con l’IA; condivisi tra estrazione, indicizzazione e chat con l’IA)',
        'pricing.business.f2': 'Esportazione DATEV per il tuo consulente fiscale (prossimamente)',
        'pricing.business.f3': 'Esportazione dei giustificativi per lexoffice e sevDesk (prossimamente)',
        'pricing.business.f4': 'Pensato per la tenuta dei registri secondo GoBD e DSGVO',
        'pricing.business.f5': 'Assistenza dedicata',
        'pricing.business.cta': 'Ottieni Business',
        'pricing.business.save': 'Risparmia il 24%',
        'pricing.byo': '💡 L’IA gestita copre estrazione, indicizzazione e chat con l’IA — nessuna chiave API da configurare.',
        'pricing.aiSplit.title': 'Cosa fa l’IA per te',
        'pricing.aiSplit.ownKey': 'L’IA legge ogni scansione ed estrae date, importi e fornitori — coperto dai tuoi crediti mensili.',
        'pricing.aiSplit.scandoraAi': 'La chat con i documenti e la ricerca funzionano sul tuo dispositivo e con l’IA di Scandora, e consumano crediti Scandora.',
        'pricing.priceNote': 'I prezzi mostrati nell’App Store / Google Play sono i prezzi finali del rispettivo prodotto (gestore di piccola impresa — nessuna IVA indicata separatamente, § 19 UStG); con una prova, un’offerta introduttiva o promozionale, o un cambio di piano con calcolo proporzionale, l’importo effettivamente addebitato può differire, e fa fede l’importo indicato dallo store sulla tua ricevuta. I prezzi possono variare a seconda dell’area geografica e dello store.',

        // Download
        'download.title': 'Pronto a chiedere qualsiasi cosa ai tuoi documenti?',
        'download.description': 'Scarica Scandora, scansiona il tuo primo documento e fagli una domanda — i tuoi dati restano tuoi. Disponibile su iOS, macOS e Android.',

        // Footer
        'footer.tagline': 'Scansione intelligente dei documenti per le aziende moderne.',
        'footer.product': 'Prodotto',
        'footer.legal': 'Informazioni legali',
        'footer.support': 'Assistenza',
        'footer.privacy': 'Informativa sulla privacy',
        'footer.terms': 'Termini di servizio',
        'footer.avv': 'AVV / DPA',
        'footer.imprint': 'Note legali',
        'footer.help': 'Centro assistenza',
        'footer.contact': 'Contattaci',
        'footer.paperlessSmb': 'Senza carta per le piccole imprese',
        'footer.paperlessHome': 'Ufficio senza carta a casa',
        'footer.invoiceData': 'Estrazione dei dati dalle fatture',
        'footer.scanTrello': 'Scansiona su Trello',
        'footer.euServers': 'Scanner su server nell’UE',
        'footer.rights': 'Tutti i diritti riservati.',
        'footer.legalNotice': '{imprint}, {terms} e {avv} sono disponibili in inglese e in tedesco.',

        // Contact Page
        'contact.badge': 'Mettiamoci in contatto',
        'contact.title': 'Ci farebbe piacere avere tue notizie',
        'contact.subtitle': 'Hai una domanda o un suggerimento, oppure ti serve assistenza? Il nostro team è qui per aiutarti a sfruttare al meglio Scandora.',
        'contact.formTitle': 'Inviaci un messaggio',
        'contact.formDesc': 'Compila il modulo qui sotto e ti risponderemo entro 24 ore.',
        'contact.name': 'Nome e cognome',
        'contact.email': 'Indirizzo e-mail',
        'contact.subject': 'Oggetto',
        'contact.selectSubject': 'Seleziona un oggetto',
        'contact.subjectGeneral': 'Richiesta generale',
        'contact.subjectSupport': 'Assistenza tecnica',
        'contact.subjectSales': 'Vendite e prezzi',
        'contact.subjectPartnership': 'Collaborazione',
        'contact.subjectFeedback': 'Commenti e suggerimenti',
        'contact.message': 'Il tuo messaggio',
        'contact.send': 'Invia messaggio',
        'contact.responseTime': 'Tempo di risposta',
        'contact.responseValue': 'Entro 24 ore',
        'contact.responseNote': 'Lun - Ven, 9:00 - 18:00 CET',
        'contact.quickLinks': 'Link rapidi',
        'contact.home': 'Pagina iniziale',
        'contact.viewPricing': 'Vedi i piani e i prezzi',
        'contact.downloadApp': 'Scarica l’app',
        'contact.successTitle': 'Messaggio inviato!',
        'contact.successMessage': 'Grazie per averci scritto. Ti risponderemo entro 24 ore.',
        'contact.successButton': 'Ho capito',

        // Blog / Guides
        'blog.badge': 'Guida',
        'blog.backHome': 'Torna alla home',
        'blogFileee.badge': 'Confronto',
        'blogFileee.backHome': 'Torna alla home',

        // Comparison / landing pages (5.5)
        'features.compareFileee': 'Scandora contro Fileee',
        'features.compareCamscanner': 'Scandora contro CamScanner',
        'features.privacyGdprLink': 'Scanner di documenti GDPR',
        'pricing.business.datevLink': 'Per consulenti fiscali e DATEV →',
        'pricing.free.paperlessLink': 'Eliminare la carta in una piccola impresa →',
        'gdprScanner.badge': 'Scansione GDPR',
        'gdprScanner.backHome': 'Torna alla home',
        'vsFileee.badge': 'Confronto',
        'vsFileee.backHome': 'Torna alla home',
        'vsCamscanner.badge': 'Confronto',
        'vsCamscanner.backHome': 'Torna alla home',
        'paperlessSmb.badge': 'Guida',
        'paperlessSmb.backHome': 'Torna alla home',
        'paperlessHome.badge': 'Guida',
        'paperlessHome.backHome': 'Torna alla home',
        'invoiceData.badge': 'Guida',
        'invoiceData.backHome': 'Torna alla home',
        'scanTrello.badge': 'Integrazione',
        'scanTrello.backHome': 'Torna alla home',
        'euServers.badge': 'Residenza dei dati',
        'euServers.backHome': 'Torna alla home',
        'datevSteuerberater.badge': 'Per consulenti fiscali',
        'datevSteuerberater.backHome': 'Torna alla home',
        'blogTrello.homepageLink': 'Leggi: il flusso di lavoro dalla scansione a Trello →',

        // Time-Saved Calculator
        'calc.badge': 'Tempo risparmiato',
        'calc.title': 'Scopri quanto tempo risparmieresti',
        'calc.description': 'L’IA di Scandora estrae i dati da ogni documento, così non devi riscriverli. Sposta il cursore per stimare l’inserimento manuale dei dati che salteresti ogni mese.',
        'calc.docsLabel': 'Documenti scansionati a settimana',
        'calc.docsPerWeek': 'documenti/settimana',
        'calc.hoursUnit': 'ore/mese risparmiate',
        'calc.assumption': 'Si basa su circa 3 minuti di inserimento manuale dei dati risparmiati per documento.',
        'calc.cta': 'Inizia gratis',

        // FAQ
        'faq.badge': 'FAQ',
        'faq.title': 'Domande frequenti',
        'faq.description': 'Tutto quello che devi sapere su Scandora — scansione, privacy, prezzi ed esportazione DATEV.',
        'faq.q1': 'Che cos’è Scandora?',
        'faq.a1': 'Scandora è un’app di scansione di documenti basata sull’IA che trasforma i tuoi documenti cartacei in intelligenza digitale. Estrae automaticamente informazioni chiave come date, importi e nomi, poi sincronizza tutto con i tuoi servizi cloud preferiti, come Trello e Google Drive.',
        'faq.q2': 'Scandora è gratuita?',
        'faq.a2': 'Sì! Il piano gratuito di Scandora include scansioni illimitate, 10 crediti IA al mese (estrazione, indicizzazione e chat con l’IA sui documenti) e integrazioni cloud. I piani a pagamento sono già disponibili: Pro (9,99 €/mese o 89 €/anno) offre una quota mensile di crediti IA molto più ampia e assistenza prioritaria, e Business / DATEV (24,99 €/mese o 229 €/anno) aggiunge 5.000 crediti IA al mese, assistenza dedicata e un’acquisizione pensata per la tenuta dei registri secondo GoBD e DSGVO — la sua esportazione DATEV, lexoffice e sevDesk arriva prossimamente e non è ancora disponibile in questa versione. I prezzi mostrati nell’App Store o in Google Play sono i prezzi finali del rispettivo prodotto; con una prova, un’offerta introduttiva o promozionale, o un cambio di piano con calcolo proporzionale, l’importo effettivamente addebitato può differire, e fa fede l’importo indicato dallo store sulla tua ricevuta.',
        'faq.q3': 'Quali piattaforme supporta Scandora?',
        'faq.a3': 'Scandora è disponibile su iOS, macOS e Android. Puoi scansionare i documenti con la fotocamera del telefono o collegare scanner professionali su desktop.',
        'faq.q4': 'I miei dati sono al sicuro con Scandora?',
        'faq.a4': 'La privacy è parte integrante del progetto di Scandora. Le tue scansioni originali restano sul tuo dispositivo e vanno solo direttamente a Google Gemini per l’estrazione — con una credenziale di breve durata emessa dal nostro server — e ai servizi cloud che scegli. Affinché la tua cronologia si sincronizzi tra i tuoi dispositivi, conserviamo sui nostri server nell’UE un’anteprima a bassa risoluzione e il testo estratto — mai i tuoi file originali. La ricerca e la chat con l’IA sui documenti funzionano sul tuo dispositivo. Per costruire il loro indice, il tuo dispositivo invia a Google (Vertex AI nell’UE) il testo estratto e la descrizione IA di ogni documento che scansioni con l’accesso effettuato; una ricerca invia poi solo la query di ricerca, e una risposta solo la tua domanda e i passaggi su cui si basa. La generazione dell’IA gestita viene elaborata nell’UE — Google Gemini su Vertex AI a Francoforte, in Germania. Mantieni il controllo dei tuoi dati.',
        'faq.q5': 'Mi serve una chiave API personale per usare l’IA?',
        'faq.a5': 'No. Scandora funziona con l’IA gestita: i tuoi crediti mensili coprono estrazione dei documenti, indicizzazione e chat con l’IA. Non esiste una modalità con chiave personale, quindi non c’è nessuna chiave API da ottenere o inserire.',
        'faq.q6': 'Scandora è conforme al GDPR?',
        'faq.a6': 'Scandora è progettata tenendo conto del GDPR (DSGVO). Le tue scansioni originali restano sul tuo dispositivo e nell’archiviazione che scegli, i server che gestiamo sono nell’UE e non inseriamo tracker pubblicitari di terze parti. Per l’uso aziendale mettiamo a disposizione un accordo sul trattamento dei dati (AVV; art. 28 GDPR) che puoi leggere, scaricare e firmare.',
        'faq.q7': 'Mi serve una connessione a internet per scansionare?',
        'faq.a7': 'No. Scansione e rilevamento dei bordi funzionano entrambi offline. La connessione serve solo quando sincronizzi un documento con un servizio cloud come Trello o Google Drive, o quando l’IA gestita elabora una scansione.',
        'faq.q8': 'Scandora può esportare in DATEV per il mio consulente fiscale?',
        'faq.a8': 'Prossimamente. L’esportazione DATEV (un lotto di registrazioni EXTF insieme alle immagini dei documenti) e l’esportazione dei giustificativi per lexoffice e sevDesk sono in preparazione per il piano Business / DATEV e non sono ancora disponibili in questa versione. Ciò che è disponibile oggi è l’acquisizione pensata per la tenuta dei registri secondo GoBD e DSGVO, per piccole imprese e consulenti fiscali.',
        'faq.q9': 'Qual è una buona soluzione di scansione dei documenti senza carta per una piccola impresa?',
        'faq.a9': 'Scandora è uno scanner di documenti con IA per iPhone, iPad, Mac e Android pensato proprio per questo. Scansioni con la fotocamera del telefono o con uno scanner di rete vero, l’IA gestita estrae fornitore, importo, IBAN e data di scadenza senza modelli, e ogni scansione può arrivare nel tuo Trello e nel tuo Google Drive. Funziona su server nell’UE e non ha pubblicità. Il piano gratuito include scansioni illimitate e 10 crediti IA al mese, così un’attività individuale può iniziare senza spendere nulla.',
        'faq.q10': 'Quale app di scansione dei documenti funziona con uno scanner da ufficio vero e non solo con la fotocamera del telefono?',
        'faq.a10': 'Scandora sì. Puoi scansionare con la fotocamera del telefono o importare pagine da uno scanner di rete tramite eSCL/AirScan — per esempio dispositivi Brother ed Epson. Il rilevamento automatico dei bordi viene eseguito su ogni pagina, e sia la scansione sia il rilevamento dei bordi funzionano offline.',
        'faq.q11': 'Come faccio a non riscrivere più i dati di fatture e ricevute?',
        'faq.a11': 'Lascia che li legga l’IA gestita. L’IA di Scandora estrae fornitore, importo, IBAN, data di scadenza e attività da svolgere da ogni scansione senza modelli, quindi non c’è nulla da digitare a mano. Da lì la scansione può diventare una scheda Trello o un documento archiviato in Google Drive nei tuoi account, trasformando il documento in qualcosa su cui puoi agire invece che in un altro PDF.',
        'faq.q12': 'Posso fare domande sui miei documenti scansionati e ricevere una risposta con la fonte?',
        'faq.a12': 'Sì. Fai una domanda all’IA e ricevi una risposta con citazioni tratte dai tuoi documenti, con un link alla fonte usata. La chat con i documenti fa parte di ogni piano e consuma gli stessi crediti IA mensili dell’estrazione. Il recupero dei passaggi avviene sul tuo dispositivo, su un indice locale, che il tuo dispositivo costruisce inviando a Google il testo estratto e la descrizione IA di ogni documento che scansioni con l’accesso effettuato; una risposta invia poi direttamente a Google la tua domanda e i passaggi che seleziona — mai i tuoi file originali.',
        'faq.q13': 'Posso tenere separati i documenti personali e aziendali in un’unica app di scansione?',
        'faq.a13': 'Sì. Scandora ha più profili, così puoi separare i documenti personali e quelli aziendali. Ogni profilo ha le proprie impostazioni e le proprie connessioni cloud.',
        'faq.q14': 'Esiste uno scanner di documenti con un accordo sul trattamento dei dati (AVV) per l’uso aziendale?',
        'faq.a14': 'Sì. Per l’uso aziendale Scandora mette a disposizione un accordo sul trattamento dei dati (AVV; art. 28 GDPR) che puoi leggere, scaricare e firmare. L’app stessa è progettata tenendo conto del GDPR (DSGVO): le tue scansioni originali restano sul tuo dispositivo e nell’archiviazione che scegli, i server che gestiamo sono nell’UE e non inseriamo tracker pubblicitari di terze parti.',

        // Footer — DSA report route and accessibility statement
        'footer.reportContent': 'Segnala contenuti illegali',
        'footer.accessibility': 'Accessibilità',

        // Careers
        'nav.careers': 'Lavora con noi',
        'footer.careers': 'Lavora con noi',
        'careers.backHome': 'Torna alla home',
        'careers.badge': 'Lavora con noi',
        'careers.title': 'Costruisci Scandora con noi',
        'careers.subtitle': 'Scandora è una piccola azienda che dà priorità al lavoro da remoto e sta costruendo uno scanner di documenti con IA. I documenti dei clienti restano nell’UE, e così anche il lavoro.',
        'careers.openRoles': 'Posizioni aperte',
        'careers.responsibilities': 'Cosa faresti',
        'careers.requirements': 'Cosa cerchiamo',
        'careers.apply': 'Candidati via e-mail',
        'careers.howTitle': 'Come candidarti',
        'careers.howBody': 'Scrivi a jobs@scandora.eu con una breve nota, un CV o il link a un profilo, indicando la posizione nell’oggetto. Nessun modulo, nessun account, nessun tracciamento.',
        'careers.emptyTitle': 'Nessuna posizione aperta al momento',
        'careers.emptyBody': 'Al momento non è pubblicata nessuna posizione. Se pensi di essere comunque la persona giusta, scrivici — leggiamo ogni messaggio.',
        'careers.generalTitle': 'Nessuna fa per te?',
        'careers.generalBody': 'Mandaci una breve nota su ciò che fai e il link a qualcosa che hai realizzato. Leggiamo ogni candidatura.',
        'careers.generalApply': 'Invia una candidatura spontanea',

        'footer.comingSoon': 'Prossimamente',
        'footer.scanNextcloud': 'Scansiona su Nextcloud (prossimamente)',
        'footer.scanOneDrive': 'Scansiona su OneDrive (prossimamente)',
        'footer.scanDropbox': 'Scansiona su Dropbox (prossimamente)',
        'comingSoon.backHome': 'Torna alla home',
        'comingSoon.badge': 'Prossimamente',
        'comingSoon.howTitle': 'Cosa stiamo costruendo',
        'comingSoon.interestTitle': 'Lo vuoi?',
        'comingSoon.interestBody': 'Basta un clic per dircelo. Non c’è alcun modulo né alcun campo e-mail, e il clic non imposta alcun cookie.',
        'comingSoon.interestButton': 'Dicci che lo vuoi',
        'comingSoon.interestThanks': 'Grazie, l’abbiamo annotato. Non devi fare altro.',
        'comingSoon.interestPrivate': 'Grazie. L’impostazione di privacy del tuo browser disattiva il nostro contatore dei visitatori, quindi questo clic non è stato conteggiato. Non devi fare altro.',
        'comingSoon.interestUncounted': 'Grazie. Questo clic non è stato conteggiato. Non devi fare altro.',
        'comingSoon.alsoLead': 'Vedi anche:',
        'comingSoon.todayLead': 'Disponibile oggi nell’app:',
        'comingSoon.todayTrello': 'scansione su Trello',
        'comingSoon.todayDrive': 'e su Google Drive.',
        'scanNextcloud.title': 'Scansiona su Nextcloud — prossimamente',
        'scanNextcloud.lead': 'Prossimamente: invia le scansioni completate al tuo Nextcloud e importa file da lì. Questa connessione non è ancora disponibile nell’app.',
        'scanNextcloud.how': 'Il supporto per Nextcloud arriva prossimamente. Inserisci l’indirizzo del tuo server, il tuo nome utente e una password per l’app, e puoi indicare una cartella di destinazione. Scandora invia una scansione completata in quella cartella come PDF che prende il nome dal titolo del documento, e puoi scegliere file sul tuo server da importare nell’app. Tutto questo non è ancora nell’app.',
        'scanNextcloud.trademark': 'Nextcloud è un marchio di Nextcloud GmbH. Scandora non è affiliata a Nextcloud GmbH.',
        'scanOneDrive.title': 'Scansiona su OneDrive — prossimamente',
        'scanOneDrive.lead': 'Prossimamente: invia le scansioni completate al tuo OneDrive e importa file da lì. Questa connessione non è ancora disponibile nell’app.',
        'scanOneDrive.how': 'Il supporto per OneDrive arriva prossimamente. Accedi con il tuo account e scegli una cartella. Scandora invia una scansione completata in quella cartella come PDF che prende il nome dal titolo del documento, e puoi scegliere file dal tuo account da importare nell’app. Tutto questo non è ancora nell’app.',
        'scanOneDrive.trademark': 'OneDrive è un marchio del gruppo di aziende Microsoft. Scandora non è affiliata a Microsoft.',
        'scanDropbox.title': 'Scansiona su Dropbox — prossimamente',
        'scanDropbox.lead': 'Prossimamente: invia le scansioni completate al tuo Dropbox e importa file da lì. Questa connessione non è ancora disponibile nell’app.',
        'scanDropbox.how': 'Il supporto per Dropbox arriva prossimamente. Accedi con il tuo account e scegli una cartella. Scandora invia una scansione completata in quella cartella come PDF che prende il nome dal titolo del documento, e puoi scegliere file dal tuo account da importare nell’app. Tutto questo non è ancora nell’app.',
        'scanDropbox.trademark': 'Dropbox è un marchio di Dropbox, Inc. Scandora non è affiliata a Dropbox, Inc.'
    },
    nl: {
        'language.name': 'Nederlands',
        'language.englishName': 'Dutch',
        'language.locale': 'nl_NL',
        'language.menu': 'Taal',
        'language.search': 'Talen zoeken',

        'languageBanner.text': 'Deze pagina is ook beschikbaar in het Nederlands.',
        'languageBanner.link': 'Lees in het Nederlands',
        'languageBanner.dismiss': 'Sluiten',

        'nav.features': 'Functies',
        'nav.howItWorks': 'Hoe het werkt',
        'nav.pricing': 'Prijzen',
        'nav.blog': 'Handleidingen',
        'nav.download': 'Downloaden',

        'hero.brandDescriptor': 'AI-documentscanner',
        'hero.badge': 'AVG voorop · EU-servers · Geen advertenties',
        'hero.titleLine1': 'Documenten scannen met Scandora.',
        'hero.titleLine2': 'Vraag er daarna alles over.',
        'hero.lede': 'Scandora is een AI-documentscanner voor iPhone, iPad, Mac en Android waarvan je het resultaat kunt bevragen.',
        'hero.description': 'Scan een factuur met je telefoon of met je echte kantoorscanner en vraag vervolgens wanneer de factuur betaald moet zijn of wat het IBAN is. De AI haalt leverancier, bedrag, IBAN, vervaldatum en taken eruit zonder sjabloon, je bestanden komen in je eigen Google Drive en Trello terecht en elke scan blijft doorzoekbaar op je apparaat. Scandora zet de AVG voorop, draait op EU-servers en bevat geen advertenties.',
        'hero.getStarted': 'Gratis aan de slag',
        'hero.seeHow': 'Bekijk hoe het werkt',
        'hero.stat1': 'Vraag het aan je document',
        'hero.stat1sub': 'Antwoorden uit je scan',
        'hero.stat2': 'AI leest de details',
        'hero.stat2sub': 'Leverancier, bedrag, IBAN, vervaldatum',
        'hero.stat3': 'Jouw cloud, niet de onze',
        'hero.stat3sub': 'Rechtstreeks naar Drive en Trello',

        'features.badge': 'Wat Scandora anders maakt',
        'features.title': 'Gemaakt voor actie, niet alleen voor scannen',
        'features.description': 'AI leest elk document, sluit een echte scanner aan en maak van elke scan een taak of bestand waarmee je aan de slag kunt — met je gegevens onder jouw controle.',
        'features.scan.title': 'Telefoon of echte scanner',
        'features.scan.desc': 'Scan met je telefooncamera of sluit een echte netwerkscanner aan via eSCL/AirScan (zoals Brother en Epson). Automatische randdetectie op elke pagina.',
        'features.ai.title': 'AI die elk document leest',
        'features.ai.desc': 'Beheerde AI leest elke scan en haalt datums, bedragen en leveranciers eruit, zodat je niets handmatig hoeft in te voeren. Credits dekken extractie, indexering en AI-chat — geen sleutel om te beheren.',
        'features.cloud.title': 'Rechtstreeks naar Trello en Drive',
        'features.cloud.desc': 'Elke scan kan een Trello-kaart worden of een in Google Drive opgeslagen document, gekoppeld aan je eigen accounts. Je documenten worden acties, niet alleen PDF-bestanden.',
        'features.search.title': 'Slim zoeken',
        'features.search.desc': 'Stel de AI een vraag en krijg een antwoord met bronvermelding uit je eigen documenten, met een link naar de bron die is gebruikt.',
        'features.profiles.title': 'Meerdere profielen',
        'features.profiles.desc': 'Houd persoonlijke en zakelijke documenten gescheiden met aparte profielen. Elk met eigen instellingen en cloudkoppelingen.',
        'features.privacy.title': 'Jouw gegevens blijven van jou',
        'features.privacy.desc': 'Je documenten zijn van jou. Wij slaan je volledige documenten en pagina-afbeeldingen niet op onze servers op — ze gaan alleen naar de beheerde AI-dienst die wij exploiteren en naar de clouddiensten die je zelf kiest. Zolang je bent ingelogd, wordt je scangeschiedenis gesynchroniseerd met onze servers in Duitsland: de geschiedenisgegevens, een kleine voorvertoning met lage resolutie en de tekst die we uit de pagina\'s hebben gehaald. Scandora is ontworpen met GoBD en AVG in gedachten.',

        'howItWorks.badge': 'Van scan tot actie',
        'howItWorks.title': 'Van papier naar actie in drie stappen',
        'howItWorks.description': 'Scan het, laat beheerde AI het begrijpen en stuur het naar je eigen tools. Je originele scans blijven op je apparaat en in de opslag die je kiest.',
        'howItWorks.step1.title': 'Scan het',
        'howItWorks.step1.desc': 'Gebruik je telefooncamera of een netwerkscanner (eSCL/AirScan). Automatische randdetectie houdt elke pagina schoon.',
        'howItWorks.step2.title': 'Beheerde AI begrijpt het',
        'howItWorks.step2.desc': 'De beheerde AI van Scandora leest het document, herkent het type en haalt de belangrijkste gegevens eruit. Alleen een voorvertoning met lage resolutie en de uitgelezen tekst worden opgeslagen op onze EU-servers — nooit je originele bestanden.',
        'howItWorks.step3.title': 'Het wordt een actie',
        'howItWorks.step3.desc': 'Het resultaat wordt rechtstreeks gesynchroniseerd met je eigen Trello en Google Drive — een kaart, een opgeslagen document, klaar om mee aan de slag te gaan. Scandora zet privacy voorop en heeft GoBD-functies voor het bijhouden van een administratie.',

        'pricing.badge': 'Flexibele prijzen',
        'pricing.title': 'Kies je ideale abonnement',
        'pricing.description': 'Begin gratis en upgrade naarmate je groeit. Beheerde AI en cloudintegraties in elk abonnement.',
        'pricing.perMonth': '/maand',
        'pricing.perYear': '/jaar',
        'pricing.billingMonthly': 'Maandelijks',
        'pricing.billingAnnual': 'Jaarlijks · bespaar tot 26%',
        'pricing.popular': 'Populair',
        'pricing.free.name': 'Free',
        'pricing.free.tagline': 'Aan de slag',
        'pricing.free.f1': 'Beheerde AI-extractie (10 credits/maand)',
        'pricing.free.f2': 'Onbeperkte scans, onbeperkte pagina\'s',
        'pricing.free.f3': '10 AI-credits/maand (1 credit = 1 documentanalyse of AI-chatantwoord; gedeeld: extractie, indexering en AI-chat)',
        'pricing.free.f5': 'Cloudintegraties (Trello, Google Drive)',
        'pricing.free.cta': 'Aan de slag',
        'pricing.pro.name': 'Pro',
        'pricing.pro.tagline': 'Voor professionals',
        'pricing.pro.f1': '1.000 AI-credits/maand (1 credit = 1 documentanalyse of AI-chatantwoord; gedeeld: extractie, indexering en AI-chat)',
        'pricing.pro.f2': 'Ondersteuning voor netwerkscanners (eSCL/AirScan)',
        'pricing.pro.f3': 'AI-documentchat met bronvermelding bij antwoorden',
        'pricing.pro.f4': 'Cloudintegraties',
        'pricing.pro.f5': 'Prioriteitsondersteuning',
        'pricing.pro.cta': 'Pro kiezen',
        'pricing.pro.save': 'Bespaar 26%',
        'pricing.business.name': 'Business / DATEV',
        'pricing.business.tagline': 'Voor kleine bedrijven en belastingadviseurs',
        'pricing.business.f1': '5.000 AI-credits/maand (1 credit = 1 documentanalyse of AI-chatantwoord; gedeeld: extractie, indexering en AI-chat)',
        'pricing.business.f2': 'DATEV-export voor je belastingadviseur (binnenkort)',
        'pricing.business.f3': 'Export van boekstukken naar lexoffice en sevDesk (binnenkort)',
        'pricing.business.f4': 'Ontworpen voor het bijhouden van een administratie volgens GoBD en AVG',
        'pricing.business.f5': 'Toegewijde ondersteuning',
        'pricing.business.cta': 'Business kiezen',
        'pricing.business.save': 'Bespaar 24%',
        'pricing.byo': '💡 Beheerde AI dekt extractie, indexering en AI-chat — geen API-sleutel om in te stellen.',
        'pricing.aiSplit.title': 'Wat de AI voor je doet',
        'pricing.aiSplit.ownKey': 'AI leest elke scan en haalt datums, bedragen en leveranciers eruit — gedekt door je maandelijkse credits.',
        'pricing.aiSplit.scandoraAi': 'Documentchat en zoeken draaien op je apparaat en op de AI van Scandora, en verbruiken Scandora-credits.',
        'pricing.priceNote': 'De prijzen die in de App Store / Google Play worden getoond, zijn de eindprijzen voor het betreffende product (kleine ondernemer — geen aparte btw vermeld, § 19 UStG); bij een proefperiode, een introductie- of actieaanbieding of een naar rato berekende abonnementswijziging kan het bedrag dat daadwerkelijk in rekening wordt gebracht afwijken, en het bedrag dat de store op je aankoopbewijs vermeldt, is het bedrag dat geldt. Prijzen kunnen per regio en store verschillen.',

        'download.title': 'Klaar om je documenten alles te vragen?',
        'download.description': 'Download Scandora, scan je eerste document en stel er een vraag over — je gegevens blijven van jou. Beschikbaar op iOS, macOS en Android.',

        'footer.tagline': 'Slim documenten scannen voor moderne bedrijven.',
        'footer.product': 'Product',
        'footer.legal': 'Juridisch',
        'footer.support': 'Ondersteuning',
        'footer.privacy': 'Privacyverklaring',
        'footer.terms': 'Gebruiksvoorwaarden',
        'footer.avv': 'Verwerkersovereenkomst (AVV)',
        'footer.imprint': 'Bedrijfsgegevens',
        'footer.help': 'Helpcentrum',
        'footer.contact': 'Contact',
        'footer.paperlessSmb': 'Papierloos voor kleine bedrijven',
        'footer.paperlessHome': 'Papierloos kantoor thuis',
        'footer.invoiceData': 'Factuurgegevens uitlezen',
        'footer.scanTrello': 'Scannen naar Trello',
        'footer.euServers': 'Scanner op EU-servers',
        'footer.rights': 'Alle rechten voorbehouden.',
        'footer.legalNotice': '{imprint}, {terms} en {avv} zijn beschikbaar in het Engels en Duits.',

        'contact.badge': 'Neem contact met ons op',
        'contact.title': 'We horen graag van je',
        'contact.subtitle': 'Heb je een vraag, feedback of ondersteuning nodig? Ons team helpt je graag om Scandora ten volle te benutten.',
        'contact.formTitle': 'Stuur ons een bericht',
        'contact.formDesc': 'Vul het onderstaande formulier in en we nemen binnen 24 uur contact met je op.',
        'contact.name': 'Volledige naam',
        'contact.email': 'E-mailadres',
        'contact.subject': 'Onderwerp',
        'contact.selectSubject': 'Kies een onderwerp',
        'contact.subjectGeneral': 'Algemene vraag',
        'contact.subjectSupport': 'Technische ondersteuning',
        'contact.subjectSales': 'Verkoop en prijzen',
        'contact.subjectPartnership': 'Samenwerking',
        'contact.subjectFeedback': 'Feedback',
        'contact.message': 'Je bericht',
        'contact.send': 'Bericht verzenden',
        'contact.responseTime': 'Reactietijd',
        'contact.responseValue': 'Binnen 24 uur',
        'contact.responseNote': 'Ma - vr, 9:00 - 18:00 CET',
        'contact.quickLinks': 'Snelle links',
        'contact.home': 'Startpagina',
        'contact.viewPricing': 'Abonnementen bekijken',
        'contact.downloadApp': 'De app downloaden',
        'contact.successTitle': 'Bericht verzonden!',
        'contact.successMessage': 'Bedankt voor je bericht. We nemen binnen 24 uur contact met je op.',
        'contact.successButton': 'Begrepen',

        'blog.badge': 'Gids',
        'blog.backHome': 'Terug naar de startpagina',

        'blogFileee.badge': 'Vergelijking',
        'blogFileee.backHome': 'Terug naar de startpagina',

        'features.compareFileee': 'Scandora vs Fileee',
        'features.compareCamscanner': 'Scandora vs CamScanner',
        'features.privacyGdprLink': 'AVG-documentscanner',

        'pricing.business.datevLink': 'Voor belastingadviseurs en DATEV →',
        'pricing.free.paperlessLink': 'Papierloos werken in een klein bedrijf →',

        'gdprScanner.badge': 'Scannen en AVG',
        'gdprScanner.backHome': 'Terug naar de startpagina',

        'vsFileee.badge': 'Vergelijking',
        'vsFileee.backHome': 'Terug naar de startpagina',

        'vsCamscanner.badge': 'Vergelijking',
        'vsCamscanner.backHome': 'Terug naar de startpagina',

        'paperlessSmb.badge': 'Gids',
        'paperlessSmb.backHome': 'Terug naar de startpagina',

        'paperlessHome.badge': 'Gids',
        'paperlessHome.backHome': 'Terug naar de startpagina',

        'invoiceData.badge': 'Gids',
        'invoiceData.backHome': 'Terug naar de startpagina',

        'scanTrello.badge': 'Integratie',
        'scanTrello.backHome': 'Terug naar de startpagina',

        'euServers.badge': 'Gegevenslocatie',
        'euServers.backHome': 'Terug naar de startpagina',

        'datevSteuerberater.badge': 'Voor belastingadviseurs',
        'datevSteuerberater.backHome': 'Terug naar de startpagina',

        'blogTrello.homepageLink': 'Lees: de scan-naar-Trello-workflow →',

        'calc.badge': 'Bespaarde tijd',
        'calc.title': 'Zie hoeveel tijd je zou besparen',
        'calc.description': 'De AI van Scandora haalt de gegevens uit elk document, zodat je ze niet opnieuw hoeft over te typen. Beweeg de schuifregelaar om in te schatten hoeveel handmatige gegevensinvoer je per maand zou overslaan.',
        'calc.docsLabel': 'Gescande documenten per week',
        'calc.docsPerWeek': 'documenten/week',
        'calc.hoursUnit': 'uur/maand bespaard',
        'calc.assumption': 'Gebaseerd op ongeveer 3 minuten bespaarde handmatige gegevensinvoer per document.',
        'calc.cta': 'Gratis aan de slag',

        'faq.badge': 'FAQ',
        'faq.title': 'Veelgestelde vragen',
        'faq.description': 'Alles wat je moet weten over Scandora — scannen, privacy, prijzen en DATEV-export.',
        'faq.q1': 'Wat is Scandora?',
        'faq.a1': 'Scandora is een AI-gestuurde documentscanner-app die je papieren documenten omzet in digitale intelligentie. De app haalt automatisch belangrijke gegevens zoals datums, bedragen en namen eruit en synchroniseert alles met je favoriete cloudservices, zoals Trello en Google Drive.',
        'faq.q2': 'Is Scandora gratis te gebruiken?',
        'faq.a2': 'Ja! Het gratis abonnement van Scandora omvat onbeperkte scans, 10 AI-credits per maand (extractie, indexering en documentchat) en cloudintegraties. Betaalde abonnementen zijn nu beschikbaar. Pro (€9,99/maand of €89/jaar) voegt een veel groter maandelijks tegoed aan AI-credits en prioriteitsondersteuning toe. Business / DATEV (€24,99/maand of €229/jaar) voegt 5.000 AI-credits per maand, toegewijde ondersteuning en vastlegging van documenten toe, ontworpen voor het bijhouden van een administratie volgens GoBD en AVG; de DATEV-, lexoffice- en sevDesk-export komt binnenkort en zit nog niet in deze versie. De prijzen die in de App Store of Google Play worden getoond, zijn de eindprijzen voor het betreffende product. Bij een proefperiode, een introductie- of actieaanbieding of een naar rato berekende abonnementswijziging kan het daadwerkelijk in rekening gebrachte bedrag afwijken, en het bedrag dat de store op je aankoopbewijs vermeldt, is het bedrag dat geldt.',
        'faq.q3': 'Welke platforms ondersteunt Scandora?',
        'faq.a3': 'Scandora is beschikbaar op iOS, macOS en Android. Je kunt documenten scannen met de camera van je telefoon of op desktop professionele scanners aansluiten.',
        'faq.q4': 'Zijn mijn gegevens veilig bij Scandora?',
        'faq.a4': 'Privacy is ingebouwd in het ontwerp van Scandora. Je originele scans blijven op je apparaat en gaan alleen rechtstreeks naar Google Gemini voor extractie — met kortlevende toegangsgegevens die onze server uitgeeft — en naar de cloudservices die je kiest. Om je geschiedenis tussen je apparaten te synchroniseren, slaan we een voorvertoning met lage resolutie en de uitgelezen tekst op onze EU-servers op — nooit je originele bestanden. Het zoeken in documenten met AI en de documentchat draaien op je apparaat. Om hun index op te bouwen, stuurt je apparaat Google (Vertex AI in de EU) de uitgelezen tekst en de AI-beschrijving van elk document dat je scant terwijl je bent ingelogd; bij het zoeken wordt daarna alleen de zoekopdracht verstuurd, en bij een antwoord alleen je vraag en de passages waarop het is gebaseerd. De generatie door beheerde AI wordt in de EU verwerkt — Google Gemini op Vertex AI in Frankfurt, Duitsland. Jij houdt de controle over je gegevens.',
        'faq.q5': 'Heb ik een eigen API-sleutel nodig om de AI te gebruiken?',
        'faq.a5': 'Nee. Scandora draait op beheerde AI — je maandelijkse credits dekken documentextractie, indexering en AI-chat. Er is geen modus voor je eigen sleutel, dus je hoeft geen API-sleutel te verkrijgen of in te voeren.',
        'faq.q6': 'Is Scandora AVG-conform?',
        'faq.a6': 'Scandora is ontworpen met de AVG (DSGVO) in gedachten. Je originele scans blijven op je apparaat en in de opslag die je kiest, de servers die we zelf beheren staan in de EU, en we bouwen geen advertentietrackers van derden in. Voor zakelijk gebruik bieden we een verwerkersovereenkomst (AVV; art. 28 AVG) die je kunt lezen, downloaden en ondertekenen.',
        'faq.q7': 'Heb ik een internetverbinding nodig om te scannen?',
        'faq.a7': 'Nee. Scannen en randdetectie werken allebei offline. Je hebt alleen een verbinding nodig wanneer je een document synchroniseert met een cloudservice zoals Trello of Google Drive, of wanneer beheerde AI een scan verwerkt.',
        'faq.q8': 'Kan Scandora naar DATEV exporteren voor mijn belastingadviseur?',
        'faq.a8': 'Binnenkort: de DATEV-export (een EXTF-boekingsbatch samen met de documentafbeeldingen) en de export van boekstukken naar lexoffice en sevDesk worden voorbereid voor het abonnement Business / DATEV en zitten nog niet in deze versie. Wat vandaag wordt geleverd, is vastlegging van documenten, ontworpen voor het bijhouden van een administratie volgens GoBD en AVG, voor kleine bedrijven en belastingadviseurs.',
        'faq.q9': 'Wat is een goede oplossing om als klein bedrijf papierloos documenten te scannen?',
        'faq.a9': 'Scandora is een AI-documentscanner voor iPhone, iPad, Mac en Android, speciaal hiervoor ontworpen. Je scant met de camera van je telefoon of met een echte netwerkscanner, beheerde AI haalt leverancier, bedrag, IBAN en vervaldatum eruit zonder sjabloon, en elke scan kan terechtkomen in je eigen Trello en Google Drive. Scandora draait op EU-servers en bevat geen advertenties. Het gratis abonnement omvat onbeperkte scans en 10 AI-credits per maand, dus een bedrijf van één persoon kan beginnen zonder iets uit te geven.',
        'faq.q10': 'Welke documentscanner-app werkt met een echte kantoorscanner en niet alleen met de camera van een telefoon?',
        'faq.a10': 'Scandora wel. Je kunt scannen met de camera van je telefoon of pagina\'s binnenhalen vanaf een netwerkscanner via eSCL/AirScan — bijvoorbeeld Brother- en Epson-apparaten. Automatische randdetectie wordt op elke pagina toegepast, en zowel scannen als randdetectie werken offline.',
        'faq.q11': 'Hoe stop ik met het overtypen van de gegevens uit mijn facturen en bonnetjes?',
        'faq.a11': 'Laat de beheerde AI ze lezen. De AI van Scandora haalt leverancier, bedrag, IBAN, vervaldatum en to-do\'s zonder sjabloon uit elke scan, dus er hoeft niets met de hand te worden ingevoerd. Vanaf daar kan de scan een Trello-kaart worden of een opgeslagen Google Drive-document in je eigen accounts, waardoor het document iets wordt waarmee je aan de slag kunt in plaats van nog een PDF.',
        'faq.q12': 'Kan ik vragen stellen over mijn eigen gescande documenten en een antwoord met een bron krijgen?',
        'faq.a12': 'Ja. Stel de AI een vraag en je krijgt een antwoord met bronvermelding uit je eigen documenten, met een link naar de bron die is gebruikt. De documentchat maakt deel uit van elk abonnement en verbruikt dezelfde maandelijkse AI-credits als extractie. Het opzoeken van passages gebeurt op je apparaat aan de hand van een lokale index, die je apparaat opbouwt door Google de uitgelezen tekst en de AI-beschrijving te sturen van elk document dat je scant terwijl je bent ingelogd; bij een antwoord worden daarna je vraag en de passages die het selecteert rechtstreeks naar Google gestuurd — nooit je originele bestanden.',
        'faq.q13': 'Kan ik persoonlijke en zakelijke documenten gescheiden houden in één scanner-app?',
        'faq.a13': 'Ja. Scandora heeft meerdere profielen, zodat je persoonlijke en zakelijke documenten kunt scheiden. Elk profiel heeft eigen instellingen en eigen cloudverbindingen.',
        'faq.q14': 'Is er een documentscanner met een verwerkersovereenkomst (AVV) voor zakelijk gebruik?',
        'faq.a14': 'Ja. Voor zakelijk gebruik biedt Scandora een verwerkersovereenkomst (AVV; art. 28 AVG) die je kunt lezen, downloaden en ondertekenen. De app zelf is ontworpen met de AVG (DSGVO) in gedachten: je originele scans blijven op je apparaat en in de opslag die je kiest, de servers die we zelf beheren staan in de EU, en we bouwen geen advertentietrackers van derden in.',

        'footer.reportContent': 'Illegale inhoud melden',
        'footer.accessibility': 'Toegankelijkheid',

        'nav.careers': 'Vacatures',

        'footer.careers': 'Vacatures',

        'careers.backHome': 'Terug naar de startpagina',
        'careers.badge': 'Vacatures',
        'careers.title': 'Bouw met ons mee aan Scandora',
        'careers.subtitle': 'Scandora is een klein bedrijf dat vooral op afstand werkt en een AI-documentscanner bouwt. Documenten van klanten blijven in de EU, en het werk ook.',
        'careers.openRoles': 'Openstaande functies',
        'careers.responsibilities': 'Wat je zou doen',
        'careers.requirements': 'Waar we naar op zoek zijn',
        'careers.apply': 'Solliciteer per e-mail',
        'careers.howTitle': 'Zo solliciteer je',
        'careers.howBody': 'Stuur een e-mail naar jobs@scandora.eu met een korte toelichting, een cv of een link naar je profiel, en de functie in de onderwerpregel. Geen formulier, geen account, geen tracking.',
        'careers.emptyTitle': 'Momenteel geen openstaande functies',
        'careers.emptyBody': 'Op dit moment staat er geen functie open. Denk je toch dat je bij ons past, schrijf ons dan — we lezen elk bericht.',
        'careers.generalTitle': 'Past niets hiervan?',
        'careers.generalBody': 'Stuur een korte toelichting over wat je doet en een link naar iets wat je hebt gebouwd. We lezen elke sollicitatie.',
        'careers.generalApply': 'Open sollicitatie versturen',

        'footer.comingSoon': 'Binnenkort',
        'footer.scanNextcloud': 'Scan naar Nextcloud (binnenkort)',
        'footer.scanOneDrive': 'Scan naar OneDrive (binnenkort)',
        'footer.scanDropbox': 'Scan naar Dropbox (binnenkort)',

        'comingSoon.backHome': 'Terug naar de startpagina',
        'comingSoon.badge': 'Binnenkort',
        'comingSoon.howTitle': 'Wat er wordt gebouwd',
        'comingSoon.interestTitle': 'Wil je dit?',
        'comingSoon.interestBody': 'Eén klik laat het ons weten. Er is geen formulier en geen e-mailveld, en de klik plaatst geen cookie.',
        'comingSoon.interestButton': 'Laat weten dat je dit wilt',
        'comingSoon.interestThanks': 'Bedankt, we hebben het genoteerd. Verder hoef je niets te doen.',
        'comingSoon.interestPrivate': 'Bedankt. De privacyinstelling van je browser schakelt onze bezoekersteller uit, dus deze klik is niet geteld. Verder hoef je niets te doen.',
        'comingSoon.interestUncounted': 'Bedankt. Deze klik is niet geteld. Verder hoef je niets te doen.',
        'comingSoon.alsoLead': 'Zie ook:',
        'comingSoon.todayLead': 'Vandaag beschikbaar in de app:',
        'comingSoon.todayTrello': 'scan naar Trello',
        'comingSoon.todayDrive': 'en Google Drive.',

        'scanNextcloud.title': 'Scan naar Nextcloud — binnenkort',
        'scanNextcloud.lead': 'Binnenkort: voltooide scans naar je Nextcloud sturen en bestanden vanaf daar in de app halen. Deze verbinding zit nog niet in de app.',
        'scanNextcloud.how': 'Nextcloud-ondersteuning komt binnenkort. Je voert het adres van je server, je gebruikersnaam en een app-wachtwoord in, en je kunt een doelmap opgeven. Scandora stuurt een voltooide scan als PDF-bestand met de titel van het document als naam naar die map, en je kunt bestanden op je server kiezen om in de app te halen. Hiervan zit nog niets in de app.',
        'scanNextcloud.trademark': 'Nextcloud is een handelsmerk van Nextcloud GmbH. Scandora is niet gelieerd aan Nextcloud GmbH.',

        'scanOneDrive.title': 'Scan naar OneDrive — binnenkort',
        'scanOneDrive.lead': 'Binnenkort: voltooide scans naar je OneDrive sturen en bestanden vanaf daar in de app halen. Deze verbinding zit nog niet in de app.',
        'scanOneDrive.how': 'OneDrive-ondersteuning komt binnenkort. Je logt in met je account en kiest een map. Scandora stuurt een voltooide scan als PDF-bestand met de titel van het document als naam naar die map, en je kunt bestanden uit je account kiezen om in de app te halen. Hiervan zit nog niets in de app.',
        'scanOneDrive.trademark': 'OneDrive is een handelsmerk van de Microsoft-bedrijvengroep. Scandora is niet gelieerd aan Microsoft.',

        'scanDropbox.title': 'Scan naar Dropbox — binnenkort',
        'scanDropbox.lead': 'Binnenkort: voltooide scans naar je Dropbox sturen en bestanden vanaf daar in de app halen. Deze verbinding zit nog niet in de app.',
        'scanDropbox.how': 'Dropbox-ondersteuning komt binnenkort. Je logt in met je account en kiest een map. Scandora stuurt een voltooide scan als PDF-bestand met de titel van het document als naam naar die map, en je kunt bestanden uit je account kiezen om in de app te halen. Hiervan zit nog niets in de app.',
        'scanDropbox.trademark': 'Dropbox is een handelsmerk van Dropbox, Inc. Scandora is niet gelieerd aan Dropbox, Inc.'
    }
};

// Per-page <title> + meta descriptions, keyed by the page's canonical pathname.
// applyTranslations() resolves the page from its <link rel="canonical"> and writes
// the localized copy into document.title and the description/og/twitter meta tags,
// so the head follows the same language the body renders in.
const pageMeta = {
    "/": {
        "en": {
            "title": "Scandora — AI document scanner for receipts and invoices",
            "description": "Scan receipts, invoices and documents, then ask the AI about them. Originals stay on your device and in storage you choose: Google Drive or Trello."
        },
        "de": {
            "title": "Scandora — KI-Dokumentenscanner für Belege und Rechnungen",
            "description": "Belege, Rechnungen und Dokumente scannen und die KI dazu befragen. Originale bleiben auf Ihrem Gerät und im Speicher Ihrer Wahl: Google Drive oder Trello."
        },
        "es": {
            "title": "Scandora — escáner de documentos para recibos y facturas",
            "description": "Escanea recibos, facturas y documentos y pregunta a la IA sobre ellos. Los originales se quedan en tu dispositivo y en Google Drive o Trello, según elijas."
        },
        "pt-BR": {
            "title": "Scandora — scanner de documentos para recibos e faturas",
            "description": "Escaneie recibos, faturas e documentos e pergunte à IA sobre eles. Os originais ficam no dispositivo e no armazenamento de sua escolha: Google Drive ou Trello."
        },
        "it": {
            "title": "Scandora: scanner di documenti con IA per ricevute e fatture",
            "description": "Scansiona ricevute, fatture e documenti e fai domande all’IA. Gli originali restano sul tuo dispositivo e nell’archiviazione che scegli: Google Drive o Trello."
        },
        "nl": {
            "title": "Scandora — documentscanner met AI voor bonnetjes en facturen",
            "description": "Scan bonnetjes, facturen en documenten en stel er vragen over aan de AI. Originelen blijven op je apparaat en in opslag naar keuze: Google Drive of Trello."
        }
    },
    "/vs-camscanner": {
        "en": {
            "title": "Scandora vs CamScanner: an honest comparison | Scandora",
            "description": "Scandora vs CamScanner on verifiable facts: who develops each, data residency, managed AI, network-scanner support and the DATEV export coming soon."
        },
        "de": {
            "title": "Scandora vs. CamScanner: der ehrliche Vergleich | Scandora",
            "description": "Scandora vs. CamScanner nach belegbaren Fakten: Anbieter, Datenstandort, verwaltete KI, Netzwerkscanner-Support und DATEV-Export (in Vorbereitung)."
        },
        "es": {
            "title": "Scandora vs CamScanner: comparativa honesta | Scandora",
            "description": "Scandora vs CamScanner con datos verificables: desarrollador, ubicación de los datos, IA gestionada, escáneres de red y exportación a DATEV próximamente."
        },
        "pt-BR": {
            "title": "Scandora vs CamScanner: uma comparação honesta | Scandora",
            "description": "Scandora vs CamScanner com fatos verificáveis: quem desenvolve cada um, local dos dados, IA gerenciada, suporte a scanner de rede e exportação DATEV em breve."
        },
        "it": {
            "title": "Scandora vs CamScanner: un confronto onesto | Scandora",
            "description": "Scandora vs CamScanner su fatti verificabili: chi sviluppa ciascuno, residenza dei dati, IA gestita, scanner di rete ed esportazione DATEV prossimamente."
        },
        "nl": {
            "title": "Scandora vs CamScanner: een eerlijke vergelijking | Scandora",
            "description": "Scandora vs CamScanner op controleerbare feiten: wie ze ontwikkelt, gegevenslocatie, beheerde AI, netwerkscanners en de DATEV-export die binnenkort komt."
        }
    },
    "/paperless-small-business": {
        "en": {
            "title": "Paperless document scanning for a small business | Scandora",
            "description": "How a small business goes paperless: scan by phone or network scanner, managed AI reads each document, files land in your own Trello and Google Drive."
        },
        "de": {
            "title": "Papierloses Dokumentenscannen für kleine Unternehmen",
            "description": "Wie kleine Unternehmen papierlos werden: per Handy oder Netzwerkscanner scannen, verwaltete KI liest jedes Dokument, Ablage in Ihrem Trello und Drive."
        },
        "es": {
            "title": "Escaneo sin papel para una pequeña empresa | Scandora",
            "description": "Cómo ir sin papel en una pequeña empresa: escanea con teléfono o escáner de red, la IA gestionada lee cada documento y los archivos llegan a tu Trello y Drive."
        },
        "pt-BR": {
            "title": "Digitalização sem papel para uma pequena empresa | Scandora",
            "description": "Como uma pequena empresa fica sem papel: escaneie no celular ou scanner de rede, a IA gerenciada lê cada documento e arquivos vão ao seu Trello e Google Drive."
        },
        "it": {
            "title": "Scansione senza carta per una piccola impresa | Scandora",
            "description": "Una piccola impresa senza carta: scansiona da telefono o scanner di rete, l’IA gestita legge ogni documento e i file arrivano nel tuo Trello e Google Drive."
        },
        "nl": {
            "title": "Papierloos scannen voor een klein bedrijf | Scandora",
            "description": "Zo gaat een klein bedrijf papierloos: scan met telefoon of netwerkscanner, beheerde AI leest elk document en bestanden komen in je eigen Trello en Google Drive."
        }
    },
    "/paperless-home-office": {
        "en": {
            "title": "A paperless office solution for home | Scandora",
            "description": "Run a paperless office at home: scan the post with your phone or Wi-Fi scanner, let managed AI read each page, and keep home and work papers apart."
        },
        "de": {
            "title": "Papierloses Büro für zu Hause | Scandora",
            "description": "Papierloses Büro zu Hause: Post mit dem Handy oder WLAN-Scanner scannen, verwaltete KI liest jede Seite, Privates und Berufliches in getrennten Profilen."
        },
        "es": {
            "title": "Una solución de oficina sin papel para el hogar | Scandora",
            "description": "Oficina sin papel en casa: escanea la correspondencia con teléfono o escáner Wi-Fi, que la IA gestionada lea cada página y separa lo personal y lo laboral."
        },
        "pt-BR": {
            "title": "Uma solução de escritório sem papel para casa | Scandora",
            "description": "Escritório sem papel em casa: escaneie a correspondência com o celular ou scanner Wi-Fi, a IA gerenciada lê cada página e você separa o pessoal do trabalho."
        },
        "it": {
            "title": "Una soluzione per un ufficio senza carta a casa | Scandora",
            "description": "Un ufficio senza carta a casa: scansiona la posta con il telefono o lo scanner Wi-Fi, l’IA gestita legge ogni pagina e tieni separati casa e lavoro."
        },
        "nl": {
            "title": "Een papierloze kantooroplossing voor thuis | Scandora",
            "description": "Werk papierloos thuis: scan de post met je telefoon of wifi-scanner, laat beheerde AI elke pagina lezen en houd papieren voor thuis en werk gescheiden."
        }
    },
    "/invoice-data-extraction": {
        "en": {
            "title": "Scan invoices and extract the data automatically | Scandora",
            "description": "An app that scans invoices and reads the data off them: managed AI pulls out supplier, amount, IBAN and due date, ready for a Trello card or Drive file."
        },
        "de": {
            "title": "Rechnungen scannen und Daten automatisch auslesen | Scandora",
            "description": "Eine App, die Rechnungen scannt und die Daten ausliest: verwaltete KI holt Lieferant, Betrag, IBAN und Fälligkeit heraus, als Trello-Karte oder Drive-Datei."
        },
        "es": {
            "title": "Escanear facturas y extraer datos automáticamente | Scandora",
            "description": "Una app que escanea facturas y lee sus datos: la IA gestionada extrae proveedor, importe, IBAN y vencimiento, para una tarjeta de Trello o un archivo de Drive."
        },
        "pt-BR": {
            "title": "Escaneie faturas e extraia dados automaticamente | Scandora",
            "description": "Um app que escaneia faturas e lê os dados: a IA gerenciada extrai fornecedor, valor, IBAN e vencimento, prontos para um cartão do Trello ou arquivo do Drive."
        },
        "it": {
            "title": "Scansiona fatture ed estrai i dati in automatico | Scandora",
            "description": "Un’app che scansiona le fatture e ne legge i dati: l’IA gestita estrae fornitore, importo, IBAN e scadenza, pronti per una scheda Trello o un file su Drive."
        },
        "nl": {
            "title": "Facturen scannen en gegevens automatisch uitlezen | Scandora",
            "description": "Een app die facturen scant en de gegevens leest: beheerde AI haalt leverancier, bedrag, IBAN en vervaldatum eruit, klaar voor een Trello-kaart of Drive-bestand."
        }
    },
    "/scan-to-trello": {
        "en": {
            "title": "A document scanner that exports to Trello | Scandora",
            "description": "A document scanner that turns each scan into a Trello card in your own board, with the PDF attached, an AI-read title, labels, a due date and a checklist."
        },
        "de": {
            "title": "Dokumentenscanner mit Trello-Export | Scandora",
            "description": "Ein Dokumentenscanner, der jeden Scan zur Trello-Karte in Ihrem Board macht: PDF als Anhang, KI-gelesener Titel, Labels, Fälligkeit und Checkliste."
        },
        "es": {
            "title": "Escáner de documentos con exportación a Trello | Scandora",
            "description": "Escáner de documentos que crea una tarjeta de Trello por escaneo en tu tablero: PDF adjunto, título leído por IA, etiquetas, vencimiento y lista de tareas."
        },
        "pt-BR": {
            "title": "Scanner de documentos que exporta para o Trello | Scandora",
            "description": "Scanner de documentos que gera um cartão do Trello por digitalização no seu quadro, com PDF anexado, título lido pela IA, etiquetas, vencimento e checklist."
        },
        "it": {
            "title": "Scanner di documenti con esportazione su Trello | Scandora",
            "description": "Scanner di documenti che trasforma ogni scansione in una scheda Trello nella tua bacheca: PDF allegato, titolo letto dall’IA, etichette, scadenza e checklist."
        },
        "nl": {
            "title": "Een documentscanner die naar Trello exporteert | Scandora",
            "description": "Een documentscanner die van elke scan een Trello-kaart op je eigen bord maakt, met PDF-bijlage, een door AI gelezen titel, labels, vervaldatum en checklist."
        }
    },
    "/scan-to-nextcloud": {
        "en": {
            "title": "Scan to Nextcloud (coming soon) | Scandora",
            "description": "Scan to Nextcloud is coming soon to Scandora: send finished scans to a folder on your Nextcloud and bring files in from it. Not in the app yet."
        },
        "de": {
            "title": "Scan nach Nextcloud (demnächst) | Scandora",
            "description": "Scan nach Nextcloud kommt demnächst zu Scandora: fertige Scans in einen Ordner Ihrer Nextcloud senden und Dateien von dort holen. Noch nicht in der App."
        },
        "es": {
            "title": "Escanear a Nextcloud (próximamente) | Scandora",
            "description": "Escanear a Nextcloud llegará próximamente a Scandora: enviar escaneos terminados a una carpeta de tu Nextcloud y traer archivos de allí. Aún no está en la app."
        },
        "pt-BR": {
            "title": "Escanear para Nextcloud (em breve) | Scandora",
            "description": "Escanear para Nextcloud chega em breve ao Scandora: envie digitalizações prontas para uma pasta do seu Nextcloud e traga arquivos de lá. Ainda não está no app."
        },
        "it": {
            "title": "Scansione su Nextcloud (prossimamente) | Scandora",
            "description": "La scansione su Nextcloud arriva prossimamente in Scandora: invia le scansioni in una cartella del tuo Nextcloud e importa i file da lì. Non è ancora nell’app."
        },
        "nl": {
            "title": "Scannen naar Nextcloud (binnenkort) | Scandora",
            "description": "Scannen naar Nextcloud komt binnenkort naar Scandora: stuur voltooide scans naar een map op je Nextcloud en importeer er bestanden uit. Nog niet in de app."
        }
    },
    "/scan-to-onedrive": {
        "en": {
            "title": "Scan to OneDrive (coming soon) | Scandora",
            "description": "Scan to OneDrive is coming soon to Scandora: send finished scans to a folder in your OneDrive and bring files in from it. Not in the app yet."
        },
        "de": {
            "title": "Scan nach OneDrive (demnächst) | Scandora",
            "description": "Scan nach OneDrive kommt demnächst zu Scandora: fertige Scans in einen Ordner Ihres OneDrive senden und Dateien von dort holen. Noch nicht in der App."
        },
        "es": {
            "title": "Escanear a OneDrive (próximamente) | Scandora",
            "description": "Escanear a OneDrive llegará próximamente a Scandora: enviar escaneos terminados a una carpeta de tu OneDrive y traer archivos de allí. Aún no está en la app."
        },
        "pt-BR": {
            "title": "Escanear para OneDrive (em breve) | Scandora",
            "description": "Escanear para OneDrive chega em breve ao Scandora: envie digitalizações prontas para uma pasta do seu OneDrive e traga arquivos de lá. Ainda não está no app."
        },
        "it": {
            "title": "Scansione su OneDrive (prossimamente) | Scandora",
            "description": "La scansione su OneDrive arriva prossimamente in Scandora: invia le scansioni in una cartella del tuo OneDrive e importa i file da lì. Non è ancora nell’app."
        },
        "nl": {
            "title": "Scannen naar OneDrive (binnenkort) | Scandora",
            "description": "Scannen naar OneDrive komt binnenkort naar Scandora: stuur voltooide scans naar een map in je OneDrive en importeer er bestanden uit. Nog niet in de app."
        }
    },
    "/scan-to-dropbox": {
        "en": {
            "title": "Scan to Dropbox (coming soon) | Scandora",
            "description": "Scan to Dropbox is coming soon to Scandora: send finished scans to a folder in your Dropbox and bring files in from it. Not in the app yet."
        },
        "de": {
            "title": "Scan nach Dropbox (demnächst) | Scandora",
            "description": "Scan nach Dropbox kommt demnächst zu Scandora: fertige Scans in einen Ordner Ihrer Dropbox senden und Dateien von dort holen. Noch nicht in der App."
        },
        "es": {
            "title": "Escanear a Dropbox (próximamente) | Scandora",
            "description": "Escanear a Dropbox llegará próximamente a Scandora: enviar escaneos terminados a una carpeta de tu Dropbox y traer archivos de allí. Aún no está en la app."
        },
        "pt-BR": {
            "title": "Escanear para Dropbox (em breve) | Scandora",
            "description": "Escanear para Dropbox chega em breve ao Scandora: envie digitalizações prontas para uma pasta do seu Dropbox e traga arquivos de lá. Ainda não está no app."
        },
        "it": {
            "title": "Scansione su Dropbox (prossimamente) | Scandora",
            "description": "La scansione su Dropbox arriva prossimamente in Scandora: invia le scansioni in una cartella del tuo Dropbox e importa i file da lì. Non è ancora nell’app."
        },
        "nl": {
            "title": "Scannen naar Dropbox (binnenkort) | Scandora",
            "description": "Scannen naar Dropbox komt binnenkort naar Scandora: stuur voltooide scans naar een map in je Dropbox en importeer er bestanden uit. Nog niet in de app."
        }
    },
    "/document-scanner-eu-servers": {
        "en": {
            "title": "Document scanner on EU servers: where your data sits | Scandora",
            "description": "What reaches a server, what stays on your device, and where each is processed: Scandora's own servers in Falkenstein, Germany, and managed AI in Frankfurt."
        },
        "de": {
            "title": "Dokumentenscanner auf EU-Servern: wo Ihre Daten liegen",
            "description": "Was einen Server erreicht, was auf dem Gerät bleibt und wo es verarbeitet wird: Scandoras Server in Falkenstein und verwaltete KI in Frankfurt."
        },
        "es": {
            "title": "Escáner en servidores de la UE: dónde están tus datos",
            "description": "Qué llega a un servidor, qué queda en tu dispositivo y dónde se procesa: servidores propios de Scandora en Falkenstein, Alemania, y IA gestionada en Fráncfort."
        },
        "pt-BR": {
            "title": "Scanner em servidores da UE: onde ficam os dados | Scandora",
            "description": "O que vai ao servidor, o que fica no dispositivo e onde são tratados: servidores próprios do Scandora em Falkenstein, Alemanha, e IA gerenciada em Frankfurt."
        },
        "it": {
            "title": "Scanner su server UE: dove sono i tuoi dati | Scandora",
            "description": "Cosa arriva su un server, cosa resta sul dispositivo e dove viene elaborato: i server di Scandora a Falkenstein, in Germania, e l’IA gestita a Francoforte."
        },
        "nl": {
            "title": "Scanner op EU-servers: waar je gegevens staan | Scandora",
            "description": "Wat een server bereikt, wat op je apparaat blijft en waar het wordt verwerkt: Scandora's eigen servers in Falkenstein, Duitsland, en beheerde AI in Frankfurt."
        }
    },
    "/vs-fileee": {
        "en": {
            "title": "Scandora vs Fileee: an honest comparison | Scandora",
            "description": "Scandora vs Fileee on verifiable features: who develops each, managed AI, document storage, network-scanner support and the DATEV export coming soon."
        },
        "de": {
            "title": "Scandora vs. Fileee: der ehrliche Vergleich | Scandora",
            "description": "Scandora vs. Fileee nach belegbaren Merkmalen: Anbieter, verwaltete KI, Dokumentenablage, Netzwerkscanner-Support und DATEV-Export (in Vorbereitung)."
        },
        "es": {
            "title": "Scandora vs Fileee: comparativa honesta | Scandora",
            "description": "Scandora vs Fileee con funciones verificables: desarrollador, IA gestionada, almacenamiento, escáneres de red y exportación a DATEV próximamente."
        },
        "pt-BR": {
            "title": "Scandora vs Fileee: uma comparação honesta | Scandora",
            "description": "Scandora vs Fileee com recursos verificáveis: quem desenvolve cada um, IA gerenciada, armazenamento de documentos, scanners de rede e exportação DATEV em breve."
        },
        "it": {
            "title": "Scandora vs Fileee: un confronto onesto | Scandora",
            "description": "Scandora vs Fileee su funzioni verificabili: chi sviluppa ciascuno, IA gestita, archiviazione documenti, scanner di rete ed esportazione DATEV prossimamente."
        },
        "nl": {
            "title": "Scandora vs Fileee: een eerlijke vergelijking | Scandora",
            "description": "Scandora vs Fileee op controleerbare functies: wie ze ontwikkelt, beheerde AI, documentopslag, netwerkscanners en de DATEV-export die binnenkort komt."
        }
    },
    "/contact": {
        "en": {
            "title": "Contact Scandora | Get in Touch",
            "description": "Contact Scandora for support, sales inquiries or partnership opportunities. We usually reply within 24 hours, Monday to Friday."
        },
        "de": {
            "title": "Kontakt | Scandora",
            "description": "Kontaktieren Sie Scandora bei Fragen zu Support, Vertrieb oder Partnerschaften. Wir antworten in der Regel innerhalb von 24 Stunden, Mo–Fr."
        },
        "es": {
            "title": "Contacto con Scandora | Ponte en contacto",
            "description": "Escribe a Scandora para consultas de soporte, de ventas o sobre posibles colaboraciones. Solemos responder en un plazo de 24 horas, de lunes a viernes."
        },
        "pt-BR": {
            "title": "Contato com o Scandora | Fale conosco",
            "description": "Entre em contato com o Scandora para suporte, consultas de vendas ou oportunidades de parceria. Costumamos responder em até 24 horas, de segunda a sexta-feira."
        },
        "it": {
            "title": "Contatta Scandora | Mettiti in contatto",
            "description": "Contatta Scandora per supporto, richieste commerciali o opportunità di collaborazione. Di solito rispondiamo entro 24 ore, dal lunedì al venerdì."
        },
        "nl": {
            "title": "Contact met Scandora | Neem contact op",
            "description": "Neem contact op met Scandora voor ondersteuning, verkoopvragen of samenwerking. We reageren meestal binnen 24 uur, van maandag tot en met vrijdag."
        }
    },
    "/careers": {
        "en": {
            "title": "Careers at Scandora | Open Roles",
            "description": "Open roles at Scandora, the AI document scanner: Flutter, TypeScript backend, EU hosting and bilingual content. Apply by email to jobs@scandora.eu."
        },
        "de": {
            "title": "Karriere bei Scandora | Offene Stellen",
            "description": "Offene Stellen bei Scandora, dem KI-Dokumentenscanner: Flutter, TypeScript-Backend, EU-Hosting und zweisprachige Inhalte. Bewerbung an jobs@scandora.eu."
        },
        "es": {
            "title": "Empleo en Scandora | Puestos abiertos",
            "description": "Puestos abiertos en Scandora, escáner de documentos con IA: Flutter, backend TypeScript, alojamiento en la UE y contenido bilingüe. Escribe a jobs@scandora.eu."
        },
        "pt-BR": {
            "title": "Carreiras no Scandora | Vagas abertas",
            "description": "Vagas no Scandora, scanner de documentos com IA: Flutter, backend TypeScript, hospedagem na UE e conteúdo bilíngue. Candidate-se por e-mail: jobs@scandora.eu."
        },
        "it": {
            "title": "Lavora con Scandora | Posizioni aperte",
            "description": "Posizioni aperte in Scandora, scanner di documenti con IA: Flutter, backend TypeScript, hosting UE, contenuti bilingui. Candidati via e-mail a jobs@scandora.eu."
        },
        "nl": {
            "title": "Werken bij Scandora | Openstaande functies",
            "description": "Vacatures bij Scandora, de documentscanner met AI: Flutter, TypeScript-backend, EU-hosting en tweetalige content. Solliciteer per e-mail via jobs@scandora.eu."
        }
    },
    "/gdpr-dokumentenscanner": {
        "en": {
            "title": "GDPR document scanner (DSGVO) | Scandora",
            "description": "What makes a document scanner GDPR-ready: EU hosting, documents that stay on your device, no third-party trackers and an AVV/DPA."
        },
        "de": {
            "title": "DSGVO-Dokumentenscanner | Scandora",
            "description": "Was einen Dokumentenscanner DSGVO-konform macht: EU-Hosting, Dokumente bleiben auf dem Gerät, keine Drittanbieter-Tracker und ein AVV."
        }
    },
    "/datev-steuerberater": {
        "en": {
            "title": "DATEV export (coming soon) for tax advisors | Scandora",
            "description": "DATEV-format export (EXTF batch) with document images for your tax advisor — in preparation, not available in this version yet."
        },
        "de": {
            "title": "DATEV-Export (demnächst) für Steuerberater | Scandora",
            "description": "DATEV-Format-Export (EXTF-Buchungsstapel) mit Belegbildern für Ihren Steuerberater — in Vorbereitung, in dieser Version noch nicht verfügbar."
        }
    },
    "/avv": {
        "en": {
            "title": "AVV / DPA — Data Processing Agreement | Scandora",
            "description": "Scandora's AVV / Data Processing Agreement (Art. 28 GDPR) for managed AI, cloud sync and GoBD records: read, download and sign it before business use."
        },
        "de": {
            "title": "AVV / DPA — Auftragsverarbeitungsvertrag | Scandora",
            "description": "Der Scandora-AVV (Art. 28 DSGVO) für verwaltete KI, Cloud-Sync und GoBD-Aufzeichnungen: lesen, herunterladen und vor geschäftlicher Nutzung unterzeichnen."
        }
    },
    "/privacy": {
        "en": {
            "title": "Privacy Policy | Scandora",
            "description": "Scandora's Privacy Policy: how our privacy-first, on-device approach protects your data and keeps your documents in your control."
        },
        "de": {
            "title": "Datenschutzerklärung | Scandora",
            "description": "Die Scandora-Datenschutzerklärung: wie unser gerätebasierter Ansatz Ihre Daten schützt und Dokumente in Ihrer Kontrolle hält."
        },
        "es": {
            "title": "Política de privacidad | Scandora",
            "description": "Política de privacidad de Scandora: cómo nuestro enfoque centrado en la privacidad y el dispositivo protege tus datos y mantiene tus documentos bajo tu control."
        },
        "pt-BR": {
            "title": "Política de Privacidade | Scandora",
            "description": "Política de Privacidade do Scandora: como nossa abordagem centrada na privacidade e no dispositivo protege seus dados e mantém seus documentos sob seu controle."
        },
        "it": {
            "title": "Informativa sulla privacy | Scandora",
            "description": "Informativa sulla privacy di Scandora: come l’approccio incentrato su privacy e dispositivo protegge i tuoi dati e tiene i documenti sotto il tuo controllo."
        },
        "nl": {
            "title": "Privacyverklaring | Scandora",
            "description": "Privacyverklaring van Scandora: hoe onze aanpak met privacy voorop, op je apparaat, je gegevens beschermt en je documenten onder jouw controle houdt."
        }
    },
    "/terms": {
        "en": {
            "title": "Terms of Service | Scandora",
            "description": "Scandora's Terms of Service (AGB): your rights and responsibilities when using our AI-powered document scanning app, from subscriptions to cancellation."
        },
        "de": {
            "title": "Allgemeine Geschäftsbedingungen | Scandora",
            "description": "Die Scandora-AGB: Ihre Rechte und Pflichten bei der Nutzung unserer KI-gestützten Dokumentenscanner-App, von Abonnements bis zur Kündigung."
        }
    },
    "/imprint": {
        "en": {
            "title": "Imprint | Scandora",
            "description": "Scandora imprint (Impressum): the legal notice under § 5 DDG with the service provider, postal address, contact email, register entry and VAT status."
        },
        "de": {
            "title": "Impressum | Scandora",
            "description": "Scandora-Impressum: Angaben gemäß § 5 DDG mit Diensteanbieter, Anschrift, Kontakt per E-Mail, Registereintrag und Status zur Umsatzsteuer."
        }
    },
    "/report-content": {
        "en": {
            "title": "Report Illegal Content (DSA) | Scandora",
            "description": "Report content you consider illegal under Art. 16 DSA: the notice form, what a notice must contain, our points of contact and how we handle a report."
        },
        "de": {
            "title": "Rechtswidrige Inhalte melden (DSA) | Scandora",
            "description": "Inhalte melden, die Sie für rechtswidrig halten (Art. 16 DSA): das Meldeformular, der Inhalt einer Meldung, unsere Kontaktstellen und der Ablauf."
        }
    },
    "/accessibility": {
        "en": {
            "title": "Accessibility Statement | Scandora",
            "description": "Scandora's voluntary accessibility statement: the WCAG 2.1 AA and EN 301 549 target we aim at, known limitations and how to send us feedback."
        },
        "de": {
            "title": "Erklärung zur Barrierefreiheit | Scandora",
            "description": "Die freiwillige Erklärung zur Barrierefreiheit von Scandora: das Ziel WCAG 2.1 AA und EN 301 549, bekannte Einschränkungen und Ihr Weg zum Feedback."
        }
    },
    "/blog/": {
        "en": {
            "title": "Scandora Guides: scanning, exports & privacy | Scandora",
            "description": "Scandora Guides: practical how-tos and honest comparisons on the DATEV export coming soon, GoBD scanning, network scanners (eSCL) and scan-to-Trello."
        },
        "de": {
            "title": "Scandora Ratgeber: Scannen, Exporte & Datenschutz | Scandora",
            "description": "Scandora-Ratgeber: Anleitungen und ehrliche Vergleiche rund um DATEV-Export (in Vorbereitung), GoBD-konformes Scannen, eSCL-Netzwerkscanner und Scan-to-Trello."
        }
    },
    "/blog/datev-export-aus-dem-smartphone": {
        "en": {
            "title": "DATEV export from your smartphone (coming soon) | Scandora",
            "description": "Scanned receipts as a DATEV-format export (EXTF batch) with document images, straight from your smartphone to your tax advisor — coming soon."
        },
        "de": {
            "title": "DATEV-Export aus dem Smartphone (in Vorbereitung) | Scandora",
            "description": "Gescannte Belege als DATEV-Format-Export (EXTF-Buchungsstapel) direkt an den Steuerberater — in Vorbereitung, noch nicht verfügbar."
        }
    },
    "/blog/dsgvo-sichere-camscanner-alternative": {
        "en": {
            "title": "A GDPR-safe CamScanner alternative | Scandora",
            "description": "A GDPR-safe alternative to CamScanner and Microsoft Lens: documents stay on your device by default, with EU hosting and managed AI."
        },
        "de": {
            "title": "DSGVO-sichere CamScanner-Alternative | Scandora",
            "description": "DSGVO-sichere Alternative zu CamScanner und Microsoft Lens: Dokumente bleiben auf dem Gerät, EU-Hosting und verwaltete KI."
        }
    },
    "/blog/gobd-konform-scannen": {
        "en": {
            "title": "GoBD-compliant scanning explained | Scandora",
            "description": "What GoBD-compliant scanning really means — immutability, traceability, process docs — and which parts Scandora covers with hash, log and timestamp."
        },
        "de": {
            "title": "GoBD-konform scannen: ersetzendes Scannen | Scandora",
            "description": "Was „GoBD-konform scannen“ bedeutet und welche Anforderungen Scandora mit Inhalts-Hash, Änderungsprotokoll und Zeitstempel abdeckt. Kein GoBD-Siegel."
        }
    },
    "/blog/netzwerkscanner-escl-einrichten": {
        "en": {
            "title": "Set up a network scanner over eSCL | Scandora",
            "description": "Connect an eSCL/AirScan network scanner (e.g. Brother, Epson) to Scandora: Wi-Fi discovery, USB fallback, multi-page and duplex, no drivers."
        },
        "de": {
            "title": "Netzwerkscanner per eSCL einrichten | Scandora",
            "description": "Netzwerkscanner per eSCL/AirScan (z. B. Brother, Epson) mit Scandora verbinden: WLAN-Erkennung, USB-Fallback, mehrseitig und Duplex, ohne Treiber."
        }
    },
    "/blog/scan-to-trello-workflow": {
        "en": {
            "title": "Scan to Trello: from document to card | Scandora",
            "description": "Turn a scanned document into a Trello card: title, attached PDF, labels, due date and a pre-filled checklist, straight into your own Trello board."
        },
        "de": {
            "title": "Scan-to-Trello: vom Dokument zur Trello-Karte | Scandora",
            "description": "So wird aus einem gescannten Dokument eine Trello-Karte: mit Titel, PDF-Anhang, Labels, Fälligkeit und Checkliste — in Ihrem eigenen Trello-Board."
        }
    },
    "/blog/scandora-vs-fileee": {
        "en": {
            "title": "Scandora vs Fileee: the honest comparison | Scandora",
            "description": "Scandora vs Fileee in detail: your own storage vs a cloud archive, managed AI, eSCL network scanners, and DATEV/GoBD (coming soon)."
        },
        "de": {
            "title": "Scandora vs. Fileee: der ehrliche Vergleich | Scandora",
            "description": "Scandora vs. Fileee im Detail: eigene Ablage statt Cloud-Archiv, verwaltete KI, Netzwerkscanner per eSCL und DATEV/GoBD (in Vorbereitung)."
        }
    },
    "/help/": {
        "en": {
            "title": "Help Center | Scandora",
            "description": "Scandora Help Center: managed AI credits, DATEV/lexoffice/sevDesk export (coming soon), eSCL scanners, and our honest GoBD scope."
        },
        "de": {
            "title": "Hilfe-Center | Scandora",
            "description": "Scandora Hilfe-Center: verwaltete KI-Credits, DATEV-/lexoffice-/sevDesk-Export (in Vorbereitung), eSCL-Scanner und unser ehrlicher GoBD-Umfang."
        }
    },
    "/help/datev-export": {
        "en": {
            "title": "DATEV export (EXTF) — coming soon | Scandora Help",
            "description": "The DATEV EXTF export your tax advisor can import is coming soon: pick a profile and date range, enter Berater/Mandant and SKR03/SKR04, review rows."
        },
        "de": {
            "title": "DATEV-Export (EXTF) — in Vorbereitung | Scandora Hilfe",
            "description": "DATEV-EXTF-Export für Ihren Steuerberater (in Vorbereitung): Profil und Zeitraum wählen, Berater/Mandant und SKR03/SKR04 eingeben."
        }
    },
    "/help/escl-setup": {
        "en": {
            "title": "Network scanner setup (eSCL / AirScan) | Scandora Help",
            "description": "Connect a Brother, Epson, HP or Canon eSCL/AirScan network scanner to Scandora over Wi-Fi for multi-page scanning. Setup, settings and troubleshooting."
        },
        "de": {
            "title": "Netzwerkscanner einrichten (eSCL) | Scandora Hilfe",
            "description": "Brother-, Epson-, HP- oder Canon-Netzwerkscanner per eSCL/AirScan über WLAN mit Scandora verbinden. Einrichtung, Einstellungen und Fehlerbehebung."
        }
    },
    "/help/gobd-scope": {
        "en": {
            "title": "What GoBD support means | Scandora Help",
            "description": "Scandora's honest GoBD scope: content hash, trusted timestamp, an immutable audit log; the Verfahrensdokumentation is coming soon — and what depends on you."
        },
        "de": {
            "title": "Was GoBD-Unterstützung bedeutet | Scandora Hilfe",
            "description": "Ehrlicher GoBD-Umfang von Scandora: Inhalts-Hash, Zeitstempel, unveränderbares Protokoll; Verfahrensdokumentation in Vorbereitung — und was von Ihnen abhängt."
        }
    },
    "/help/lexoffice-export": {
        "en": {
            "title": "lexoffice export — coming soon | Scandora Help",
            "description": "Connecting lexoffice to Scandora is coming soon: add a public API key and a posting category, then send your scanned vouchers to lexoffice."
        },
        "de": {
            "title": "lexoffice-Export — in Vorbereitung | Scandora Hilfe",
            "description": "lexoffice mit Scandora verbinden (in Vorbereitung): öffentlichen API-Schlüssel und Buchungskategorie hinterlegen, Belege an lexoffice senden."
        }
    },
    "/help/managed-ai": {
        "en": {
            "title": "Managed AI & credits | Scandora Help",
            "description": "How Scandora's managed AI works: prepaid credits, what a credit covers, monthly allowances, top-ups, and where processing happens."
        },
        "de": {
            "title": "Verwaltete KI & Credits | Scandora Hilfe",
            "description": "So funktioniert die verwaltete KI von Scandora: Prepaid-Credits, was ein Credit abdeckt, monatliches Kontingent, Aufladungen und wo verarbeitet wird."
        }
    },
    "/help/sevdesk-export": {
        "en": {
            "title": "sevDesk export — coming soon | Scandora Help",
            "description": "Connecting sevDesk to Scandora is coming soon: add your API token, confirm the account and upload your scanned vouchers to sevDesk."
        },
        "de": {
            "title": "sevDesk-Export — in Vorbereitung | Scandora Hilfe",
            "description": "sevDesk mit Scandora verbinden (in Vorbereitung): API-Token hinterlegen, Konto bestätigen und Belege zu sevDesk hochladen."
        }
    }
};

// A page with hreflang versions is static: its <html lang> is its language, and `?lang=` sends the
// visitor to the matching version. A page without versions keeps switching in place: `?lang=`, then
// the stored preference, then its own <html lang>.
function isLanguage(code) {
    return typeof code === 'string' && Object.prototype.hasOwnProperty.call(translations, code);
}

function languageVersionLinks() {
    return Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]'))
        .filter(link => link.getAttribute('hreflang') !== 'x-default');
}

function pageLanguage() {
    const declared = document.documentElement.getAttribute('lang');
    return isLanguage(declared) ? declared : Object.keys(translations)[0];
}

function pageHasLanguage(code) {
    const blocks = Array.from(document.querySelectorAll('[data-lang]'));
    return blocks.length === 0 || blocks.some(block => block.getAttribute('data-lang') === code);
}

function initialLanguage() {
    if (languageVersionLinks().length > 0) {
        return pageLanguage();
    }
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (isLanguage(requested) && pageHasLanguage(requested)) {
        return requested;
    }
    const stored = localStorage.getItem('scandora-lang');
    if (isLanguage(stored) && pageHasLanguage(stored)) {
        return stored;
    }
    return pageLanguage();
}

function requestedLanguageVersion() {
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (!requested || requested === pageLanguage()) {
        return null;
    }
    const version = languageVersionLinks().find(link => link.getAttribute('hreflang') === requested);
    return version ? version.getAttribute('href') : null;
}

const requestedVersion = requestedLanguageVersion();
if (requestedVersion) {
    window.location.replace(requestedVersion + window.location.hash);
}

let currentLang = initialLanguage();

function setMetaContent(selector, content) {
    const el = document.querySelector(selector);
    if (el) {
        el.setAttribute('content', content);
    }
}

function canonicalPathname() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        return null;
    }
    try {
        return new URL(canonical.getAttribute('href'), window.location.href).pathname;
    } catch (e) {
        return null;
    }
}

function applyPageMeta() {
    const key = canonicalPathname();
    const meta = key && pageMeta[key];
    if (!meta) {
        return;
    }
    const localized = meta[currentLang] || meta.en;
    if (!localized) {
        return;
    }
    if (localized.title) {
        document.title = localized.title;
    }
    if (localized.description) {
        setMetaContent('meta[name="description"]', localized.description);
        setMetaContent('meta[property="og:description"]', localized.description);
        setMetaContent('meta[name="twitter:description"]', localized.description);
    }
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Show/hide language-specific content blocks. Used by the legal pages
    // (privacy, terms, imprint), whose rich body content — tables, lists,
    // links — cannot be expressed through the textContent-based data-i18n
    // mechanism above. Each block is marked data-lang="en" / data-lang="de";
    // we reveal the block for the current language and hide the others.
    // Pages without [data-lang] elements are unaffected.
    const langBlocks = document.querySelectorAll('[data-lang]');
    langBlocks.forEach(el => {
        el.hidden = el.getAttribute('data-lang') !== currentLang;
    });

    const localizedHref = 'data-href-' + currentLang.toLowerCase();
    document.querySelectorAll('a[' + localizedHref + ']').forEach(link => {
        link.setAttribute('href', link.getAttribute(localizedHref));
    });

    // Update language indicator
    const langIndicator = document.getElementById('lang-indicator');
    if (langIndicator) {
        langIndicator.textContent = currentLang.toUpperCase();
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    const marked = document.querySelector('.lang-menu a[aria-current]');
    const marker = marked ? marked.getAttribute('aria-current') : 'page';
    document.querySelectorAll('.lang-menu a[hreflang]').forEach(link => {
        if (link.getAttribute('hreflang') === currentLang) {
            link.setAttribute('aria-current', marker);
        } else {
            link.removeAttribute('aria-current');
        }
    });

    // Localize the <head>: title and description meta.
    applyPageMeta();
}

// Apply translations once the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
    applyTranslations();
}

