// ===================================
// READER PAGE FUNCTIONALITY
// ===================================

// Global variables
let currentStory = null;
let currentChapter = 1;
let totalChapters = 245;
let isAutoScrolling = false;
let autoScrollInterval = null;
let readingSettings = {
    fontSize: 18,
    lineHeight: 1.8,
    theme: 'light',
    autoScrollSpeed: 5
};

// Mock data for testing
const mockStoryData = {
    id: 1,
    title: "Conan - Thám Tử Lừng Danh",
    author: "Aoyama Gosho",
    totalChapters: 245,
    currentChapter: 1,
    chapters: [
        {
            id: 1,
            title: "Bắt đầu cuộc phiêu lưu",
            content: `Vào một buổi sáng đầy nắng, Conan thức dậy với cảm giác có điều gì đó sắp xảy ra. Những tia nắng vàng len lỏi qua khe cửa sổ, tạo nên những dải sáng nhẹ nhàng trên sàn nhà gỗ.

"Hôm nay có vẻ sẽ là một ngày đặc biệt," cậu nghĩ thầm trong lòng. Không hiểu sao, cậu có cảm giác rằng sẽ có một vụ án thú vị nào đó đang chờ đợi.

Sau khi hoàn thành những công việc buổi sáng thường lệ, Conan quyết định ra ngoài dạo một vòng. Thành phố Tokyo luôn tấp nập, nhưng hôm nay có vẻ như có điều gì đó khác biệt.

Đi được một đoạn, cậu nghe thấy tiếng hét lớn từ phía trước. "Giúp với! Có người chết!" Đó là tiếng của một người phụ nữ, giọng run rẩy vì sợ hãi.

Conan nhanh chóng chạy về phía tiếng hét. Tại một công viên nhỏ, cậu thấy một đám đông đã tụ tập quanh một cái ghế đá. Trên ghế đó, một người đàn ông trung niên đang nằm bất tỉnh.

"Có ai đã gọi cảnh sát chưa?" Conan hỏi.

"Rồi, họ đang trên đường đến," một người đàn ông trả lời. "Nhưng trông có vẻ như ông ta đã... đã chết rồi."

Conan nhìn xung quanh. Không có dấu hiệu đánh nhau hay cướp giật. Vậy điều gì đã xảy ra với người đàn ông này?

Cậu tiến lại gần hơn, quan sát kỹ lưỡng. Đầu tiên, cậu chú ý đến vị trí thi thể. Người đàn ông nằm trong tư thế rất tự nhiên, như thể đang ngủ. Nhưng màu da mặt đã chuyển sang xanh tái.

Tiếp theo, Conan để ý đến chiếc áo khoác của nạn nhân. Trên túi áo có một vết ướt nhỏ, và có mùi hạnh nhân nhẹ bay lên.

"Độc tố," Conan nghĩ thầm. "Ai đó đã đầu độc ông ta."

Nhưng câu hỏi là: tại sao? Và quan trọng hơn, ai là hung thủ?

Tiếng còi xe cảnh sát vang lên từ xa, ngày càng gần hơn. Conan biết mình phải hành động nhanh để thu thập bằng chứng trước khi hiện trường bị phá hoại.

Cậu nhìn quanh và nhận ra có ba người có vẻ như quen biết với nạn nhân đang đứng gần đó. Họ sẽ là những nghi phạm đầu tiên mà cậu cần điều tra.

Cuộc phiêu lưu mới của Conan đã bắt đầu...`,
            publishDate: "2023-10-15",
            views: 1234,
            comments: []
        },
        {
            id: 2,
            title: "Thu thập manh mối đầu tiên",
            content: "Nội dung chương 2 sẽ được cập nhật...",
            publishDate: "2023-10-22",
            views: 987,
            comments: []
        }
    ]
};

