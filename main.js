/**
 * Scandora Website - Main JavaScript
 * Optimized for SEO and Core Web Vitals
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initNavbarScroll();
        initMobileMenu();
        initAnimations();
        initStatsCounter();
        initCookieConsent();
        initAnalyticsEvents();
        consoleBranding();
    });

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
    // COOKIE CONSENT (GDPR Compliant)
    // ============================================

    function initCookieConsent() {
        // Wait for CookieConsent library to load
        if (typeof CookieConsent === 'undefined') {
            setTimeout(initCookieConsent, 100);
            return;
        }

        const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';

        CookieConsent.run({
            guiOptions: {
                consentModal: {
                    layout: 'box inline',
                    position: 'bottom right',
                    equalWeightButtons: false,
                    flipButtons: false
                },
                preferencesModal: {
                    layout: 'box',
                    position: 'right',
                    equalWeightButtons: true,
                    flipButtons: false
                }
            },

            categories: {
                necessary: {
                    enabled: true,
                    readOnly: true
                },
                analytics: {
                    enabled: false,
                    readOnly: false,
                    autoClear: {
                        cookies: [
                            { name: /^_ga/ },
                            { name: '_gid' }
                        ]
                    }
                }
            },

            language: {
                default: lang,
                autoDetect: 'document',
                translations: {
                    en: {
                        consentModal: {
                            title: '🍪 We value your privacy',
                            description: 'We use cookies to analyze website traffic and improve your experience. You can choose which cookies to allow.',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            showPreferencesBtn: 'Manage preferences',
                            footer: '<a href="/privacy#cookies">Privacy Policy</a>'
                        },
                        preferencesModal: {
                            title: 'Cookie Preferences',
                            acceptAllBtn: 'Accept all',
                            acceptNecessaryBtn: 'Reject all',
                            savePreferencesBtn: 'Save preferences',
                            closeIconLabel: 'Close',
                            sections: [
                                {
                                    title: 'Cookie Usage',
                                    description: 'We use cookies to ensure basic website functionality and to improve your online experience.'
                                },
                                {
                                    title: 'Strictly Necessary Cookies',
                                    description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: 'Analytics Cookies',
                                    description: 'These cookies help us understand how visitors interact with our website using Google Analytics. All data is anonymized.',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        headers: {
                                            name: 'Cookie',
                                            domain: 'Domain',
                                            description: 'Description',
                                            expiration: 'Expiration'
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: 'scandora.eu',
                                                description: 'Google Analytics - Distinguishes unique users',
                                                expiration: '2 years'
                                            },
                                            {
                                                name: '_ga_*',
                                                domain: 'scandora.eu',
                                                description: 'Google Analytics - Maintains session state',
                                                expiration: '2 years'
                                            }
                                        ]
                                    }
                                },
                                {
                                    title: 'More Information',
                                    description: 'For any questions about our cookie policy, please <a href="mailto:privacy@scandora.eu">contact us</a>.'
                                }
                            ]
                        }
                    },
                    de: {
                        consentModal: {
                            title: '🍪 Wir schätzen Ihre Privatsphäre',
                            description: 'Wir verwenden Cookies, um den Website-Traffic zu analysieren und Ihre Erfahrung zu verbessern. Sie können wählen, welche Cookies Sie zulassen möchten.',
                            acceptAllBtn: 'Alle akzeptieren',
                            acceptNecessaryBtn: 'Alle ablehnen',
                            showPreferencesBtn: 'Einstellungen verwalten',
                            footer: '<a href="/privacy#cookies">Datenschutzrichtlinie</a>'
                        },
                        preferencesModal: {
                            title: 'Cookie-Einstellungen',
                            acceptAllBtn: 'Alle akzeptieren',
                            acceptNecessaryBtn: 'Alle ablehnen',
                            savePreferencesBtn: 'Einstellungen speichern',
                            closeIconLabel: 'Schließen',
                            sections: [
                                {
                                    title: 'Cookie-Nutzung',
                                    description: 'Wir verwenden Cookies, um grundlegende Website-Funktionen sicherzustellen und Ihre Online-Erfahrung zu verbessern.'
                                },
                                {
                                    title: 'Unbedingt erforderliche Cookies',
                                    description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie können nicht deaktiviert werden.',
                                    linkedCategory: 'necessary'
                                },
                                {
                                    title: 'Analyse-Cookies',
                                    description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, mithilfe von Google Analytics. Alle Daten werden anonymisiert.',
                                    linkedCategory: 'analytics',
                                    cookieTable: {
                                        headers: {
                                            name: 'Cookie',
                                            domain: 'Domain',
                                            description: 'Beschreibung',
                                            expiration: 'Ablauf'
                                        },
                                        body: [
                                            {
                                                name: '_ga',
                                                domain: 'scandora.eu',
                                                description: 'Google Analytics - Unterscheidet eindeutige Benutzer',
                                                expiration: '2 Jahre'
                                            },
                                            {
                                                name: '_ga_*',
                                                domain: 'scandora.eu',
                                                description: 'Google Analytics - Pflegt den Sitzungsstatus',
                                                expiration: '2 Jahre'
                                            }
                                        ]
                                    }
                                },
                                {
                                    title: 'Weitere Informationen',
                                    description: 'Bei Fragen zu unserer Cookie-Richtlinie <a href="mailto:privacy@scandora.eu">kontaktieren Sie uns</a> bitte.'
                                }
                            ]
                        }
                    }
                }
            },

            onFirstConsent: ({ cookie }) => {
                updateGoogleConsent(cookie.categories);
                trackEvent('consent_given', { categories: cookie.categories.join(',') });
            },

            onConsent: ({ cookie }) => {
                updateGoogleConsent(cookie.categories);
            },

            onChange: ({ cookie, changedCategories }) => {
                updateGoogleConsent(cookie.categories);
                trackEvent('consent_changed', {
                    categories: cookie.categories.join(','),
                    changed: changedCategories.join(',')
                });
            }
        });
    }

    /**
     * Update Google Consent Mode based on user preferences
     */
    function updateGoogleConsent(categories) {
        if (typeof gtag !== 'function') return;

        const analyticsGranted = categories.includes('analytics');

        gtag('consent', 'update', {
            'analytics_storage': analyticsGranted ? 'granted' : 'denied'
        });

        if (analyticsGranted) {
            console.log('Analytics consent granted');
        }
    }

    // ============================================
    // ANALYTICS EVENT TRACKING
    // ============================================

    /**
     * Track custom event to Google Analytics
     */
    function trackEvent(eventName, params = {}) {
        if (typeof gtag !== 'function') return;
        gtag('event', eventName, params);
    }

    /**
     * Initialize analytics event listeners
     */
    function initAnalyticsEvents() {
        // Track App Store download clicks
        document.querySelectorAll('.store-badge').forEach(badge => {
            badge.addEventListener('click', function(e) {
                const img = this.querySelector('img');
                let platform = 'unknown';

                if (img) {
                    const alt = img.alt.toLowerCase();
                    if (alt.includes('mac')) platform = 'macos';
                    else if (alt.includes('app store')) platform = 'ios';
                    else if (alt.includes('google play')) platform = 'android';
                }

                trackEvent('click_download', {
                    platform: platform,
                    link_url: this.href
                });
            });
        });

        // Track CTA button clicks
        document.querySelectorAll('.hero-actions .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const ctaText = this.textContent.trim();
                trackEvent('click_cta', {
                    cta_text: ctaText,
                    cta_location: 'hero'
                });
            });
        });

        // Track pricing plan selection
        document.querySelectorAll('.pricing-card .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.pricing-card');
                const planName = card.querySelector('h3')?.textContent || 'unknown';
                const isPro = card.classList.contains('popular');

                trackEvent('select_plan', {
                    plan_name: planName.toLowerCase(),
                    is_popular: isPro
                });
            });
        });

        // Track navigation clicks
        document.querySelectorAll('.nav-links a, .footer-links a').forEach(link => {
            link.addEventListener('click', function() {
                trackEvent('click_navigation', {
                    link_text: this.textContent.trim(),
                    link_url: this.getAttribute('href'),
                    location: this.closest('.footer-links') ? 'footer' : 'header'
                });
            });
        });

        // Track section visibility (scroll engagement)
        const sections = ['features', 'how-it-works', 'pricing', 'download'];
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('view_section', {
                        section_id: entry.target.id
                    });
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) sectionObserver.observe(section);
        });
    }

    // Expose trackEvent globally for language toggle tracking
    window.trackEvent = trackEvent;

    // ============================================
    // CONSOLE BRANDING
    // ============================================

    function consoleBranding() {
        console.log('%c◈ Scandora', 'color: #2563EB; font-size: 24px; font-weight: bold;');
        console.log('%cIntelligent Document Scanning', 'color: #64748B; font-size: 14px;');
        console.log('%chttps://scandora.eu', 'color: #3B82F6; font-size: 12px;');
    }

})();

