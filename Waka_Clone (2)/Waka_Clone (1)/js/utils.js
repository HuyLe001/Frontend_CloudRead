// ===================================
// UTILITY FUNCTIONS - BookReader
// Shared functions across all pages
// ===================================

// Authentication utilities
window.BookReaderUtils = {
    // Check user authentication status
    checkAuth() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Show notification message
    showMessage(message, type) {
        // Remove existing message
        const existingMsg = document.querySelector('.br-message');
        if (existingMsg) existingMsg.remove();
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `br-message br-message-${type}`;
        messageDiv.textContent = message;
        
        // Set colors based on type
        let bgColor = '#48bb78'; // success
        if (type === 'error') bgColor = '#f56565';
        if (type === 'info') bgColor = '#4299e1';
        if (type === 'warning') bgColor = '#ed8936';
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            background: ${bgColor};
            max-width: 350px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    },

    // Format date to Vietnamese format
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },

    // Get URL parameter
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // Redirect after delay
    redirectAfter(url, delay = 1000) {
        setTimeout(() => {
            window.location.href = url;
        }, delay);
    },

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Debounce function for search
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Save to localStorage with error handling
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get from localStorage with error handling
    getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }
};

// Add required CSS animations
if (!document.querySelector('#br-animations')) {
    const style = document.createElement('style');
    style.id = 'br-animations';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Create global shorthand functions for backward compatibility
window.checkAuth = window.BookReaderUtils.checkAuth;
window.showMessage = window.BookReaderUtils.showMessage;