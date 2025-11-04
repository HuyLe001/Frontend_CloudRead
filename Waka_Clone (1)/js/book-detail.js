// Enhanced Book Detail Page JavaScript

// Mock story data (in real app, this would come from API)
const mockStories = {
        1: {
            title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
            author: "Nguyễn Nhật Ánh",
            tags: ["Tiểu thuyết", "Văn học Việt Nam", "Tuổi thơ"],
            description: "Câu chuyện về tuổi thơ dữ dội và những kỷ niệm không thể nào quên của Thiều và Tường trong làng quê Việt Nam. Một tác phẩm kinh điển của văn học thiếu nhi Việt Nam, mang đậm hương vị quê hương và tình người.",
            fullDescription: "Tôi thấy hoa vàng trên cỏ xanh là một trong những tác phẩm nổi tiếng nhất của nhà văn Nguyễn Nhật Ánh. Câu chuyện được kể qua góc nhìn của Thiều - một cậu bé sống ở vùng quê, với những trải nghiệm đầy màu sắc về tình anh em, tình bạn và những rung động đầu đời. Tác phẩm không chỉ là câu chuyện tuổi thơ mà còn là bức tranh sinh động về cuộc sống làng quê Việt Nam với những nét đẹp truyền thống đậm đà bản sắc dân tộc.",
            cover: "../assets/images/toi-thay-hoa-vang.jpg",
            rating: 4.8,
            views: "1.2M",
            favorites: "89K",
            comments: "12.3K",
            chapters: 15,
            status: "Hoàn thành",
            lastUpdate: "1 năm trước",
            badge: "Kinh điển"
        },
        2: {
            title: "Conan - Thám Tử Lừng Danh", 
            author: "Gosho Aoyama",
            tags: ["Trinh thám", "Manga", "Hành động"],
            description: "Shinichi Kudo, một thám tử học sinh trung học 17 tuổi, thường giúp cảnh sát giải quyết các vụ án. Trong lúc theo dõi giao dịch đáng ngờ, anh bị thành viên của tổ chức áo đen phát hiện và cho uống thuốc độc thử nghiệm...",
            fullDescription: "Thay vì chết, thuốc đã làm cơ thể anh bị teo nhỏ thành hình dạng của một đứa trẻ 7 tuổi. Giữ bí mật về danh tính thật của mình, anh sống với tên Conan Edogawa và được nhận nuôi bởi Ran Mouri và cha cô. Với trí thông minh vượt trội, Conan tiếp tục phá án trong khi tìm cách trở lại hình dạng ban đầu và truy tìm tổ chức bí ẩn đã gây ra tình trạng này cho mình.",
            cover: "../assets/images/conan.jpg",
            rating: 4.9,
            views: "2.5M",
            favorites: "145K",
            comments: "28.7K",
            chapters: "1000+",
            status: "Đang cập nhật",
            lastUpdate: "2 giờ trước", 
            badge: "HOT"
        },
        3: {
            title: "Douluo Đại Lục",
            author: "Đường Gia Tam Thiếu",
            tags: ["Kiếm hiệp", "Fantasy", "Hành động"],
            description: "Thế giới của các hồn sư, nơi mà sức mạnh quyết định tất cả. Tang San, một học trò của môn phái ẩn mật Đường Môn, nhảy xuống vách núi để chứng minh chí khí của mình...",
            fullDescription: "Không ngờ lại được tái sinh trong một thế giới khác, thành một đứa trẻ cùng tên tại thành phố Holy Soul Village. Ở đây, không có ma pháp, không có đấu khí, không có võ thuật, nhưng có một nghề nghiệp kỳ diệu gọi là Hồn Sư. Với ký ức từ kiếp trước và những kỹ năng của Đường Môn, liệu Tang San có thể tái hiện vinh quang của Đường Môn tại thế giới này?",
            cover: "../assets/images/douluo-dai-luc.jpg",
            rating: 4.7,
            views: "1.8M",
            favorites: "123K",
            comments: "19.5K",
            chapters: 336,
            status: "Hoàn thành",
            lastUpdate: "6 tháng trước",
            badge: "Thịnh hành"
        }
    };

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeStoryDetail();
    
    // Note: main.js will handle initializeApp() automatically
});

