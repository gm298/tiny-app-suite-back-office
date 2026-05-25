/**
 * Tiny App Suite Operations Manual — vanilla JS
 * Carousels, scroll reveal, sidebar, search, lightbox zoom
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ——— Sidebar & active section ——— */
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.sidebar nav a[href^="#"]');
  const sections = [...document.querySelectorAll('.doc-section[id]')];

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', sidebar.classList.contains('is-open'));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) sidebar.classList.remove('is-open');
      });
    });
  }

  function setActiveNav() {
    let current = sections[0]?.id;
    const offset = 120;
    for (const section of sections) {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) current = section.id;
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ——— Scroll reveal ——— */
  const revealEls = document.querySelectorAll('.doc-section.reveal, .img-frame.reveal-img');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ——— Carousels ——— */
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const track = root.querySelector('.carousel-track');
    const slides = [...root.querySelectorAll('.carousel-slide')];
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const dotsContainer = root.querySelector('.carousel-dots');
    const counter = root.querySelector('[data-carousel-counter]');
    let index = 0;

    if (!track || slides.length === 0) return;

    function goTo(i) {
      index = ((i % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
      if (prevBtn) prevBtn.disabled = slides.length <= 1;
      if (nextBtn) nextBtn.disabled = slides.length <= 1;
      root.querySelectorAll('.carousel-dot').forEach((dot, di) => {
        dot.classList.toggle('active', di === index);
        dot.setAttribute('aria-selected', di === index ? 'true' : 'false');
      });
    }

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to step ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer?.appendChild(dot);
    });

    prevBtn?.addEventListener('click', () => goTo(index - 1));
    nextBtn?.addEventListener('click', () => goTo(index + 1));

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    goTo(0);
  });

  /* ——— Lightbox (click to zoom) ——— */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(img) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption) {
      const cap = img.closest('figure')?.querySelector('figcaption');
      lightboxCaption.textContent = cap?.textContent || img.alt || '';
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.img-frame img').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ——— Placeholder fallback for missing images ——— */
  document.querySelectorAll('.img-frame img').forEach((img) => {
    img.classList.add('is-placeholder');
    img.addEventListener('error', function onErr() {
      this.removeEventListener('error', onErr);
      const label = this.alt || 'Screenshot placeholder';
      const w = this.getAttribute('width') || 800;
      const h = this.getAttribute('height') || 450;
      this.src = `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          <rect fill="#1e293b" width="100%" height="100%"/>
          <rect fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="8 6" x="24" y="24" width="${w - 48}" height="${h - 48}" rx="12"/>
          <text x="50%" y="48%" fill="#64748b" font-family="system-ui,sans-serif" font-size="16" text-anchor="middle">Drop image in /images</text>
          <text x="50%" y="56%" fill="#94a3b8" font-family="system-ui,sans-serif" font-size="13" text-anchor="middle">${label.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>
        </svg>`,
      )}`;
    });
  });

  /* ——— Search ——— */
  const searchInput = document.getElementById('doc-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      sections.forEach((section) => {
        const text = section.textContent.toLowerCase();
        const match = !q || text.includes(q);
        section.classList.toggle('search-hidden', !match);
      });
      navLinks.forEach((link) => {
        const id = link.getAttribute('href')?.slice(1);
        const section = document.getElementById(id || '');
        if (section) link.classList.toggle('search-hidden', section.classList.contains('search-hidden'));
      });
    });
  }
})();
