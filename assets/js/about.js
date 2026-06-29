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

    const journeySteps = [
        {
            number: 'Step 01',
            icon: 'file-pen-line',
            title: 'Submit project details',
            text:
                'Homeowners share the walk-in tub request type, bathroom layout notes, access preferences, timing, and contact details.'
        },
        {
            number: 'Step 02',
            icon: 'route',
            title: 'Request is organized',
            text:
                'MaisonTub helps structure the information so the request can be considered for participating provider matching where available.'
        },
        {
            number: 'Step 03',
            icon: 'git-compare',
            title: 'Review provider options',
            text:
                'Participating providers may respond with availability, quote details, scheduling information, product discussions, and service terms.'
        },
        {
            number: 'Step 04',
            icon: 'mouse-pointer-click',
            title: 'Choose whether to continue',
            text:
                'Submitting a request does not create a service agreement. Homeowners decide whether a provider option fits their needs.'
        }
    ];

    const helpCards = [
        {
            icon: 'refresh-cw',
            title: 'Replacement Projects',
            text:
                'For homeowners comparing options when an existing bathtub or older walk-in tub no longer fits access, comfort, or layout needs.'
        },
        {
            icon: 'shield-check',
            title: 'Safer Bathing Access',
            text:
                'For requests focused on easier entry, seating, grab bars, slip-resistant surfaces, and access-oriented feature discussions.'
        },
        {
            icon: 'maximize-2',
            title: 'Smaller Bathrooms',
            text:
                'For compact layouts where space, entry paths, model size, and bathroom dimensions may affect provider conversations.'
        },
        {
            icon: 'waves',
            title: 'Comfort Upgrades',
            text:
                'For homeowners interested in soaking preferences, hydrotherapy-style comfort features, controls, and model discussions.'
        }
    ];

    const clarityCards = [
        {
            title: 'Pricing and quotes',
            text:
                'Final pricing, quote structure, deposits, payment terms, and any included services are provided by participating providers.'
        },
        {
            title: 'Scheduling and availability',
            text:
                'Provider availability may vary by location, project category, provider coverage, timing, and the details submitted.'
        },
        {
            title: 'Warranties and product models',
            text:
                'Product model information, warranty terms, feature availability, and manufacturer-related details come from providers.'
        },
        {
            title: 'Licensing and insurance',
            text:
                'Homeowners are responsible for verifying provider licensing, insurance, permits, and credentials before moving forward.'
        }
    ];

    const trustPrinciples = [
        {
            icon: 'eye',
            title: 'Transparency',
            text:
                'MaisonTub clearly separates platform matching from final provider services, pricing, scheduling, warranties, and project terms.'
        },
        {
            icon: 'mouse-pointer-click',
            title: 'Homeowner Choice',
            text:
                'Homeowners can review available provider responses and decide whether they want to continue with any provider.'
        },
        {
            icon: 'lock-keyhole',
            title: 'Privacy-Aware Communication',
            text:
                'Request information is used to help connect homeowners with participating providers where available, not to claim direct service delivery.'
        }
    ];

    const initJourneyAccordion = () => {
        const mount = qs('[data-journey-accordion]');
        if (!mount) return;

        mount.innerHTML = journeySteps.map((step, index) => `
            <article class="journey-step${index === 0 ? ' is-active' : ''}" data-journey-step>
                <button class="journey-step__button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
                    <span class="journey-step__number">${escapeHtml(step.number)}</span>

                    <span class="journey-step__icon">
                        ${createIcon(step.icon)}
                    </span>

                    <h3>${escapeHtml(step.title)}</h3>
                </button>

                <div class="journey-step__content">
                    <span class="journey-step__line" aria-hidden="true"></span>
                    <p>${escapeHtml(step.text)}</p>
                </div>
            </article>
        `).join('');

        qsa('[data-journey-step]', mount).forEach((step) => {
            const button = qs('.journey-step__button', step);

            button?.addEventListener('click', () => {
                qsa('[data-journey-step]', mount).forEach((otherStep) => {
                    const isActive = otherStep === step;

                    otherStep.classList.toggle('is-active', isActive);
                    qs('.journey-step__button', otherStep)?.setAttribute('aria-expanded', String(isActive));
                });

                refreshAOS();
            });
        });

        refreshIcons();
    };

    const initWhoHelps = () => {
        const mount = qs('[data-who-helps-grid]');
        if (!mount) return;

        mount.innerHTML = helpCards.map((card) => `
            <article class="help-card" data-aos="fade-up">
                <div class="help-card__icon">
                    ${createIcon(card.icon)}
                </div>
                <h3>${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.text)}</p>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initClarityCards = () => {
        const mount = qs('[data-clarity-cards]');
        if (!mount) return;

        mount.innerHTML = clarityCards.map((card) => `
            <article class="clarity-card" data-aos="fade-up">
                <h3>${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.text)}</p>
            </article>
        `).join('');

        refreshAOS();
    };

    const initTrustPrinciples = () => {
        const mount = qs('[data-trust-principles]');
        if (!mount) return;

        mount.innerHTML = trustPrinciples.map((principle) => `
            <article class="trust-principle" data-aos="fade-up">
                <div class="trust-principle__icon">
                    ${createIcon(principle.icon)}
                </div>
                <h3>${escapeHtml(principle.title)}</h3>
                <p>${escapeHtml(principle.text)}</p>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initAboutFaqSchema = () => {
        const faqs = [
            {
                question: 'Is MaisonTub a walk-in tub installer?',
                answer:
                    'No. MaisonTub is an independent provider-matching platform and does not install, sell, repair, inspect, manufacture, or directly provide walk-in tub services.'
            },
            {
                question: 'Who provides final pricing and scheduling?',
                answer:
                    'Final pricing, scheduling, warranties, licensing, insurance, product models, and service terms are provided by participating providers.'
            },
            {
                question: 'Does MaisonTub verify provider licensing for homeowners?',
                answer:
                    'Homeowners are responsible for verifying provider licensing, insurance, credentials, permits, and service terms before continuing.'
            },
            {
                question: 'Does submitting a request create an agreement?',
                answer:
                    'No. Submitting a request does not create a service agreement. Homeowners choose whether to continue after reviewing available provider responses.'
            }
        ];

        if (qs('script[data-about-faq-schema]')) return;

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
        script.setAttribute('data-about-faq-schema', '');
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    };

    const initAbout = () => {
        initWhoHelps();
        initJourneyAccordion();
        initClarityCards();
        initTrustPrinciples();
        initAboutFaqSchema();

        refreshIcons();
        refreshAOS();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAbout);
    } else {
        initAbout();
    }
})();