'use strict';

(function () {
    const utils = window.MaisonTubUtils;

    if (!utils) return;

    const {
        qs,
        qsa,
        refreshIcons,
        refreshAOS
    } = utils;

    const initLegalSidebar = () => {
        const sidebar = qs('.legal-sidebar');
        const links = qsa('.legal-sidebar__links a');

        if (!sidebar || !links.length) return;

        const sections = links
            .map((link) => {
                const id = link.getAttribute('href');
                if (!id || !id.startsWith('#')) return null;

                const section = qs(id);
                if (!section) return null;

                return {
                    link,
                    section
                };
            })
            .filter(Boolean);

        if (!sections.length) return;

        const setActive = (activeLink) => {
            links.forEach((link) => {
                link.classList.toggle('is-active', link === activeLink);
            });
        };

        const getHeaderOffset = () => {
            const header = qs('[data-header]');
            return header ? header.offsetHeight + 24 : 100;
        };

        links.forEach((link) => {
            link.addEventListener('click', (event) => {
                const id = link.getAttribute('href');
                if (!id || !id.startsWith('#')) return;

                const target = qs(id);
                if (!target) return;

                event.preventDefault();

                const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });

                setActive(link);

                history.replaceState(null, '', id);
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (!visibleEntries.length) return;

                const current = sections.find((item) => item.section === visibleEntries[0].target);

                if (current) {
                    setActive(current.link);
                }
            },
            {
                root: null,
                threshold: [0.18, 0.32, 0.5],
                rootMargin: '-18% 0px -62% 0px'
            }
        );

        sections.forEach(({ section }) => observer.observe(section));

        setActive(sections[0].link);
    };

    const initLegalExternalLabels = () => {
        const legalCards = qsa('.legal-card');

        legalCards.forEach((card) => {
            const links = qsa('a[href^="http"]', card);

            links.forEach((link) => {
                if (link.dataset.legalExternalReady) return;

                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.dataset.legalExternalReady = 'true';
            });
        });
    };

    const initLegalHashScroll = () => {
        if (!window.location.hash) return;

        const target = qs(window.location.hash);
        if (!target) return;

        window.requestAnimationFrame(() => {
            const header = qs('[data-header]');
            const offset = header ? header.offsetHeight + 24 : 100;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top,
                behavior: 'auto'
            });
        });
    };

    const initLegalPage = () => {
        initLegalSidebar();
        initLegalExternalLabels();
        initLegalHashScroll();

        refreshIcons();
        refreshAOS();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLegalPage);
    } else {
        initLegalPage();
    }
})();