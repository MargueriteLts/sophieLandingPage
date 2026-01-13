// ==========================================
// SMOOTH SCROLL & INTERSECTION OBSERVER
// ==========================================

// Smooth scroll for navigation links (backup for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Don't prevent default if it's just "#"
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// FADE-IN ANIMATION ON SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const fadeElements = document.querySelectorAll('.values__item, .parcours__text, .parcours__gallery, .approche__content, .collab-card, .contact__info');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ==========================================
// DYNAMIC X SHAPES
// ==========================================

function createXShapes() {
    const container = document.querySelector('.x-shapes');
    if (!container) return;
    
    const numberOfShapes = 5;
    
    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'x-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 200 + 100}px;
            height: ${Math.random() * 200 + 100}px;
            background: url('../images/x-shape.svg') no-repeat center;
            background-size: contain;
            opacity: ${Math.random() * 0.3 + 0.1};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 15}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(shape);
    }
}

// Call on page load
createXShapes();

// ==========================================
// PARALLAX EFFECT (Optional Enhancement)
// ==========================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.x-shapes');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// RESPONSIVE NAVIGATION (Optional)
// ==========================================

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.hero__link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopButton = document.getElementById('backToTop');

// Afficher/masquer le bouton selon la position de scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Fonction de retour en haut au clic
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Alternative avec animation personnalisée (plus fluide)
// Décommente cette fonction si tu veux une animation encore plus smooth
//backToTopButton.addEventListener('click', () => {
//    const scrollToTop = () => {
//        const currentPosition = window.pageYOffset;
//        if (currentPosition > 0) {
//            window.requestAnimationFrame(scrollToTop);
//            window.scrollTo(0, currentPosition - currentPosition / 8);
//        }
//    };
//    scrollToTop();
//});