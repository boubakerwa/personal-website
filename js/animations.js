// Smooth scroll handling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
    } else if (currentScroll < lastScroll && currentScroll < 100) {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu handling
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', 
            menuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .blog-card, .project-card, .gallery-item, .news-item').forEach(
    element => observer.observe(element)
);

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
let currentImageIndex = 0;

function openLightbox(index) {
    if (!lightbox) return;
    
    currentImageIndex = index;
    const image = galleryItems[index].querySelector('img');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    
    if (image && lightboxImage) {
        lightboxImage.src = image.src;
        lightbox.classList.add('active');
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryItems.length) % galleryItems.length;
    openLightbox(currentImageIndex);
}

// Set up gallery interactions
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

if (lightbox) {
    lightbox.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
    lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Handle keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox(-1);
            break;
        case 'ArrowRight':
            navigateLightbox(1);
            break;
    }
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});
