(() => {
    "use strict";

    const MOBILE_QUERY = "(max-width: 900px)";
    const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

    const onReady = (callback) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, { once: true });
            return;
        }

        callback();
    };

    const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

    function setupMobileNav() {
        const toggle = document.querySelector(".mobile-nav-toggle");
        const nav = document.querySelector(".site-nav");

        if (!toggle || !nav) {
            return;
        }

        const mediaQuery = window.matchMedia(MOBILE_QUERY);

        const syncState = () => {
            const isMobile = mediaQuery.matches;

            if (!isMobile) {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            }
        };

        toggle.addEventListener("click", () => {
            if (!mediaQuery.matches) {
                return;
            }

            const isOpen = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        nav.addEventListener("click", (event) => {
            if (!mediaQuery.matches || !(event.target instanceof HTMLAnchorElement)) {
                return;
            }

            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", syncState);
        } else {
            mediaQuery.addListener(syncState);
        }

        syncState();
    }

    function setupReveal() {
        const targets = Array.from(document.querySelectorAll(".reveal"));

        if (!targets.length) {
            return;
        }

        if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
            targets.forEach((target) => target.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -48px 0px"
            }
        );

        targets.forEach((target) => observer.observe(target));
    }

    onReady(() => {
        setupMobileNav();
        setupReveal();
    });
})();
