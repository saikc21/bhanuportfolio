/* script.js – Bhanu Charan K Portfolio */
'use strict';

/* =========================================
   Utility helpers
   ========================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =========================================
   1. Mobile Navigation
   ========================================= */
const navToggle = $('#nav-toggle');
const navList   = $('#nav-list');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open', !expanded);
});

// Close menu on link click
$$('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navList.classList.remove('open');
  });
});

/* =========================================
   2. Scroll-based header style
   ========================================= */
const header = $('#header');

const handleHeaderScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', handleHeaderScroll, { passive: true });

/* =========================================
   3. Active nav link highlight on scroll
   ========================================= */
const sections = $$('section[id]');

const setActiveLink = () => {
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = $(`.nav__link[href="#${id}"]`);

    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });

/* =========================================
   4. Scroll-reveal animations (Intersection Observer)
   ========================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

$$('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

/* =========================================
   5. Typing / typewriter effect
   ========================================= */
const typedEl  = $('#typed');
const phrases  = [
  'web applications.',
  'scalable APIs.',
  'beautiful UIs.',
  'cloud solutions.',
  'open-source tools.',
];
let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;

const typeSpeed   = 80;
const deleteSpeed = 45;
const pauseAfter  = 1800;

function type() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, pauseAfter);
      return;
    }
    setTimeout(type, typeSpeed);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, deleteSpeed);
  }
}

setTimeout(type, 600);

/* =========================================
   6. Animated counters
   ========================================= */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

$$('[data-count]').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1500;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* =========================================
   7. Skill bar animations
   ========================================= */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        barObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

$$('.skill-bar__fill').forEach(fill => barObserver.observe(fill));

/* =========================================
   8. Back-to-top button
   ========================================= */
const backToTop = $('#back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================
   9. Contact form with client-side validation
   ========================================= */
const form       = $('#contact-form');
const submitBtn  = $('#submit-btn');
const formSuccess = $('#form-success');

const validators = {
  name:    v => v.trim().length >= 2    || 'Please enter your full name (min 2 chars).',
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
  subject: v => v.trim().length >= 3    || 'Subject must be at least 3 characters.',
  message: v => v.trim().length >= 10   || 'Message must be at least 10 characters.',
};

function showError(fieldId, msg) {
  const input = $(`#${fieldId}`);
  const errEl = $(`#${fieldId}-error`);
  if (!input || !errEl) return;
  input.classList.toggle('error', !!msg);
  errEl.textContent = msg || '';
}

function validateField(fieldId) {
  const input = $(`#${fieldId}`);
  if (!input) return true;
  const validate = validators[fieldId];
  if (!validate) return true;
  const result = validate(input.value);
  if (result !== true) {
    showError(fieldId, result);
    return false;
  }
  showError(fieldId, '');
  return true;
}

// Live validation on blur
['name', 'email', 'subject', 'message'].forEach(id => {
  const el = $(`#${id}`);
  if (el) {
    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(id);
    });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fields = ['name', 'email', 'subject', 'message'];
  const valid  = fields.map(validateField).every(Boolean);
  if (!valid) return;

  // Show loading state
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  btnText.hidden    = true;
  btnLoading.hidden = false;
  submitBtn.disabled = true;

  // Simulate async send (replace with your real endpoint / EmailJS / Formspree)
  await new Promise(res => setTimeout(res, 1400));

  submitBtn.hidden    = true;
  formSuccess.hidden  = false;
  form.reset();
  fields.forEach(id => showError(id, ''));
});

/* =========================================
   10. Footer year
   ========================================= */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================
   11. Smooth scroll for anchor links
      (fallback for browsers ignoring CSS scroll-behavior)
   ========================================= */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = $(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