const mockComments = [
    {
        id: 1,
        chapterId: 1,
        username: "Detective_Fan",
        avatar: "👤",
        rating: 5,
        content: "Chương này hay quá! Conan thật sự thông minh, cách suy luận rất logic.",
        time: "2 giờ trước",
        likes: 12,
        replies: []
    },
    {
        id: 2,
        chapterId: 1,
        username: "Mystery_Lover",
        avatar: "👤",
        rating: 4,
        content: "Mình rất thích cách tác giả mô tả hiện trường vụ án. Rất chi tiết và hấp dẫn!",
        time: "5 giờ trước",
        likes: 8,
        replies: []
    }
];

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    loadReadingSettings();
    applyTheme();
});

// Initialize page data
function initializePage() {
    // Get story and chapter from URL parameters (mock for now)
    const storyId = BookReaderUtils.getUrlParameter('story') || '1';
    const chapterId = BookReaderUtils.getUrlParameter('chapter') || '1';
    
    currentStory = mockStoryData;
    currentChapter = parseInt(chapterId);
    
    loadStoryInfo();
    loadChapterContent();
    loadChapterList();
    loadComments();
    updateProgress();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('backBtn').addEventListener('click', goBack);
    document.getElementById('prevChapterBtn').addEventListener('click', () => navigateChapter(-1));
    document.getElementById('nextChapterBtn').addEventListener('click', () => navigateChapter(1));
    document.getElementById('prevChapterBtnBottom').addEventListener('click', () => navigateChapter(-1));
    document.getElementById('nextChapterBtnBottom').addEventListener('click', () => navigateChapter(1));
    
    // Settings panel
    document.getElementById('settingsBtn').addEventListener('click', toggleSettingsPanel);
    document.getElementById('closeSettingsBtn').addEventListener('click', toggleSettingsPanel);
    
    // Chapter menu panel
    document.getElementById('menuBtn').addEventListener('click', toggleChapterMenu);
    document.getElementById('closeMenuBtn').addEventListener('click', toggleChapterMenu);
    
    // Bookmark button
    document.getElementById('bookmarkBtn').addEventListener('click', toggleBookmark);
    
    // Comments toggle
    document.getElementById('commentToggleBtn').addEventListener('click', toggleComments);
    
    // Submit comment
    document.getElementById('submitCommentBtn').addEventListener('click', submitComment);
    
    // Font size controls
    document.querySelectorAll('.font-btn').forEach(btn => {
        btn.addEventListener('click', (e) => changeFontSize(parseInt(e.target.dataset.size)));
    });
    
    // Line height controls
    document.querySelectorAll('.line-btn').forEach(btn => {
        btn.addEventListener('click', (e) => changeLineHeight(parseFloat(e.target.dataset.height)));
    });
    
    // Theme controls
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => changeTheme(e.target.dataset.theme));
    });
    
    // Auto scroll
    document.getElementById('autoScrollBtn').addEventListener('click', toggleAutoScroll);
    document.getElementById('scrollSpeed').addEventListener('input', (e) => {
        readingSettings.autoScrollSpeed = parseInt(e.target.value);
        saveReadingSettings();
    });
    
    // Overlay click to close panels
    document.getElementById('readerOverlay').addEventListener('click', closeAllPanels);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Auto-hide header on scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const header = document.getElementById('readerHeader');
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });
}

// Load story information
function loadStoryInfo() {
    if (!currentStory) return;
    
    document.getElementById('storyTitleMini').textContent = currentStory.title;
    totalChapters = currentStory.totalChapters;
}

