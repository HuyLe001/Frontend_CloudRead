// Enhanced Main JavaScript for BookReader Frontend

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupScrollEffects();
    setupSearch();
    setupAuthButtons();
    setupBookCards();
    setupStoryCards();
    setupNewStoryCards();
    setupTrendingTabs();
    setupNewsletter();
    setupStatisticsAnimation();
    setupCategoryToggle();
    checkUserStatus();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navAuth = document.querySelector('.nav-auth');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            navAuth.classList.toggle('show');
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Setup search functionality
function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('#search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        
        // Enter key search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Perform search function
function performSearch() {
    const searchInput = document.querySelector('#search-input');
    const categorySelect = document.querySelector('#category-filter');
    const searchBtn = document.querySelector('.search-btn');
    
    const searchTerm = searchInput.value.trim();
    const category = categorySelect ? categorySelect.value : '';
    
    if (searchTerm || category) {
        // Show loading state
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tìm...';
        searchBtn.disabled = true;
        
        // Navigate to search results page
        setTimeout(() => {
            navigateToSearchResults(searchTerm, category);
        }, 500);
    } else {
        showMessage('Vui lòng nhập từ khóa tìm kiếm!', 'error');
    }
}

// Navigate to search results page
function navigateToSearchResults(searchTerm, category) {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (category) params.set('category', category);
    
    const searchUrl = `search-results.html?${params.toString()}`;
    window.location.href = searchUrl;
}



// Navigate to book detail
function goToBookDetail(bookId) {
    window.location.href = `book-detail.html?id=${bookId}`;
}

// Setup authentication buttons
function setupAuthButtons() {
    const loginBtn = document.querySelector('[data-action="login"]');
    const registerBtn = document.querySelector('[data-action="register"]');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
}

// Setup book cards interaction
function setupBookCards() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            goToBookDetail(index + 1);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Check user login status
function checkUserStatus() {
    const user = localStorage.getItem('user');
    const loginBtn = document.querySelector('[data-action="login"]');
    const registerBtn = document.querySelector('[data-action="register"]');
    
    if (user && loginBtn && registerBtn) {
        const userData = JSON.parse(user);
        
        // Create user dropdown instead of replacing buttons
        const navAuth = document.querySelector('.nav-auth');
        if (navAuth) {
            navAuth.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-menu-btn" onclick="showUserMenu()">
                        <i class="fas fa-user-circle"></i>
                        <span class="user-name">${userData.name || 'User'}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <button class="logout-btn" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        Đăng xuất
                    </button>
                </div>
            `;
            
            // Add styles for user dropdown
            if (!document.querySelector('#user-dropdown-styles')) {
                const style = document.createElement('style');
                style.id = 'user-dropdown-styles';
                style.textContent = `
                    .user-dropdown {
                        display: flex;
                        gap: 0.5rem;
                        align-items: center;
                    }
                    .user-menu-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        background: transparent;
                        border: 1px solid #667eea;
                        color: #667eea;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    }
                    .user-menu-btn:hover {
                        background: #667eea;
                        color: white;
                    }
                    .logout-btn {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        background: #f56565;
                        border: none;
                        color: white;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    }
                    .logout-btn:hover {
                        background: #e53e3e;
                        transform: translateY(-1px);
                    }
                    @media (max-width: 768px) {
                        .user-dropdown {
                            flex-direction: column;
                            gap: 0.3rem;
                        }
                        .user-menu-btn,
                        .logout-btn {
                            padding: 0.4rem 0.8rem !important;
                            font-size: 12px !important;
                        }
                        .user-name {
                            display: none;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
}

// Show user menu
function showUserMenu() {
    const user = JSON.parse(localStorage.getItem('user'));
    const purchased = JSON.parse(localStorage.getItem('purchasedBooks') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    let menuHTML = `
        <div class="user-menu-content">
            <h4>Thông tin tài khoản</h4>
            <p>Email: ${user.email}</p>
            <p>Sách đã mua: ${purchased.length}</p>
            <p>Danh sách yêu thích: ${wishlist.length}</p>
            <button onclick="logout()" class="logout-btn-inline">Đăng xuất</button>
        </div>
    `;
    
    showMessage(menuHTML, 'info');
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('purchasedBooks');
    localStorage.removeItem('wishlist');
    showMessage('Đã đăng xuất thành công!', 'success');
    
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

// Utility functions - using shared utils

// Setup story cards interaction
function setupStoryCards() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach((card, index) => {
        const quickReadBtn = card.querySelector('.quick-read');
        const favoriteBtn = card.querySelector('.add-favorite');
        
        // Quick read button
        if (quickReadBtn) {
            quickReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const user = checkAuth();
                if (!user) {
                    showMessage('Vui lòng đăng nhập để đọc truyện!', 'error');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                    return;
                }
                
                const title = card.querySelector('.story-title').textContent;
                showMessage(`Đang mở "${title}" chương 1...`, 'success');
                
                setTimeout(() => {
                    window.location.href = `reader.html?story=${index + 1}&chapter=1`;
                }, 1000);
            });
        }
        
        // Favorite button
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = card.querySelector('.story-title').textContent;
                const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                
                if (!wishlist.includes(title)) {
                    wishlist.push(title);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    favoriteBtn.innerHTML = '<i class="fas fa-heart favorite-heart"></i>';
                    showMessage(`Đã thêm "${title}" vào yêu thích!`, 'success');
                } else {
                    showMessage('Truyện đã có trong danh sách yêu thích!', 'info');
                }
            });
        }
        
        // Card click
        card.addEventListener('click', () => {
            goToBookDetail(index + 1);
        });
    });
}

// Setup new story cards (phần truyện mới cập nhật)
function setupNewStoryCards() {
    const newStoryCards = document.querySelectorAll('.story-card-new');
    
    newStoryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.story-name').textContent;
            showMessage(`Đang mở truyện: ${title}...`, 'info');
            
            setTimeout(() => {
                goToBookDetail(index + 1);
            }, 500);
        });
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Setup trending tabs
function setupTrendingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked tab
            btn.classList.add('active');
            
            const category = btn.dataset.tab;
            showMessage(`Lọc theo: ${btn.textContent}`, 'info');
            
            // Here you would filter the trending list
            // For now, just show message
        });
    });
}

