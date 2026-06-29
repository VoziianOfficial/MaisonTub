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

    const selectionHelpCopy = [
        {
            id: 'installation',
            icon: 'bath',
            label: 'Installation',
            title: 'Choose installation when you are planning a new walk-in tub setup.',
            text:
                'This path fits homeowners who want to compare provider options for a new walk-in tub project, including layout, entry access, comfort features, timing, and quote details.'
        },
        {
            id: 'replacement',
            icon: 'refresh-cw',
            label: 'Replacement',
            title: 'Choose replacement when an existing tub no longer fits the need.',
            text:
                'This path may fit when an older bathtub or walk-in tub needs to be replaced with a more suitable option. Participating providers provide final replacement scope, pricing, scheduling, and terms.'
        },
        {
            id: 'conversion',
            icon: 'repeat-2',
            label: 'Tub Conversion',
            title: 'Choose tub conversion when the current bathtub area may become a walk-in tub space.',
            text:
                'This path is for homeowners who want to describe an existing bathtub area and compare available provider options for a possible tub-to-walk-in tub conversion.'
        },
        {
            id: 'compact',
            icon: 'maximize-2',
            label: 'Compact',
            title: 'Choose compact options when bathroom space is the main concern.',
            text:
                'This path helps organize details around small bathrooms, narrow access paths, compact model preferences, and provider availability for space-conscious walk-in tub planning.'
        },
        {
            id: 'hydrotherapy',
            icon: 'waves',
            label: 'Hydrotherapy',
            title: 'Choose hydrotherapy options when comfort features matter most.',
            text:
                'This path fits homeowners interested in comparing comfort-focused features that participating providers may discuss, including soaking preferences and hydrotherapy-style options.'
        },
        {
            id: 'safety',
            icon: 'shield-check',
            label: 'Safety Features',
            title: 'Choose safety features when access and support details are the priority.',
            text:
                'This path may fit requests focused on low-entry access, seating, grab bars, slip-resistant surfaces, door style, and other accessible bathing feature discussions.'
        }
    ];

    const initContactForm = () => {
        const form = qs('[data-contact-form]');
        if (!form) return;

        const submitButton = qs('[data-contact-submit]', form);
        const messageBox = qs('[data-form-message]', form);

        const showMessage = (type, message) => {
            if (!messageBox) return;

            messageBox.className = `form-message form-message--${type} is-visible`;
            messageBox.textContent = message;
            messageBox.setAttribute('role', type === 'success' ? 'status' : 'alert');
        };

        const clearMessage = () => {
            if (!messageBox) return;

            messageBox.className = 'form-message';
            messageBox.textContent = '';
            messageBox.removeAttribute('role');
        };

        const validateForm = () => {
            const requiredFields = qsa('[required]', form);
            let isValid = true;

            requiredFields.forEach((field) => {
                field.removeAttribute('aria-invalid');

                if (field.type === 'checkbox') {
                    if (!field.checked) {
                        field.setAttribute('aria-invalid', 'true');
                        isValid = false;
                    }

                    return;
                }

                if (!String(field.value || '').trim()) {
                    field.setAttribute('aria-invalid', 'true');
                    isValid = false;
                }

                if (field.type === 'email' && field.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailPattern.test(field.value.trim())) {
                        field.setAttribute('aria-invalid', 'true');
                        isValid = false;
                    }
                }
            });

            return isValid;
        };

        const setLoading = (loading) => {
            if (!submitButton) return;

            submitButton.disabled = loading;
            submitButton.setAttribute('aria-busy', String(loading));

            const label = qs('[data-submit-label]', submitButton);
            if (label) {
                label.textContent = loading ? 'Sending Request...' : config.form?.submitText || 'Submit Project Details';
            }
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            clearMessage();

            if (!validateForm()) {
                showMessage('error', config.form?.errorMessage || 'Please check the required fields and try again.');
                return;
            }

            const formData = new FormData(form);
            const endpoint = form.getAttribute('action') || config.form?.endpoint || 'contact.php';

            setLoading(true);

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                });

                const result = await response.json().catch(() => ({
                    success: false,
                    message: config.form?.errorMessage || 'Please check the required fields and try again.'
                }));

                if (!response.ok || !result.success) {
                    showMessage('error', result.message || config.form?.errorMessage || 'Please check the required fields and try again.');
                    return;
                }

                form.reset();

                const sourceInput = qs('input[name="sourcePage"]', form);
                if (sourceInput) {
                    sourceInput.value = window.MaisonTubUtils?.currentPage || window.location.pathname.split('/').pop() || 'contact.html';
                }

                showMessage('success', result.message || config.form?.successMessage || 'Thank you. Your request has been received.');
            } catch (error) {
                showMessage('error', config.form?.errorMessage || 'Please check the required fields and try again.');
            } finally {
                setLoading(false);
            }
        });

        qsa('input, textarea, select', form).forEach((field) => {
            field.addEventListener('input', () => {
                field.removeAttribute('aria-invalid');
            });

            field.addEventListener('change', () => {
                field.removeAttribute('aria-invalid');
            });
        });
    };

    const initSelectionHelp = () => {
        const section = qs('[data-selection-help]');
        if (!section) return;

        const buttonsMount = qs('[data-selection-help-items]', section);
        const textCard = qs('[data-selection-help-text]', section);

        if (!buttonsMount || !textCard) return;

        buttonsMount.innerHTML = selectionHelpCopy.map((item, index) => `
            <button
                class="selection-help__button${index === 0 ? ' is-active' : ''}"
                type="button"
                data-selection-help-button="${escapeHtml(item.id)}"
                aria-pressed="${index === 0 ? 'true' : 'false'}"
            >
                <span class="selection-help__button-icon">
                    ${createIcon(item.icon)}
                </span>
                <span>${escapeHtml(item.label)}</span>
            </button>
        `).join('');

        const renderText = (item) => {
            textCard.innerHTML = `
                <span class="selection-help__label">${escapeHtml(item.label)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
            `;
        };

        const setActive = (id) => {
            const item = selectionHelpCopy.find((entry) => entry.id === id) || selectionHelpCopy[0];

            qsa('[data-selection-help-button]', buttonsMount).forEach((button) => {
                const isActive = button.getAttribute('data-selection-help-button') === item.id;

                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            renderText(item);
            refreshAOS();
        };

        buttonsMount.addEventListener('click', (event) => {
            const button = event.target.closest('[data-selection-help-button]');
            if (!button) return;

            setActive(button.getAttribute('data-selection-help-button'));
        });

        renderText(selectionHelpCopy[0]);
        refreshIcons();
    };

    const initAfterSubmitList = () => {
        const mount = qs('[data-after-submit-list]');
        if (!mount) return;

        const items = [
            {
                icon: 'inbox',
                title: 'Request received',
                text:
                    'Your submitted details are received through the MaisonTub request form.'
            },
            {
                icon: 'route',
                title: 'Provider options may be reviewed',
                text:
                    'The request may be considered for participating provider matching where available.'
            },
            {
                icon: 'map-pin',
                title: 'Availability varies',
                text:
                    'Provider availability may vary by location, timing, project category, and provider participation.'
            },
            {
                icon: 'mouse-pointer-click',
                title: 'You choose whether to continue',
                text:
                    'Submitting a request does not create a service agreement with MaisonTub or any provider.'
            }
        ];

        mount.innerHTML = items.map((item) => `
            <span class="after-submit-item">
                <span class="after-submit-item__icon">${createIcon(item.icon)}</span>
                <span>
                    <strong>${escapeHtml(item.title)}</strong>
                    <span>${escapeHtml(item.text)}</span>
                </span>
            </span>
        `).join('');

        refreshIcons();
    };

    const initRoutingSteps = () => {
        const mount = qs('[data-routing-steps]');
        if (!mount) return;

        const steps = [
            {
                icon: 'send',
                title: 'Submit details',
                text:
                    'Share your project category, contact information, and walk-in tub planning notes.'
            },
            {
                icon: 'git-compare',
                title: 'Review available options',
                text:
                    'Your request may be routed to participating providers where coverage exists.'
            },
            {
                icon: 'file-check-2',
                title: 'Compare provider terms',
                text:
                    'Review final pricing, scheduling, warranties, licensing, insurance, and terms directly with providers.'
            }
        ];

        mount.innerHTML = steps.map((step) => `
            <article class="routing-step" data-aos="fade-up">
                <div class="routing-step__icon">
                    ${createIcon(step.icon)}
                </div>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
            </article>
        `).join('');

        refreshIcons();
        refreshAOS();
    };

    const initContactFaqSchema = () => {
        const faqs = config.faqs?.contact || [];
        if (!faqs.length || qs('script[data-contact-faq-schema]')) return;

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
        script.setAttribute('data-contact-faq-schema', '');
        script.textContent = JSON.stringify(schema);

        document.head.appendChild(script);
    };

    const initContact = () => {
        initAfterSubmitList();
        initRoutingSteps();
        initSelectionHelp();
        initContactForm();
        initContactFaqSchema();

        refreshIcons();
        refreshAOS();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContact);
    } else {
        initContact();
    }
})();