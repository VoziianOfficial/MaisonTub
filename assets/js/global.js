'use strict';

(function () {
    const config = window.MaisonTubConfig || {};
    const doc = document;
    const root = doc.documentElement;
    const body = doc.body;
    const FALLBACK_ICON = 'circle-dot';
    const ICON_NAME_ALIASES = {
        'hand-pointer': 'mouse-pointer-click'
    };
    const SUPPORTED_ICON_NAMES = new Set([
        'arrow-down',
        'arrow-left',
        'arrow-right',
        'arrow-right-left',
        'arrow-up',
        'arrow-up-right',
        'badge-alert',
        'badge-check',
        'bath',
        'box-select',
        'calendar-clock',
        'check-circle-2',
        'chevron-down',
        'circle-dot',
        'clipboard-list',
        'clock',
        'compass',
        'door-open',
        'file-check-2',
        'file-search',
        'file-text',
        'git-compare',
        'inbox',
        'info',
        'layout-panel-left',
        'layers',
        'list-checks',
        'mail',
        'map-pin',
        'maximize-2',
        'mouse-pointer-click',
        'phone',
        'plus',
        'refresh-cw',
        'repeat-2',
        'route',
        'ruler',
        'send',
        'shield-check',
        'sliders-horizontal',
        'waves',
        'x-circle'
    ]);

    const qs = (selector, scope = doc) => scope.querySelector(selector);
    const qsa = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const getPath = () => {
        const path = window.location.pathname.split('/').pop();
        return path || 'index.html';
    };

    const currentPage = getPath();

    const getValue = (path, fallback = '') => {
        if (!path || typeof path !== 'string') return fallback;

        return path.split('.').reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, config) ?? fallback;
    };

    const escapeHtml = (value) => {
        return String(value ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    };

    const toLucideModuleKey = (iconName) => {
        return String(iconName || '')
            .split('-')
            .map((part) => part ? part.charAt(0).toUpperCase() + part.slice(1) : '')
            .join('');
    };

    const isSupportedIconName = (iconName) => {
        if (!iconName) return false;

        const normalized = String(iconName).trim();
        if (!normalized) return false;

        if (SUPPORTED_ICON_NAMES.has(normalized)) {
            return true;
        }

        if (window.lucide) {
            const moduleKey = toLucideModuleKey(normalized);
            return typeof window.lucide[moduleKey] !== 'undefined';
        }

        return false;
    };

    const normalizeIconName = (iconName) => {
        const requestedIcon = String(iconName || '').trim();
        const aliasedIcon = ICON_NAME_ALIASES[requestedIcon] || requestedIcon;

        if (isSupportedIconName(aliasedIcon)) {
            return aliasedIcon;
        }

        return FALLBACK_ICON;
    };

    const createIcon = (iconName, extraClass = '') => {
        const safeIcon = escapeHtml(normalizeIconName(iconName || FALLBACK_ICON));
        const safeClass = extraClass ? ` ${escapeHtml(extraClass)}` : '';

        return `<i class="icon${safeClass}" data-lucide="${safeIcon}" aria-hidden="true"></i>`;
    };

    const normalizeUrl = (url) => {
        if (!url) return '';
        return String(url).split('#')[0];
    };

    const isActiveUrl = (url) => {
        const normalized = normalizeUrl(url);
        return normalized === currentPage;
    };

    const refreshIcons = () => {
        qsa('[data-lucide]').forEach((iconElement) => {
            const normalizedIcon = normalizeIconName(iconElement.getAttribute('data-lucide'));
            if (normalizedIcon !== iconElement.getAttribute('data-lucide')) {
                iconElement.setAttribute('data-lucide', normalizedIcon);
            }
        });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons({
                attrs: {
                    'stroke-width': 1.8
                }
            });
        }
    };

    const refreshAOS = () => {
        if (!window.AOS || isReducedMotion) return;

        window.requestAnimationFrame(() => {
            if (typeof window.AOS.refreshHard === 'function') {
                window.AOS.refreshHard();
            } else if (typeof window.AOS.refresh === 'function') {
                window.AOS.refresh();
            }
        });
    };

    const initAOS = () => {
        if (!window.AOS || isReducedMotion) return;

        window.AOS.init({
            once: true,
            duration: 760,
            easing: 'ease-out-cubic',
            offset: 74,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom',
            disable: () => window.innerWidth < 360
        });
    };

    const injectConfigText = () => {
        qsa('[data-config]').forEach((element) => {
            const value = getValue(element.getAttribute('data-config'));

            if (value !== undefined && value !== null) {
                element.textContent = value;
            }
        });
    };

    const injectConfigAttributes = () => {
        qsa('[data-config-attr]').forEach((element) => {
            const raw = element.getAttribute('data-config-attr');

            if (!raw) return;

            raw.split(';').forEach((pair) => {
                const [attr, path] = pair.split(':').map((item) => item.trim());

                if (!attr || !path) return;

                const value = getValue(path);

                if (value !== undefined && value !== null && value !== '') {
                    element.setAttribute(attr, value);
                }
            });
        });
    };

    const BUSINESS_DEFAULTS = {
        brandName: 'MaisonTub',
        legalName: 'MaisonTub Provider Matching Platform',
        phoneRaw: '+18885550186',
        phoneDisplay: '(888) 555-0186',
        email: 'hello@maisontub.com',
        address: 'USA Service Area',
        companyId: 'MT-WIT-2026',
        serviceArea: 'Independent provider matching across selected service areas',
        supportHours: 'Mon–Fri, 8:00 AM–6:00 PM',
        logoAlt: 'MaisonTub logo'
    };

    const normalizePhoneHref = (value) => {
        return String(value || '').replace(/[^\d+]/g, '');
    };

    const replaceAllSafe = (value, replacements) => {
        let output = String(value ?? '');

        replacements.forEach(([from, to]) => {
            if (!from || from === to) return;

            output = output.split(from).join(to);
        });

        return output;
    };

    const getBusinessReplacements = () => {
        return [
            [BUSINESS_DEFAULTS.brandName, getValue('brand.name')],
            [BUSINESS_DEFAULTS.legalName, getValue('company.legalName')],
            [BUSINESS_DEFAULTS.phoneRaw, getValue('contact.phoneRaw')],
            [BUSINESS_DEFAULTS.phoneDisplay, getValue('contact.phoneDisplay')],
            [BUSINESS_DEFAULTS.email, getValue('contact.email')],
            [BUSINESS_DEFAULTS.address, getValue('company.address')],
            [BUSINESS_DEFAULTS.companyId, getValue('company.companyId')],
            [BUSINESS_DEFAULTS.serviceArea, getValue('company.serviceArea')],
            [BUSINESS_DEFAULTS.supportHours, getValue('company.supportHours')],
            [BUSINESS_DEFAULTS.logoAlt, getValue('brand.logoAlt')]
        ].filter(([from, to]) => from && to && from !== to);
    };

    const injectBusinessTextEverywhere = (scope = doc.body) => {
        if (!scope) return;

        const replacements = getBusinessReplacements();
        if (!replacements.length) return;

        const ignoredTags = new Set([
            'SCRIPT',
            'STYLE',
            'NOSCRIPT',
            'TEXTAREA',
            'INPUT',
            'SELECT',
            'OPTION',
            'SVG',
            'PATH',
            'CIRCLE',
            'RECT',
            'LINE',
            'POLYGON',
            'POLYLINE'
        ]);

        const walker = doc.createTreeWalker(
            scope,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;

                    if (!parent || ignoredTags.has(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    if (!node.nodeValue || !node.nodeValue.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach((node) => {
            node.nodeValue = replaceAllSafe(node.nodeValue, replacements);
        });
    };

    const injectBusinessAttributesEverywhere = (scope = doc) => {
        const replacements = getBusinessReplacements();

        qsa('[aria-label]', scope).forEach((element) => {
            element.setAttribute(
                'aria-label',
                replaceAllSafe(element.getAttribute('aria-label'), replacements)
            );
        });

        qsa('[alt]', scope).forEach((element) => {
            element.setAttribute(
                'alt',
                replaceAllSafe(element.getAttribute('alt'), replacements)
            );
        });

        qsa('[title]', scope).forEach((element) => {
            element.setAttribute(
                'title',
                replaceAllSafe(element.getAttribute('title'), replacements)
            );
        });

        qsa('meta[name="description"]', scope).forEach((meta) => {
            meta.setAttribute(
                'content',
                replaceAllSafe(meta.getAttribute('content'), replacements)
            );
        });

        if (doc.title) {
            doc.title = replaceAllSafe(doc.title, replacements);
        }
    };

    const injectBrandAssets = (scope = doc) => {
        const logo = getValue('brand.logo');
        const logoAlt = getValue('brand.logoAlt', `${getValue('brand.name')} logo`);

        if (!logo) return;

        qsa('.header__logo, .footer__brand img, .mobile-menu__brand img, img[alt*="logo" i]', scope).forEach((img) => {
            img.setAttribute('src', logo);
            img.setAttribute('alt', logoAlt);
        });

        qsa('a[aria-label*="home" i]', scope).forEach((link) => {
            link.setAttribute('aria-label', `${getValue('brand.name')} home`);
        });
    };

    const injectContactLinks = (scope = doc) => {
        const phoneRaw = getValue('contact.phoneRaw');
        const phoneDisplay = getValue('contact.phoneDisplay');
        const email = getValue('contact.email');
        const mailSubject = getValue('contact.mailSubject');
        const address = getValue('company.address');
        const brandName = getValue('brand.name');

        const cleanPhone = normalizePhoneHref(phoneRaw);
        const subject = mailSubject ? `?subject=${encodeURIComponent(mailSubject)}` : '';

        qsa('[data-phone-link], a[href^="tel:"]', scope).forEach((element) => {
            element.setAttribute('href', `tel:${cleanPhone}`);
            element.setAttribute('aria-label', `Call ${phoneDisplay || brandName}`);

            if (!element.hasAttribute('data-keep-content')) {
                element.textContent = phoneDisplay;
            }
        });

        qsa('[data-email-link], a[href^="mailto:"]', scope).forEach((element) => {
            element.setAttribute('href', `mailto:${email}${subject}`);
            element.setAttribute('aria-label', `Email ${email}`);

            if (!element.hasAttribute('data-keep-content')) {
                element.textContent = email;
            }
        });

        qsa('[data-address-text]', scope).forEach((element) => {
            element.textContent = address;
        });
    };

    const injectFormConfig = (scope = doc) => {
        const endpoint = getValue('form.endpoint');
        const submitText = getValue('form.submitText');
        const recipientEmail = getValue('form.recipientEmail') || getValue('contact.email');

        qsa('form[data-contact-form]', scope).forEach((form) => {
            if (endpoint) {
                form.setAttribute('action', endpoint);
            }

            let recipientInput = qs('input[name="recipientEmail"]', form);

            if (!recipientInput) {
                recipientInput = doc.createElement('input');
                recipientInput.type = 'hidden';
                recipientInput.name = 'recipientEmail';
                form.appendChild(recipientInput);
            }

            recipientInput.value = recipientEmail;
        });

        qsa('[data-submit-label]', scope).forEach((element) => {
            if (submitText) {
                element.textContent = submitText;
            }
        });
    };

    const injectBusinessConfigEverywhere = (scope = doc) => {
        injectConfigText();
        injectConfigAttributes();
        injectContactLinks(scope);
        injectBrandAssets(scope);
        injectBusinessTextEverywhere(scope === doc ? doc.body : scope);
        injectBusinessAttributesEverywhere(scope);
        injectFormConfig(scope);
    };

    const injectSourcePageFields = () => {
        qsa('input[name="sourcePage"]').forEach((input) => {
            input.value = currentPage;
        });
    };

    const renderServiceOptions = () => {
        const services = config.services || [];

        qsa('[data-service-options]').forEach((select) => {
            const currentValue = select.getAttribute('data-current-service') || '';

            select.innerHTML = `
                <option value="">Select a service category</option>
                ${services.map((service) => {
                const selected = currentValue === service.id ? ' selected' : '';

                return `
                        <option value="${escapeHtml(service.title)}"${selected}>
                            ${escapeHtml(service.title)}
                        </option>
                    `;
            }).join('')}
            `;
        });
    };

    const renderHeaderServiceDropdown = () => {
        const services = config.services || [];
        const mounts = qsa('[data-services-dropdown-list]');

        mounts.forEach((mount) => {
            mount.innerHTML = services.map((service) => {
                const activeClass = isActiveUrl(service.url) ? ' is-active' : '';

                return `
                    <a class="dropdown-service-link${activeClass}" href="${escapeHtml(service.url)}">
                        <span>${escapeHtml(service.shortTitle)}</span>
                        ${createIcon('arrow-up-right')}
                    </a>
                `;
            }).join('');

            refreshIcons();
        });
    };

    const renderFooterServices = () => {
        const services = config.services || [];

        qsa('[data-footer-services]').forEach((mount) => {
            mount.innerHTML = services.map((service) => `
                <a href="${escapeHtml(service.url)}">${escapeHtml(service.shortTitle)}</a>
            `).join('');
        });
    };

    const renderFooterNav = () => {
        const navigation = config.navigation || [];

        qsa('[data-footer-nav]').forEach((mount) => {
            mount.innerHTML = navigation.map((item) => `
                <a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>
            `).join('');
        });
    };

    const renderLegalLinks = () => {
        qsa('[data-footer-legal]').forEach((mount) => {
            mount.innerHTML = `
                <a href="${escapeHtml(getValue('urls.privacy'))}">Privacy Policy</a>
                <a href="${escapeHtml(getValue('urls.terms'))}">Terms of Service</a>
                <a href="${escapeHtml(getValue('urls.cookies'))}">Cookie Policy</a>
            `;
        });
    };

    const renderMobileMenu = () => {
        const mount = qs('[data-mobile-menu]');
        if (!mount) return;

        const navigation = config.navigation || [];
        const services = config.services || [];

        mount.className = 'mobile-menu';
        mount.id = 'mobile-menu';
        mount.setAttribute('aria-hidden', 'true');

        mount.innerHTML = `
            <div class="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                <div class="mobile-menu__brand">
                    <img src="${escapeHtml(getValue('brand.logo'))}" alt="${escapeHtml(getValue('brand.logoAlt'))}">
                    <p class="mobile-menu__tagline">${escapeHtml(getValue('brand.tagline'))}</p>
                </div>

                <nav class="mobile-menu__grid" aria-label="Mobile main navigation">
                    ${navigation.map((item) => {
            const activeClass = isActiveUrl(item.url) ? ' is-active' : '';

            return `
                            <a class="mobile-menu__link${activeClass}" href="${escapeHtml(item.url)}">
                                <span>${escapeHtml(item.label)}</span>
                                ${createIcon('arrow-up-right')}
                            </a>
                        `;
        }).join('')}
                </nav>

                <div>
                    <p class="mobile-menu__section-title">Walk-In Tub Services</p>
                    <div class="mobile-menu__services">
                        ${services.map((service) => `
                            <a class="mobile-menu__service${isActiveUrl(service.url) ? ' is-active' : ''}" href="${escapeHtml(service.url)}">
                                <span>${escapeHtml(service.shortTitle)}</span>
                                ${createIcon(service.icon)}
                            </a>
                        `).join('')}
                    </div>
                </div>

                <div class="mobile-menu__contact">
                    <a href="tel:${escapeHtml(getValue('contact.phoneRaw'))}">
                        ${createIcon('phone')}
                        <span>${escapeHtml(getValue('contact.phoneDisplay'))}</span>
                    </a>
                    <a href="mailto:${escapeHtml(getValue('contact.email'))}?subject=${encodeURIComponent(getValue('contact.mailSubject'))}">
                        ${createIcon('mail')}
                        <span>${escapeHtml(getValue('contact.email'))}</span>
                    </a>
                    <a href="${escapeHtml(getValue('urls.contact'))}">
                        ${createIcon('send')}
                        <span>${escapeHtml(getValue('contact.phoneButtonText'))}</span>
                    </a>
                </div>
            </div>
        `;

        refreshIcons();
    };

    const setActiveNav = () => {
        qsa('a[href]').forEach((link) => {
            const href = normalizeUrl(link.getAttribute('href'));

            if (href === currentPage) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    const initStickyHeader = () => {
        const header = qs('[data-header]');
        if (!header) return;

        const updateHeader = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };

        updateHeader();

        window.addEventListener('scroll', updateHeader, {
            passive: true
        });
    };

    const initDesktopDropdown = () => {
        const dropdown = qs('[data-services-dropdown]');
        if (!dropdown) return;

        const trigger = qs('[data-services-trigger]', dropdown);
        const menu = qs('[data-services-dropdown-list]', dropdown);

        if (!trigger || !menu) return;

        let closeTimer = null;

        const openDropdown = () => {
            window.clearTimeout(closeTimer);
            dropdown.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        const closeDropdown = () => {
            closeTimer = window.setTimeout(() => {
                dropdown.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }, 180);
        };

        trigger.addEventListener('mouseenter', openDropdown);
        menu.addEventListener('mouseenter', openDropdown);
        dropdown.addEventListener('mouseleave', closeDropdown);

        trigger.addEventListener('focus', openDropdown);
        dropdown.addEventListener('focusout', (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                closeDropdown();
            }
        });

        trigger.addEventListener('click', (event) => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            if (!isExpanded) {
                event.preventDefault();
                openDropdown();
            }
        });

        doc.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                dropdown.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    };

    const initMobileMenu = () => {
        const toggle = qs('[data-menu-toggle]');
        const menu = qs('[data-mobile-menu]');

        if (!toggle || !menu) return;

        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        let lastFocused = null;

        const openMenu = () => {
            lastFocused = doc.activeElement;

            body.classList.add('menu-open');
            menu.classList.add('is-open');
            menu.setAttribute('aria-hidden', 'false');
            toggle.setAttribute('aria-expanded', 'true');

            const firstFocusable = qs(focusableSelector, menu);
            if (firstFocusable) {
                window.setTimeout(() => firstFocusable.focus(), 60);
            }
        };

        const closeMenu = () => {
            body.classList.remove('menu-open');
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            toggle.setAttribute('aria-expanded', 'false');

            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus();
            }
        };

        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menu.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');

            if (link) {
                closeMenu();
            }
        });

        doc.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }

            if (event.key !== 'Tab' || !menu.classList.contains('is-open')) return;

            const focusable = qsa(focusableSelector, menu);
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && doc.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && doc.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });
    };

    const initAccordions = () => {
        qsa('[data-accordion]').forEach((accordion) => {
            const items = qsa('[data-accordion-item]', accordion);

            items.forEach((item, index) => {
                const button = qs('[data-accordion-button]', item);
                const panel = qs('[data-accordion-panel]', item);

                if (!button || !panel) return;

                const panelId = panel.id || `accordion-panel-${Math.random().toString(36).slice(2)}`;
                const buttonId = button.id || `accordion-button-${Math.random().toString(36).slice(2)}`;

                panel.id = panelId;
                button.id = buttonId;
                button.setAttribute('aria-controls', panelId);
                panel.setAttribute('aria-labelledby', buttonId);

                const shouldOpen = item.classList.contains('is-open') || index === 0 && accordion.hasAttribute('data-open-first');

                const setState = (open) => {
                    item.classList.toggle('is-open', open);
                    button.setAttribute('aria-expanded', String(open));

                    if (open) {
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    } else {
                        panel.style.maxHeight = '0px';
                    }
                };

                setState(shouldOpen);

                button.addEventListener('click', () => {
                    const allowMultiple = accordion.hasAttribute('data-allow-multiple');
                    const isOpen = item.classList.contains('is-open');

                    if (!allowMultiple) {
                        items.forEach((otherItem) => {
                            if (otherItem === item) return;

                            const otherButton = qs('[data-accordion-button]', otherItem);
                            const otherPanel = qs('[data-accordion-panel]', otherItem);

                            if (!otherButton || !otherPanel) return;

                            otherItem.classList.remove('is-open');
                            otherButton.setAttribute('aria-expanded', 'false');
                            otherPanel.style.maxHeight = '0px';
                        });
                    }

                    setState(!isOpen);
                    refreshAOS();
                });

                window.addEventListener('resize', () => {
                    if (item.classList.contains('is-open')) {
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    }
                });
            });
        });
    };

    const renderCookieBanner = () => {
        const storageKey = getValue('cookie.storageKey', 'maisontub_cookie_consent');

        if (window.localStorage.getItem(storageKey)) return;

        const existing = qs('[data-cookie-banner]');

        const banner = existing || doc.createElement('aside');
        banner.className = 'cookie-banner';
        banner.setAttribute('data-cookie-banner', '');
        banner.setAttribute('aria-label', 'Cookie consent');

        banner.innerHTML = `
            <p class="cookie-banner__text">${escapeHtml(getValue('cookie.message'))}</p>

            <div class="cookie-banner__links">
                <a href="${escapeHtml(getValue('urls.privacy'))}">Privacy Policy</a>
                <a href="${escapeHtml(getValue('urls.cookies'))}">Cookie Policy</a>
                <a href="${escapeHtml(getValue('urls.terms'))}">Terms</a>
            </div>

            <div class="cookie-banner__actions">
                <button class="btn btn--gold" type="button" data-cookie-accept>
                    ${escapeHtml(getValue('cookie.acceptText'))}
                </button>
                <button class="btn btn--outline-light" type="button" data-cookie-decline>
                    ${escapeHtml(getValue('cookie.declineText'))}
                </button>
            </div>
        `;

        if (!existing) {
            body.appendChild(banner);
        }

        window.requestAnimationFrame(() => {
            banner.classList.add('is-visible');
        });

        const saveChoice = (choice) => {
            window.localStorage.setItem(storageKey, choice);
            banner.classList.remove('is-visible');

            window.setTimeout(() => {
                banner.remove();
            }, 320);
        };

        qs('[data-cookie-accept]', banner)?.addEventListener('click', () => saveChoice('accepted'));
        qs('[data-cookie-decline]', banner)?.addEventListener('click', () => saveChoice('declined'));

        refreshIcons();
    };

    const renderServiceIconStrip = () => {
        const services = config.services || [];

        qsa('[data-service-icon-strip]').forEach((mount) => {
            mount.innerHTML = services.map((service) => `
                <a href="${escapeHtml(service.url)}" aria-label="${escapeHtml(service.title)}">
                    ${createIcon(service.icon)}
                </a>
            `).join('');

            refreshIcons();
        });
    };

    const renderCounters = () => {
        const counters = config.safeCounters || [];

        qsa('[data-counter-grid]').forEach((mount) => {
            mount.innerHTML = counters.map((counter) => `
                <article class="counter-card">
                    <strong>
                        <span data-counter-value="${Number(counter.value) || 0}">00</span>${escapeHtml(counter.suffix || '')}
                    </strong>
                    <span>${escapeHtml(counter.label)}</span>
                </article>
            `).join('');
        });
    };

    const initCounterAnimation = () => {
        const counters = qsa('[data-counter-value]');
        if (!counters.length) return;

        const setValue = (element, value) => {
            element.textContent = String(value).padStart(2, '0');
        };

        const animateCounter = (element) => {
            const target = Number(element.getAttribute('data-counter-value')) || 0;

            if (isReducedMotion) {
                setValue(element, target);
                return;
            }

            const duration = 900;
            const startTime = performance.now();

            const tick = (time) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(target * eased);

                setValue(element, value);

                if (progress < 1) {
                    window.requestAnimationFrame(tick);
                }
            };

            window.requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                animateCounter(entry.target);
                obs.unobserve(entry.target);
            });
        }, {
            threshold: 0.35
        });

        counters.forEach((counter) => observer.observe(counter));
    };

    const injectSharedComponents = () => {
        injectBusinessConfigEverywhere();
        injectSourcePageFields();

        renderServiceOptions();
        renderHeaderServiceDropdown();
        renderFooterServices();
        renderFooterNav();
        renderLegalLinks();
        renderMobileMenu();
        renderServiceIconStrip();
        renderCounters();

        injectBusinessConfigEverywhere();
    };

    const initBusinessConfigObserver = () => {
        let timer = null;

        const observer = new MutationObserver((mutations) => {
            const shouldRun = mutations.some((mutation) => {
                return mutation.addedNodes && mutation.addedNodes.length;
            });

            if (!shouldRun) return;

            window.clearTimeout(timer);

            timer = window.setTimeout(() => {
                injectBusinessConfigEverywhere();
                refreshIcons();
            }, 80);
        });

        observer.observe(doc.body, {
            childList: true,
            subtree: true
        });
    };

    const initGlobal = () => {
        root.classList.add('js-ready');

        injectSharedComponents();

        initStickyHeader();
        initDesktopDropdown();
        initMobileMenu();
        initAccordions();
        initCounterAnimation();
        initBusinessConfigObserver();

        setActiveNav();
        renderCookieBanner();

        injectBusinessConfigEverywhere();

        refreshIcons();
        initAOS();
        refreshAOS();
    };

    window.MaisonTubUtils = {
        qs,
        qsa,
        config,
        getValue,
        escapeHtml,
        createIcon,
        normalizeIconName,
        refreshIcons,
        refreshAOS,
        initAccordions,
        renderServiceOptions,
        renderCounters,
        injectBusinessConfigEverywhere,
        currentPage
    };

    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', initGlobal);
    } else {
        initGlobal();
    }
})();