// Setup newsletter
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            if (email) {
                showMessage('Đăng ký thành công! Cảm ơn bạn đã quan tâm.', 'success');
                e.target.reset();
            }
        });
    }
}

// Statistics counter animation
function setupStatisticsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element) => {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 16);
    };
    
    const formatNumber = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    };
    
    // Intersection Observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Setup category toggle functionality
function setupCategoryToggle() {
    // Setup category card clicks - chuyển hướng đến trang book-list
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            const category = card.dataset.category;
            const categoryName = card.querySelector('h3').textContent;
            
            showMessage(`Đang chuyển đến thể loại: ${categoryName}...`, 'info');
            
            // Chuyển hướng đến trang book-list với category
            setTimeout(() => {
                window.location.href = `book-list.html?category=${category}`;
            }, 500);
        });
    });
    
    // Setup story item clicks
    const storyItems = document.querySelectorAll('.story-item-compact');
    storyItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4').textContent;
            showMessage(`Đang mở truyện: ${title}...`, 'info');
            setTimeout(() => {
                goToBookDetail(index + 1);
            }, 500);
        });
    });
}

    
// Filter stories by category (mock function) - Removed as we're redirecting instead
// This function is no longer needed

// Add CSS animations for messages  
// Add homepage-specific styles (animations provided by utils.js)
const style = document.createElement('style');
style.textContent = `
    .book-card, .story-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .category-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .category-card:hover {
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);

// ===================================
// HERO SLIDER FUNCTIONALITY
// ===================================

// Hero Slider
function setupHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;
    
    // Show slide
    function showSlide(index) {
        // Remove active from all
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active to current
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
}

// Hero Search
function setupHeroSearch() {
    const searchInput = document.getElementById('heroSearchInput');
    const searchBtn = document.getElementById('heroSearchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                showMessage(`Đang tìm kiếm: ${searchTerm}...`, 'info');
                setTimeout(() => {
                    window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
                }, 500);
            } else {
                showMessage('Vui lòng nhập từ khóa tìm kiếm!', 'error');
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
}

// Update initializeApp to include slider
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupHeroSlider();
    setupHeroSearch();
});