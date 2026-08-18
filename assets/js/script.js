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

// Order form modal (WhatsApp)
const orderModal = document.getElementById('orderModal');
if (orderModal) {
  const orderForm = document.getElementById('orderForm');
  const orderError = document.getElementById('orderFormError');
  const orderNotes = document.getElementById('orderNotes');
  const openTriggers = document.querySelectorAll('.js-open-order-form');
  const closeTriggers = orderModal.querySelectorAll('[data-close]');
  const ORDER_WHATSAPP_NUMBER = '6581784966';
  let lastFocused = null;

  function openOrderModal(trigger) {
    lastFocused = document.activeElement;
    orderModal.classList.add('is-open');
    orderModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (trigger?.dataset.note && !orderNotes.value) {
      orderNotes.value = trigger.dataset.note;
    }
    orderError.hidden = true;
    document.getElementById('orderName')?.focus();
  }

  function closeOrderModal() {
    orderModal.classList.remove('is-open');
    orderModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocused?.focus();
  }

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', () => openOrderModal(btn));
  });

  closeTriggers.forEach((el) => {
    el.addEventListener('click', closeOrderModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal.classList.contains('is-open')) closeOrderModal();
  });

  orderForm.querySelectorAll('.item-check').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const qtyInput = checkbox.closest('.order-item-row').querySelector('.item-qty');
      qtyInput.disabled = !checkbox.checked;
    });
  });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('orderName').value.trim();
    const contact = document.getElementById('orderContact').value.trim();
    const notes = orderNotes.value.trim();
    const checked = Array.from(orderForm.querySelectorAll('.item-check:checked'));

    if (!name || !contact) {
      orderError.textContent = 'Please fill in your name and contact number.';
      orderError.hidden = false;
      return;
    }
    if (checked.length === 0) {
      orderError.textContent = 'Please select at least one item.';
      orderError.hidden = false;
      return;
    }
    orderError.hidden = true;

    const lines = [
      "Hi Supreme Meat, I'd like to place an order:",
      '',
      `*Name:* ${name}`,
      `*Contact:* ${contact}`,
      '',
      '*Items:*',
    ];
    checked.forEach((cb) => {
      const qty = cb.closest('.order-item-row').querySelector('.item-qty').value || '1';
      lines.push(`- ${cb.value} x ${qty}kg`);
    });
    if (notes) {
      lines.push('');
      lines.push(`*Notes:* ${notes}`);
    }

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${ORDER_WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
    closeOrderModal();
    orderForm.reset();
    orderForm.querySelectorAll('.item-qty').forEach((q) => { q.disabled = true; });
  });
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
