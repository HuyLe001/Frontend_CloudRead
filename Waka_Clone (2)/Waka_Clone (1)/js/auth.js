// Authentication JavaScript - Enhanced
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthPage();
});

function initializeAuthPage() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    
    // Setup form validation
    if (emailInput) {
        emailInput.addEventListener('blur', validateLoginEmail);
    }
    
    // Setup form submission
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Setup social auth
    setupSocialAuth();
    
    // Check if already logged in
    checkExistingSession();
}

function validateLoginEmail() {
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('emailFeedback');
    const emailGroup = document.querySelector('#email').closest('.form-group');
    
    if (!email) {
        if (feedback) feedback.textContent = '';
        if (emailGroup) emailGroup.classList.remove('success', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        if (feedback) {
            feedback.textContent = '✓ Email hợp lệ';
            feedback.className = 'input-feedback success';
        }
        if (emailGroup) {
            emailGroup.classList.remove('error');
            emailGroup.classList.add('success');
        }
    } else {
        if (feedback) {
            feedback.textContent = '✗ Định dạng email không đúng';
            feedback.className = 'input-feedback error';
        }
        if (emailGroup) {
            emailGroup.classList.remove('success');
            emailGroup.classList.add('error');
        }
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.querySelector('input[name="remember"]').checked;
    
    // Validation
    const errors = validateLoginForm(email, password);
    
    if (errors.length > 0) {
        showMessage(errors.join('\n'), 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('loginBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Đang đăng nhập...';
    submitBtn.disabled = true;
    
    // Mock authentication with different user types
    setTimeout(() => {
        const userData = mockAuthenticateUser(email, password);
        
        if (userData) {
            // Store user session
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('rememberMe', 'true');
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
            }
            
            // Show success message
            showMessage(`Chào mừng ${userData.name}! Đăng nhập thành công.`, 'success');
            
            // Redirect based on user role
            setTimeout(() => {
                if (userData.role === 'admin') {
                    // window.location.href = 'admin-dashboard.html'; // Future feature
                    window.location.href = 'index.html';
                } else if (userData.role === 'staff') {
                    // window.location.href = 'staff-panel.html'; // Future feature
                    window.location.href = 'index.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1500);
        } else {
            // Authentication failed
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            showMessage('Email hoặc mật khẩu không đúng!', 'error');
            
            // Clear password field
            document.getElementById('password').value = '';
        }
    }, 1500);
}

function validateLoginForm(email, password) {
    const errors = [];
    
    if (!email) errors.push('Vui lòng nhập email');
    if (!password) errors.push('Vui lòng nhập mật khẩu');
    
    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        errors.push('Định dạng email không đúng');
    }
    
    return errors;
}

function mockAuthenticateUser(email, password) {
    // Mock user database with different roles
    const mockUsers = {
        'admin@bookreader.com': {
            id: 1,
            email: 'admin@bookreader.com',
            password: 'admin123',
            name: 'Quản trị viên',
            role: 'admin',
            avatar: '../assets/images/admin-avatar.png'
        },
        'staff@bookreader.com': {
            id: 2,
            email: 'staff@bookreader.com', 
            password: 'staff123',
            name: 'Nhân viên hỗ trợ',
            role: 'staff',
            avatar: '../assets/images/staff-avatar.png'
        },
        'user@bookreader.com': {
            id: 3,
            email: 'user@bookreader.com',
            password: 'user123',
            name: 'Người dùng',
            role: 'user',
            avatar: '../assets/images/user-avatar.png'
        }
    };
    
    // For demo: any email with password "123456" will work as regular user
    const user = mockUsers[email.toLowerCase()];
    
    if (user && user.password === password) {
        return {
            ...user,
            loginTime: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
    }
    
    // Demo fallback - any email with "123456" password
    if (password === '123456') {
        return {
            id: Date.now(),
            email: email,
            name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            role: 'user',
            avatar: '../assets/images/user-avatar.png',
            loginTime: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
    }
    
    return null;
}

function checkExistingSession() {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (user) {
        const userData = JSON.parse(user);
        
        // Show already logged in message
        showMessage(`Bạn đã đăng nhập với tài khoản ${userData.email}`, 'info');
        
        // Add option to continue or logout
        setTimeout(() => {
            const continueDiv = document.createElement('div');
            continueDiv.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: white;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                max-width: 300px;
            `;
            
            continueDiv.innerHTML = `
                <h4 style="margin: 0 0 15px 0; color: #2d3748;">Đã đăng nhập</h4>
                <p style="margin: 0 0 15px 0; color: #718096; font-size: 14px;">
                    ${userData.name} (${userData.email})
                </p>
                <div style="display: flex; gap: 10px;">
                    <button onclick="window.location.href='index.html'" 
                            style="flex: 1; padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                        Tiếp tục
                    </button>
                    <button onclick="logoutFromAuthPage()" 
                            style="flex: 1; padding: 8px 12px; background: #f56565; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">
                        Đăng xuất
                    </button>
                </div>
            `;
            
            document.body.appendChild(continueDiv);
        }, 2000);
    }
}

function logoutFromAuthPage() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('purchasedBooks');
    localStorage.removeItem('wishlist');
    
    showMessage('Đã đăng xuất thành công!', 'success');
    
    // Remove the continue div
    const existingDiv = document.querySelector('div[style*="position: fixed"][style*="bottom: 30px"]');
    if (existingDiv) existingDiv.remove();
    
    // Clear form
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function setupSocialAuth() {
    const googleBtn = document.querySelector('.btn-social.google');
    const facebookBtn = document.querySelector('.btn-social.facebook');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            showMessage('Tính năng đăng nhập Google đang được phát triển!', 'info');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            showMessage('Tính năng đăng nhập Facebook đang được phát triển!', 'info');
        });
    }
}

// Toggle password visibility (global function)
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button?.querySelector('i');
    
    if (!button || !icon) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}


// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

