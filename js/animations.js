// ══════════════════════════════════════════════════════════════
// SQUIDS — Animations v2.0
// TyVila T logo animation, squids pulse, hero effects, etc.
// ══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ── TyVila "T" SVG Animation ────────────────────────────────
  function initTyVilaLogo() {
    const containers = document.querySelectorAll('.tyvila-t-anim');
    containers.forEach(function (c) {
      c.innerHTML = '';
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 80 80');
      svg.setAttribute('width', c.dataset.size || '48');
      svg.setAttribute('height', c.dataset.size || '48');
      svg.style.cssText = 'overflow:visible;display:block;';

      // Background circle with gradient
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `
        <radialGradient id="tvBg" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#2d1b69"/>
          <stop offset="100%" stop-color="#0f0a1e"/>
        </radialGradient>
        <linearGradient id="tvStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c026d3"/>
          <stop offset="50%" stop-color="#7c3aed"/>
          <stop offset="100%" stop-color="#14b49d"/>
        </linearGradient>
        <filter id="tvGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      `;
      svg.appendChild(defs);

      // Background rect
      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('width', '80');
      bg.setAttribute('height', '80');
      bg.setAttribute('rx', '20');
      bg.setAttribute('fill', 'url(#tvBg)');
      svg.appendChild(bg);

      // Border ring
      const ring = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      ring.setAttribute('x', '2');
      ring.setAttribute('y', '2');
      ring.setAttribute('width', '76');
      ring.setAttribute('height', '76');
      ring.setAttribute('rx', '18');
      ring.setAttribute('fill', 'none');
      ring.setAttribute('stroke', 'url(#tvStroke)');
      ring.setAttribute('stroke-width', '1.5');
      ring.setAttribute('opacity', '0.6');
      svg.appendChild(ring);

      // T horizontal bar
      const tBar = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tBar.setAttribute('x1', '14');
      tBar.setAttribute('y1', '24');
      tBar.setAttribute('x2', '66');
      tBar.setAttribute('y2', '24');
      tBar.setAttribute('stroke', 'url(#tvStroke)');
      tBar.setAttribute('stroke-width', '6');
      tBar.setAttribute('stroke-linecap', 'round');
      tBar.setAttribute('filter', 'url(#tvGlow)');
      tBar.style.cssText = 'stroke-dasharray:52;stroke-dashoffset:52;animation:tBar .6s ease forwards .2s;';
      svg.appendChild(tBar);

      // T vertical bar
      const tVert = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tVert.setAttribute('x1', '40');
      tVert.setAttribute('y1', '24');
      tVert.setAttribute('x2', '40');
      tVert.setAttribute('y2', '62');
      tVert.setAttribute('stroke', 'url(#tvStroke)');
      tVert.setAttribute('stroke-width', '6');
      tVert.setAttribute('stroke-linecap', 'round');
      tVert.setAttribute('filter', 'url(#tvGlow)');
      tVert.style.cssText = 'stroke-dasharray:38;stroke-dashoffset:38;animation:tVert .5s ease forwards .7s;';
      svg.appendChild(tVert);

      // Sparkle dots
      const sparklePts = [[14,24],[66,24],[40,62]];
      sparklePts.forEach(function ([x,y], i) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', '3');
        dot.setAttribute('fill', i === 1 ? '#14b49d' : '#c026d3');
        dot.setAttribute('filter', 'url(#tvGlow)');
        dot.style.cssText = 'opacity:0;animation:sparkle .4s ease forwards ' + (0.8 + i * 0.15) + 's;';
        svg.appendChild(dot);
      });

      c.appendChild(svg);
    });
  }

  // ── Inject T animation keyframes once ───────────────────────
  if (!document.getElementById('tvAnimStyles')) {
    const style = document.createElement('style');
    style.id = 'tvAnimStyles';
    style.textContent = `
      @keyframes tBar  { to { stroke-dashoffset: 0; } }
      @keyframes tVert { to { stroke-dashoffset: 0; } }
      @keyframes sparkle { 0%{opacity:0;transform:scale(0)} 60%{opacity:1;transform:scale(1.5)} 100%{opacity:1;transform:scale(1)} }
      @keyframes sqPulse {
        0%,100%  { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 8px rgba(20,180,157,.4)); }
        25%      { transform: scale(1.06) rotate(-2deg); }
        75%      { transform: scale(1.04) rotate(2deg); filter: drop-shadow(0 0 20px rgba(20,180,157,.8)); }
      }
      @keyframes floatUp {
        0%,100% { transform: translateY(0); }
        50%     { transform: translateY(-12px); }
      }
      @keyframes fadeSlideUp {
        from { opacity:0; transform:translateY(30px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes gradientShift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes borderGlow {
        0%,100% { box-shadow: 0 0 0 0 rgba(20,180,157,0); }
        50%      { box-shadow: 0 0 0 6px rgba(20,180,157,.15); }
      }
      @keyframes waveAnim {
        0%   { d: path("M0,50 Q25,30 50,50 Q75,70 100,50 L100,100 L0,100 Z"); }
        50%  { d: path("M0,50 Q25,70 50,50 Q75,30 100,50 L100,100 L0,100 Z"); }
        100% { d: path("M0,50 Q25,30 50,50 Q75,70 100,50 L100,100 L0,100 Z"); }
      }
      @keyframes textShimmer {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes ping {
        75%,100% { transform:scale(2); opacity:0; }
      }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    `;
    document.head.appendChild(style);
  }

  // ── Squids logo pulse ────────────────────────────────────────
  document.querySelectorAll('.sq-logo-anim svg').forEach(function (svg) {
    svg.style.animation = 'sqPulse 4s ease-in-out infinite';
  });

  // ── Hero floating elements ───────────────────────────────────
  document.querySelectorAll('.float-badge').forEach(function (el, i) {
    el.style.animation = 'floatUp ' + (3 + i * 0.7) + 's ease-in-out infinite';
    el.style.animationDelay = (i * 0.5) + 's';
  });

  // ── Gradient text shimmer ────────────────────────────────────
  document.querySelectorAll('.shimmer-text').forEach(function (el) {
    el.style.cssText += 'background:linear-gradient(90deg,#14b49d,#c026d3,#14b49d);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:textShimmer 3s linear infinite;';
  });

  // ── Number ticker on hover (stats) ──────────────────────────
  document.querySelectorAll('.stat').forEach(function (stat) {
    stat.addEventListener('mouseenter', function () {
      stat.style.transform = 'scale(1.05)';
      stat.style.transition = 'transform .2s ease';
    });
    stat.addEventListener('mouseleave', function () {
      stat.style.transform = '';
    });
  });

  // ── Scroll-triggered section borders ────────────────────────
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('section').forEach(function (s) {
    sectionObserver.observe(s);
  });

  // ── Cursor glow effect (desktop only) ───────────────────────
  if (window.innerWidth > 900 && !window.matchMedia('(pointer: coarse)').matches) {
    const cursor = document.createElement('div');
    cursor.id = 'sqCursor';
    cursor.style.cssText = 'position:fixed;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle,rgba(20,180,157,.4),transparent);pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s,opacity .2s;mix-blend-mode:screen;';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY  + 'px';
    });
    document.querySelectorAll('a, button, .feature-card, .value-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.style.width = '44px';
        cursor.style.height = '44px';
        cursor.style.background = 'radial-gradient(circle,rgba(192,38,211,.35),transparent)';
      });
      el.addEventListener('mouseleave', function () {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'radial-gradient(circle,rgba(20,180,157,.4),transparent)';
      });
    });
  }

  // ── Init when DOM ready ──────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTyVilaLogo);
  } else {
    initTyVilaLogo();
  }

  // Re-init on dynamic content
  window.SQ = window.SQ || {};
  window.SQ.initTyVilaLogo = initTyVilaLogo;

})();