// Load chapter content
function loadChapterContent() {
    if (!currentStory) return;
    
    const chapter = currentStory.chapters.find(ch => ch.id === currentChapter);
    if (!chapter) return;
    
    // Update chapter info
    document.getElementById('chapterTitle').textContent = `Chương ${chapter.id}: ${chapter.title}`;
    document.getElementById('chapterTitleMini').textContent = `Chương ${chapter.id}: ${chapter.title}`;
    document.getElementById('chapterDate').textContent = `Cập nhật: ${formatDate(chapter.publishDate)}`;
    document.getElementById('chapterViews').textContent = `${chapter.views.toLocaleString()} lượt đọc`;
    
    // Update chapter content
    const chapterText = document.getElementById('chapterText');
    const paragraphs = chapter.content.split('\n\n');
    chapterText.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('') + 
        `<div class="chapter-end">
            <div class="end-marker">--- Hết chương ---</div>
            <p class="author-note">Chương tiếp theo sẽ được cập nhật vào thứ 7 tuần sau. Cảm ơn các bạn đã đọc!</p>
        </div>`;
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevChapterBtn');
    const nextBtn = document.getElementById('nextChapterBtn');
    const prevBtnBottom = document.getElementById('prevChapterBtnBottom');
    const nextBtnBottom = document.getElementById('nextChapterBtnBottom');
    
    prevBtn.disabled = currentChapter <= 1;
    nextBtn.disabled = currentChapter >= totalChapters;
    prevBtnBottom.disabled = currentChapter <= 1;
    nextBtnBottom.disabled = currentChapter >= totalChapters;
}

// Navigate between chapters
function navigateChapter(direction) {
    const newChapter = currentChapter + direction;
    
    if (newChapter < 1 || newChapter > totalChapters) {
        showMessage('Không có chương này!', 'warning');
        return;
    }
    
    currentChapter = newChapter;
    loadChapterContent();
    loadComments();
    updateProgress();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL (optional)
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('chapter', currentChapter);
    window.history.pushState({}, '', newUrl);
}

// Update reading progress
function updateProgress() {
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    progressText.textContent = `Chương ${currentChapter} / ${totalChapters}`;
    const percentage = (currentChapter / totalChapters) * 100;
    progressFill.style.width = `${percentage}%`;
}

