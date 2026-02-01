const themeToggle = document.getElementById('themeToggle');
const currentThemeBadge = document.getElementById('currentThemeBadge');
const toast = document.getElementById('toast');

// Get saved theme from localStorage or default to light
function getSavedTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Save theme to localStorage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Apply theme to document
function applyTheme(theme) {
    if (theme === 'auto') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle button
    if (theme === 'dark') {
        themeToggle.classList.add('active');
        currentThemeBadge.textContent = 'Dark Mode';
    } else {
        themeToggle.classList.remove('active');
        currentThemeBadge.textContent = 'Light Mode';
    }

    // Update theme buttons
    updateThemeButtons(localStorage.getItem('theme') || 'light');
}

// Set theme and save preference
function setTheme(theme) {
    saveTheme(theme);
    applyTheme(theme);
    showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode activated!`);
}

// Toggle between light and dark
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Update theme button states
function updateThemeButtons(activeTheme) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = Array.from(document.querySelectorAll('.theme-btn')).find(btn => {
        return btn.textContent.toLowerCase().includes(activeTheme);
    });
    
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Show toast notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Copy code to clipboard
function copyCode() {
    const code = document.getElementById('codeContent').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!');
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'auto') {
        applyTheme('auto');
    }
});

// Toggle button click event
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme on page load
const savedTheme = getSavedTheme();
applyTheme(savedTheme);

// Prevent flash of unstyled content
document.documentElement.style.visibility = 'visible';
