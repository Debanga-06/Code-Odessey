let redirectTimer;
let countdown = 5;

// Go back to previous page
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '/';
    }
}

// Enable auto redirect
function enableAutoRedirect() {
    const redirectInfo = document.getElementById('redirectInfo');
    const countdownEl = document.getElementById('countdown');
    
    redirectInfo.classList.add('active');
    countdown = 5;
    countdownEl.textContent = countdown;

    redirectTimer = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(redirectTimer);
            window.location.href = '/';
        }
    }, 1000);
}

// Cancel redirect
function cancelRedirect() {
    clearInterval(redirectTimer);
    document.getElementById('redirectInfo').classList.remove('active');
}

// Handle search on Enter key
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    if (query) {
        // In a real application, this would redirect to a search results page
        // For demo, we'll show an alert
        alert(`Searching for: "${query}"\n\nIn a real application, this would redirect to:\n/search?q=${encodeURIComponent(query)}`);
        
        // Uncomment for actual search redirect:
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
    } else {
        searchInput.focus();
    }
}

// Track 404 error (for analytics)
function track404Error() {
    const errorData = {
        page: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    console.log('404 Error Tracked:', errorData);
    
    // In production, send to analytics:
    // gtag('event', 'page_not_found', errorData);
    // or
    // fetch('/api/log-404', { method: 'POST', body: JSON.stringify(errorData) });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    track404Error();
    
    // Focus search input for better UX
    document.getElementById('searchInput').focus();
});

// Prevent default form submission behavior
document.getElementById('searchInput').closest('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch();
});
