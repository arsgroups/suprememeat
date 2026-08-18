// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Homepage hero slider
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll('.slide'));
  const dots = Array.from(heroSlider.querySelectorAll('.dot'));
  const AUTO_MS = 6000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = slides.findIndex((s) => s.classList.contains('is-active'));
  if (current < 0) current = 0;
  let timer = null;

  function goTo(index) {
    slides[current]?.classList.remove('is-active');
    dots[current]?.classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current]?.classList.add('is-active');
    dots[current]?.classList.add('is-active');
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startAuto() {
    if (reduceMotion || slides.length < 2) return;
    stopAuto();
    timer = setInterval(() => goTo(current + 1), AUTO_MS);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAuto();
    });
  });

  slides.forEach((slide) => {
    slide.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const href = slide.dataset.href;
      if (!href) return;
      if (href.startsWith('#')) {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = href;
      }
    });
  });

  heroSlider.addEventListener('mouseenter', stopAuto);
  heroSlider.addEventListener('mouseleave', startAuto);
  startAuto();
}

// Graceful fallback for product photos not yet uploaded
document.querySelectorAll('.product-photo img').forEach((img) => {
  img.addEventListener('error', () => {
    img.closest('.product-photo')?.classList.add('photo-pending');
    img.remove();
  });
});

// Sticky header shrink shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 6px 20px rgba(46,7,15,.18)'
      : '0 10px 30px rgba(46,7,15,.12)';
  });
}
