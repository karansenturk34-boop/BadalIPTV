// Smooth scrolling for navigation links
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

// Search functionality
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value;
        if (searchTerm) {
            console.log('Arama yapılıyor: ' + searchTerm);
            // Burada gerçek arama işlevi eklenebilir
            alert('Arama: ' + searchTerm);
        }
    }
});

// Login button functionality
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function() {
    console.log('Giriş sayfasına yönlendiriliyor...');
    // Burada login sayfasına yönlendirme yapılabilir
    alert('Giriş sayfasına yönlendirileceksiniz!');
});

// CTA Button functionality
const ctaBtn = document.querySelector('.cta-btn');
ctaBtn.addEventListener('click', function() {
    console.log('Ücretsiz deneme başlatılıyor...');
    alert('Ücretsiz deneme sürümü başlatıldı!');
});

// Channel cards - Play button animation
document.querySelectorAll('.channel-card').forEach(card => {
    card.addEventListener('click', function() {
        const channelName = this.querySelector('h3').textContent;
        console.log('Kanal açılıyor: ' + channelName);
        alert(channelName + ' kanalı açılıyor...');
    });
});

// Movie/Series cards - Watch button functionality
document.querySelectorAll('.watch-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const title = this.closest('.movie-card, .series-card').querySelector('h3').textContent;
        console.log('İzleme başlatılıyor: ' + title);
        alert(title + ' izlenmeye başlanıyor...');
    });
});

// Sports cards - Click functionality
document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('click', function() {
        const sportName = this.querySelector('h3').textContent;
        console.log('Spor kanalı açılıyor: ' + sportName);
        alert(sportName + ' canlı yayınları izlenecek...');
    });
});

// Category cards - Click functionality
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        console.log('Kategori açılıyor: ' + categoryName);
        alert(categoryName + ' kategorisine gidiliyor...');
    });
});

// Scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.category-card, .channel-card, .movie-card, .series-card, .sport-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = 'white';
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = '#ff8c42';
        }
    });
});

// Mobile menu toggle (if needed for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}

// Add click animation effect
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Search box focus effect
searchBox.addEventListener('focus', function() {
    this.style.background = 'rgba(255, 255, 255, 0.3)';
});

searchBox.addEventListener('blur', function() {
    this.style.background = 'rgba(255, 255, 255, 0.2)';
});

console.log('90plus IPTV - Script yüklendi başarıyla!');
