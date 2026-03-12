// ══════════════════════════════════════════════════════════════
// SQUIDS — Social Share Helper
// Native share API + fallbacks for WhatsApp, X, Facebook, etc.
// ══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  window.SQ = window.SQ || {};

  // ── Native Web Share API ─────────────────────────────────────
  SQ.share = function (opts) {
    opts = opts || {};
    const shareData = {
      title: opts.title || 'Squids — Africa\'s Social Platform',
      text: opts.text || 'Connect, share, and discover communities across Africa. Join Squids — it\'s free!',
      url: opts.url || 'https://squids.co.za'
    };
    if (navigator.share) {
      navigator.share(shareData).catch(function () {});
    } else {
      // Fallback: show share panel
      SQ.showSharePanel(shareData);
    }
  };

  // ── Share panel fallback ─────────────────────────────────────
  SQ.showSharePanel = function (data) {
    const url = encodeURIComponent(data.url);
    const text = encodeURIComponent(data.text);
    const title = encodeURIComponent(data.title);

    const panel = document.createElement('div');
    panel.id = 'sqSharePanel';
    panel.style.cssText = 'position:fixed;inset:0;z-index:10100;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);';
    panel.innerHTML = `
      <div style="background:#1a1a2e;border-radius:24px 24px 0 0;padding:28px;width:100%;max-width:480px;box-shadow:0 -8px 40px rgba(0,0,0,.5);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <h3 style="font-size:16px;font-weight:800;color:#fff;margin:0;">Share Squids</h3>
          <button id="sqShareClose" style="background:rgba(255,255,255,.08);border:none;width:32px;height:32px;border-radius:8px;color:rgba(255,255,255,.6);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">
          <a href="https://wa.me/?text=${text}%20${url}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:rgba(255,255,255,.05);border-radius:12px;text-decoration:none;border:1px solid rgba(255,255,255,.07);">
            <span style="font-size:24px;">💬</span><span style="font-size:11px;color:rgba(255,255,255,.6);font-weight:700;">WhatsApp</span>
          </a>
          <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:rgba(255,255,255,.05);border-radius:12px;text-decoration:none;border:1px solid rgba(255,255,255,.07);">
            <span style="font-size:24px;">𝕏</span><span style="font-size:11px;color:rgba(255,255,255,.6);font-weight:700;">X / Twitter</span>
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:rgba(255,255,255,.05);border-radius:12px;text-decoration:none;border:1px solid rgba(255,255,255,.07);">
            <span style="font-size:24px;">📘</span><span style="font-size:11px;color:rgba(255,255,255,.6);font-weight:700;">Facebook</span>
          </a>
          <a href="https://t.me/share/url?url=${url}&text=${text}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 8px;background:rgba(255,255,255,.05);border-radius:12px;text-decoration:none;border:1px solid rgba(255,255,255,.07);">
            <span style="font-size:24px;">✈️</span><span style="font-size:11px;color:rgba(255,255,255,.6);font-weight:700;">Telegram</span>
          </a>
        </div>
        <button id="sqShareCopy" style="width:100%;background:rgba(20,180,157,.1);border:1px solid rgba(20,180,157,.2);border-radius:12px;padding:12px;color:#14b49d;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px;">
          🔗 Copy Link
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    document.getElementById('sqShareClose').addEventListener('click', function () { panel.remove(); });
    panel.addEventListener('click', function (e) { if (e.target === panel) panel.remove(); });
    document.getElementById('sqShareCopy').addEventListener('click', function () {
      navigator.clipboard.writeText(data.url).then(function () {
        const btn = document.getElementById('sqShareCopy');
        if (btn) { btn.textContent = '✅ Copied!'; setTimeout(function () { panel.remove(); }, 1200); }
      });
    });
  };

  // ── Share buttons init ───────────────────────────────────────
  document.querySelectorAll('[data-share]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      SQ.share({
        url: btn.dataset.url || window.location.href,
        text: btn.dataset.text,
        title: btn.dataset.title
      });
    });
  });

  // ── Floating share button ────────────────────────────────────
  const floatShare = document.getElementById('floatShare');
  if (floatShare) {
    floatShare.addEventListener('click', function () { SQ.share(); });
  }

})();
