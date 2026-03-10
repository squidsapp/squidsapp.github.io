// ══════════════════════════════════════════════════════════════
// SQUIDS.CO.ZA — Main JavaScript
// ══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Year ────────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Nav scroll effect ────────────────────────────────────────
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile hamburger ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Language dropdown ─────────────────────────────────────────
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
    });
    langDropdown.addEventListener('click', e => e.stopPropagation());
  }

  // ── Smooth scroll for nav links ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Reveal on scroll (IntersectionObserver) ───────────────────
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all immediately
    reveals.forEach(el => el.classList.add('visible'));
  }

  // ── Counter animation ─────────────────────────────────────────
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  const statNums = document.querySelectorAll('.stat-num[data-count]');
  let countersStarted = false;
  if (statNums.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting) && !countersStarted) {
        countersStarted = true;
        statNums.forEach(el => {
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target, 1800);
        });
      }
    }, { threshold: 0.5 });
    statNums.forEach(el => counterObserver.observe(el));
  }

  // ── Guide tabs ────────────────────────────────────────────────
  window.showGuide = function (id) {
    // Deactivate all panels and tabs
    document.querySelectorAll('.guide-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.g-tab').forEach(t => t.classList.remove('active'));

    // Activate selected
    const panel = document.getElementById('guide-' + id);
    if (panel) panel.classList.add('active');

    // Find matching tab
    const tabs = document.querySelectorAll('.g-tab');
    const tabMap = {
      'start': 0, 'post': 1, 'ocean': 2,
      'groups': 3, 'profile': 4, 'privacy': 5
    };
    const idx = tabMap[id];
    if (tabs[idx]) tabs[idx].classList.add('active');
  };

  // ── Africa Map tooltip ────────────────────────────────────────
  const tooltip = document.getElementById('mapTooltip');
  const tooltipName = document.getElementById('tooltipName');
  const tooltipLang = document.getElementById('tooltipLang');
  const mapWrap = document.querySelector('.africa-map-wrap');

  const LANG_LABELS = {
    en: { en: 'English', fr: 'Français', ar: 'Arabic / عربي', sw: 'Kiswahili', am: 'Amharic / አማርኛ' },
    fr: { en: 'Anglais', fr: 'Français', ar: 'Arabe / عربي', sw: 'Swahili', am: 'Amharique / አማርኛ' },
    ar: { en: 'الإنجليزية', fr: 'الفرنسية', ar: 'العربية', sw: 'السواحيلية', am: 'الأمهرية' },
    sw: { en: 'Kiingereza', fr: 'Kifaransa', ar: 'Kiarabu', sw: 'Kiswahili', am: 'Kiamhari' },
    am: { en: 'እንግሊዝኛ', fr: 'ፈረንሳይኛ', ar: 'አረቢኛ', sw: 'ስዋሂሊ', am: 'አማርኛ' }
  };

  function getLangLabel(supportStr) {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
    const labels = LANG_LABELS[lang] || LANG_LABELS.en;
    const supportedKeys = { 'English': 'en', 'Français': 'fr', 'Arabic': 'ar', 'Kiswahili': 'sw', 'Amharic': 'am', 'Português': 'other' };
    const parts = supportStr.split(',').map(s => s.trim());
    return parts.map(s => {
      const key = supportedKeys[s];
      return key && labels[key] ? labels[key] : s;
    }).join(' · ');
  }

  if (tooltip && mapWrap) {
    document.querySelectorAll('.country').forEach(path => {
      path.addEventListener('mouseenter', (e) => {
        const name = path.dataset.name || '';
        const support = path.dataset.support || '';
        tooltipName.textContent = name;
        tooltipLang.textContent = getLangLabel(support);
        tooltip.classList.add('visible');
      });

      path.addEventListener('mousemove', (e) => {
        const rect = mapWrap.getBoundingClientRect();
        let x = e.clientX - rect.left + 12;
        let y = e.clientY - rect.top - 10;
        // Keep tooltip in bounds
        if (x + 180 > rect.width) x = e.clientX - rect.left - 190;
        if (y < 0) y = 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });

      path.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      // Touch support
      path.addEventListener('click', (e) => {
        const name = path.dataset.name || '';
        const support = path.dataset.support || '';
        tooltipName.textContent = name;
        tooltipLang.textContent = getLangLabel(support);
        tooltip.classList.add('visible');

        const rect = mapWrap.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        let x = (touch.clientX || e.clientX) - rect.left + 12;
        let y = (touch.clientY || e.clientY) - rect.top - 10;
        if (x + 180 > rect.width) x = (touch.clientX || e.clientX) - rect.left - 190;
        if (y < 0) y = 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';

        e.stopPropagation();
      });
    });

    // Hide tooltip on outside click
    document.addEventListener('click', () => {
      if (tooltip) tooltip.classList.remove('visible');
    });
  }

  // ── Parallax blobs on mouse move ──────────────────────────────
  const hero = document.getElementById('hero');
  if (hero && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;

      document.querySelectorAll('.blob').forEach((blob, i) => {
        const strength = (i + 1) * 12;
        blob.style.transform = `translate(${cx * strength}px, ${cy * strength}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      document.querySelectorAll('.blob').forEach(blob => {
        blob.style.transform = '';
      });
    });
  }

  // ── Staggered feature cards ───────────────────────────────────
  const featureCards = document.querySelectorAll('.feature-card');
  if ('IntersectionObserver' in window && featureCards.length) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
      card.classList.add('reveal');
      cardObserver.observe(card);
    });
  }

  // ── Value cards stagger ───────────────────────────────────────
  const valueCards = document.querySelectorAll('.value-card');
  if ('IntersectionObserver' in window && valueCards.length) {
    const vcObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          vcObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    valueCards.forEach(c => { c.classList.add('reveal'); vcObserver.observe(c); });
  }

  // ── Typing effect on hero title ───────────────────────────────
  const heroLines = document.querySelectorAll('.hero-title-line');
  heroLines.forEach((line, i) => {
    line.style.animationDelay = `${i * 0.15}s`;
    line.classList.add('hero-line-in');
  });

  // ── Guide step hover highlight ────────────────────────────────
  document.querySelectorAll('.guide-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      step.style.paddingLeft = '16px';
      step.style.borderLeft = '3px solid var(--sq)';
      step.style.marginLeft = '-16px';
    });
    step.addEventListener('mouseleave', () => {
      step.style.paddingLeft = '';
      step.style.borderLeft = '';
      step.style.marginLeft = '';
    });
  });

  // ── Scroll progress indicator ─────────────────────────────────
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, var(--sq), var(--accent));
    width: 0%; transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (scrolled / max) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  // ── Cursor glow (desktop only) ────────────────────────────────
  if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed; width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(20,180,157,0.07), transparent);
      border-radius: 50%; pointer-events: none; z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(cursor);

    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    (function animCursor() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      requestAnimationFrame(animCursor);
    })();
  }

  // ── Phone screen animation ────────────────────────────────────
  // Animate the app-post items with a gentle pulse
  const posts = document.querySelectorAll('.app-post');
  posts.forEach((post, i) => {
    post.style.animation = `fadeSlide 0.5s ease-out ${i * 0.2}s both`;
  });

  // ── Active nav link based on scroll ──────────────────────────
  const sections = ['#features', '#guide', '#map', '#about'];
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let active = '';
    sections.forEach(id => {
      const el = document.querySelector(id);
      if (el && el.offsetTop <= scrollY) active = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('nav-active', link.getAttribute('href') === active);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── Add nav-active style ──────────────────────────────────────
  const navActiveStyle = document.createElement('style');
  navActiveStyle.textContent = `.nav-links .nav-active { color: var(--sq) !important; }`;
  document.head.appendChild(navActiveStyle);

  // ── Hero title entrance animation ─────────────────────────────
  const titleStyle = document.createElement('style');
  titleStyle.textContent = `
    .hero-line-in {
      opacity: 0;
      transform: translateY(20px);
      animation: heroLineIn 0.7s cubic-bezier(.22,1,.36,1) forwards;
    }
    @keyframes heroLineIn {
      to { opacity: 1; transform: none; }
    }
  `;
  document.head.appendChild(titleStyle);

  // Trigger hero reveals immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
  }, 100);

  console.log('%c🦑 Squids.co.za', 'color:#14b49d;font-size:18px;font-weight:bold');
  console.log('%cAfrica\'s Social Platform — by TyVila.Online', 'color:#7db8b2');

})();
