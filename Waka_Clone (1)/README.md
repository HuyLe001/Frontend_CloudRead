# 📚 BookReader - Trang Web Đọc Sách Online

Một ứng dụng web frontend hoàn chỉnh cho việc đọc sách trực tuyến, được phát triển với HTML, CSS, và JavaScript vanilla.

## 🚀 Tính năng

### ✅ Đã hoàn thành
- **Giao diện responsive**: Tương thích với desktop, tablet, và mobile
- **Trang chủ**: Hiển thị sách nổi bật, thể loại, tìm kiếm
- **Trang đăng nhập**: Form đăng nhập với validation
- **Trang chi tiết sách**: Thông tin chi tiết, mua sách, đánh giá
- **Tìm kiếm**: Tìm kiếm sách theo tên, tác giả
- **Quản lý trạng thái**: LocalStorage cho user session
- **Thông báo**: Toast messages cho các action
- **Tương tác**: Hover effects, smooth scrolling

### 🔄 Đang phát triển
- Trang đăng ký
- PDF reader online
- Giỏ hàng
- Thanh toán
- Dashboard admin

## 📁 Cấu trúc dự án

```
Waka_Clone/
├── html/
│   ├── index.html          # Trang chủ
│   ├── login.html          # Trang đăng nhập
│   └── book-detail.html    # Chi tiết sách
├── css/
│   ├── styles.css          # CSS chính
│   ├── components.css      # CSS cho components
│   └── enhancements.css    # CSS bổ sung
├── js/
│   ├── main.js            # JavaScript chính
│   ├── auth.js            # Xử lý authentication
│   ├── book-detail.js     # Trang chi tiết sách
│   └── script.js          # JavaScript cũ (backup)
├── assets/
│   ├── images/            # Hình ảnh
│   └── books/             # File sách PDF
├── components/            # Components tái sử dụng
└── API_DOCUMENTATION.md   # Tài liệu API
```

## 🛠️ Cài đặt và chạy

### Yêu cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần server (chạy trực tiếp file HTML)

### Chạy ứng dụng

1. **Mở trang chủ**:
   ```
   Mở file: html/index.html
   ```

2. **Hoặc chạy với Live Server**:
   ```bash
   # Nếu có Python
   python -m http.server 8000
   
   # Nếu có Node.js
   npx live-server
   ```

## 🎨 Các trang và tính năng

### 1. Trang chủ (index.html)
- **Header**: Logo, menu điều hướng, nút đăng nhập/đăng ký
- **Hero Section**: Banner chính với thanh tìm kiếm
- **Thể loại**: Danh sách các thể loại sách
- **Sách nổi bật**: Grid hiển thị sách bán chạy
- **Footer**: Thông tin liên hệ, mạng xã hội

### 2. Trang đăng nhập (login.html)
- Form đăng nhập với email/password
- Validation frontend
- Mock authentication (lưu LocalStorage)
- Responsive design

### 3. Trang chi tiết sách (book-detail.html)
- Thông tin chi tiết: tên, tác giả, giá, mô tả
- Nút mua sách, xem trước, thêm yêu thích
- Đánh giá và review từ người dùng
- Responsive layout

## 💡 Tính năng Mock (Frontend Only)

### Authentication
```javascript
// Mock login
localStorage.setItem('user', JSON.stringify({
    email: 'user@example.com',
    name: 'Người dùng',
    role: 'user'
}));
```

### Dữ liệu sách
```javascript
// Mock book data
const mockBooks = {
    1: { title: "Đắc Nhân Tâm", author: "Dale Carnegie", ... }
};
```

### Tìm kiếm
```javascript
// Mock search results
function performMockSearch(searchTerm) {
    // Filter mock data và hiển thị kết quả
}
```

## 🔧 Customization

### Thêm sách mới
```javascript
// Trong file js/book-detail.js
const mockBooks = {
    // Thêm sách mới
    3: {
        title: "Tên sách mới",
        author: "Tác giả",
        category: "Thể loại",
        // ...
    }
};
```

### Thay đổi theme
```css
/* Trong css/styles.css */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px

### Features
- Flexible grid layouts
- Mobile-first approach
- Touch-friendly buttons
- Optimized typography

## 🎯 Roadmap

### Phase 1: Frontend (Hiện tại)
- [x] Giao diện cơ bản
- [x] Responsive design
- [x] Mock data và tương tác
- [ ] PDF reader component
- [ ] Advanced search filters

### Phase 2: Backend Integration
- [ ] API endpoints
- [ ] Database design
- [ ] Authentication system
- [ ] File upload/management

### Phase 3: Advanced Features
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Mobile app

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add some AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Mở Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 📞 Liên hệ

- **Email**: contact@bookreader.com
- **Website**: https://bookreader.com
- **GitHub**: https://github.com/username/bookreader

---

*Được phát triển với ❤️ cho cộng đồng đọc sách Việt Nam*