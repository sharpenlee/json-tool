/* Google Analytics is loaded only after explicit acceptance (strict gating):
   no visitor request is made to Google until the banner is answered. A stored
   "accepted" from a previous visit loads GA immediately. The no-op gtag stub
   keeps the tool page's event calls safe before any consent is given. */
(function () {
    'use strict';

    var STORAGE_KEY = 'cookie-consent';
    var GA_ID = 'G-S1RYL7MXPJ';

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

    var banner = document.getElementById('cookieBanner');
    var acceptBtn = document.getElementById('cookieAccept');
    var rejectBtn = document.getElementById('cookieReject');
    var settingsLink = document.getElementById('cookieSettings');

    function read() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }
    function save(state) {
        try { localStorage.setItem(STORAGE_KEY, state); } catch (e) {}
    }
    function clear() {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
    function showBanner() {
        banner.classList.add('show');
        banner.setAttribute('aria-hidden', 'false');
        rejectBtn.focus();
    }
    function hideBanner() {
        // Focus inside the banner would be hidden from assistive tech, which
        // browsers refuse to do; move it out before marking the banner hidden.
        if (banner.contains(document.activeElement)) document.activeElement.blur();
        banner.classList.remove('show');
        banner.setAttribute('aria-hidden', 'true');
    }
    function loadGtag() {
        if (window.__gaLoaded) return;
        window.__gaLoaded = true;
        gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
        });
        gtag('js', new Date());
        gtag('config', GA_ID);
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
    }
    function setAnalytics(state) {
        gtag('consent', 'update', { analytics_storage: state });
    }
    function onAccept() {
        save('accepted');
        if (window.__gaLoaded) {
            setAnalytics('granted');
        } else {
            loadGtag();
        }
        hideBanner();
    }
    function onReject() {
        save('rejected');
        setAnalytics('denied');
        hideBanner();
    }
    window.showCookieSettings = function () {
        clear();
        setAnalytics('denied');
        showBanner();
    };

    var stored = read();
    if (stored === 'accepted') {
        loadGtag();
    } else if (!stored) {
        setTimeout(showBanner, 600);
    }
    // stored === 'rejected': GA never loads; events queue into the unused dataLayer.

    if (acceptBtn) acceptBtn.addEventListener('click', onAccept);
    if (rejectBtn) rejectBtn.addEventListener('click', onReject);
    if (settingsLink) settingsLink.addEventListener('click', function (e) {
        e.preventDefault();
        showCookieSettings();
    });
})();