// Squids — main.js

(function () {
  'use strict';

  // ── Progress bar ──────────────────────────────────────────
  const progress = document.getElementById('progress');
  function updateProgress() {
    const h = document.documentElement;
    const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = Math.min(pct, 100) + '%';
  }

  // ── Nav scroll ────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('solid', window.scrollY > 40);
  }

  // ── Scroll animations ─────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const staggerParents = document.querySelectorAll('.stagger-parent');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const ioStagger = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ioStagger.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => io.observe(el));
  staggerParents.forEach(el => ioStagger.observe(el));

  // ── Count-up numbers ──────────────────────────────────────
  function countUp(el) {
    const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const isFloat = target % 1 !== 0;
    let start = null;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = target * ease;
      el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ── Live countdown ────────────────────────────────────────
  const countdownEl = document.getElementById('verified-count');
  if (countdownEl) {
    const start = 200;
    // Simulate decreasing count — seeded by date so consistent per day
    const seed = Math.floor(Date.now() / 86400000);
    const taken = (seed * 7 + 23) % 60; // 0-59 taken, changes daily
    const remaining = start - taken;
    countdownEl.textContent = remaining;
  }

  // ── FAQ accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });

  // ── Mobile menu ───────────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  function toggleMenu(open) {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const spans = hamburger?.querySelectorAll('span');
    if (spans) {
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    }
  }

  if (hamburger) hamburger.addEventListener('click', () => toggleMenu(!mobileMenu?.classList.contains('open')));
  if (mobileClose) mobileClose.addEventListener('click', () => toggleMenu(false));
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  }

  // ── Cursor glow ───────────────────────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    let mx = -999, my = -999;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateCursor() {
      glow.style.left = mx + 'px';
      glow.style.top = my + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // ── Particles canvas ─────────────────────────────────────
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,180,157,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ── Africa map city dots animation ────────────────────────
  function animateCityDots() {
    const dots = document.querySelectorAll('.city-dot');
    dots.forEach((dot, i) => {
      dot.style.animationDelay = (i * 0.3) + 's';
    });
  }
  animateCityDots();

  // ── SVG map line drawing ──────────────────────────────────
  const mapLines = document.querySelectorAll('.line-draw');
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('drawn'), 300);
        lineObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  mapLines.forEach(l => lineObserver.observe(l));

  // ── Smooth anchor scroll ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ── Main scroll handler ───────────────────────────────────
  window.addEventListener('scroll', () => {
    updateProgress();
    updateNav();
  }, { passive: true });

  // Init
  updateNav();
  updateProgress();

})();
