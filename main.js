/**
 * Scandora Website - Main JavaScript
 * Optimized for SEO and Core Web Vitals
 */

(function() {
    'use strict';

    const APPLE_PROVIDER_TOKEN = '121188983';
    const LANGUAGE_STORAGE_KEY = 'scandora-lang';
    const LANGUAGE_SEARCH_THRESHOLD = 8;
    const FOLDED_LETTERS = { 'ß': 'ss', 'æ': 'ae', 'œ': 'oe', 'ø': 'o', 'ł': 'l', 'đ': 'd', 'ð': 'd', 'þ': 'th', 'ı': 'i' };

    // Run once the DOM is ready
    function init() {
        initSmoothScroll();
        initNavbarScroll();
        initMobileMenu();
        initAnimations();
        initStatsCounter();
        initFaqAccordion();
        initCalculator();
        initContactForm();
        initAnalyticsTracking(); // Umami event tracking
        initIntegrationInterest();
        initLanguageMenu();
        initLanguageBanner();
        consoleBranding();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================

    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }, { passive: true }); // Passive for better scroll performance
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================

    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                const isExpanded = navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
                // Update ARIA attribute for accessibility
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            });
        }
    }

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================

    function initAnimations() {
        // Check for reduced motion preference for accessibility
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return; // Skip animations for users who prefer reduced motion
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe feature cards, steps, and pricing cards
        document.querySelectorAll('.feature-card, .step, .pricing-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });

        // Add animation class styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================

    function initStatsCounter() {
        const stats = document.querySelectorAll('.stat-value');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('counted');
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => statsObserver.observe(stat));
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================

    function initFaqAccordion() {
        document.querySelectorAll('.faq-trigger').forEach(trigger => {
            trigger.addEventListener('click', function() {
                const item = this.closest('.faq-item');
                const isOpen = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', String(!isOpen));
                if (item) {
                    item.classList.toggle('open', !isOpen);
                }
                trackEvent('faq_toggle', {
                    question: this.textContent.trim(),
                    expanded: !isOpen
                });
            });
        });
    }

    // ============================================
    // TIME-SAVED CALCULATOR
    // ============================================

    function calcTimeSaved() {
        const slider = document.getElementById('calc-docs');
        const hoursOut = document.getElementById('calc-hours');
        const docsOut = document.getElementById('calc-docs-value');
        if (!slider || !hoursOut) return;

        const docsPerWeek = Number(slider.value);
        const hoursPerMonth = docsPerWeek * 3 * 4.33 / 60;
        const lang = document.documentElement.lang === 'de' ? 'de' : 'en';

        hoursOut.textContent = hoursPerMonth.toLocaleString(lang, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
        if (docsOut) {
            docsOut.textContent = docsPerWeek.toLocaleString(lang);
        }
    }

    function initCalculator() {
        const slider = document.getElementById('calc-docs');
        if (!slider) return;

        slider.addEventListener('input', calcTimeSaved);
        calcTimeSaved();
    }

    // ============================================
    // ANALYTICS
    // ============================================

    function trackEvent(eventName, properties) {
        if (typeof window.umami !== 'undefined' && window.umami.track) {
            window.umami.track(eventName, properties || {});
        }
    }

    window.trackEvent = trackEvent;

    function pageSlug() {
        const canonical = document.querySelector('link[rel="canonical"]');
        const href = canonical ? canonical.getAttribute('href') : window.location.href;
        const path = new URL(href, window.location.href).pathname.replace(/(index)?\.html$/, '');
        return path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
    }

    function attributedStoreUrl(href, page) {
        const url = new URL(href);
        if (url.hostname === 'apps.apple.com') {
            if (APPLE_PROVIDER_TOKEN) {
                url.searchParams.set('pt', APPLE_PROVIDER_TOKEN);
            }
            if (!url.searchParams.has('ct')) {
                url.searchParams.set('ct', page);
            }
            if (!url.searchParams.has('mt')) {
                url.searchParams.set('mt', '8');
            }
        } else if (!url.searchParams.has('referrer')) {
            url.searchParams.set('referrer', 'utm_source=scandora.eu&utm_medium=website&utm_campaign=' + page);
        }
        return url.toString();
    }

    function initAnalyticsTracking() {
        document.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"]').forEach(link => {
            link.addEventListener('click', function() {
                const platform = this.href.includes('apple.com') ? 'ios' : 'android';
                const location = this.closest('.hero-actions') ? 'hero' :
                               this.closest('.download-buttons') ? 'download_section' : 'other';
                const page = pageSlug();
                this.href = attributedStoreUrl(this.href, page);
                trackEvent('download_click', {
                    platform: platform,
                    location: location,
                    page: page,
                    language: (document.documentElement.lang || '').slice(0, 2).toLowerCase()
                });
            });
        });

        document.querySelectorAll('.pricing-card .btn, .pricing-card a[href*="subscribe"]').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.pricing-card');
                const planName = card ? (card.querySelector('h3')?.textContent || 'unknown').toLowerCase() : 'unknown';
                trackEvent('pricing_cta', {
                    plan: planName,
                    cta_text: this.textContent.trim()
                });
            });
        });

        document.querySelectorAll('[data-managed-ai-cta]').forEach(cta => {
            cta.addEventListener('click', function() {
                trackEvent('managed-ai_connect_click', {
                    plan: this.dataset.plan || 'unknown',
                    cta_text: this.textContent.trim()
                });
            });
        });

        const sections = document.querySelectorAll('section[id]');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('section_view', {
                        section: entry.target.id
                    });
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => sectionObserver.observe(section));

        document.querySelectorAll('nav a, .footer-links a').forEach(link => {
            link.addEventListener('click', function() {
                const isFooter = this.closest('footer') !== null;
                trackEvent('navigation_click', {
                    link_text: this.textContent.trim(),
                    location: isFooter ? 'footer' : 'header'
                });
            });
        });
    }

    function privacySettingOn() {
        const nav = window.navigator || {};
        if (nav.globalPrivacyControl === true) {
            return true;
        }
        return [window.doNotTrack, nav.doNotTrack, nav.msDoNotTrack].some(
            value => value === 1 || value === '1' || value === 'yes'
        );
    }

    function interestStatus() {
        if (privacySettingOn()) {
            return '[data-interest-private]';
        }
        if (typeof window.umami === 'undefined' || !window.umami.track) {
            return '[data-interest-uncounted]';
        }
        return '[data-interest-thanks]';
    }

    function canonicalPath() {
        const canonical = document.querySelector('link[rel="canonical"]');
        const href = canonical ? canonical.getAttribute('href') : window.location.href;
        return new URL(href, window.location.href).pathname;
    }

    function initIntegrationInterest() {
        document.querySelectorAll('[data-interest-provider]').forEach(button => {
            button.addEventListener('click', function() {
                if (this.disabled) {
                    return;
                }
                this.disabled = true;
                const selector = interestStatus();
                if (selector === '[data-interest-thanks]') {
                    trackEvent('integration_interest', {
                        provider: this.getAttribute('data-interest-provider'),
                        page: canonicalPath(),
                        language: (document.documentElement.lang || '').slice(0, 2).toLowerCase()
                    });
                }
                const box = this.closest('.interest-signal');
                if (!box) {
                    return;
                }
                const action = box.querySelector('[data-interest-action]');
                const status = box.querySelector(selector);
                if (action) {
                    action.hidden = true;
                }
                if (status) {
                    status.hidden = false;
                }
            });
        });
    }

    // ============================================
    // LANGUAGE MENU AND BROWSER-LANGUAGE BANNER
    // ============================================

    function foldLanguageText(text) {
        return String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[ßæœøłđðþı]/g, letter => FOLDED_LETTERS[letter]);
    }

    function languageMatchesQuery(language, query) {
        const needle = foldLanguageText(String(query || '').trim());
        if (!needle) return true;
        return [language.name, language.englishName, language.code].some(field => {
            const folded = foldLanguageText(field);
            return folded.startsWith(needle) || folded.split(/[\s()\-_,./]+/).some(word => word.startsWith(needle));
        });
    }

    function languageSearchNeeded(count) {
        return count > LANGUAGE_SEARCH_THRESHOLD;
    }

    function matchLanguageTag(tag, codes) {
        const normalized = String(tag || '').trim().toLowerCase().replace(/_/g, '-');
        if (!normalized) return null;
        const exact = codes.find(code => code.toLowerCase() === normalized);
        if (exact) return exact;
        const primary = normalized.split('-')[0];
        return codes.find(code => code.toLowerCase().split('-')[0] === primary) || null;
    }

    function browserLanguageTags(nav) {
        if (!nav) return [];
        if (nav.languages && nav.languages.length) return Array.from(nav.languages);
        return nav.language ? [nav.language] : [];
    }

    function suggestedLanguageOrder(languages, current, browserTags) {
        const codes = languages.map(language => language.code);
        const leading = [];
        [current].concat(browserTags.map(tag => matchLanguageTag(tag, codes))).forEach(code => {
            if (code && codes.includes(code) && !leading.includes(code)) leading.push(code);
        });
        const byCode = code => languages.find(language => language.code === code);
        const rest = languages
            .filter(language => !leading.includes(language.code))
            .sort((a, b) => {
                const left = foldLanguageText(a.name);
                const right = foldLanguageText(b.name);
                return left < right ? -1 : left > right ? 1 : 0;
            });
        return leading.map(byCode).concat(rest);
    }

    function bannerLanguage(options) {
        if (options.storedLanguage) return null;
        const codes = Object.keys(options.versions || {});
        for (const tag of options.browserTags || []) {
            const match = matchLanguageTag(tag, codes);
            if (match) return match === options.pageLanguage ? null : match;
        }
        return null;
    }

    function readLanguageChoice() {
        try {
            return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    function rememberLanguage(code) {
        try {
            window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
        } catch (error) {
            return;
        }
    }

    function languageStrings() {
        return typeof translations === 'undefined' ? null : translations;
    }

    function addLanguageSearch(menu, list, entries) {
        const strings = languageStrings();
        const copy = strings && strings[document.documentElement.lang];
        const search = document.createElement('input');
        search.type = 'search';
        search.className = 'lang-menu-search';
        const label = copy ? copy['language.search'] : '';
        search.setAttribute('aria-label', label);
        search.placeholder = label;
        search.addEventListener('input', () => {
            entries.forEach(entry => {
                entry.item.hidden = !languageMatchesQuery(entry, search.value);
            });
        });
        menu.insertBefore(search, list);
    }

    function initLanguageMenu() {
        document.querySelectorAll('.lang-menu').forEach(menu => {
            const list = menu.querySelector('.lang-menu-list');
            if (!list) return;
            const entries = Array.from(list.querySelectorAll('li')).map(item => {
                const link = item.querySelector('a[hreflang]');
                const name = item.querySelector('.lang-menu-name');
                const english = item.querySelector('.lang-menu-english');
                return {
                    item: item,
                    link: link,
                    code: link ? link.getAttribute('hreflang') : '',
                    name: name ? name.textContent : '',
                    englishName: english ? english.textContent : (name ? name.textContent : '')
                };
            }).filter(entry => entry.link);
            const current = entries.find(entry => entry.link.getAttribute('aria-current') === 'page');
            const currentCode = current ? current.code : document.documentElement.lang;
            suggestedLanguageOrder(entries, currentCode, browserLanguageTags(window.navigator))
                .forEach(entry => list.appendChild(entry.item));
            entries.forEach(entry => {
                entry.link.addEventListener('click', () => {
                    rememberLanguage(entry.code);
                    trackEvent('language_switch', {
                        from_language: document.documentElement.lang,
                        to_language: entry.code
                    });
                });
            });
            if (languageSearchNeeded(entries.length)) {
                addLanguageSearch(menu, list, entries);
            }
            menu.addEventListener('keydown', event => {
                if (event.key === 'Escape' && menu.open) {
                    menu.open = false;
                    const summary = menu.querySelector('summary');
                    if (summary) summary.focus();
                }
            });
            document.addEventListener('click', event => {
                if (menu.open && !menu.contains(event.target)) menu.open = false;
            });
        });
    }

    function initLanguageBanner() {
        const strings = languageStrings();
        if (!strings || !document.body) return;
        const versions = {};
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => {
            const code = link.getAttribute('hreflang');
            if (code !== 'x-default') versions[code] = link.getAttribute('href');
        });
        const current = document.documentElement.lang;
        const target = bannerLanguage({
            pageLanguage: current,
            versions: versions,
            browserTags: browserLanguageTags(window.navigator),
            storedLanguage: readLanguageChoice()
        });
        const copy = target && strings[target];
        if (!copy || !copy['languageBanner.text'] || !copy['languageBanner.link']) return;

        const banner = document.createElement('div');
        banner.className = 'lang-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', copy['language.name']);
        banner.setAttribute('lang', target);
        const text = document.createElement('p');
        text.textContent = copy['languageBanner.text'] + ' ';
        const link = document.createElement('a');
        link.href = versions[target];
        link.setAttribute('hreflang', target);
        link.textContent = copy['languageBanner.link'];
        link.addEventListener('click', () => rememberLanguage(target));
        text.appendChild(link);
        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'lang-banner-close';
        close.setAttribute('aria-label', copy['languageBanner.dismiss']);
        close.textContent = '×';
        close.addEventListener('click', () => {
            rememberLanguage(target);
            banner.remove();
        });
        banner.appendChild(text);
        banner.appendChild(close);
        document.body.appendChild(banner);
    }

    window.scandoraLanguages = {
        foldLanguageText: foldLanguageText,
        languageMatchesQuery: languageMatchesQuery,
        languageSearchNeeded: languageSearchNeeded,
        matchLanguageTag: matchLanguageTag,
        suggestedLanguageOrder: suggestedLanguageOrder,
        bannerLanguage: bannerLanguage
    };

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================

    /** Returns the message with the form's labelled fields prefixed, or unchanged when it has none. */
    function composeMessage(form, message) {
        const parts = [];
        form.querySelectorAll('[data-compose-label]').forEach(function(field) {
            const value = field.type === 'checkbox'
                ? (field.checked ? field.value : '')
                : String(field.value || '').trim();
            if (value) parts.push(field.getAttribute('data-compose-label') + ': ' + value);
        });
        if (!parts.length) return message;

        return parts.concat(message).join('\n\n');
    }

    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const formData = new FormData(contactForm);
            const payload = Object.fromEntries(formData);
            payload.message = composeMessage(contactForm, payload.message || '');

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Track successful submission
                    trackEvent('contact_form_submit', {
                        subject: formData.get('subject')
                    });

                    // Show success message
                    showSuccessMessage();

                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                // Show error (could be enhanced with better UX)
                alert('Sorry, there was an error sending your message. Please try again or email us directly at support@scandora.eu');
                trackEvent('contact_form_error', {
                    error: error.message
                });
            } finally {
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });

        // Real-time email validation
        const emailInput = contactForm.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const isValid = this.checkValidity();
                this.parentElement.classList.toggle('error', !isValid && this.value);
            });
        }
    }

    /**
     * Show success overlay after form submission
     */
    function showSuccessMessage() {
        const overlay = document.getElementById('success-message');
        if (overlay) {
            overlay.classList.add('show');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close success message overlay (exposed globally)
     */
    window.closeSuccessMessage = function() {
        const overlay = document.getElementById('success-message');
        if (overlay) {
            overlay.classList.remove('show');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    // ============================================
    // CONSOLE BRANDING
    // ============================================

    function consoleBranding() {
        console.log('%cScandora', 'color: #2563EB; font-size: 24px; font-weight: bold;');
        console.log('%cIntelligent Document Scanning', 'color: #64748B; font-size: 14px;');
        console.log('%chttps://scandora.eu', 'color: #3B82F6; font-size: 12px;');
    }

})();

