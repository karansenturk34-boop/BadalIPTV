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
            showNeonNotification('Arama: ' + searchTerm);
            this.value = '';
        }
    }
});

// Login button functionality
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function() {
    console.log('Giriş sayfasına yönlendiriliyor...');
    showNeonNotification('Giriş sayfasına yönlendirileceksiniz!');
});

// CTA Button functionality
const ctaBtn = document.querySelector('.cta-btn');
ctaBtn.addEventListener('click', function() {
    console.log('Ücretsiz deneme başlatılıyor...');
    showNeonNotification('Ücretsiz deneme sürümü başlatıldı!');
});

// Channel cards - Play button animation
document.querySelectorAll('.channel-card').forEach(card => {
    card.addEventListener('click', function() {
        const channelName = this.querySelector('h3').textContent;
        console.log('Kanal açılıyor: ' + channelName);
        showNeonNotification('🎬 ' + channelName + ' kanalı açılıyor...');
    });
});

// Movie/Series cards - Watch button functionality
document.querySelectorAll('.watch-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const title = this.closest('.movie-card, .series-card').querySelector('h3').textContent;
        console.log('İzleme başlatılıyor: ' + title);
        showNeonNotification('▶️ ' + title + ' izlenmeye başlanıyor...');
    });
});

// Sports cards - Click functionality
document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('click', function() {
        const sportName = this.querySelector('h3').textContent;
        console.log('Spor kanalı açılıyor: ' + sportName);
        showNeonNotification('⚽ ' + sportName + ' canlı yayınları izlenecek...');
    });
});

// Category cards - Click functionality
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('h3').textContent;
        console.log('Kategori açılıyor: ' + categoryName);
        showNeonNotification('📺 ' + categoryName + ' kategorisine gidiliyor...');
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
            link.style.color = '#00ffff';
            link.style.textShadow = '0 0 10px #00ffff';
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

// Neon notification system
function showNeonNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'neon-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, rgba(51, 0, 102, 0.9), rgba(26, 0, 51, 0.9));
        border: 2px solid #00ffff;
        color: #ffff00;
        padding: 15px 25px;
        border-radius: 10px;
        font-family: 'Orbitron', monospace;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(255, 0, 255, 0.3);
        animation: slideInRight 0.4s ease;
        letter-spacing: 1px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add ripple animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes neonPulse {
        0%, 100% {
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }
        50% {
            text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Click ripple effect on buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 0, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: expand 0.6s ease-out;
        `;

        const keyframes = `
            @keyframes expand {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('style[data-ripple]')) {
            const rippleStyle = document.createElement('style');
            rippleStyle.setAttribute('data-ripple', 'true');
            rippleStyle.textContent = keyframes;
            document.head.appendChild(rippleStyle);
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Search box neon focus effect
if (searchBox) {
    searchBox.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.2)';
    });

    searchBox.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });
}

// Add random neon glow to cards on hover
document.querySelectorAll('.channel-card, .movie-card, .series-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const glowColors = ['#ff00ff', '#00ffff', '#ffff00'];
        const randomColor = glowColors[Math.floor(Math.random() * glowColors.length)];
        this.style.borderColor = randomColor;
    });
});

// Initialize parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrollPos = window.pageYOffset;
        hero.style.transform = `translateY(${scrollPos * 0.5}px)`;
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === '?' || e.key === '/') {
        showNeonNotification('🎮 Kısayollar: Ana Sayfa(H) | Kanallar(C) | Filmler(M)');
    }
    if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('a[href="#home"]').click();
    }
});

// Log başarılı yükleme
console.log('%c🎬 Premium90 - Retro Neon IPTV Platformu 🎬', 'color: #ff00ff; font-size: 20px; text-shadow: 0 0 10px #00ffff; font-weight: bold;');
console.log('%c90\'lar tarzı neon efektleri aktif! Hoşgeldiniz!', 'color: #00ffff; font-size: 14px; font-weight: bold;');
