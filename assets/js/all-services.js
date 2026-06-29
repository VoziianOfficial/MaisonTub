'use strict';

(function () {
    const utils = window.MaisonTubUtils;
    const config = window.MaisonTubConfig || {};

    if (!utils) return;

    const {
        qs,
        qsa,
        escapeHtml,
        createIcon,
        refreshIcons,
        refreshAOS
    } = utils;

    const services = config.services || [];

    const showcaseItems = [
        {
            id: 'access',
            icon: 'door-open',
            title: 'Easier access',
            short:
                'For requests focused on low-entry access, seating, doors, and day-to-day bathing confidence.',
            label: 'Access planning',
            heading: 'A request can begin with the access challenge you want to clarify.',
            text:
                'Homeowners often start with a practical concern: getting in and out of the bathing area more comfortably. MaisonTub helps organize those details so participating providers can understand whether installation, replacement, conversion, compact options, or safety features may be relevant.',
            meta: ['Entry style', 'Seating', 'Safety features']
        },
        {
            id: 'space',
            icon: 'maximize-2',
            title: 'Small bathroom fit',
            short:
                'For compact layouts where size, access path, and model dimensions may matter.',
            label: 'Compact layout',
            heading: 'Small bathrooms need clear layout details before provider comparison.',
            text:
                'A compact request can include bathroom dimensions, doorway access, current tub location, and space-saving priorities. Participating providers may discuss available models, fit considerations, and final project terms.',
            meta: ['Compact models', 'Bathroom layout', 'Access path']
        },
        {
            id: 'comfort',
            icon: 'waves',
            title: 'Comfort features',
            short:
                'For soaking goals, hydrotherapy-style features, controls, and comfort preferences.',
            label: 'Comfort comparison',
            heading: 'Comfort goals can guide the type of provider options you compare.',
            text:
                'Some homeowners want to understand comfort-focused options such as soaking depth, hydrotherapy-style features, control placement, and seating. MaisonTub does not sell products or provide medical advice; providers discuss available options and terms.',
            meta: ['Soaking goals', 'Hydrotherapy-style options', 'Feature discussions']
        },
        {
            id: 'replacement',
            icon: 'refresh-cw',
            title: 'Older tub updates',
            short:
                'For replacing a traditional tub or older walk-in tub with a more suitable option.',
            label: 'Replacement planning',
            heading: 'Replacement requests are clearer when the current setup is described.',
            text:
                'A replacement request may include the existing tub type, desired change, timing preferences, and the reason the current setup no longer fits. Provider responses may vary by location, project scope, and availability.',
            meta: ['Existing setup', 'Desired change', 'Timing']
        },
        {
            id: 'conversion',
            icon: 'repeat-2',
            title: 'Tub conversion',
            short:
                'For homeowners considering whether a current bathtub area can support a walk-in tub path.',
            label: 'Conversion path',
            heading: 'Conversion planning starts with the current bathtub area.',
            text:
                'For tub-to-walk-in tub conversion requests, homeowners can describe the current alcove, surrounding surfaces, access goals, and preferred features. Participating providers provide final feasibility, pricing, scheduling, and terms.',
            meta: ['Current tub area', 'Project scope', 'Provider feasibility']
        },
        {
            id: 'terms',
            icon: 'file-check-2',
            title: 'Provider terms',
            short:
                'For comparing pricing, scheduling, warranties, credentials, and provider-specific details.',
            label: 'Terms clarity',
            heading: 'Final service terms always come from participating providers.',
            text:
                'MaisonTub helps with request organization and provider matching. Final pricing, product models, warranties, licensing, insurance, scheduling, service quality, and agreements are provided by participating providers.',
            meta: ['Quotes', 'Scheduling', 'Warranties']
        }
    ];

    const matchingFactors = [
        {
            icon: 'map-pin',
            title: 'Location',
            text:
                'Provider availability depends on the homeowner location and participating provider coverage.'
        },
        {
            icon: 'layout-panel-left',
            title: 'Bathroom layout',
            text:
                'Dimensions, current tub placement, doorway access, and surrounding surfaces can shape provider discussions.'
        },
        {
            icon: 'bath',
            title: 'Tub type',
            text:
                'Different walk-in tub categories, compact options, and comfort features may affect available provider responses.'
        },
        {
            icon: 'clipboard-list',
            title: 'Project scope',
            text:
                'Installation, replacement, conversion, feature planning, and safety-focused requests may lead to different provider paths.'
        },
        {
            icon: 'calendar-clock',
            title: 'Timing',
            text:
                'Preferred timing, urgency, and provider schedules may affect availability and next steps.'
        },
        {
            icon: 'badge-check',
            title: 'Availability',
            text:
                'Coverage is not guaranteed. Participating providers decide where and when they can respond.'
        }
    ];

    const aggregatorNotes = [
        {
            icon: 'compass',
            title: 'Independent platform',
            text:
                'MaisonTub helps homeowners submit project details and compare available provider options.'
        },
        {
            icon: 'file-text',
            title: 'Provider terms',
            text:
                'Final pricing, warranties, scheduling, licensing, insurance, and service terms come from participating providers.'
        },
        {
            icon: 'mouse-pointer-click',
            title: 'Homeowner choice',
            text:
                'Submitting a request does not create a service agreement. Homeowners choose whether to continue.'
        }
    ];

    const initServiceNavigation = () => {
        const mount = qs('[data-service-link-list]');
        if (!mount || !services.length) return;

        mount.innerHTML = services.map((service) => `
            <a class="service-link-row" href="${escapeHtml(service.url)}" data-aos="fade-up">
                <span>
                    <span class="service-link-row__title">${escapeHtml(service.title)}</span>
                    <span class="service-link-row__text">${escapeHtml(service.description)}</span>
                </span>

                <span class="service-link-row__icon">
                    ${createIcon('arrow-up-right')}
                </span>
            </a>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initCategoryAccordion = () => {
        const mount = qs('[data-category-accordion]');
        if (!mount || !services.length) return;

        mount.innerHTML = services.map((service, index) => `
            <article class="category-item${index === 0 ? ' is-open' : ''}" data-category-item>
                <button
                    class="category-item__button"
                    type="button"
                    data-category-button
                    aria-expanded="${index === 0 ? 'true' : 'false'}"
                >
                    <span>${escapeHtml(service.title)}</span>
                    ${createIcon('plus')}
                </button>

                <div class="category-item__panel" data-category-panel>
                    <div class="category-item__inner">
                        <div class="category-item__photo image-frame">
                            <img
                                src="${escapeHtml(service.image)}"
                                alt="${escapeHtml(service.title)} provider matching category"
                                loading="lazy"
                                width="760"
                                height="580"
                            >
                        </div>

                        <div class="category-item__content">
                            <span class="category-item__badge">${escapeHtml(service.badge)}</span>
                            <h3>${escapeHtml(service.title)}</h3>
                            <p>${escapeHtml(service.description)}</p>

                            <div class="category-item__points">
                                ${(service.goodFor || []).map((point) => `
                                    <span class="category-item__point">
                                        ${createIcon('check-circle-2')}
                                        <span>${escapeHtml(point)}</span>
                                    </span>
                                `).join('')}
                            </div>

                            <div class="btn-row">
                                <a class="btn btn--teal" href="${escapeHtml(service.url)}">
                                    <span>${escapeHtml(service.cta)}</span>
                                    ${createIcon('arrow-right')}
                                </a>

                                <a class="btn btn--outline" href="contact.html">
                                    <span>Start Request</span>
                                    ${createIcon('send')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        const updatePanels = () => {
            qsa('[data-category-item]', mount).forEach((item) => {
                const panel = qs('[data-category-panel]', item);

                if (!panel) return;

                if (item.classList.contains('is-open')) {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                } else {
                    panel.style.maxHeight = '0px';
                }
            });
        };

        qsa('[data-category-button]', mount).forEach((button) => {
            button.addEventListener('click', () => {
                const item = button.closest('[data-category-item]');
                const isOpen = item.classList.contains('is-open');

                qsa('[data-category-item]', mount).forEach((otherItem) => {
                    otherItem.classList.remove('is-open');
                    qs('[data-category-button]', otherItem)?.setAttribute('aria-expanded', 'false');
                });

                item.classList.toggle('is-open', !isOpen);
                button.setAttribute('aria-expanded', String(!isOpen));

                updatePanels();
                refreshAOS();
            });
        });

        window.addEventListener('resize', updatePanels);

        refreshIcons();
        window.requestAnimationFrame(updatePanels);
        refreshAOS();
    };

    const initFeaturedShowcase = () => {
        const section = qs('[data-featured-showcase]');
        if (!section) return;

        const left = qs('[data-showcase-left]', section);
        const right = qs('[data-showcase-right]', section);
        const thought = qs('[data-showcase-thought]', section);

        if (!left || !right || !thought) return;

        const leftItems = showcaseItems.slice(0, 3);
        const rightItems = showcaseItems.slice(3);

        const rowTemplate = (item, index) => `
            <button
                class="showcase-row${index === 0 ? ' is-active' : ''}"
                type="button"
                data-showcase-item="${escapeHtml(item.id)}"
                aria-pressed="${index === 0 ? 'true' : 'false'}"
            >
                <span class="showcase-row__icon">${createIcon(item.icon)}</span>

                <span>
                    <span class="showcase-row__title">${escapeHtml(item.title)}</span>
                    <span class="showcase-row__text">${escapeHtml(item.short)}</span>
                </span>

                <span class="showcase-row__arrow">${createIcon('arrow-up-right')}</span>
            </button>
        `;

        left.innerHTML = leftItems.map(rowTemplate).join('');
        right.innerHTML = rightItems.map((item, index) => rowTemplate(item, index + 3)).join('');

        const renderThought = (item) => {
            thought.innerHTML = `
                <span class="showcase-thought__label">${escapeHtml(item.label)}</span>
                <h3>${escapeHtml(item.heading)}</h3>
                <p>${escapeHtml(item.text)}</p>

                <div class="showcase-thought__meta">
                    ${item.meta.map((meta) => `<span>${escapeHtml(meta)}</span>`).join('')}
                </div>
            `;
        };

        const setActive = (id) => {
            const item = showcaseItems.find((entry) => entry.id === id) || showcaseItems[0];

            qsa('[data-showcase-item]', section).forEach((button) => {
                const isActive = button.getAttribute('data-showcase-item') === item.id;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            renderThought(item);
            refreshAOS();
        };

        section.addEventListener('click', (event) => {
            const button = event.target.closest('[data-showcase-item]');
            if (!button) return;

            setActive(button.getAttribute('data-showcase-item'));
        });

        renderThought(showcaseItems[0]);
        refreshIcons();
    };

    const initMatchingFactors = () => {
        const mount = qs('[data-matching-factors]');
        if (!mount) return;

        mount.innerHTML = matchingFactors.map((factor) => `
            <article class="factor-card" data-aos="fade-up">
                <div class="factor-card__icon">
                    ${createIcon(factor.icon)}
                </div>
                <h3>${escapeHtml(factor.title)}</h3>
                <p>${escapeHtml(factor.text)}</p>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initAggregatorNotes = () => {
        const mount = qs('[data-aggregator-notes]');
        if (!mount) return;

        mount.innerHTML = aggregatorNotes.map((note) => `
            <article class="aggregator-note" data-aos="fade-up">
                <div class="aggregator-note__icon">
                    ${createIcon(note.icon)}
                </div>
                <span>
                    <strong>${escapeHtml(note.title)}</strong>
                    <span>${escapeHtml(note.text)}</span>
                </span>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initServicesFaqSchema = () => {
        const faqs = [
            {
                question: 'Which walk-in tub service category should I choose?',
                answer:
                    'Choose the category that best describes your project goal. MaisonTub organizes requests for installation, replacement, conversion, compact options, hydrotherapy options, and accessible bath safety features.'
            },
            {
                question: 'Does MaisonTub provide these services directly?',
                answer:
                    'No. MaisonTub is an independent provider-matching platform and does not install, replace, convert, repair, inspect, sell, or manufacture walk-in tubs.'
            },
            {
                question: 'Who gives the final quote?',
                answer:
                    'Final quotes, product details, schedules, warranties, licensing, insurance, and service terms are provided by participating providers.'
            },
            {
                question: 'Can availability vary by service category?',
                answer:
                    'Yes. Availability may vary by location, project type, timing, and participating provider coverage.'
            }
        ];

        if (qs('script[data-services-faq-schema]')) return;

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-services-faq-schema', '');
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    };

    const initAllServices = () => {
        initServiceNavigation();
        initCategoryAccordion();
        initFeaturedShowcase();
        initMatchingFactors();
        initAggregatorNotes();
        initServicesFaqSchema();

        refreshIcons();
        refreshAOS();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllServices);
    } else {
        initAllServices();
    }
})();