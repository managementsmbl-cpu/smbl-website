// SMBL.media · Site JS · Mai 2026

// Mobile Navigation Toggle
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    const expanded = nav.classList.contains('is-open');
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });
}

// Mark active nav link based on current path
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Scroll-triggered fade-ins
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Form: simple mailto handoff so the static site can send leads
document.querySelectorAll('form[data-form="lead"]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Anfrage über smbl.media · ${data.get('name') || 'Lead'}`);
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (v) lines.push(`${k}: ${v}`);
    }
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:management.smbl@gmail.com?subject=${subject}&body=${body}`;
  });
});
