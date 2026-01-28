// ========== ADD TO CART FUNCTIONALITY ==========
const addToCartButtons = document.querySelectorAll('.btn-add');

addToCartButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const productName = this.closest('.card-product').querySelector('h3').textContent;
    const originalText = this.textContent;
    
    // Change button text
    this.textContent = '✓ Added!';
    this.style.background = '#4CAF50';
    
    // Revert after 2 seconds
    setTimeout(() => {
      this.textContent = originalText;
      this.style.background = '#667eea';
    }, 2000);
  });
});

// ========== CARD INTERSECTION OBSERVER (Lazy Load Animation) ==========
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        entry.target.style.transition = 'all 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  observer.observe(card);
});

// ========== SMOOTH SCROLL FOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========== HOVER EFFECTS ==========
const cards_with_hover = document.querySelectorAll('[class*="hover"]');

cards_with_hover.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.cursor = 'pointer';
  });
});

// ========== SOCIAL LINKS ==========
const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Add your social media links here
    console.log('Social link clicked:', this.title);
  });

  link.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.2) rotate(5deg)';
  });

  link.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
});

// ========== CARD COUNTER ==========
console.log('Card Layout Gallery Loaded');
console.log('Total Cards:', cards.length);

// Count cards by type
const cardTypes = {
  basic: document.querySelectorAll('.card-basic').length,
  shadow: document.querySelectorAll('.card-shadow').length,
  border: document.querySelectorAll('.card-border').length,
  hover: document.querySelectorAll('[class*="hover"]').length,
  gradient: document.querySelectorAll('[class*="gradient"]').length,
  overlay: document.querySelectorAll('[class*="overlay"]').length,
  icon: document.querySelectorAll('.card-icon').length,
  product: document.querySelectorAll('.card-product').length,
  blog: document.querySelectorAll('.card-blog').length,
  team: document.querySelectorAll('.card-team').length
};

console.log('Card Types:', cardTypes);

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close any open overlays or modals if added in future
    console.log('Escape key pressed');
  }
});

// ========== CLICK TRACKING ==========
let clickCount = 0;

document.addEventListener('click', function(e) {
  if (e.target.closest('.card')) {
    clickCount++;
    console.log('Card clicked. Total clicks:', clickCount);
  }
});

// ========== WINDOW SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
  // Add scroll effects here if needed
});
