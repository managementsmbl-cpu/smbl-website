// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Impressum Modal
const impressumModal = document.getElementById('impressumModal');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('[href="#impressum"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        impressumModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    impressumModal.classList.remove('active');
    document.body.style.overflow = '';
});

impressumModal.addEventListener('click', (e) => {
    if (e.target === impressumModal) {
        impressumModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth reveal animations via CSS classes
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.service-card, .work-card, .testimonial-card, .about-content, .about-image, .contact-info, .contact-form-wrapper').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    observer.observe(el);
});

// Contact form (placeholder)
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Vielen Dank für deine Nachricht! Wir melden uns in Kürze bei dir.');
    e.target.reset();
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[1]);
                const suffix = text.replace(match[1], '');
                let current = 0;
                const step = Math.max(1, Math.floor(target / 40));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    el.textContent = current + suffix;
                }, 30);
            }
            statsObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));
