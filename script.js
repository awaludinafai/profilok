// script.js
// Lightweight JS for mobile nav toggle and scroll-based reveal using IntersectionObserver

document.addEventListener('DOMContentLoaded', function () {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle && navToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // IntersectionObserver for reveal animations
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Unobserve so animation runs once
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  reveals.forEach(el => revealObserver.observe(el));

  // Add subtle parallax effect on mouse move for hero (desktop only)
  const hero = document.querySelector('.hero');
  if (hero && window.matchMedia('(min-width: 980px)').matches) {
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const visual = hero.querySelector('.card-visual');
      if (visual) {
        visual.style.transform = `translate3d(${x * 12}px, ${y * 8}px, 0)`;
      }
    });
    hero.addEventListener('mouseleave', () => {
      const visual = hero.querySelector('.card-visual');
      if (visual) visual.style.transform = '';
    });
  }
});