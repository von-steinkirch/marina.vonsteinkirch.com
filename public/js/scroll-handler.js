/**
 * Scroll handler for profile sticky bar functionality
 * Handles the sticky behavior of the profile header when scrolling
 * Works for both main page and post page
 */

// Initialize scroll handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Scroll event handler for sticky profile bar
    window.onscroll = function (e) {
        const headerImg = document.querySelector('#headerImg');
        if (headerImg && headerImg.getBoundingClientRect().bottom <= 0) {
            const headerStuck = document.querySelector('#headerStuck');
            if (headerStuck) {
                headerStuck.classList.add('is-stuck');
            }
        } else {
            const headerStuck = document.querySelector('#headerStuck');
            if (headerStuck) {
                headerStuck.classList.remove('is-stuck');
            }
        }
    };

    // Initialize theme mode from localStorage
    var style = localStorage.getItem('data-color-mode');
    if (style) {
        // Apply theme if it exists in localStorage
        document.documentElement.setAttribute('data-color-mode', style);
    }
});
