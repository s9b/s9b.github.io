// Terminal Portfolio Interactive Features
(() => {
    'use strict';

    const MOBILE_QUERY = '(max-width: 768px)';
    const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

    const onReady = (callback) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
            return;
        }
        callback();
    };

    const shouldReduceMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

    function setupAnchorNavigation() {
        const samePageAnchors = document.querySelectorAll('a[href^="#"]');

        samePageAnchors.forEach((anchor) => {
            anchor.addEventListener('click', (event) => {
                const href = anchor.getAttribute('href');
                if (!href || href.length <= 1) {
                    return;
                }

                const target = document.querySelector(href);
                if (!target) {
                    return;
                }

                event.preventDefault();
                target.scrollIntoView({
                    behavior: shouldReduceMotion() ? 'auto' : 'smooth',
                    block: 'start'
                });
            });
        });
    }

    function typeText(element, text, speed, onDone) {
        let index = 0;
        element.textContent = '';

        const tick = () => {
            if (index >= text.length) {
                if (typeof onDone === 'function') {
                    onDone();
                }
                return;
            }

            element.textContent += text.charAt(index);
            index += 1;
            window.setTimeout(tick, speed);
        };

        tick();
    }

    function setupCommandTyping(reduceMotion) {
        const commands = document.querySelectorAll('.command-line .command');

        commands.forEach((commandElement, index) => {
            const originalText = commandElement.textContent;

            if (reduceMotion) {
                commandElement.textContent = originalText;
                return;
            }

            window.setTimeout(() => {
                typeText(commandElement, originalText, 24, () => {
                    commandElement.classList.add('cursor');
                });
            }, index * 160);
        });
    }

    function setupAsciiAnimation(reduceMotion) {
        const asciiArt = document.querySelector('.ascii-art pre');
        if (!asciiArt) {
            return;
        }

        const originalText = asciiArt.textContent;
        if (reduceMotion) {
            asciiArt.textContent = originalText;
            return;
        }

        window.setTimeout(() => {
            typeText(asciiArt, originalText, 5);
        }, 250);
    }

    function setupCommandFlash(reduceMotion) {
        if (reduceMotion) {
            return;
        }

        const commandElements = document.querySelectorAll('.command');

        commandElements.forEach((element, index) => {
            window.setTimeout(() => {
                element.classList.add('is-active');
                window.setTimeout(() => {
                    element.classList.remove('is-active');
                }, 220);
            }, 600 + index * 160);
        });
    }

    function setupScrollReveal(reduceMotion) {
        const revealTargets = document.querySelectorAll(
            '.section, .featured-project, .project-card, .experience-item, .blog-post, .contact-info, .availability'
        );

        revealTargets.forEach((target) => target.classList.add('reveal'));

        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealTargets.forEach((target) => target.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealTargets.forEach((target) => observer.observe(target));
    }

    function setupRippleEffect() {
        const buttons = document.querySelectorAll('.btn-link:not(.disabled)');

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const ripple = document.createElement('span');

                ripple.className = 'ripple';
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

                button.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
            });
        });
    }

    function setupMobileMenu() {
        const navSection = document.querySelector('.nav-section');
        const navLinks = navSection?.querySelector('.nav-links');

        if (!navSection || !navLinks) {
            return;
        }

        let toggleButton = navSection.querySelector('.mobile-nav-toggle');

        if (!toggleButton) {
            toggleButton = document.createElement('button');
            toggleButton.className = 'mobile-nav-toggle';
            toggleButton.type = 'button';
            toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.textContent = 'Menu';
            toggleButton.hidden = true;
            navSection.insertBefore(toggleButton, navLinks);
        }

        const mediaQuery = window.matchMedia(MOBILE_QUERY);

        const syncLayout = () => {
            const isMobile = mediaQuery.matches;

            navSection.classList.toggle('is-mobile', isMobile);
            toggleButton.hidden = !isMobile;

            if (!isMobile) {
                navLinks.classList.remove('is-open');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        };

        toggleButton.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.addEventListener('click', (event) => {
            const clickedLink = event.target;
            if (!(clickedLink instanceof HTMLAnchorElement)) {
                return;
            }

            if (!navSection.classList.contains('is-mobile')) {
                return;
            }

            navLinks.classList.remove('is-open');
            toggleButton.setAttribute('aria-expanded', 'false');
        });

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', syncLayout);
        } else {
            mediaQuery.addListener(syncLayout);
        }

        syncLayout();
    }

    function setupTerminalPulse() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) {
            return;
        }

        terminal.addEventListener('pointerdown', () => {
            terminal.classList.add('pulse');
            window.setTimeout(() => {
                terminal.classList.remove('pulse');
            }, 220);
        });
    }

    function setupParticles(reduceMotion) {
        if (reduceMotion || document.querySelector('.particles')) {
            return;
        }

        const container = document.createElement('div');
        container.className = 'particles';
        container.setAttribute('aria-hidden', 'true');

        const particleCount = 24;
        for (let i = 0; i < particleCount; i += 1) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 12}s`;
            particle.style.animationDuration = `${10 + Math.random() * 8}s`;
            container.appendChild(particle);
        }

        document.body.appendChild(container);
    }

    onReady(() => {
        const reduceMotion = shouldReduceMotion();

        setupAnchorNavigation();
        setupCommandTyping(reduceMotion);
        setupAsciiAnimation(reduceMotion);
        setupCommandFlash(reduceMotion);
        setupScrollReveal(reduceMotion);
        setupRippleEffect();
        setupMobileMenu();
        setupTerminalPulse();
        setupParticles(reduceMotion);
    });
})();
