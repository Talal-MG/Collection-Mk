 // Initialize Swiper for all cards
 document.querySelectorAll('.swiper').forEach(element => {
    new Swiper(element, {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

// Enhanced smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Enhanced card animations with Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.card').forEach((card) => {
    observer.observe(card);
});

// Modal functionality
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const cardContent = card.querySelector('.card-content');
        const firstImage = card.querySelector('.swiper-slide img');
        const modal = document.getElementById('cardModal');
        const locationUrl = card.getAttribute('data-location');
        
        // Set modal content
        modal.querySelector('.modal-image').src = firstImage.src;
        modal.querySelector('.modal-title').textContent = cardContent.querySelector('h3').textContent;
        
        // Set rating if it exists
        const cardRating = cardContent.querySelector('.rating');
        const modalRating = modal.querySelector('.modal-rating');
        if (cardRating) {
            modalRating.textContent = cardRating.textContent;
            modalRating.style.display = 'block';
        } else {
            modalRating.style.display = 'none';
        }

        // Set price if it exists
        const cardPrice = cardContent.querySelector('.price');
        const modalPrice = modal.querySelector('.modal-price');
        if (cardPrice) {
            modalPrice.textContent = cardPrice.textContent;
            modalPrice.style.display = 'block';
        } else {
            modalPrice.style.display = 'none';
        }

        // Set description
        modal.querySelector('.modal-description').textContent = cardContent.querySelector('p').textContent;

        // Set location URL for the CTA button
        modal.querySelector('.modal-cta').href = locationUrl;

        // Set amenities based on card type
        const amenitiesList = modal.querySelector('.amenities-list');
        const cardTitle = cardContent.querySelector('h3').textContent.toLowerCase();
        
        let amenities = [];
        
        if (cardTitle.includes('trophie')) {
            amenities = [
                {icon: "fas fa-star", text: "Premium Quality"},
                {icon: "fas fa-medal", text: "Award Winning"},
                {icon: "fas fa-headset", text: "24/7 Support"},
                {icon: "fas fa-box", text: "Gift Packaging"},
                {icon: "fas fa-exchange-alt", text: "Easy Returns"},
                {icon: "fas fa-truck", text: "Fast Delivery"}
            ];
        } else if (cardTitle.includes('dress')) {
            amenities = [
                {icon: "fas fa-ruler", text: "Custom Sizing"},
                {icon: "fas fa-tshirt", text: "Premium Fabric"},
                {icon: "fas fa-hands", text: "Handmade Details"},
                {icon: "fas fa-paint-brush", text: "Custom Design"},
                {icon: "fas fa-headset", text: "24/7 Support"},
                {icon: "fas fa-clock", text: "Quick Alterations"},
                {icon: "fas fa-shield-alt", text: "Quality Guarantee"}
            ];
        } else if (cardTitle.includes('accessories')) {
            amenities = [
                {icon: "fas fa-gem", text: "Genuine Materials"},
                {icon: "fas fa-box-heart", text: "Luxury Packaging"},
                {icon: "fas fa-certificate", text: "Authenticity Card"},
                {icon: "fas fa-headset", text: "24/7 Support"},
                {icon: "fas fa-sync", text: "Lifetime Warranty"},
                {icon: "fas fa-shield-check", text: "Quality Tested"},
                {icon: "fas fa-sparkles", text: "Unique Designs"}
            ];
        } else {
            amenities = [
                {icon: "fas fa-star", text: "Premium Quality"},
                {icon: "fas fa-box", text: "Secure Packaging"},
                {icon: "fas fa-truck", text: "Fast Shipping"},
                {icon: "fas fa-undo", text: "Easy Returns"},
                {icon: "fas fa-headset", text: "24/7 Support"},
                {icon: "fas fa-shield-alt", text: "Warranty"}
            ];
        }

        amenitiesList.innerHTML = amenities
            .map(amenity => `
                <div class="amenity-item">
                    <i class="${amenity.icon}"></i>
                    <span>${amenity.text}</span>
                </div>
            `).join('');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal functionality
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('cardModal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('cardModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Language translations
const translations = {
    en: {
        welcome: "Welcome to Collection Mk",
        discover: "Discover your best choice",
        trophie: "Trophie",
        graduation: "Robe de remise de diplome",
        carpets: "Tapis et Coran",
        printing: "Impression et publicite",
        // Add more translations as needed
    },
    fr: {
        welcome: "Bienvenue à Collection Mk",
        discover: "Découvrez votre meilleur choix",
        trophie: "Trophée",
        graduation: "Robe de remise de diplôme",
        carpets: "Tapis et Coran",
        printing: "Impression et publicité",
        // Add more translations as needed
    },
    ar: {
        welcome: "مرحباً بكم في Collection Mk",
        discover: "اكتشف أفضل اختيار لك",
        trophie: "كؤوس",
        graduation: "روب التخرج",
        carpets: "سجاد وقرآن",
        printing: "طباعة وإعلان",
        // Add more translations as needed
    }
};

function changeLanguage(lang) {
    // Set text direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update navigation links
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });

    // Update main content
    document.querySelector('.hero-content h1').textContent = translations[lang].welcome;
    document.querySelector('.hero-content p').textContent = translations[lang].discover;
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles[0].textContent = translations[lang].trophie;
    sectionTitles[1].textContent = translations[lang].graduation;
    sectionTitles[2].textContent = translations[lang].carpets;
    sectionTitles[3].textContent = translations[lang].printing;

    // Store the selected language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load preferred language on page load
document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(preferredLanguage);
});

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    // Show first slide
    slides[0].classList.add('active');
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Initialize hero slider when page loads
document.addEventListener('DOMContentLoaded', initHeroSlider);