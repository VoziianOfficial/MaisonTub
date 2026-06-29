'use strict';

window.MaisonTubConfig = {
    brand: {
        name: 'MaisonTub',
        tagline: 'Independent Walk-In Tub Provider Matching',
        logo: 'assets/images/logo.svg',
        logoAlt: 'MaisonTub logo',
        shortDescription:
            'MaisonTub helps homeowners submit walk-in tub project details and compare available local provider options.'
    },

    company: {
        name: 'MaisonTub',
        legalName: 'MaisonTub Provider Matching Platform',
        companyId: 'MT-WIT-2026',
        address: 'USA Service Area',
        serviceArea: 'Independent provider matching across selected service areas',
        supportHours: 'Mon–Fri, 8:00 AM–6:00 PM'
    },

    contact: {
        phoneRaw: '+18885550186',
        phoneDisplay: '(888) 555-0186',
        phoneButtonText: 'Start Request',
        email: 'hello@maisontub.com',
        mailSubject: 'MaisonTub Walk-In Tub Request'
    },

    urls: {
        home: 'index.html',
        about: 'about.html',
        services: 'all-services.html',
        contact: 'contact.html',
        privacy: 'privacy-policy.html',
        terms: 'terms-of-service.html',
        cookies: 'cookie-policy.html'
    },

    form: {
        endpoint: 'contact.php',
        recipientEmail: 'hello@maisontub.com',
        successMessage: 'Thank you. Your request has been received.',
        errorMessage: 'Please check the required fields and try again.',
        privacyText:
            'By submitting this form, you agree that your request details may be used to help connect you with participating providers where available.',
        submitText: 'Submit Project Details'
    },

    legal: {
        disclaimer:
            'Disclaimer: This site is a free service to assist homeowners in connecting with local service providers. All contractors/providers are independent and this site does not warrant or guarantee any work performed. It is the responsibility of the homeowner to verify that the hired contractor furnishes the necessary license and insurance required for the work being performed. All persons depicted in a photo or video are actors or models and not contractors listed on this site.',
        shortDisclaimer:
            'MaisonTub is an independent provider-matching platform. Final pricing, scheduling, warranties, licensing, insurance, product models, and service terms are provided by participating providers.'
    },

    footer: {
        description:
            'MaisonTub helps homeowners organize walk-in tub project details and compare available local provider options without claiming to install, sell, inspect, repair, or directly provide walk-in tub services.',
        copyright:
            '© 2026 MaisonTub. All rights reserved.',
        note:
            'Availability may vary by location. Submitting a request does not create a service agreement.'
    },

    navigation: [
        {
            label: 'Home',
            url: 'index.html'
        },
        {
            label: 'About',
            url: 'about.html'
        },
        {
            label: 'Services',
            url: 'all-services.html'
        },
        {
            label: 'Contact',
            url: 'contact.html'
        }
    ],

    services: [
        {
            id: 'installation',
            title: 'Walk-In Tub Installation',
            shortTitle: 'Installation',
            url: 'walk-in-tub-installation.html',
            icon: 'bath',
            image: 'assets/images/service-3.jpg',
            heroImage: 'assets/images/hero-installation.jpg',
            description:
                'Compare provider options for homeowners planning a new walk-in tub setup with attention to layout, access, comfort, and project scope.',
            badge: 'Most requested',
            cta: 'View Installation Options',
            goodFor: [
                'First-time walk-in tub projects',
                'Bathroom safety upgrades',
                'Comparing local provider options'
            ],
            needPath: [
                'Choose need',
                'Compare providers',
                'Plan installation'
            ]
        },
        {
            id: 'replacement',
            title: 'Walk-In Tub Replacement',
            shortTitle: 'Replacement',
            url: 'walk-in-tub-replacement.html',
            icon: 'refresh-cw',
            image: 'assets/images/service-2.jpg',
            heroImage: 'assets/images/hero-replacement.jpg',
            description:
                'Review provider options for replacing an existing tub or older walk-in tub with a more suitable comfort, access, or layout solution.',
            badge: 'Upgrade focused',
            cta: 'View Replacement Options',
            goodFor: [
                'Older tub replacement planning',
                'Changing comfort or access needs',
                'Reviewing provider terms'
            ],
            needPath: [
                'Review current setup',
                'Compare options',
                'Choose next step'
            ]
        },
        {
            id: 'conversion',
            title: 'Tub-to-Walk-In Tub Conversion',
            shortTitle: 'Tub Conversion',
            url: 'tub-to-walk-in-tub-conversion.html',
            icon: 'repeat-2',
            image: 'assets/images/service-3.jpg',
            heroImage: 'assets/images/hero-conversion.jpg',
            description:
                'Explore provider-matching options for homeowners considering whether a traditional bathtub area may support a walk-in tub conversion.',
            badge: 'Layout planning',
            cta: 'Explore Conversion Options',
            goodFor: [
                'Existing bathtub spaces',
                'Access-focused bathroom updates',
                'Provider quote comparison'
            ],
            needPath: [
                'Share layout',
                'Review conversion fit',
                'Compare responses'
            ]
        },
        {
            id: 'compact',
            title: 'Compact Walk-In Tub Options',
            shortTitle: 'Compact Options',
            url: 'compact-walk-in-tub-options.html',
            icon: 'maximize-2',
            image: 'assets/images/service-4.jpg',
            heroImage: 'assets/images/hero-compact.jpg',
            description:
                'Compare participating provider options for smaller bathrooms, tighter layouts, and walk-in tub models that may fit compact spaces.',
            badge: 'Space saving',
            cta: 'View Compact Options',
            goodFor: [
                'Small bathroom layouts',
                'Narrow access areas',
                'Space-conscious planning'
            ],
            needPath: [
                'Check space',
                'Match features',
                'Compare provider options'
            ]
        },
        {
            id: 'hydrotherapy',
            title: 'Hydrotherapy Walk-In Tub Options',
            shortTitle: 'Hydrotherapy Options',
            url: 'hydrotherapy-walk-in-tub-options.html',
            icon: 'waves',
            image: 'assets/images/service-5.jpg',
            heroImage: 'assets/images/hero-hydrotherapy.jpg',
            description:
                'Review local provider options that may include hydrotherapy-style comfort features, soaking preferences, and model discussions.',
            badge: 'Comfort focused',
            cta: 'Compare Hydrotherapy Options',
            goodFor: [
                'Comfort soaking preferences',
                'Feature comparison',
                'Provider model discussions'
            ],
            needPath: [
                'Comfort goal',
                'Feature match',
                'Provider quotes'
            ]
        },
        {
            id: 'safety',
            title: 'Accessible Bath Safety Features',
            shortTitle: 'Safety Features',
            url: 'accessible-bath-safety-features.html',
            icon: 'shield-check',
            image: 'assets/images/service-6.jpg',
            heroImage: 'assets/images/hero-safety.jpg',
            description:
                'Compare provider options that may discuss access-oriented features such as low thresholds, grab bars, seating, doors, and slip-resistant surfaces.',
            badge: 'Safety planning',
            cta: 'Explore Safety Features',
            goodFor: [
                'Safer entry preferences',
                'Feature planning',
                'Accessible bathing updates'
            ],
            needPath: [
                'Select concern',
                'Review feature options',
                'Compare providers'
            ]
        }
    ],

    heroCards: {
        home: [
            {
                icon: 'list-checks',
                title: 'Submit Details',
                text: 'Share your walk-in tub project needs through a simple request path.'
            },
            {
                icon: 'git-compare',
                title: 'Compare Options',
                text: 'Review available provider responses where participating providers are available.'
            },
            {
                icon: 'mouse-pointer-click',
                title: 'You Choose',
                text: 'Decide whether to continue with a provider after reviewing terms.'
            }
        ],
        about: [
            {
                icon: 'compass',
                title: 'Independent Platform',
                text: 'MaisonTub helps organize requests without acting as the final service provider.'
            },
            {
                icon: 'file-search',
                title: 'Clear Request Flow',
                text: 'Project details help participating providers understand the type of request.'
            },
            {
                icon: 'check-circle-2',
                title: 'Homeowner Choice',
                text: 'Homeowners review options and choose whether to continue.'
            }
        ],
        services: [
            {
                icon: 'layers',
                title: 'Six Categories',
                text: 'Browse walk-in tub request paths by service type and project goal.'
            },
            {
                icon: 'sliders-horizontal',
                title: 'Feature Matching',
                text: 'Compare layout, comfort, access, and scope factors.'
            },
            {
                icon: 'arrow-right-left',
                title: 'Provider Responses',
                text: 'Participating providers provide final availability and terms.'
            }
        ],
        contact: [
            {
                icon: 'send',
                title: 'Start Request',
                text: 'Submit basic project details through the contact form.'
            },
            {
                icon: 'map-pin',
                title: 'Availability Varies',
                text: 'Provider participation and service availability depend on location.'
            },
            {
                icon: 'file-text',
                title: 'No Agreement Created',
                text: 'Submitting a request does not create a service agreement.'
            }
        ]
    },

    faqs: {
        home: [
            {
                question: 'Does MaisonTub install walk-in tubs?',
                answer:
                    'No. MaisonTub is an independent provider-matching platform. Participating providers, not MaisonTub, discuss final pricing, scheduling, warranties, licensing, insurance, product models, and service terms.'
            },
            {
                question: 'What happens after I submit a request?',
                answer:
                    'Your project details may be routed to participating providers where available. You can review provider responses and choose whether to continue.'
            },
            {
                question: 'Can I compare different walk-in tub needs?',
                answer:
                    'Yes. MaisonTub organizes request paths for installation, replacement, tub conversion, compact options, hydrotherapy options, and accessible safety features.'
            },
            {
                question: 'Is availability the same everywhere?',
                answer:
                    'No. Provider availability may vary by location, project type, timing, and participating provider coverage.'
            }
        ],
        contact: [
            {
                question: 'Does submitting the form create a service agreement?',
                answer:
                    'No. Submitting a request only shares project details for provider-matching purposes. Any service agreement would be between the homeowner and a participating provider.'
            },
            {
                question: 'Who provides final quotes?',
                answer:
                    'Final quotes, warranties, scheduling, licensing, insurance, and service terms are provided by participating providers.'
            },
            {
                question: 'Can I choose not to continue?',
                answer:
                    'Yes. Homeowners choose whether to continue after reviewing available provider responses.'
            }
        ]
    },

    comparisonPoints: [
        'Bathroom layout',
        'Tub size',
        'Entry style',
        'Comfort features',
        'Provider availability',
        'Quote details',
        'Scheduling terms',
        'Warranty/provider terms'
    ],

    safeCounters: [
        {
            value: 6,
            suffix: '',
            label: 'Service Categories'
        },
        {
            value: 3,
            suffix: '',
            label: 'Request Steps'
        },
        {
            value: 10,
            suffix: '',
            label: 'Clarity Points'
        },
        {
            value: 12,
            suffix: '',
            label: 'Comparison Factors'
        }
    ],

    cookie: {
        storageKey: 'maisontub_cookie_consent',
        message:
            'MaisonTub uses essential cookies and localStorage to remember your cookie choice and improve basic site functionality.',
        acceptText: 'Accept',
        declineText: 'Decline'
    }
};