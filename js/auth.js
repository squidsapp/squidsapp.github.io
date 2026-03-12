// ══════════════════════════════════════════════════════════════
// SQUIDS — Auth Detection & Redirect
// Checks if user is logged in via app.squids.co.za and redirects
// ══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ── Obfuscated connector (public keys only — no secrets) ────
  const _cfg = (function () {
    const _a = ['aHR0cHM6Ly9', 'hcHAuc3F1aWRzLmNvLnph'];
    const _b = atob(_a[0]) + atob(_a[1]);
    return { base: _b };
  })();

  // CSP-safe content security headers via meta (set by server for full effect)
  // X-Frame-Options: DENY  |  X-Content-Type-Options: nosniff

  // ── Rate limit click spam protection ────────────────────────
  let _clickTs = 0;
  document.addEventListener('click', function (e) {
    const now = Date.now();
    if (now - _clickTs < 50) { e.stopImmediatePropagation(); return; }
    _clickTs = now;
  }, true);

  // ── Anti-devtools honeypot (non-blocking, just logs) ────────
  const _trap = { get _probe() { window._sqDevOpen = true; return false; } };
  try { console.log('%c', _trap); } catch (_) {}

  // ── Supabase session check via localStorage ──────────────────
  // app.squids.co.za sets supabase auth tokens in localStorage on its domain.
  // We check for a session by pinging the app's session endpoint via postMessage
  // (cross-origin localStorage is NOT accessible — we use a hidden iframe ping)
  function checkAppSession() {
    try {
      // Check local marker set by app if same subdomain cookie exists
      const sqSession = sessionStorage.getItem('sq-site-loggedin');
      if (sqSession === '1') {
        showLoggedInBanner();
        return;
      }

      // Create hidden iframe to ping app and receive postMessage
      const iframe = document.createElement('iframe');
      iframe.src = 'https://app.squids.co.za/session-ping.html';
      iframe.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;border:none;';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      document.body.appendChild(iframe);

      window.addEventListener('message', function onMsg(e) {
        if (e.origin !== 'https://app.squids.co.za') return;
        if (e.data && e.data.type === 'sq-session') {
          window.removeEventListener('message', onMsg);
          iframe.remove();
          if (e.data.loggedIn && e.data.redirect) {
            // Redirect logged-in users to the app
            sessionStorage.setItem('sq-site-loggedin', '1');
            showLoggedInBanner(e.data.username);
          }
        }
      });

      // Timeout cleanup
      setTimeout(function () {
        try { iframe.remove(); } catch (_) {}
      }, 4000);
    } catch (err) {
      // Silent fail — no console output in production
    }
  }

  function showLoggedInBanner(username) {
    const banner = document.getElementById('loggedInBanner');
    const bannerUser = document.getElementById('bannerUsername');
    if (banner) {
      if (username && bannerUser) bannerUser.textContent = '@' + username;
      banner.style.display = 'flex';
      // Animate in
      requestAnimationFrame(function () {
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
      });
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAppSession);
  } else {
    checkAppSession();
  }

  // ── Expose for use by other scripts ─────────────────────────
  window.SQ = window.SQ || {};
  window.SQ.showLoggedInBanner = showLoggedInBanner;

  // ── Input sanitizer (used by feedback form) ──────────────────
  window.SQ.sanitize = function (str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .slice(0, 2000);
  };

  // ── CSRF token for forms ─────────────────────────────────────
  window.SQ.csrf = (function () {
    const arr = new Uint8Array(16);
    try { crypto.getRandomValues(arr); } catch (_) {}
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  })();

})();
