// Scroll reveal
const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    });

    revealTargets.forEach(el => revealObserver.observe(el));
} else {
    revealTargets.forEach(el => el.classList.add('active'));
}

// Header and active navigation
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = [...navLinks]
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateHeaderState() {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }

    const currentSection = sections
        .filter(section => window.scrollY >= section.offsetTop - 150)
        .pop();

    navLinks.forEach(link => {
        link.classList.toggle('active', currentSection && link.getAttribute('href') === `#${currentSection.id}`);
    });
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('load', updateHeaderState);
updateHeaderState();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const selector = this.getAttribute('href');

        if (!selector || selector === '#') {
            return;
        }

        const target = document.querySelector(selector);

        if (target) {
            e.preventDefault();
            closeMobileNav();

            window.scrollTo({
                top: target.offsetTop - 86,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

function closeMobileNav() {
    document.body.classList.remove('nav-open');

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('nav-open');
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('nav') && document.body.classList.contains('nav-open')) {
            closeMobileNav();
        }
    });
}

// Accordion Toggle
function toggleAccordion(element) {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
            const icon = item.querySelector('.fa-minus');
            if(icon) icon.classList.replace('fa-minus', 'fa-plus');
        }
    });

    element.classList.toggle('active');
    const icon = element.querySelector('i');
    if (element.classList.contains('active')) {
        icon.classList.replace('fa-plus', 'fa-minus');
    } else {
        icon.classList.replace('fa-minus', 'fa-plus');
    }
}

// Gallery Scroll Logic
const galleryScroll = document.getElementById('galleryScroll');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (galleryScroll && prevBtn && nextBtn) {
    const scrollAmount = 400; // Adjust based on item width + gap

    prevBtn.addEventListener('click', () => {
        galleryScroll.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        galleryScroll.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Hide/Show buttons based on scroll position
    galleryScroll.addEventListener('scroll', () => {
        const isAtStart = galleryScroll.scrollLeft <= 0;
        const isAtEnd = galleryScroll.scrollLeft + galleryScroll.clientWidth >= galleryScroll.scrollWidth - 10;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    });

    // Trigger scroll event once to set initial button state
    galleryScroll.dispatchEvent(new Event('scroll'));
}

// Comparison Slider Logic
document.querySelectorAll('.slider-input').forEach(input => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        const parent = e.target.closest('.comparison-slider');
        const beforeImg = parent.querySelector('.img-before');
        const button = parent.querySelector('.slider-button');
        
        beforeImg.style.width = `${value}%`;
        button.style.left = `${value}%`;
    });
});

// Appointment request
const appointmentForm = document.querySelector('.appointment-form');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(appointmentForm);
        const name = (formData.get('name') || '').toString().trim();
        const phone = (formData.get('phone') || '').toString().trim();
        const service = (formData.get('service') || '').toString().trim();

        if (!name || !phone || service === 'Select Service') {
            appointmentForm.reportValidity();
            return;
        }

        const message = [
            'Hello Olivian Dental Care, I would like to book an appointment.',
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Service: ${service}`
        ].join('\n');

        window.open(`https://wa.me/918429997388?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
        appointmentForm.reset();
    });
}
