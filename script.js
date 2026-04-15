/* ═══════════════════════════════════════════════════
   MIRIAN NAHOMI · XV AÑOS · MAIN SCRIPT
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── PARTICLES ──────────────────────────────────── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const count = window.innerWidth < 480 ? 25 : 55;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        --dur:${Math.random()*6+5}s;
        --delay:${Math.random()*5}s;
        --op:${Math.random()*0.35+0.05};
        --tx:${(Math.random()-0.5)*60}px;
        --ty:${(Math.random()-0.5)*60}px;
        --sc:${Math.random()*1.5+0.5};
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ─── COUNTDOWN ──────────────────────────────────── */
  function getNextCountdownTarget() {
    const now = new Date();
    const thisYearEvent = new Date(`${now.getFullYear()}-05-15T19:00:00`);
    if (now <= thisYearEvent) return thisYearEvent;
    return new Date(`${now.getFullYear() + 1}-05-15T19:00:00`);
  }

  const target = getNextCountdownTarget();

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now  = new Date();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent  = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent  = '00';
      document.getElementById('cd-secs').textContent  = '00';
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    const elDays  = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins  = document.getElementById('cd-mins');
    const elSecs  = document.getElementById('cd-secs');

    function set(el, val) {
      const formatted = pad(val);
      if (el && el.textContent !== formatted) {
        el.textContent = formatted;
        el.classList.remove('flip');
        void el.offsetWidth; // reflow
        el.classList.add('flip');
      }
    }

    set(elDays,  days);
    set(elHours, hours);
    set(elMins,  mins);
    set(elSecs,  secs);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ─── NAV SCROLL ──────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  /* ─── MOBILE NAV ─────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.querySelector('.nav__links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ─── SMOOTH SCROLL ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = nav ? nav.offsetHeight + 20 : 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── SCROLL REVEAL ──────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.invitation__card, .pull-quote, .gallery__item, .timeline__item, ' +
    '.letter__inner, .inv-detail, .upload-note__card, ' +
    '.section-label, .section-title, .invitation__divider, ' +
    '.gallery__header, .gallery__subtitle, .footer__inner'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings slightly
        const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
  //Thezero
  /* ─── ACTIVE NAV LINK ────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          a.style.opacity = '';
        });
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) {
          active.style.color = 'var(--gold)';
          active.style.opacity = '1';
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});
