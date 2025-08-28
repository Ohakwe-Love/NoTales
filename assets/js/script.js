// Navigation functionality
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Active navigation links on scroll
const sections = document.querySelectorAll('.section, .hero');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to current section link
            const targetLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }

            // Add visible class for animations
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submissions
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Book card interactions
const bookCards = document.querySelectorAll('.book-card');
bookCards.forEach(card => {
    card.addEventListener('click', () => {
        const bookTitle = card.querySelector('.book-title').textContent;
        alert(`You clicked on "${bookTitle}". In a real store, this would take you to the book details page.`);
    });
});

// Gallery interactions
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        alert('In a real implementation, this would open a lightbox gallery.');
    });
});

// Pricing card interactions
const pricingButtons = document.querySelectorAll('.pricing-card .cta-button');
pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        const planName = button.closest('.pricing-card').querySelector('.pricing-title').textContent;
        alert(`You selected the "${planName}" plan. In a real store, this would redirect to the checkout page.`);
    });
});

// CTA button interaction
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    if (!button.closest('.pricing-card') && !button.closest('.contact-form')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('featured').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Add some entrance animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.book-card, .pricing-card, .gallery-item');

    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animationDelay = `${index * 0.1}s`;
            element.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run on load