// Load chapter list
function loadChapterList() {
    if (!currentStory) return;
    
    const chapterList = document.getElementById('chapterList');
    let chaptersHTML = '';
    
    for (let i = 1; i <= totalChapters; i++) {
        const chapter = currentStory.chapters.find(ch => ch.id === i);
        const isActive = i === currentChapter;
        const isAvailable = chapter !== undefined;
        
        chaptersHTML += `
            <div class="chapter-item ${isActive ? 'active' : ''} ${!isAvailable ? 'unavailable' : ''}" 
                 onclick="selectChapter(${i})" data-chapter="${i}">
                <div class="chapter-info">
                    <h4>Chương ${i}: ${isAvailable ? chapter.title : 'Sắp ra mắt'}</h4>
                    ${isAvailable ? `
                        <div class="chapter-meta">
                            <span><i class="fas fa-calendar"></i> ${formatDate(chapter.publishDate)}</span>
                            <span><i class="fas fa-eye"></i> ${chapter.views.toLocaleString()}</span>
                        </div>
                    ` : ''}
                </div>
                ${isAvailable ? '<i class="fas fa-play"></i>' : '<i class="fas fa-lock"></i>'}
            </div>
        `;
    }
    
    chapterList.innerHTML = chaptersHTML;
    
    // Add search functionality
    const searchInput = document.getElementById('chapterSearch');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const chapterItems = chapterList.querySelectorAll('.chapter-item');
        
        chapterItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Select chapter from list
function selectChapter(chapterNumber) {
    if (chapterNumber < 1 || chapterNumber > totalChapters) return;
    
    const chapter = currentStory.chapters.find(ch => ch.id === chapterNumber);
    if (!chapter) {
        showMessage('Chương này chưa được phát hành!', 'warning');
        return;
    }
    
    currentChapter = chapterNumber;
    loadChapterContent();
    loadComments();
    updateProgress();
    toggleChapterMenu();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load comments
function loadComments() {
    const commentsList = document.getElementById('commentsList');
    const chapterComments = mockComments.filter(comment => comment.chapterId === currentChapter);
    
    let commentsHTML = '';
    
    chapterComments.forEach(comment => {
        const stars = '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating);
        
        commentsHTML += `
            <div class="comment-item">
                <div class="comment-header">
                    <div class="commenter-avatar">${comment.avatar}</div>
                    <div class="commenter-info">
                        <h4>${comment.username}</h4>
                        <div class="comment-rating">
                            ${stars}
                        </div>
                        <div class="comment-time">${comment.time}</div>
                    </div>
                </div>
                <div class="comment-content">
                    <p>${comment.content}</p>
                </div>
                <div class="comment-actions">
                    <button class="like-btn" onclick="likeComment(${comment.id})">
                        <i class="fas fa-heart"></i>
                        <span>${comment.likes}</span>
                    </button>
                    <button class="reply-btn">
                        <i class="fas fa-reply"></i>
                        <span>Trả lời</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    if (commentsHTML === '') {
        commentsHTML = `
            <div class="no-comments">
                <p>Chưa có bình luận nào cho chương này. Hãy là người đầu tiên bình luận!</p>
            </div>
        `;
    }
    
    commentsList.innerHTML = commentsHTML;
    
    // Update comments count
    const commentsHeader = document.querySelector('.comments-header h3');
    commentsHeader.innerHTML = `<i class="fas fa-comments"></i> Bình luận chương (${chapterComments.length})`;
}

// Submit comment
function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const content = commentInput.value.trim();
    
    if (!content) {
        showMessage('Vui lòng nhập nội dung bình luận!', 'warning');
        return;
    }
    
    // Check authentication
    const user = checkAuth();
    if (!user) {
        showMessage('Vui lòng đăng nhập để bình luận!', 'warning');
        return;
    }
    
    // Create new comment (mock)
    const newComment = {
        id: Date.now(),
        chapterId: currentChapter,
        username: user.username || "Độc giả",
        avatar: "👤",
        rating: 5, // Default rating
        content: content,
        time: "Vừa xong",
        likes: 0,
        replies: []
    };
    
    mockComments.unshift(newComment);
    commentInput.value = '';
    loadComments();
    showMessage('Đã gửi bình luận thành công!', 'success');
}

// Like comment
function likeComment(commentId) {
    const comment = mockComments.find(c => c.id === commentId);
    if (comment) {
        comment.likes++;
        loadComments();
        showMessage('Đã thích bình luận!', 'success');
    }
}

// Toggle panels
function toggleSettingsPanel() {
    const panel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('readerOverlay');
    
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleChapterMenu() {
    const panel = document.getElementById('chapterMenuPanel');
    const overlay = document.getElementById('readerOverlay');
    
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleComments() {
    const container = document.getElementById('commentsContainer');
    const btn = document.getElementById('commentToggleBtn');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i> Ẩn bình luận';
    } else {
        container.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-eye"></i> Hiện bình luận';
    }
}

function closeAllPanels() {
    document.getElementById('settingsPanel').classList.remove('active');
    document.getElementById('chapterMenuPanel').classList.remove('active');
    document.getElementById('readerOverlay').classList.remove('active');
}

// Reading settings
function changeFontSize(size) {
    readingSettings.fontSize = size;
    applyReadingSettings();
    updateSettingsUI();
    saveReadingSettings();
}

function changeLineHeight(height) {
    readingSettings.lineHeight = height;
    applyReadingSettings();
    updateSettingsUI();
    saveReadingSettings();
}

function changeTheme(theme) {
    readingSettings.theme = theme;
    applyTheme();
    updateSettingsUI();
    saveReadingSettings();
}

function applyReadingSettings() {
    const chapterText = document.getElementById('chapterText');
    chapterText.style.fontSize = `${readingSettings.fontSize}px`;
    chapterText.style.lineHeight = readingSettings.lineHeight;
}

function applyTheme() {
    const body = document.body;
    body.className = `reader-body ${readingSettings.theme}`;
}

function updateSettingsUI() {
    // Update font size buttons
    document.querySelectorAll('.font-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.size) === readingSettings.fontSize) {
            btn.classList.add('active');
        }
    });
    
    // Update line height buttons
    document.querySelectorAll('.line-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseFloat(btn.dataset.height) === readingSettings.lineHeight) {
            btn.classList.add('active');
        }
    });
    
    // Update theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === readingSettings.theme) {
            btn.classList.add('active');
        }
    });
    
    // Update scroll speed
    document.getElementById('scrollSpeed').value = readingSettings.autoScrollSpeed;
}

function loadReadingSettings() {
    const saved = localStorage.getItem('readerSettings');
    if (saved) {
        readingSettings = { ...readingSettings, ...JSON.parse(saved) };
    }
    applyReadingSettings();
    updateSettingsUI();
}

function saveReadingSettings() {
    localStorage.setItem('readerSettings', JSON.stringify(readingSettings));
}

// Auto scroll functionality
function toggleAutoScroll() {
    const btn = document.getElementById('autoScrollBtn');
    
    if (isAutoScrolling) {
        stopAutoScroll();
        btn.innerHTML = '<i class="fas fa-play"></i> Bắt đầu';
    } else {
        startAutoScroll();
        btn.innerHTML = '<i class="fas fa-pause"></i> Dừng';
    }
}

function startAutoScroll() {
    if (isAutoScrolling) return;
    
    isAutoScrolling = true;
    const speed = readingSettings.autoScrollSpeed;
    const scrollAmount = speed * 2; // Adjust scroll amount based on speed
    
    autoScrollInterval = setInterval(() => {
        window.scrollBy(0, scrollAmount);
        
        // Stop if reached bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            stopAutoScroll();
        }
    }, 100);
    
    showMessage('Đã bật tự động cuộn', 'info');
}

function stopAutoScroll() {
    if (!isAutoScrolling) return;
    
    isAutoScrolling = false;
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
    
    const btn = document.getElementById('autoScrollBtn');
    btn.innerHTML = '<i class="fas fa-play"></i> Bắt đầu';
    
    showMessage('Đã tắt tự động cuộn', 'info');
}

// Bookmark functionality
function toggleBookmark() {
    const user = checkAuth();
    if (!user) {
        showMessage('Vui lòng đăng nhập để đánh dấu!', 'warning');
        return;
    }
    
    // Mock bookmark toggle
    const btn = document.getElementById('bookmarkBtn');
    const isBookmarked = btn.classList.contains('bookmarked');
    
    if (isBookmarked) {
        btn.classList.remove('bookmarked');
        btn.style.color = '';
        showMessage('Đã xóa đánh dấu', 'info');
    } else {
        btn.classList.add('bookmarked');
        btn.style.color = '#ff6b6b';
        showMessage('Đã đánh dấu chương', 'success');
    }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Don't trigger shortcuts when typing in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            navigateChapter(-1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            navigateChapter(1);
            break;
        case 'Escape':
            closeAllPanels();
            break;
        case 's':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                toggleSettingsPanel();
            }
            break;
        case 'm':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                toggleChapterMenu();
            }
            break;
        case ' ':
            e.preventDefault();
            toggleAutoScroll();
            break;
    }
}

// Navigation functions
function goBack() {
    // Try to go back in browser history first
    if (document.referrer && document.referrer.includes('book-detail')) {
        window.history.back();
    } else {
        // Fallback to book detail page
        window.location.href = 'book-detail.html';
    }
}

// Utility functions - using shared utils
function formatDate(dateString) {
    return BookReaderUtils.formatDate(dateString);
}

// Utility functions - using shared utils

// Add reader-specific CSS
if (!document.querySelector('#reader-styles')) {
    const style = document.createElement('style');
    style.id = 'reader-styles';
    style.textContent = `
        .chapter-item.active {
            background: #667eea;
            color: white;
        }
        .chapter-item.unavailable {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .chapter-item:not(.unavailable):hover {
            background: #f8fafc;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .no-comments {
            text-align: center;
            padding: 40px;
            color: #718096;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}