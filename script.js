'use strict';

const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

function handleHeaderScroll() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function handleActiveLink() {
  const cursor = window.scrollY + 140;

  navItems.forEach((link) => {
    const targetId = link.getAttribute('href');
    const section = targetId ? document.querySelector(targetId) : null;
    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle('active', cursor >= top && cursor < bottom);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
window.addEventListener('scroll', handleActiveLink, { passive: true });
handleHeaderScroll();
handleActiveLink();

const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

const validators = {
  name: (value) => value.trim().length >= 2 || 'Please enter your full name (min 2 characters).',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Please enter a valid email address.',
  message: (value) => value.trim().length >= 10 || 'Message should be at least 10 characters.'
};

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (!input || !error) return;

  error.textContent = message || '';
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateField(fieldId) {
  const input = document.getElementById(fieldId);
  const validator = validators[fieldId];
  if (!input || !validator) return true;

  const result = validator(input.value);
  if (result !== true) {
    showFieldError(fieldId, result);
    return false;
  }

  showFieldError(fieldId, '');
  return true;
}

if (form) {
  ['name', 'email', 'message'].forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.addEventListener('blur', () => validateField(fieldId));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateField(fieldId);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const allValid = ['name', 'email', 'message'].map(validateField).every(Boolean);
    if (!allValid) return;

    form.reset();
    if (successMessage) {
      successMessage.hidden = false;
    }
  });
}

const anchors = [...document.querySelectorAll('a[href^="#"]')];
anchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = anchor.getAttribute('href');
    if (!target || target === '#') return;

    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
