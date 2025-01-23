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

// Card animations with Intersection Observer
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
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        
        modal.querySelector('.modal-image').src = firstImage.src;
        modal.querySelector('.modal-title').textContent = cardContent.querySelector('h3').textContent;
        modal.querySelector('.modal-rating').textContent = cardContent.querySelector('.rating').textContent;
        modal.querySelector('.modal-price').textContent = cardContent.querySelector('.price').textContent;
        modal.querySelector('.modal-description').textContent = cardContent.querySelector('p').textContent;
        modal.querySelector('.modal-cta').href = locationUrl;

        // Set product-specific amenities
        const amenitiesList = modal.querySelector('.amenities-list');
        const amenities = {
            en: [
                {icon: "fas fa-box", text: "Custom Packaging"},
                {icon: "fas fa-truck", text: "Free Delivery"},
                {icon: "fas fa-palette", text: "Custom Design"},
                {icon: "fas fa-clock", text: "24-48h Production"},
                {icon: "fas fa-medal", text: "Quality Guarantee"},
                {icon: "fas fa-percent", text: "Bulk Discounts"}
            ],
            fr: [
                {icon: "fas fa-box", text: "Emballage personnalisé"},
                {icon: "fas fa-truck", text: "Livraison gratuite"},
                {icon: "fas fa-palette", text: "Design personnalisé"},
                {icon: "fas fa-clock", text: "Production 24-48h"},
                {icon: "fas fa-medal", text: "Garantie qualité"},
                {icon: "fas fa-percent", text: "Remises en gros"}
            ],
            ar: [
                {icon: "fas fa-box", text: "تغليف مخصص"},
                {icon: "fas fa-truck", text: "توصيل مجاني"},
                {icon: "fas fa-palette", text: "تصميم مخصص"},
                {icon: "fas fa-clock", text: "إنتاج 24-48 ساعة"},
                {icon: "fas fa-medal", text: "ضمان الجودة"},
                {icon: "fas fa-percent", text: "خصومات للجملة"}
            ]
        };

        amenitiesList.innerHTML = amenities[currentLang]
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
        welcome: "Collection Mk",
        discover: "Discover your best choice",
        products: "Products",
        from: "From",
        viewMaps: "View on Maps"
    },
    fr: {
        welcome: "Collection Mk",
        discover: "Découvrez votre meilleur choix",
        products: "Produits",
        from: "À partir de",
        viewMaps: "Voir sur Maps"
    },
    ar: {
        welcome: "Collection Mk",
        discover: "اكتشف أفضل خيار لك",
        products: "المنتجات",
        from: "من",
        viewMaps: "عرض على الخريطة"
    }
};

function changeLanguage(lang) {
    // Set document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update text content for elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Update hero content and section title
    document.querySelector('.hero-content h1').textContent = translations[lang].welcome;
    document.querySelector('.hero-content p').textContent = translations[lang].discover;
    document.querySelector('.section-title').textContent = translations[lang].products;

    // Update cards
    document.querySelectorAll('.card').forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const price = card.querySelector('.price');
        
        // Update card titles based on content
        
        
        // Update price format
        const priceValue = price.textContent.match(/\d+/)?.[0] || '';
        if (priceValue) {
            price.textContent = `${translations[lang].from} ${priceValue} DA`;
        }
    });

    // Update modal text
    document.querySelector('.modal-cta').textContent = translations[lang].viewMaps;

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize with preferred language or default to English
document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(preferredLanguage);
});

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Initialize hero slider
initHeroSlider();