function initializeStoryDetail() {
    // Get story ID from URL or default to 2 (Conan)
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id') || '2';
    const story = mockStories[storyId];
    
    if (story) {
        updateStoryDetails(story);
        loadChapterList(story);
        loadComments();
        loadRelatedStories();
        setupEventListeners(story);
    } else {
        showMessage('Không tìm thấy truyện!', 'error');
    }
}

function updateStoryDetails(story) {
    // Update basic info
    document.getElementById('storyTitle').textContent = story.title;
    document.getElementById('storyAuthor').textContent = story.author;
    document.getElementById('chapterCount').textContent = story.chapters + (typeof story.chapters === 'number' ? ' chương' : '');
    document.getElementById('lastUpdate').textContent = story.lastUpdate;
    document.getElementById('storyStatus').textContent = story.status;
    document.getElementById('storyBadge').textContent = story.badge;
    
    // Update statistics
    document.getElementById('storyRating').textContent = story.rating;
    document.getElementById('storyViews').textContent = story.views;
    document.getElementById('storyFavorites').textContent = story.favorites;
    document.getElementById('storyComments').textContent = story.comments;
    
    // Update tags
    const tagsContainer = document.getElementById('storyTags');
    tagsContainer.innerHTML = story.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Update description
    const descElement = document.getElementById('storyDescription');
    descElement.innerHTML = `
        <p>${story.description}</p>
        <div class="full-description" style="display: none;">
            <p>${story.fullDescription}</p>
        </div>
    `;
    
    // Update breadcrumb
    document.getElementById('breadcrumbTitle').textContent = story.title;
    document.getElementById('breadcrumbCategory').textContent = story.tags[0];
    
    // Update cover image
    const coverImg = document.getElementById('storyCover');
    coverImg.src = story.cover;
    coverImg.alt = story.title;
    
    // Update page title
    document.title = `${story.title} - BookReader`;
}

function setupEventListeners(story) {
    // Read now button
    const readNowBtn = document.getElementById('readNowBtn');
    
    if (readNowBtn) {
        readNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // For demo purposes, create mock user if not exists
            let user = checkAuth();
            if (!user) {
                const mockUser = { username: 'demo_user', email: 'demo@test.com' };
                localStorage.setItem('user', JSON.stringify(mockUser));
                user = mockUser;
            }
            
            showMessage(`Đang mở "${story.title}" chương 1...`, 'success');
            setTimeout(() => {
                window.location.href = `reader.html?story=${getCurrentStoryId()}&chapter=1`;
            }, 1000);
        });
    }
    
    // Action buttons
    document.getElementById('addToLibrary').addEventListener('click', () => {
        addToLibrary(story.title);
    });
    
    document.getElementById('addToFavorites').addEventListener('click', () => {
        addToFavorites(story.title);
    });
    
    document.getElementById('shareStory').addEventListener('click', () => {
        shareStory(story);
    });
    
    document.getElementById('downloadStory').addEventListener('click', () => {
        downloadStory(story.title);
    });
    
    // Description toggle
    const toggleBtn = document.getElementById('toggleDescription');
    toggleBtn.addEventListener('click', () => {
        const fullDesc = document.querySelector('.full-description');
        const isVisible = fullDesc.style.display !== 'none';
        
        fullDesc.style.display = isVisible ? 'none' : 'block';
        toggleBtn.querySelector('.show-more').style.display = isVisible ? 'inline' : 'none';
        toggleBtn.querySelector('.show-less').style.display = isVisible ? 'none' : 'inline';
        toggleBtn.querySelector('i').className = isVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    });
    
    // Comment form
    const commentForm = document.getElementById('commentForm');
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitComment(e.target);
    });
    
    // Chapter sorting
    const sortBtns = document.querySelectorAll('.sort-btn');
    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sortOrder = btn.dataset.sort;
            loadChapterList(story, sortOrder);
        });
    });
}

