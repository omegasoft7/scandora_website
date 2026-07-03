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
        initContactForm();
        initAnalyticsTracking(); // Umami event tracking
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
    // ANALYTICS
    // ============================================

    function trackEvent(eventName, properties) {
        if (typeof window.umami !== 'undefined' && window.umami.track) {
            window.umami.track(eventName, properties || {});
        }
    }

    window.trackEvent = trackEvent;

    function initAnalyticsTracking() {
        document.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"]').forEach(link => {
            link.addEventListener('click', function() {
                const platform = this.href.includes('apple.com') ? 'ios' : 'android';
                const location = this.closest('.hero-actions') ? 'hero' :
                               this.closest('.download-section') ? 'download_section' : 'other';
                trackEvent('download_click', {
                    platform: platform,
                    location: location
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

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================

    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const formData = new FormData(contactForm);

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
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
                alert('Sorry, there was an error sending your message. Please try again or email us directly at farhad@scandora.eu');
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
        console.log('%c◈ Scandora', 'color: #2563EB; font-size: 24px; font-weight: bold;');
        console.log('%cIntelligent Document Scanning', 'color: #64748B; font-size: 14px;');
        console.log('%chttps://scandora.eu', 'color: #3B82F6; font-size: 12px;');
    }

})();

