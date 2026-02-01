// Set launch date (30 days from now)
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);
launchDate.setHours(0, 0, 0, 0);

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    if (distance < 0) {
        // Launch time reached
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Redirect to main site or show launch message
        // window.location.href = '/';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const successMessage = document.getElementById('successMessage');
    const form = document.getElementById('subscribeForm');
    const subscriberCount = document.getElementById('subscriberCount');
    
    // Store email (in production, send to backend)
    storeEmail(email);
    
    // Show success message
    successMessage.classList.add('show');
    form.reset();
    
    // Increment subscriber count
    const currentCount = parseInt(subscriberCount.textContent.replace(/,/g, ''));
    subscriberCount.textContent = (currentCount + 1).toLocaleString();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// Store email (in production, send to backend/database)
function storeEmail(email) {
    // Get existing subscribers from storage
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    
    // Check if email already exists
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        console.log('Email stored:', email);
        console.log('Total subscribers:', subscribers.length);
        
        // In production, send to backend:
        // fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: email })
        // });
    }
}

// Simulate progress increase (optional)
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    
    let currentProgress = 75;
    const targetProgress = 100;
    
    const interval = setInterval(() => {
        if (currentProgress < targetProgress) {
            currentProgress += 0.1;
            progressFill.style.width = currentProgress + '%';
            progressPercent.textContent = Math.round(currentProgress) + '%';
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Animate subscriber count on load
function animateCount() {
    const countEl = document.getElementById('subscriberCount');
    const target = 1247;
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            countEl.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            countEl.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    animateCount();
    
    // Optional: Uncomment to animate progress
    // setTimeout(updateProgress, 1000);
});

// Track page analytics
console.log('Coming Soon page viewed at:', new Date().toISOString());