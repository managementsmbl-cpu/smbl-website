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

/* ===== Referenzen-Carousel: Pfeil-Navigation ===== */
document.querySelectorAll('.refs').forEach(function (refs) {
  var track = refs.querySelector('.refs__track');
  if (!track) return;
  var prev = refs.querySelector('.refs__nav--prev');
  var next = refs.querySelector('.refs__nav--next');
  function step() {
    var card = track.querySelector('.ref-card');
    return (card ? card.offsetWidth + 24 : 260) * 1.2;
  }
  if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
});

/* ===== Formulare: mailto-Versand (oeffnet Mail-Programm mit vorausgefuellten Feldern) ===== */
document.querySelectorAll('form[data-form="lead"]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Honeypot: wenn ausgefuellt, still abbrechen (Bot)
    var hp = form.querySelector('[name="website"]');
    if (hp && hp.value) return;

    var to = 'info@smblmedia.com';
    var subject = form.getAttribute('data-subject') || 'Anfrage über smblmedia.com';
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.name === 'website' || el.name === 'consent') return;
      var labelEl = el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
      var label = labelEl ? labelEl.textContent.trim().replace(/\s*\*$/, '') : el.name;
      var val = (el.value || '').trim();
      if (val) lines.push(label + ': ' + val);
    });
    var body = lines.join('\n') + '\n\n(Gesendet über smblmedia.com)';
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
});
