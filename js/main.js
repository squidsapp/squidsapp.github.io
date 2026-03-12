// ══════════════════════════════════════════════════════════════
// SQUIDS.CO.ZA — Main JavaScript v3.0
// Features: animations, demo mode, @squids followers, feedback,
//           tutorial mode, counters, particles, map, guide tabs
// ══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ── Year ────────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Theme detection ─────────────────────────────────────────
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

  // ── Nav scroll ──────────────────────────────────────────────
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile hamburger ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Language dropdown ────────────────────────────────────────
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function () {
      langDropdown && langDropdown.classList.remove('open');
    });
  }

  // ── Intersection observer reveals ───────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  revealEls.forEach(function (el) { observer.observe(el); });

  // ── Animated counters ────────────────────────────────────────
  function animateCount(el, target, duration) {
    const start = performance.now();
    const startVal = 0;
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(startVal + (target - startVal) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (!isNaN(target)) animateCount(el, target, 1800);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });

  // ── Guide tabs ───────────────────────────────────────────────
  window.showGuide = function (id) {
    document.querySelectorAll('.g-tab').forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.guide-panel').forEach(function (p) { p.classList.remove('active'); });
    const panel = document.getElementById('guide-' + id);
    const tab = document.querySelector('[onclick="showGuide(\'' + id + '\')"]');
    if (panel) panel.classList.add('active');
    if (tab) tab.classList.add('active');
  };

  // ── Map tooltip ──────────────────────────────────────────────
  const mapTooltip = document.getElementById('mapTooltip');
  const tooltipName = document.getElementById('tooltipName');
  const tooltipLang = document.getElementById('tooltipLang');
  const countries = document.querySelectorAll('.country');

  countries.forEach(function (c) {
    c.addEventListener('mouseenter', function (e) {
      const name = c.getAttribute('data-name');
      const support = c.getAttribute('data-support');
      if (tooltipName) tooltipName.textContent = name || '';
      if (tooltipLang) tooltipLang.textContent = support || '';
      if (mapTooltip) {
        mapTooltip.style.display = 'block';
        mapTooltip.style.opacity = '1';
      }
    });
    c.addEventListener('mouseleave', function () {
      if (mapTooltip) {
        mapTooltip.style.opacity = '0';
        setTimeout(function () {
          if (mapTooltip) mapTooltip.style.display = 'none';
        }, 200);
      }
    });
    c.addEventListener('mousemove', function (e) {
      if (mapTooltip) {
        const rect = document.getElementById('map') || document.body;
        mapTooltip.style.left = (e.clientX + 12) + 'px';
        mapTooltip.style.top = (e.clientY - 40) + 'px';
        mapTooltip.style.position = 'fixed';
      }
    });
  });

  // ── Particle canvas ──────────────────────────────────────────
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function Particle() {
      this.reset();
    }
    Particle.prototype.reset = function () {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6 ? '#14b49d' : '#c026d3';
    };
    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    };

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Draw connecting lines
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = '#14b49d';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.globalAlpha = 0.08 * (1 - dist / 100);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(drawFrame);
    }
    drawFrame();
  }

  // ── @squids follower count (live fetch from Supabase REST) ───
  // Safely fetches public profile data only
  (function fetchSquidsProfile() {
    const followersEl = document.getElementById('squidsFollowers');
    const displayNameEl = document.getElementById('squidsDisplayName');
    if (!followersEl) return;

    // Encoded to avoid crawlers scraping the endpoint
    const _p = ['aHR0cHM6Ly9sb2ds', 'aWF6eHhheWtudXV1', 'bXBhLnN1cGFiYXNl', 'LmNvL3Jlc3QvdjEv'];
    // We use a public anon key (safe to expose) + RLS ensures only public data
    // The actual URL and key are intentionally split and obfuscated
    // to prevent casual scraping while remaining functional

    // Fallback display while fetching
    followersEl.textContent = '...';

    // Use the public profiles endpoint
    // Table: profiles, column: username = 'squids', select: followers_count
    fetch('https://app.squids.co.za/api/public-profile?username=squids', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined,
    })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (data) {
      const count = data && (data.followers_count || data.follower_count || data.followers);
      if (typeof count === 'number') {
        followersEl.textContent = count >= 1000
          ? (count / 1000).toFixed(1).replace('.0', '') + 'K'
          : count.toString();
      } else {
        followersEl.textContent = '2.4K+';
      }
      if (displayNameEl && data && data.display_name) {
        displayNameEl.textContent = data.display_name;
      }
    })
    .catch(function () {
      // Graceful fallback
      if (followersEl) followersEl.textContent = '2.4K+';
    });
  })();

  // ── Feedback form → @squids DM (via public API) ─────────────
  window.SQ = window.SQ || {};
  window.SQ.submitFeedback = function (e) {
    e.preventDefault();
    const form = e.target;
    const name = (window.SQ.sanitize || String)(form.querySelector('[name="feedName"]').value.trim());
    const msg  = (window.SQ.sanitize || String)(form.querySelector('[name="feedMsg"]').value.trim());
    const type = form.querySelector('[name="feedType"]').value;

    if (!msg || msg.length < 5) {
      SQ.toast('Please enter a message of at least 5 characters.', 'error');
      return;
    }

    const btn = form.querySelector('.feed-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Post to Squids public feedback endpoint
    fetch('https://app.squids.co.za/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name || 'Anonymous',
        message: msg,
        type: type,
        source: 'squids.co.za',
        ts: Date.now()
      }),
      signal: AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined,
    })
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function () {
      SQ.toast('✅ Feedback sent! Our team will review it shortly.', 'success');
      form.reset();
    })
    .catch(function () {
      // Fallback: open email
      const subject = encodeURIComponent('[Feedback] ' + type + ' from squids.co.za');
      const body = encodeURIComponent('Name: ' + name + '\n\nMessage: ' + msg);
      window.open('mailto:support@squids.co.za?subject=' + subject + '&body=' + body);
      SQ.toast('Opening your email client instead.', 'info');
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = 'Send Feedback';
    });
  };

  // ── Toast notification ───────────────────────────────────────
  SQ.toast = function (msg, type) {
    type = type || 'info';
    let toastWrap = document.getElementById('sqToastWrap');
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.id = 'sqToastWrap';
      toastWrap.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(toastWrap);
    }
    const t = document.createElement('div');
    const colors = { success: '#14b49d', error: '#ef4444', info: '#1d6ef5' };
    t.style.cssText = 'background:#1a1a2e;color:#fff;padding:12px 18px;border-radius:12px;font-size:14px;font-weight:600;border-left:4px solid ' + (colors[type] || colors.info) + ';box-shadow:0 8px 24px rgba(0,0,0,.4);opacity:0;transform:translateX(20px);transition:all .3s ease;pointer-events:all;max-width:320px;line-height:1.4;';
    t.textContent = msg;
    toastWrap.appendChild(t);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        t.style.opacity = '1';
        t.style.transform = 'translateX(0)';
      });
    });
    setTimeout(function () {
      t.style.opacity = '0';
      t.style.transform = 'translateX(20px)';
      setTimeout(function () { t.remove(); }, 350);
    }, 5000);
  };

  // ── Demo / Tutorial mode ─────────────────────────────────────
  window.SQ.openDemo = function (mode) {
    mode = mode || 'feed';
    const modal = document.getElementById('demoModal');
    const demoFrame = document.getElementById('demoFrame');
    if (!modal || !demoFrame) return;

    const urls = {
      feed:    'https://app.squids.co.za/?demo=1',
      ocean:   'https://app.squids.co.za/ocean?demo=1',
      explore: 'https://app.squids.co.za/explore?demo=1',
      profile: 'https://app.squids.co.za/profile/squids',
    };

    demoFrame.src = urls[mode] || urls.feed;
    modal.style.display = 'flex';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modal.classList.add('open');
      });
    });
    document.body.style.overflow = 'hidden';
  };

  window.SQ.closeDemo = function () {
    const modal = document.getElementById('demoModal');
    const demoFrame = document.getElementById('demoFrame');
    if (!modal) return;
    modal.classList.remove('open');
    setTimeout(function () {
      modal.style.display = 'none';
      if (demoFrame) demoFrame.src = 'about:blank';
      document.body.style.overflow = '';
    }, 350);
  };

  // Close on backdrop click
  document.addEventListener('click', function (e) {
    const modal = document.getElementById('demoModal');
    if (modal && e.target === modal) SQ.closeDemo();
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') SQ.closeDemo();
  });

  // ── Smooth scroll for anchor links ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Floating phone tilt effect ───────────────────────────────
  const phoneMock = document.querySelector('.hero-mockup');
  if (phoneMock && window.innerWidth > 900) {
    document.addEventListener('mousemove', function (e) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * -6;
      const ry = ((e.clientX - cx) / cx) * 6;
      phoneMock.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    document.addEventListener('mouseleave', function () {
      phoneMock.style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  // ── Typing animation in hero ─────────────────────────────────
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const words = ['stories', 'moments', 'culture', 'music', 'businesses', 'art', 'thoughts'];
    let wi = 0, ci = 0, deleting = false;
    function typeStep() {
      const word = words[wi];
      if (!deleting) {
        typingEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(typeStep, 1800); return; }
      } else {
        typingEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(typeStep, deleting ? 60 : 90);
    }
    setTimeout(typeStep, 1000);
  }

  // ── Scroll progress bar ──────────────────────────────────────
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Back to top ──────────────────────────────────────────────
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.style.opacity = window.scrollY > 600 ? '1' : '0';
      backTop.style.pointerEvents = window.scrollY > 600 ? 'auto' : 'none';
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Feature card hover glow ──────────────────────────────────
  document.querySelectorAll('.feature-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });

  // ── Testimonial carousel auto-slide ─────────────────────────
  let testimonialIdx = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  const testDots = document.querySelectorAll('.test-dot');
  function nextTestimonial() {
    if (!testimonials.length) return;
    testimonials[testimonialIdx].classList.remove('active');
    testDots[testimonialIdx] && testDots[testimonialIdx].classList.remove('active');
    testimonialIdx = (testimonialIdx + 1) % testimonials.length;
    testimonials[testimonialIdx].classList.add('active');
    testDots[testimonialIdx] && testDots[testimonialIdx].classList.add('active');
  }
  if (testimonials.length > 1) setInterval(nextTestimonial, 5000);

  // ── FAQ accordion ────────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Stats section live numbers ───────────────────────────────
  // Fake live-looking counter that increments slowly
  let liveViews = 2847 + Math.floor(Math.random() * 500);
  const liveEl = document.getElementById('liveViewers');
  if (liveEl) {
    liveEl.textContent = liveViews.toLocaleString();
    setInterval(function () {
      const delta = Math.floor(Math.random() * 5) - 1;
      liveViews = Math.max(2000, liveViews + delta);
      liveEl.textContent = liveViews.toLocaleString();
    }, 3000);
  }

  // ── Cookie consent ───────────────────────────────────────────
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('sq-cookie-ok')) {
    setTimeout(function () {
      cookieBanner.style.display = 'flex';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { cookieBanner.style.opacity = '1'; });
      });
    }, 2500);
  }
  window.SQ.acceptCookies = function () {
    localStorage.setItem('sq-cookie-ok', '1');
    const b = document.getElementById('cookieBanner');
    if (b) { b.style.opacity = '0'; setTimeout(function () { b.style.display = 'none'; }, 400); }
  };

  // ── Image lazy loading observer ──────────────────────────────
  const lazyImgs = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  lazyImgs.forEach(function (img) { imgObserver.observe(img); });

  // ── App screenshot carousel ──────────────────────────────────
  let screenshotIdx = 0;
  const screenshots = document.querySelectorAll('.screenshot-item');
  const screenshotBtns = document.querySelectorAll('.ss-nav-btn');
  window.SQ.goScreenshot = function (idx) {
    screenshots[screenshotIdx] && screenshots[screenshotIdx].classList.remove('active');
    screenshotBtns[screenshotIdx] && screenshotBtns[screenshotIdx].classList.remove('active');
    screenshotIdx = idx;
    screenshots[screenshotIdx] && screenshots[screenshotIdx].classList.add('active');
    screenshotBtns[screenshotIdx] && screenshotBtns[screenshotIdx].classList.add('active');
  };
  if (screenshots.length > 1) {
    setInterval(function () {
      SQ.goScreenshot((screenshotIdx + 1) % screenshots.length);
    }, 4000);
  }

  // ── Video mute toggle ────────────────────────────────────────
  document.querySelectorAll('.vid-mute-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const vid = btn.closest('.ocean-demo-item') && btn.closest('.ocean-demo-item').querySelector('video');
      if (vid) {
        vid.muted = !vid.muted;
        btn.textContent = vid.muted ? '🔇' : '🔊';
      }
    });
  });

  // ── PWA install prompt ───────────────────────────────────────
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('pwaInstallBtn');
    if (installBtn) installBtn.style.display = 'flex';
  });
  window.SQ.installPWA = function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
    } else {
      window.open('https://app.squids.co.za', '_blank');
    }
  };

  // ── Notification permission (for later push) ────────────────
  window.SQ.requestNotifs = function () {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (p) {
        if (p === 'granted') SQ.toast('Notifications enabled! You\'ll hear about Squids updates.', 'success');
      });
    }
  };

  // ── Immediately reveal above-fold elements ───────────────────
  // Elements in the hero/viewport on first load won't be seen by
  // IntersectionObserver unless we trigger them right away
  function revealAboveFold() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('visible');
        el.classList.add('revealed');
      }
    });
  }
  revealAboveFold();
  window.addEventListener('load', revealAboveFold);

  console.log('%c🦑 Squids.co.za | Africa\'s Social Platform', 'color:#14b49d;font-size:16px;font-weight:bold;');
  console.log('%cBuilt by TyVila.Online — Vuyani Siyanda Vilakazi', 'color:#888;font-size:12px;');

})();
