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

    const homeState = {
        activeNeed: services[0]?.id || '',
        activeComfort: 0,
        activeSlide: 0
    };

    const needCopy = {
        installation: {
            rowText: 'New walk-in tub setup planning',
            panelTitle: 'Walk-In Tub Installation',
            panelDescription:
                'For homeowners planning a new walk-in tub setup and comparing provider options for layout, access, comfort, and safe entry.',
            image: 'assets/images/service-1.jpg'
        },
        replacement: {
            rowText: 'Existing tub or older model updates',
            panelTitle: 'Walk-In Tub Replacement',
            panelDescription:
                'For homeowners reviewing replacement options when an existing bathtub or older walk-in tub no longer fits comfort, access, or layout needs.',
            image: 'assets/images/service-2.jpg'
        },
        conversion: {
            rowText: 'Traditional tub space conversion',
            panelTitle: 'Tub-to-Walk-In Conversion',
            panelDescription:
                'For homeowners considering whether an existing bathtub area may support a walk-in tub conversion through participating provider options.',
            image: 'assets/images/service-3.jpg'
        },
        compact: {
            rowText: 'Small bathroom and tighter layouts',
            panelTitle: 'Compact Bathroom Options',
            panelDescription:
                'For smaller bathrooms, narrow access areas, and space-conscious planning where compact walk-in tub options may be discussed.',
            image: 'assets/images/service-4.jpg'
        },
        hydrotherapy: {
            rowText: 'Comfort and soaking feature goals',
            panelTitle: 'Hydrotherapy Comfort',
            panelDescription:
                'For homeowners who want to compare comfort-focused features that participating providers may discuss, including hydrotherapy-style options.',
            image: 'assets/images/service-5.jpg'
        },
        safety: {
            rowText: 'Accessible entry and safety features',
            panelTitle: 'Safety Feature Planning',
            panelDescription:
                'For homeowners focused on easier entry, seating, grab bars, slip-resistant surfaces, and other accessible bathing feature discussions.',
            image: 'assets/images/service-6.jpg'
        }
    };

    const comfortItems = [
        {
            label: 'Easier step-in access',
            title: 'Plan around easier entry and daily bathing confidence.',
            text:
                'MaisonTub helps homeowners describe access preferences clearly so participating providers can respond with available walk-in tub options where coverage exists.',
            noteTitle: 'Access-first planning',
            note:
                'Low-entry preferences, door style, seating, and bathroom layout can all affect what provider options may be discussed.',
            image: 'assets/images/hero-home.jpg',
            icon: 'door-open'
        },
        {
            label: 'Smaller bathroom layout',
            title: 'Compare options for compact spaces without guessing.',
            text:
                'When space is limited, your request can focus on bathroom dimensions, access paths, and compact walk-in tub preferences before provider conversations begin.',
            noteTitle: 'Space-conscious matching',
            note:
                'Participating providers may discuss model dimensions, layout fit, and installation-related considerations.',
            image: 'assets/images/service-4.jpg',
            icon: 'maximize-2'
        },
        {
            label: 'Replacement planning',
            title: 'Organize details for replacing an older bathing setup.',
            text:
                'Replacement requests can include current tub type, desired comfort changes, access goals, and timing preferences for provider comparison.',
            noteTitle: 'Upgrade clarity',
            note:
                'Final replacement scope, pricing, scheduling, and warranty terms come from participating providers.',
            image: 'assets/images/service-2.jpg',
            icon: 'refresh-cw'
        },
        {
            label: 'Comfort soaking features',
            title: 'Review comfort-focused walk-in tub feature paths.',
            text:
                'Hydrotherapy-style preferences, soaking depth, seating, controls, and comfort features can be described before reviewing available provider responses.',
            noteTitle: 'Comfort-focused request',
            note:
                'MaisonTub does not sell products or provide medical advice; providers discuss available models and terms.',
            image: 'assets/images/service-5.jpg',
            icon: 'waves'
        },
        {
            label: 'Safer bathing preferences',
            title: 'Compare access-oriented feature conversations.',
            text:
                'Safety-focused requests may include grab bars, seating, threshold height, door direction, slip-resistant surfaces, and caregiver access needs.',
            noteTitle: 'Feature planning',
            note:
                'Homeowners should verify final provider credentials, product details, and service terms before continuing.',
            image: 'assets/images/service-6.jpg',
            icon: 'shield-check'
        },
        {
            label: 'Provider comparison clarity',
            title: 'Understand what comes from MaisonTub and what comes from providers.',
            text:
                'MaisonTub helps with request organization and provider matching. Participating providers provide final availability, pricing, scheduling, and service terms.',
            noteTitle: 'Transparent process',
            note:
                'You choose whether to continue after reviewing available provider responses.',
            image: 'assets/images/hero-services.jpg',
            icon: 'git-compare'
        }
    ];

    const transparencySlides = [
        {
            icon: 'compass',
            title: 'MaisonTub is independent.',
            text:
                'MaisonTub is not a walk-in tub installer, retailer, seller, manufacturer, repair company, inspection company, or medical provider. The platform helps homeowners submit project details and compare available local provider options.',
            details: [
                ['Platform role', 'Request organization and provider matching'],
                ['No direct work', 'MaisonTub does not perform walk-in tub services'],
                ['User control', 'Homeowners choose whether to continue']
            ]
        },
        {
            icon: 'file-check-2',
            title: 'Participating providers set final terms.',
            text:
                'Final pricing, scheduling, product models, warranties, licensing, insurance, service quality, and project terms are provided by participating providers, not by MaisonTub.',
            details: [
                ['Provider terms', 'Quotes and schedules come from providers'],
                ['Availability', 'Coverage may vary by location and project type'],
                ['Verification', 'Homeowners should review credentials directly']
            ]
        },
        {
            icon: 'mouse-pointer-click',
            title: 'You decide the next step.',
            text:
                'Submitting a request does not create a service agreement. After provider responses are available, homeowners can review the information and choose whether they want to continue.',
            details: [
                ['No obligation', 'A request is not a contract'],
                ['Compare clearly', 'Review available responses before deciding'],
                ['Continue by choice', 'You decide if a provider fits your needs']
            ]
        }
    ];

    const setImage = (() => {
        let timer = null;

        return (image, src, alt) => {
            if (!image) return;
            if (image.getAttribute('src') === src) return;

            if (timer) {
                window.clearTimeout(timer);
                timer = null;
            }

            image.classList.add('is-changing');

            timer = window.setTimeout(() => {
                const finish = () => {
                    image.classList.remove('is-changing');
                    image.onload = null;
                };

                image.onload = finish;
                image.src = src;
                image.alt = alt;

                if (image.complete) {
                    window.setTimeout(finish, 80);
                }

                timer = null;
            }, 120);
        };
    })();

    const getServiceById = (id) => {
        return services.find((service) => service.id === id) || services[0];
    };

    const initNeedNavigation = () => {
        const section = qs('[data-home-need-nav]');
        if (!section || !services.length) return;

        const list = qs('[data-need-list]', section);
        const panel = qs('[data-need-panel]', section);

        if (!list || !panel) return;

        const renderButtons = () => {
            list.innerHTML = services.map((service) => {
                const copy = needCopy[service.id] || {};
                const isActive = homeState.activeNeed === service.id;

                return `
                    <button
                        class="need-list__button${isActive ? ' is-active' : ''}"
                        type="button"
                        data-need-button="${escapeHtml(service.id)}"
                        aria-pressed="${String(isActive)}"
                    >
                        <span>
                            <span class="need-list__button-title">${escapeHtml(service.title)}</span>
                            <span class="need-list__button-text">${escapeHtml(copy.rowText || service.description)}</span>
                        </span>
                        <span class="need-list__button-icon">
                            ${createIcon(service.icon)}
                        </span>
                    </button>
                `;
            }).join('');
        };

        const renderPanel = (serviceId) => {
            const service = getServiceById(serviceId);
            const copy = needCopy[service.id] || {};
            const points = service.goodFor || [];
            const path = service.needPath || [];

            panel.innerHTML = `
                <div class="need-panel__media">
                    <img
                        src="${escapeHtml(copy.image || service.image)}"
                        alt="${escapeHtml(service.title)} provider matching planning"
                        loading="lazy"
                        width="920"
                        height="680"
                    >
                </div>

                <div class="need-panel__content">
                    <span class="need-panel__badge">${escapeHtml(service.badge)}</span>

                    <h3>${escapeHtml(copy.panelTitle || service.title)}</h3>

                    <p class="need-panel__text">
                        ${escapeHtml(copy.panelDescription || service.description)}
                    </p>

                    <div class="need-panel__points" aria-label="Good for">
                        ${points.map((point) => `
                            <span class="need-panel__point">
                                ${createIcon('check-circle-2')}
                                <span>${escapeHtml(point)}</span>
                            </span>
                        `).join('')}
                    </div>

                    <div class="need-panel__bottom">
                        <a class="btn btn--gold" href="${escapeHtml(service.url)}">
                            <span>${escapeHtml(service.cta)}</span>
                            ${createIcon('arrow-right')}
                        </a>

                        <div class="need-path" aria-label="Need path">
                            ${path.map((item) => `
                                <span class="need-path__item">${escapeHtml(item)}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        };

        const setActive = (serviceId) => {
            homeState.activeNeed = serviceId;

            qsa('[data-need-button]', list).forEach((button) => {
                const isActive = button.getAttribute('data-need-button') === serviceId;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            renderPanel(serviceId);
            refreshIcons();
            refreshAOS();
        };

        renderButtons();
        renderPanel(homeState.activeNeed);

        list.addEventListener('click', (event) => {
            const button = event.target.closest('[data-need-button]');
            if (!button) return;

            setActive(button.getAttribute('data-need-button'));
        });

        refreshIcons();
    };

    const initComfortSelector = () => {
        const section = qs('[data-comfort-selector]');
        if (!section) return;

        const list = qs('[data-comfort-list]', section);
        const image = qs('[data-comfort-image]', section);
        const label = qs('[data-comfort-label]', section);
        const title = qs('[data-comfort-title]', section);
        const text = qs('[data-comfort-text]', section);
        const note = qs('[data-comfort-note]', section);

        if (!list || !image || !label || !title || !text || !note) return;

        list.innerHTML = comfortItems.map((item, index) => `
            <button
                class="comfort-selector__button${index === 0 ? ' is-active' : ''}"
                type="button"
                data-comfort-button="${index}"
                aria-pressed="${index === 0 ? 'true' : 'false'}"
            >
                <span>${escapeHtml(item.label)}</span>
                ${createIcon('arrow-up-right')}
            </button>
        `).join('');

        const setActive = (index, force = false) => {
            const item = comfortItems[index] || comfortItems[0];
            if (!force && homeState.activeComfort === index) return;

            homeState.activeComfort = index;

            qsa('[data-comfort-button]', list).forEach((button) => {
                const isActive = Number(button.getAttribute('data-comfort-button')) === index;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            setImage(image, item.image, item.label);

            label.textContent = item.label;
            title.textContent = item.title;
            text.textContent = item.text;

            note.innerHTML = `
        ${createIcon(item.icon)}
        <div>
            <strong>${escapeHtml(item.noteTitle)}</strong>
            <p>${escapeHtml(item.note)}</p>
        </div>
    `;

            refreshIcons();
        };

        list.addEventListener('click', (event) => {
            const button = event.target.closest('[data-comfort-button]');
            if (!button) return;

            setActive(Number(button.getAttribute('data-comfort-button')));
        });

        setActive(0, true);
    };

    const initTransparencySlider = () => {
        const slider = qs('[data-transparency-slider]');
        if (!slider) return;

        const track = qs('[data-transparency-track]', slider);
        const dots = qs('[data-transparency-dots]', slider);
        const prev = qs('[data-transparency-prev]', slider);
        const next = qs('[data-transparency-next]', slider);

        if (!track || !dots || !prev || !next) return;

        track.innerHTML = transparencySlides.map((slide) => `
            <article class="transparency-slide">
                <div class="transparency-slide__grid">
                    <div class="transparency-slide__icon">
                        ${createIcon(slide.icon)}
                    </div>

                    <div>
                        <h2>${escapeHtml(slide.title)}</h2>
                        <p>${escapeHtml(slide.text)}</p>

                        <div class="transparency-slide__details">
                            ${slide.details.map(([title, detail]) => `
                                <span class="transparency-slide__detail">
                                    <strong>${escapeHtml(title)}</strong>
                                    <span>${escapeHtml(detail)}</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        dots.innerHTML = transparencySlides.map((_, index) => `
            <button
                class="transparency-slider__dot${index === 0 ? ' is-active' : ''}"
                type="button"
                data-transparency-dot="${index}"
                aria-label="Show transparency slide ${index + 1}"
            ></button>
        `).join('');

        const updateSlider = (index) => {
            const total = transparencySlides.length;
            homeState.activeSlide = (index + total) % total;

            track.style.transform = `translateX(-${homeState.activeSlide * 100}%)`;

            qsa('[data-transparency-dot]', dots).forEach((dot) => {
                const isActive = Number(dot.getAttribute('data-transparency-dot')) === homeState.activeSlide;
                dot.classList.toggle('is-active', isActive);
            });

            refreshAOS();
        };

        prev.addEventListener('click', () => {
            updateSlider(homeState.activeSlide - 1);
        });

        next.addEventListener('click', () => {
            updateSlider(homeState.activeSlide + 1);
        });

        dots.addEventListener('click', (event) => {
            const dot = event.target.closest('[data-transparency-dot]');
            if (!dot) return;

            updateSlider(Number(dot.getAttribute('data-transparency-dot')));
        });

        slider.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                updateSlider(homeState.activeSlide - 1);
            }

            if (event.key === 'ArrowRight') {
                updateSlider(homeState.activeSlide + 1);
            }
        });

        refreshIcons();
    };

    const initServicePathCards = () => {
        const mount = qs('[data-home-service-paths]');
        if (!mount || !services.length) return;

        const featuredIds = ['installation', 'conversion', 'hydrotherapy'];
        const featured = featuredIds
            .map((id) => services.find((service) => service.id === id))
            .filter(Boolean);

        mount.innerHTML = featured.map((service) => `
            <article class="service-path-card" data-aos="fade-up">
                <a class="service-path-card__photo" href="${escapeHtml(service.url)}">
                    <img
                        src="${escapeHtml(service.image)}"
                        alt="${escapeHtml(service.title)} request category"
                        loading="lazy"
                        width="620"
                        height="430"
                    >
                </a>

                <div class="service-path-card__body">
                    <div class="service-path-card__icon">
                        ${createIcon(service.icon)}
                    </div>

                    <h3>${escapeHtml(service.title)}</h3>
                    <p>${escapeHtml(service.description)}</p>

                    <a class="service-path-card__link" href="${escapeHtml(service.url)}">
                        <span>${escapeHtml(service.cta)}</span>
                        ${createIcon('arrow-right')}
                    </a>
                </div>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initMatchCards = () => {
        const mount = qs('[data-home-match-cards]');
        if (!mount) return;

        const cards = [
            {
                icon: 'layout-panel-left',
                title: 'Layout',
                text:
                    'Clarify bathroom size, access path, existing tub location, and possible space limitations before provider conversations.'
            },
            {
                icon: 'sliders-horizontal',
                title: 'Features',
                text:
                    'Describe comfort, entry, seating, door, and safety feature preferences that participating providers may discuss.'
            },
            {
                icon: 'map-pin',
                title: 'Provider Availability',
                text:
                    'Availability depends on location, participating provider coverage, timing, and project category.'
            },
            {
                icon: 'clipboard-list',
                title: 'Project Scope',
                text:
                    'Organize whether your request involves installation planning, replacement, conversion, compact options, or comfort features.'
            },
            {
                icon: 'file-text',
                title: 'Quote Details',
                text:
                    'Participating providers provide final pricing, product model details, scheduling, and service terms.'
            },
            {
                icon: 'badge-check',
                title: 'Terms',
                text:
                    'Homeowners should review licensing, insurance, warranty information, and service terms directly with providers.'
            }
        ];

        mount.innerHTML = cards.map((card) => `
            <article class="premium-card match-card" data-aos="fade-up">
                <div class="card-icon">${createIcon(card.icon)}</div>
                <h3>${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.text)}</p>
                <span class="match-card__line" aria-hidden="true"></span>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initCompareRows = () => {
        const mount = qs('[data-home-compare-rows]');
        if (!mount) return;

        const rows = [
            {
                icon: 'ruler',
                title: 'Bathroom layout',
                text:
                    'Compare how space, access paths, and existing fixtures may influence provider recommendations.'
            },
            {
                icon: 'box-select',
                title: 'Tub size',
                text:
                    'Participating providers may discuss dimensions, model fit, and comfort preferences.'
            },
            {
                icon: 'door-open',
                title: 'Entry style',
                text:
                    'Door direction, threshold height, and seating may matter for access-focused planning.'
            },
            {
                icon: 'waves',
                title: 'Comfort features',
                text:
                    'Hydrotherapy-style features, soaking depth, controls, and other options may vary by provider.'
            },
            {
                icon: 'map-pinned',
                title: 'Provider availability',
                text:
                    'Coverage depends on service area, timing, provider participation, and project type.'
            },
            {
                icon: 'file-search',
                title: 'Quote details',
                text:
                    'Final quote details, product models, warranties, licensing, insurance, and scheduling come from providers.'
            }
        ];

        mount.innerHTML = rows.map((row) => `
            <article class="compare-row" data-aos="fade-up">
                <div class="compare-row__icon">
                    ${createIcon(row.icon)}
                </div>
                <h3>${escapeHtml(row.title)}</h3>
                <p>${escapeHtml(row.text)}</p>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initFaqSchema = () => {
        const faqs = config.faqs?.home || [];
        if (!faqs.length || qs('script[data-home-faq-schema]')) return;

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
        script.setAttribute('data-home-faq-schema', '');
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    };

    const initHome = () => {
        initNeedNavigation();
        initComfortSelector();
        initServicePathCards();
        initMatchCards();
        initCompareRows();
        initTransparencySlider();
        initFaqSchema();

        refreshIcons();
        refreshAOS();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHome);
    } else {
        initHome();
    }
})();