function loadChapterList(story, sortOrder = 'asc') {
    const chapterList = document.getElementById('chapterList');
    const chapters = [];
    
    // Generate mock chapters
    const totalChapters = typeof story.chapters === 'number' ? story.chapters : 100;
    for (let i = 1; i <= Math.min(totalChapters, 20); i++) {
        chapters.push({
            number: i,
            title: `Chương ${i}`,
            readTime: `${Math.floor(Math.random() * 15) + 5} phút`,
            isNew: i > totalChapters - 3
        });
    }
    
    if (sortOrder === 'desc') {
        chapters.reverse();
    }
    
    chapterList.innerHTML = chapters.map(chapter => `
        <div class="chapter-item" onclick="readChapter(${chapter.number})">
            <div class="chapter-info">
                <h4>${chapter.title} ${chapter.isNew ? '<span class="new-badge">MỚI</span>' : ''}</h4>
                <div class="chapter-meta">
                    <span><i class="fas fa-clock"></i> ${chapter.readTime}</span>
                    <span><i class="fas fa-eye"></i> ${Math.floor(Math.random() * 10000) + 1000}</span>
                </div>
            </div>
            <div class="chapter-actions">
                <button class="read-btn" title="Đọc chương">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadComments() {
    const commentsList = document.getElementById('commentsList');
    const mockComments = [
        {
            user: 'Nguyễn Văn A',
            avatar: '../assets/images/user1.jpg',
            rating: 5,
            content: 'Truyện hay quá! Cốt truyện hấp dẫn, nhân vật được xây dựng rất tốt. Đặc biệt là tính cách của Conan rất thông minh và dễ thương.',
            time: '2 giờ trước',
            likes: 15
        },
        {
            user: 'Trần Thị B',
            avatar: '../assets/images/user2.jpg', 
            rating: 4,
            content: 'Mình đã theo dõi từ đầu đến giờ. Mỗi vụ án đều rất logic và thú vị. Tác giả rất tài năng!',
            time: '1 ngày trước',
            likes: 8
        },
        {
            user: 'Lê Minh C',
            avatar: '../assets/images/user3.jpg',
            rating: 5,
            content: 'Top 1 manga trinh thám hay nhất mọi thời đại. Không có gì để chê cả!',
            time: '3 ngày trước', 
            likes: 23
        }
    ];
    
    commentsList.innerHTML = mockComments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <img src="${comment.avatar}" alt="${comment.user}" class="commenter-avatar"
                     onerror="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; this.innerHTML='<i class=\\'fas fa-user\\' style=\\'color:white;\\'></i>'">
                <div class="commenter-info">
                    <h4>${comment.user}</h4>
                    <div class="comment-rating">
                        ${Array.from({length: 5}, (_, i) => 
                            `<i class="fas fa-star${i < comment.rating ? '' : ' opacity-30'}"></i>`
                        ).join('')}
                    </div>
                    <span class="comment-time">${comment.time}</span>
                </div>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
                <div class="comment-actions">
                    <button class="like-btn">
                        <i class="fas fa-thumbs-up"></i>
                        ${comment.likes}
                    </button>
                    <button class="reply-btn">
                        <i class="fas fa-reply"></i>
                        Trả lời
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadRelatedStories() {
    const relatedStoriesGrid = document.getElementById('relatedStories');
    const relatedStories = [
        { id: 1, title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', author: 'Nguyễn Nhật Ánh', rating: '4.8', badge: 'Kinh điển' },
        { id: 3, title: 'Douluo Đại Lục', author: 'Đường Gia Tam Thiếu', rating: '4.7', badge: 'Thịnh hành' },
        { id: 4, title: 'Naruto', author: 'Masashi Kishimoto', rating: '4.8', badge: 'Hoàn thành' },
        { id: 5, title: 'One Piece', author: 'Eiichiro Oda', rating: '4.9', badge: 'HOT' }
    ];
    
    relatedStoriesGrid.innerHTML = relatedStories.map(story => `
        <div class="story-card" onclick="goToStoryDetail(${story.id})">
            <div class="story-image">
                <img src="../assets/images/story${story.id}.jpg" alt="${story.title}"
                     onerror="this.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; this.innerHTML='<div style=\\'color:white;padding:40px 10px;text-align:center;font-size:12px;\\'>${story.title.substring(0,10)}</div>'">
                <div class="story-badge">${story.badge}</div>
            </div>
            <div class="story-info">
                <h3>${story.title}</h3>
                <p class="author">${story.author}</p>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${story.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Action functions
function addToLibrary(title) {
    const user = checkAuth();
    if (!user) {
        showMessage('Vui lòng đăng nhập!', 'error');
        return;
    }
    
    const library = JSON.parse(localStorage.getItem('library') || '[]');
    if (!library.includes(title)) {
        library.push(title);
        localStorage.setItem('library', JSON.stringify(library));
        showMessage('Đã thêm vào thư viện!', 'success');
    } else {
        showMessage('Truyện đã có trong thư viện!', 'info');
    }
}

function addToFavorites(title) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(title)) {
        favorites.push(title);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showMessage('Đã thêm vào yêu thích!', 'success');
        
        const btn = document.getElementById('addToFavorites');
        btn.innerHTML = '<i class="fas fa-heart favorite-heart"></i>';
        btn.title = 'Đã yêu thích';
    } else {
        showMessage('Truyện đã có trong danh sách yêu thích!', 'info');
    }
}

function shareStory(story) {
    if (navigator.share) {
        navigator.share({
            title: story.title,
            text: story.description,
            url: window.location.href,
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        showMessage('Đã copy link truyện!', 'success');
    }
}

function downloadStory(title) {
    showMessage('Tính năng tải offline đang phát triển!', 'info');
}

function submitComment(form) {
    const user = checkAuth();
    if (!user) {
        showMessage('Vui lòng đăng nhập để bình luận!', 'error');
        return;
    }
    
    const textarea = form.querySelector('textarea');
    const rating = form.querySelector('input[name="rating"]:checked');
    
    if (!textarea.value.trim()) {
        showMessage('Vui lòng nhập nội dung bình luận!', 'error');
        return;
    }
    
    showMessage('Cảm ơn bạn đã bình luận!', 'success');
    form.reset();
}

function readChapter(chapterNumber) {
    const user = checkAuth();
    if (!user) {
        showMessage('Vui lòng đăng nhập để đọc truyện!', 'error');
        return;
    }
    
    showMessage(`Đang mở chương ${chapterNumber}...`, 'success');
    // In real app, this would navigate to reader page
}

function goToStoryDetail(storyId) {
    window.location.href = `book-detail.html?id=${storyId}`;
}

// Utility functions - using shared utils

function readChapter(chapterNumber) {
    // For demo purposes, create mock user if not exists
    let user = checkAuth();
    if (!user) {
        const mockUser = { username: 'demo_user', email: 'demo@test.com' };
        localStorage.setItem('user', JSON.stringify(mockUser));
        user = mockUser;
    }
    
    showMessage(`Đang mở chương ${chapterNumber}...`, 'success');
    setTimeout(() => {
        window.location.href = `reader.html?story=${getCurrentStoryId()}&chapter=${chapterNumber}`;
    }, 1000);
}

function getCurrentStoryId() {
    return BookReaderUtils.getUrlParameter('id') || '1';
}

function goToStoryDetail(storyId) {
    window.location.href = `book-detail.html?id=${storyId}`;
}

