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
        refreshAOS,
        initAccordions
    } = utils;

    const services = config.services || [];

    const serviceContent = {
        installation: {
            eyebrow: 'Installation options',
            h1: 'Walk-in Tub Installation',
            lead:
                'Submit installation project details and review available local provider options where participating providers are available.',
            overviewTitle: 'Start a New Walk-In Tub Installation Request With Clear Details',
            overviewText:
                'A walk-in tub installation request may involve layout, entry access, seating preferences, comfort features, product discussions, timing, and provider availability. MaisonTub helps homeowners organize those details before comparing available provider options. MaisonTub does not install, sell, repair, inspect, manufacture, or directly provide walk-in tub services.',
            overviewPoints: [
                'Share bathroom layout and access preferences.',
                'Compare available participating provider responses.',
                'Review final pricing, scheduling, warranties, licensing, insurance, and terms directly with providers.'
            ],
            situations: [
                ['First-time walk-in tub planning', 'For homeowners considering a new walk-in tub setup and wanting to compare provider options before moving forward.', 'bath'],
                ['Access-focused bathroom updates', 'For requests centered on easier entry, seating, door style, and comfort-focused bathing access.', 'door-open'],
                ['Feature comparison', 'For comparing options that participating providers may discuss, including tub size, controls, and comfort features.', 'sliders-horizontal'],
                ['Provider quote review', 'For homeowners who want to organize project details before reviewing available provider responses.', 'file-search']
            ],
            providerColumns: [
                [
                    ['Layout review discussions', 'Participating providers may discuss bathroom layout, available space, entry paths, and current fixture placement.', 'layout-panel-left'],
                    ['Tub model conversations', 'Available model types, dimensions, door styles, and features are discussed by participating providers.', 'box-select'],
                    ['Comfort feature options', 'Providers may discuss soaking depth, seating, controls, hydrotherapy-style features, and access preferences.', 'waves']
                ],
                [
                    ['Quote and timing details', 'Final pricing, schedules, deposits, project timing, and service scope come from participating providers.', 'calendar-clock'],
                    ['Warranty and terms', 'Product warranties, provider workmanship terms, and service agreements are provider-supplied.', 'file-check-2'],
                    ['Credential verification', 'Homeowners should verify licensing, insurance, permits, and credentials before continuing.', 'badge-check']
                ]
            ],
            comparisonPhoto: 'assets/images/service-3.jpg',
            faq: [
                ['Does MaisonTub install walk-in tubs?', 'No. MaisonTub is an independent provider-matching platform and does not install, sell, repair, inspect, manufacture, or directly provide walk-in tub services.'],
                ['What installation details should I include?', 'Helpful details may include bathroom layout, current tub area, access preferences, timing, desired comfort features, and any space limitations.'],
                ['Who provides the final installation quote?', 'Participating providers provide final quotes, scheduling, warranties, licensing, insurance, product model information, and service terms.'],
                ['Does submitting a request create an agreement?', 'No. Submitting a request does not create a service agreement. Homeowners choose whether to continue after reviewing provider responses.']
            ]
        },

        replacement: {
            eyebrow: 'Replacement options',
            h1: 'Walk-in Tub Replacement',
            lead:
                'Organize replacement details and compare available provider responses for updating an existing tub or older walk-in tub.',
            overviewTitle: 'Review Replacement Paths Before Choosing a Provider',
            overviewText:
                'A replacement request may begin when an older bathtub or walk-in tub no longer fits access, comfort, feature, or layout needs. MaisonTub helps homeowners describe the current setup and compare available provider options where participating providers are available. Final project terms come directly from providers.',
            overviewPoints: [
                'Describe the existing bathing setup and desired change.',
                'Compare provider availability where coverage exists.',
                'Review final replacement scope and terms directly with providers.'
            ],
            situations: [
                ['Older tub no longer fits', 'For homeowners replacing a standard bathtub or older walk-in tub because needs have changed.', 'refresh-cw'],
                ['Comfort or feature upgrade', 'For comparing options that may include improved seating, entry, controls, or comfort features.', 'waves'],
                ['Layout update planning', 'For requests where the current bathroom layout needs to be discussed before replacement terms are clear.', 'layout-panel-left'],
                ['Provider term comparison', 'For reviewing provider-supplied pricing, schedules, warranties, and service terms before deciding.', 'file-check-2']
            ],
            providerColumns: [
                [
                    ['Current setup discussion', 'Participating providers may ask about the existing tub, surrounding surfaces, access path, and removal considerations.', 'clipboard-list'],
                    ['Replacement model options', 'Available replacement models, sizes, doors, and comfort features are discussed by providers.', 'box-select'],
                    ['Access and safety features', 'Provider conversations may include seating, grab bars, low-entry thresholds, and slip-resistant surfaces.', 'shield-check']
                ],
                [
                    ['Removal and scope details', 'Providers determine final replacement scope, related work, timing, and pricing.', 'wrench'],
                    ['Warranty information', 'Product and workmanship warranty details come from participating providers.', 'badge-check'],
                    ['Scheduling terms', 'Provider schedules, availability, installation timing, and next steps vary by location and project.', 'calendar-clock']
                ]
            ],
            comparisonPhoto: 'assets/images/card-7.jpg',
            faq: [
                ['Can MaisonTub replace my current tub?', 'No. MaisonTub does not replace, install, repair, inspect, sell, or manufacture walk-in tubs. It helps homeowners compare available provider options.'],
                ['What should I share for a replacement request?', 'Useful details include current tub type, bathroom layout, desired changes, access needs, feature preferences, and timing.'],
                ['Can provider availability vary?', 'Yes. Availability may vary by location, project scope, timing, and participating provider coverage.'],
                ['Who provides warranty details?', 'Participating providers provide final product, workmanship, warranty, scheduling, pricing, and service terms.']
            ]
        },

        conversion: {
            eyebrow: 'Tub conversion options',
            h1: 'Walk-in Tub Conversion',
            lead:
                'Share details about an existing bathtub area and compare provider options for a possible walk-in tub conversion path.',
            overviewTitle: 'Clarify Whether a Conversion Path Fits the Current Bathing Area',
            overviewText:
                'A tub-to-walk-in tub conversion request may involve an existing bathtub space, surrounding surfaces, access preferences, feature goals, and provider feasibility discussions. MaisonTub helps organize the request so homeowners can compare available provider responses where coverage exists.',
            overviewPoints: [
                'Describe the current bathtub area and layout.',
                'Compare available conversion-focused provider responses.',
                'Confirm final feasibility and terms directly with providers.'
            ],
            situations: [
                ['Existing bathtub area', 'For homeowners who want to explore whether their current bathtub area may support a walk-in tub path.', 'repeat-2'],
                ['Access improvement goal', 'For requests focused on easier entry, seating, and daily bathing access.', 'door-open'],
                ['Feature planning', 'For comparing conversion-related comfort, safety, and model discussions with providers.', 'sliders-horizontal'],
                ['Feasibility conversations', 'For understanding that final feasibility, pricing, timing, and terms come from participating providers.', 'file-search']
            ],
            providerColumns: [
                [
                    ['Existing alcove review', 'Participating providers may discuss the current bathtub area, walls, surfaces, plumbing access, and layout.', 'layout-panel-left'],
                    ['Walk-in tub fit', 'Providers may discuss model dimensions, door style, seating, and access considerations.', 'box-select'],
                    ['Feature preferences', 'Available comfort and accessible bathing features may be discussed by participating providers.', 'waves']
                ],
                [
                    ['Conversion scope', 'Final conversion scope, related work, and pricing are determined by participating providers.', 'clipboard-list'],
                    ['Scheduling and timing', 'Provider availability, timing, and project sequence may vary by location and project conditions.', 'calendar-clock'],
                    ['Terms and credentials', 'Homeowners should verify licensing, insurance, warranties, and service terms directly.', 'badge-check']
                ]
            ],
            comparisonPhoto: 'assets/images/service-3.jpg',
            faq: [
                ['Does MaisonTub perform tub conversions?', 'No. MaisonTub does not convert, install, replace, repair, inspect, sell, or manufacture walk-in tubs. It helps with provider matching.'],
                ['Can every bathtub be converted?', 'MaisonTub does not determine feasibility. Participating providers discuss final feasibility, scope, pricing, and terms.'],
                ['What details help with a conversion request?', 'Helpful details include current tub area, bathroom layout, access needs, desired features, and timing preferences.'],
                ['Who decides final project scope?', 'Participating providers determine final scope, pricing, scheduling, warranties, licensing, insurance, and service terms.']
            ]
        },

        compact: {
            eyebrow: 'Compact options',
            h1: 'Compact Walk-In Tub Options',
            lead:
                'Submit details for smaller bathrooms and compare available provider options for compact walk-in tub planning.',
            overviewTitle: 'Organize Compact Bathroom Details Before Provider Conversations',
            overviewText:
                'Compact walk-in tub requests often depend on bathroom dimensions, access paths, doorway width, existing fixture placement, and feature priorities. MaisonTub helps homeowners organize these details before reviewing available provider responses where participating providers are available.',
            overviewPoints: [
                'Share small bathroom dimensions and access concerns.',
                'Compare provider responses for compact walk-in tub discussions.',
                'Review final model fit, pricing, and terms directly with providers.'
            ],
            situations: [
                ['Small bathroom layout', 'For bathrooms where space is limited and compact model conversations may be needed.', 'maximize-2'],
                ['Narrow access path', 'For homes where doorways, hallways, or fixture placement may affect provider discussions.', 'route'],
                ['Space-conscious features', 'For comparing seating, door style, and comfort features in a smaller footprint.', 'sliders-horizontal'],
                ['Provider fit review', 'For understanding that final fit, availability, and project terms come from participating providers.', 'file-check-2']
            ],
            providerColumns: [
                [
                    ['Bathroom dimensions', 'Participating providers may ask about room size, current fixture placement, and entry path.', 'ruler'],
                    ['Compact model discussions', 'Available compact models, widths, door styles, and seating options may vary by provider.', 'box-select'],
                    ['Access considerations', 'Providers may discuss doorway access, surrounding surfaces, and space limitations.', 'door-open']
                ],
                [
                    ['Feature tradeoffs', 'Compact planning may involve comfort, safety, soaking depth, and control placement considerations.', 'sliders-horizontal'],
                    ['Provider availability', 'Coverage and compact model discussions vary by location and participating provider.', 'map-pin'],
                    ['Final provider terms', 'Pricing, scheduling, warranties, product details, and agreements come from providers.', 'file-text']
                ]
            ],
            comparisonPhoto: 'assets/images/service-4.jpg',
            faq: [
                ['Does MaisonTub sell compact walk-in tubs?', 'No. MaisonTub does not sell, install, replace, repair, inspect, manufacture, or directly provide walk-in tubs.'],
                ['What should I include for a compact request?', 'Include bathroom dimensions, doorway or hallway limitations, current tub layout, access preferences, and desired features.'],
                ['Who confirms whether a compact option fits?', 'Participating providers discuss final fit, model availability, pricing, scheduling, and terms.'],
                ['Can availability vary for compact models?', 'Yes. Availability may vary by provider, location, project type, product discussions, and timing.']
            ]
        },

        hydrotherapy: {
            eyebrow: 'Hydrotherapy options',
            h1: 'Hydrotherapy Walk-In Tub Options',
            lead:
                'Review provider-matching options for comfort-focused walk-in tub feature discussions where available.',
            overviewTitle: 'Compare Comfort-Focused Feature Discussions Without Direct Product Claims',
            overviewText:
                'Hydrotherapy walk-in tub requests may involve comfort goals, soaking preferences, controls, seating, water or air jet discussions, and available model conversations. MaisonTub does not sell products or provide medical advice. Participating providers discuss available options and final terms.',
            overviewPoints: [
                'Describe comfort and soaking preferences.',
                'Compare provider responses for available feature discussions.',
                'Review final product models, pricing, and warranties with providers.'
            ],
            situations: [
                ['Comfort soaking goals', 'For homeowners interested in comparing comfort-focused bathing feature options.', 'waves'],
                ['Feature conversations', 'For requests involving controls, seating, jets, soaking depth, and model discussions.', 'sliders-horizontal'],
                ['Replacement with comfort focus', 'For homeowners replacing an older setup and prioritizing comfort features.', 'refresh-cw'],
                ['Terms and model review', 'For reviewing provider-supplied model, warranty, pricing, and scheduling information.', 'file-check-2']
            ],
            providerColumns: [
                [
                    ['Comfort preferences', 'Participating providers may discuss soaking depth, seating, controls, and comfort goals.', 'waves'],
                    ['Feature availability', 'Hydrotherapy-style features, air or water jet discussions, and controls vary by provider and model.', 'sliders-horizontal'],
                    ['Model conversations', 'Available models, dimensions, doors, and feature combinations are provider-supplied.', 'box-select']
                ],
                [
                    ['No medical advice', 'MaisonTub does not provide health, mobility, or medical recommendations.', 'badge-alert'],
                    ['Warranty details', 'Product warranties and service terms are provided by participating providers.', 'badge-check'],
                    ['Final quote terms', 'Final pricing, scheduling, and agreements come from participating providers.', 'file-text']
                ]
            ],
            comparisonPhoto: 'assets/images/service-5.jpg',
            faq: [
                ['Does MaisonTub provide hydrotherapy products?', 'No. MaisonTub does not sell, install, repair, inspect, manufacture, or directly provide walk-in tubs or hydrotherapy products.'],
                ['Does MaisonTub provide medical advice?', 'No. MaisonTub does not provide medical, health, or mobility advice. Comfort-focused feature discussions come from participating providers.'],
                ['Who explains available hydrotherapy features?', 'Participating providers explain available models, features, pricing, warranties, scheduling, and terms.'],
                ['Can comfort features vary by provider?', 'Yes. Feature availability may vary by provider, location, product model, project type, and timing.']
            ]
        },

        safety: {
            eyebrow: 'Safety feature options',
            h1: 'Accessible Bathing Options',
            lead:
                'Share access and safety-feature preferences and compare available provider options where participating providers are available.',
            overviewTitle: 'Organize Accessible Bathing Preferences Before Comparing Providers',
            overviewText:
                'Accessible bath safety feature requests may include low-entry thresholds, seating, grab bars, slip-resistant surfaces, door style, hand shower placement, and caregiver access considerations. MaisonTub helps organize these details for provider-matching consideration and does not provide medical advice.',
            overviewPoints: [
                'Describe access, seating, and support preferences.',
                'Compare available provider responses for safety-feature discussions.',
                'Verify final product, installation, warranty, and credential details directly with providers.'
            ],
            situations: [
                ['Easier entry preferences', 'For homeowners focused on lower thresholds, door style, and entry comfort.', 'door-open'],
                ['Support feature planning', 'For requests involving seating, grab bars, hand shower placement, or slip-resistant surfaces.', 'shield-check'],
                ['Bathroom access updates', 'For comparing provider options related to layout, access path, and daily bathing support.', 'layout-panel-left'],
                ['Credential review', 'For homeowners who want to verify provider licensing, insurance, and service terms before continuing.', 'badge-check']
            ],
            providerColumns: [
                [
                    ['Entry and threshold discussions', 'Participating providers may discuss low-entry thresholds, door direction, and access preferences.', 'door-open'],
                    ['Seating and support features', 'Available seating, grab bars, surfaces, and handheld shower features may be provider-discussed.', 'shield-check'],
                    ['Layout considerations', 'Bathroom dimensions, fixture placement, and movement space can shape provider conversations.', 'layout-panel-left']
                ],
                [
                    ['No medical advice', 'MaisonTub does not diagnose needs or provide medical, mobility, or health recommendations.', 'badge-alert'],
                    ['Provider credential review', 'Homeowners should verify provider licensing, insurance, permits, and credentials directly.', 'badge-check'],
                    ['Final service terms', 'Pricing, scheduling, warranties, product models, and agreements come from participating providers.', 'file-text']
                ]
            ],
            comparisonPhoto: 'assets/images/service-6.jpg',
            faq: [
                ['Does MaisonTub provide medical or safety advice?', 'No. MaisonTub does not provide medical, health, mobility, or safety advice. It helps homeowners compare available provider options.'],
                ['Does MaisonTub install accessible bath features?', 'No. MaisonTub does not install, replace, convert, sell, repair, inspect, or manufacture walk-in tubs or safety features.'],
                ['What details help with safety-feature requests?', 'Helpful details include entry preferences, seating, grab bars, threshold concerns, bathroom layout, and timing.'],
                ['Who confirms final feature availability?', 'Participating providers confirm final product models, feature availability, pricing, scheduling, warranties, licensing, insurance, and terms.']
            ]
        }
    };

    const tabItems = [
        {
            id: 'submit',
            icon: 'send',
            label: 'Submit details',
            title: 'Submit details that describe the real project.',
            text:
                'The request begins with homeowner-provided information such as service category, bathroom layout, access preferences, timing, and feature goals.',
            note:
                'A clear request helps participating providers understand the project before responding where available.'
        },
        {
            id: 'match',
            icon: 'route',
            label: 'Get matched where available',
            title: 'Provider matching depends on availability and project fit.',
            text:
                'MaisonTub may help route the request to participating providers where coverage exists. Availability can vary by location, timing, provider participation, and project type.',
            note:
                'MaisonTub does not guarantee provider availability or any final service outcome.'
        },
        {
            id: 'review',
            icon: 'git-compare',
            label: 'Review options',
            title: 'Review available provider responses before deciding.',
            text:
                'Participating providers may discuss pricing, scheduling, product models, warranties, licensing, insurance, and service terms.',
            note:
                'Final terms come from providers and should be reviewed directly before continuing.'
        },
        {
            id: 'choose',
            icon: 'mouse-pointer-click',
            label: 'Choose next step',
            title: 'You choose whether to continue.',
            text:
                'Submitting a request does not create a service agreement. Homeowners choose whether any provider response fits their needs.',
            note:
                'MaisonTub is not the final installer, seller, contractor, repair company, inspection company, or medical provider.'
        }
    ];

    const getServiceById = (serviceId) => {
        return services.find((service) => service.id === serviceId) || services[0];
    };

    const getContent = (serviceId) => {
        return serviceContent[serviceId] || serviceContent.installation;
    };

    const getServiceIdFromPage = () => {
        const main = qs('[data-service-page]');
        if (main?.dataset.servicePage) {
            return main.dataset.servicePage;
        }

        const current = window.location.pathname.split('/').pop() || '';
        const service = services.find((item) => item.url === current);

        return service?.id || 'installation';
    };

    const renderServicePage = () => {
        const main = qs('[data-service-page]');
        if (!main) return null;

        const serviceId = getServiceIdFromPage();
        const service = getServiceById(serviceId);
        const content = getContent(serviceId);

        main.innerHTML = `
            <!-- 1. Shared Service Hero -->
            <section class="shared-hero" aria-labelledby="service-hero-title">
                <div class="shared-hero__media">
                    <img
                        src="${escapeHtml(service.heroImage)}"
                        alt="${escapeHtml(service.title)} provider matching background"
                        width="1920"
                        height="1180"
                    >
                </div>

                <div class="shared-hero__content">
                    <div class="shared-hero__text" data-aos="fade-up">
                        <p class="shared-hero__eyebrow">${escapeHtml(content.eyebrow)}</p>

                        <h1 id="service-hero-title">${escapeHtml(content.h1)}</h1>

                        <p class="shared-hero__lead">${escapeHtml(content.lead)}</p>

                        <div class="btn-row shared-hero__actions">
                            <a class="btn btn--gold" href="contact.html">
                                <span>Start Your Request</span>
                                ${createIcon('arrow-right')}
                            </a>

                            <a class="btn btn--outline-light" href="all-services.html">
                                <span>View All Services</span>
                                ${createIcon('arrow-up-right')}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="hero-float" aria-label="${escapeHtml(service.title)} request highlights">
                    <div class="hero-float__grid">
                        <article class="hero-float-card" data-aos="fade-up">
                            <div class="hero-float-card__icon">${createIcon(service.icon)}</div>
                            <h3>${escapeHtml(service.shortTitle)}</h3>
                            <p>${escapeHtml(service.description)}</p>
                        </article>

                        <article class="hero-float-card" data-aos="fade-up" data-aos-delay="80">
                            <div class="hero-float-card__icon">${createIcon('git-compare')}</div>
                            <h3>Compare Options</h3>
                            <p>Review available local provider responses where participating providers are available.</p>
                        </article>

                        <article class="hero-float-card" data-aos="fade-up" data-aos-delay="160">
                            <div class="hero-float-card__icon">${createIcon('file-check-2')}</div>
                            <h3>Provider Terms</h3>
                            <p>Final pricing, scheduling, warranties, licensing, insurance, and terms come from providers.</p>
                        </article>
                    </div>
                </div>
            </section>

            <!-- 2. Service Overview -->
            <section class="service-overview section" id="service-overview" aria-labelledby="service-overview-title">
                <div class="container-wide service-overview__grid">
                    <div class="service-overview__photo image-frame" data-aos="fade-right">
                        <img
                            src="${escapeHtml(service.image)}"
                            alt="${escapeHtml(service.title)} request overview"
                            loading="lazy"
                            width="820"
                            height="820"
                        >
                    </div>

                    <div class="service-overview__content" data-aos="fade-left">
                        <p class="section-kicker">${escapeHtml(service.shortTitle)}</p>
                        <h2 id="service-overview-title">${escapeHtml(content.overviewTitle)}</h2>
                        <p>${escapeHtml(content.overviewText)}</p>

                        <div class="service-overview__points">
                            ${content.overviewPoints.map((point) => `
                                <span class="service-overview__point">
                                    ${createIcon('check-circle-2')}
                                    <span>${escapeHtml(point)}</span>
                                </span>
                            `).join('')}
                        </div>

                        <div class="btn-row">
                            <a class="btn btn--teal" href="contact.html">
                                <span>Submit Project Details</span>
                                ${createIcon('arrow-right')}
                            </a>

                            <a class="btn btn--outline" href="all-services.html">
                                <span>Compare Categories</span>
                                ${createIcon('arrow-up-right')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 3. Common Project Situations -->
            <section class="service-situations section" id="project-situations" aria-labelledby="project-situations-title">
                <div class="service-situations__media">
                    <img
                        src="${escapeHtml(service.heroImage)}"
                        alt="${escapeHtml(service.title)} common project situations"
                        loading="lazy"
                        width="1920"
                        height="1120"
                    >
                </div>

                <div class="container-wide service-situations__inner">
                    <div class="service-situations__head" data-aos="fade-up">
                        <p class="section-kicker">Common situations</p>
                        <h2 id="project-situations-title">When This Request Path May Be Relevant</h2>
                        <p>These examples help homeowners think about whether this category fits their walk-in tub provider-matching request.</p>
                    </div>

                    <div class="situation-grid">
                        ${content.situations.map(([title, text, icon]) => `
                            <article class="situation-card" data-aos="fade-up">
                                <div class="situation-card__icon">${createIcon(icon)}</div>
                                <h3>${escapeHtml(title)}</h3>
                                <p>${escapeHtml(text)}</p>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- 4. What Provider Options May Include -->
            <section class="provider-options section" id="provider-options" aria-labelledby="provider-options-title">
                <div class="container-wide">
                    <div class="provider-options__head" data-aos="fade-up">
                        <p class="section-kicker">Provider options</p>
                        <h2 id="provider-options-title">What Participating Providers May Discuss</h2>
                        <p>Available options, final scope, pricing, scheduling, warranties, product details, licensing, insurance, and service terms are provided by participating providers.</p>
                    </div>

                    <div class="provider-options__split">
                        ${content.providerColumns.map((column) => `
                            <div class="provider-option-list">
                                ${column.map(([title, text, icon]) => `
                                    <article class="provider-option-row" data-aos="fade-up">
                                        <div class="provider-option-row__icon">${createIcon(icon)}</div>
                                        <span>
                                            <strong>${escapeHtml(title)}</strong>
                                            <span>${escapeHtml(text)}</span>
                                        </span>
                                    </article>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- 5. How MaisonTub Helps With This Service -->
            <section class="service-help section" id="service-help" data-service-tabs-section aria-labelledby="service-help-title">
                <div class="container-wide">
                    <div class="service-help__head" data-aos="fade-up">
                        <p class="section-kicker">How MaisonTub helps</p>
                        <h2 id="service-help-title">A Clearer Way to Compare ${escapeHtml(service.shortTitle)} Options</h2>
                    </div>

                    <div class="service-tabs" data-service-tabs data-aos="fade-up"></div>

                    <article class="service-tab-panel" data-service-tab-panel data-aos="fade-up" aria-live="polite"></article>
                </div>
            </section>

            <!-- 6. Comparison Factors -->
            <section class="service-comparison section" id="comparison-factors" aria-labelledby="comparison-factors-title">
                <div class="container-wide">
                    <div class="service-comparison__layout">
                        <div class="service-comparison__content" data-aos="fade-right">
                            <p class="section-kicker">Comparison factors</p>
                            <h2 id="comparison-factors-title">What to Compare Before Choosing a Provider</h2>
                            <p>Before continuing with a provider, homeowners can compare practical details and provider-supplied terms.</p>

                            <div class="service-comparison__list">
                                ${[
                'Project scope and category fit.',
                'Bathroom layout, access path, and space considerations.',
                'Feature preferences and product model discussions.',
                'Quote details, timing, and scheduling terms.',
                'Warranty information and provider service terms.',
                'Licensing, insurance, permits, and credentials where required.'
            ].map((item) => `
                                    <span class="service-comparison__row">
                                        ${createIcon('check-circle-2')}
                                        <span>${escapeHtml(item)}</span>
                                    </span>
                                `).join('')}
                            </div>
                        </div>

                        <div class="service-comparison__photo image-frame" data-aos="fade-left">
                            <img
                                src="${escapeHtml(content.comparisonPhoto)}"
                                alt="${escapeHtml(service.title)} comparison factors"
                                loading="lazy"
                                width="820"
                                height="820"
                            >
                        </div>
                    </div>

                    <div class="service-icon-strip-block" data-aos="fade-up">
                        <div class="icon-strip" data-service-icon-strip aria-label="Other walk-in tub service pages"></div>
                    </div>
                </div>
            </section>

            <!-- 7. Service FAQ -->
            <section class="faq-section service-page-faq section" id="service-faq" aria-labelledby="service-faq-title">
                <div class="container">
                    <div class="faq-section__head" data-aos="fade-up">
                        <span class="service-page-faq__label">${escapeHtml(service.title)}</span>
                        <p class="section-kicker">Service questions</p>
                        <h2 id="service-faq-title">${escapeHtml(service.shortTitle)} Questions</h2>
                    </div>

                    <div class="faq-thought" data-aos="fade-up">
                        <p>
                            MaisonTub helps organize ${escapeHtml(service.shortTitle.toLowerCase())} requests for provider-matching consideration. Final availability, pricing, scheduling, warranties, licensing, insurance, and terms come from participating providers.
                        </p>
                    </div>

                    <div class="faq-accordion" data-accordion data-open-first>
                        ${content.faq.map(([question, answer]) => `
                            <article class="faq-item" data-accordion-item data-aos="fade-up">
                                <button class="faq-question" type="button" data-accordion-button>
                                    <span>${escapeHtml(question)}</span>
                                    ${createIcon('plus')}
                                </button>
                                <div class="faq-answer" data-accordion-panel>
                                    <div class="faq-answer__inner">
                                        <p>${escapeHtml(answer)}</p>
                                    </div>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>

            <!-- 8. Pre-Footer CTA Card -->
            <section class="prefooter-cta" aria-labelledby="service-prefooter-title">
                <div class="prefooter-cta__media">
                    <img
                        src="assets/images/hero-contact.jpg"
                        alt="Bathroom background for ${escapeHtml(service.title)} provider comparison"
                        loading="lazy"
                        width="1920"
                        height="900"
                    >
                </div>

                <div class="prefooter-cta__content" data-aos="fade-up">
                    <p class="section-kicker">Compare with clarity</p>
                    <h2 id="service-prefooter-title">
                        Ready to Compare ${escapeHtml(service.title)} Provider Options?
                    </h2>
                    <p>
                        Submit your project details and review available local options where participating providers are available.
                    </p>

                    <div class="btn-row">
                        <a class="btn btn--gold" href="contact.html">
                            <span>Submit Project Details</span>
                            ${createIcon('arrow-right')}
                        </a>

                        <a class="btn btn--outline-light" href="all-services.html">
                            <span>View All Services</span>
                            ${createIcon('arrow-up-right')}
                        </a>
                    </div>
                </div>
            </section>
        `;

        return {
            service,
            content
        };
    };

    const initServiceTabs = () => {
        const section = qs('[data-service-tabs-section]');
        if (!section) return;

        const tabsMount = qs('[data-service-tabs]', section);
        const panel = qs('[data-service-tab-panel]', section);

        if (!tabsMount || !panel) return;

        tabsMount.innerHTML = tabItems.map((tab, index) => `
            <button
                class="service-tab${index === 0 ? ' is-active' : ''}"
                type="button"
                data-service-tab="${escapeHtml(tab.id)}"
                aria-pressed="${index === 0 ? 'true' : 'false'}"
            >
                <span class="service-tab__icon">${createIcon(tab.icon)}</span>
                <span>${escapeHtml(tab.label)}</span>
            </button>
        `).join('');

        const renderPanel = (tab) => {
            panel.innerHTML = `
                <div class="service-tab-panel__grid">
                    <div>
                        <h3>${escapeHtml(tab.title)}</h3>
                        <p>${escapeHtml(tab.text)}</p>
                    </div>

                    <div class="service-tab-panel__note">
                        <strong>Important note</strong>
                        <span>${escapeHtml(tab.note)}</span>
                    </div>
                </div>
            `;
        };

        const setActive = (id) => {
            const tab = tabItems.find((item) => item.id === id) || tabItems[0];

            qsa('[data-service-tab]', tabsMount).forEach((button) => {
                const isActive = button.getAttribute('data-service-tab') === tab.id;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            renderPanel(tab);
            refreshAOS();
        };

        tabsMount.addEventListener('click', (event) => {
            const button = event.target.closest('[data-service-tab]');
            if (!button) return;

            setActive(button.getAttribute('data-service-tab'));
        });

        renderPanel(tabItems[0]);
        refreshIcons();
    };

    const initServiceFaqSchema = (service, content) => {
        if (!service || !content || qs('script[data-service-faq-schema]')) return;

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faq.map(([question, answer]) => ({
                '@type': 'Question',
                name: question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answer
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-service-faq-schema', '');
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    };

    const initServicePage = () => {
        const page = renderServicePage();

        if (!page) return;

        initServiceTabs();
        initAccordions();
        initServiceFaqSchema(page.service, page.content);

        refreshIcons();
        refreshAOS();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServicePage);
    } else {
        initServicePage();
    }
})();