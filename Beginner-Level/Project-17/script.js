// Newsletter Form Submission (Footer 1)
const newsletterForm = document.querySelector('.footer-1 .newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input[type="email"]');
    if (input.value.trim()) {
      alert('Thank you for subscribing! Check your email for confirmation.');
      input.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Social Links Smooth Interaction
const socialLinks = document.querySelectorAll('.social-link, .social-icons-2 a, .footer-social-3 a, .social-icons-4 a');
socialLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      window.open(href, '_blank');
    }
  });
});

// Footer Links Click Handler
const footerLinks = document.querySelectorAll('.footer-links a, .footer-links-3 a, .footer-col-4 .footer-links a');
footerLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href && href !== '#') {
      window.open(href, '_blank');
    }
  });
});

// Smooth Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
  // Add scroll animation to footer examples
  const footerExamples = document.querySelectorAll('.footer-example');
  
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
  
  footerExamples.forEach(example => {
    observer.observe(example);
  });
  
  // Add interaction to footer containers
  const footers = document.querySelectorAll('.footer-1, .footer-2, .footer-3, .footer-4');
  footers.forEach(footer => {
    footer.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });
    
    footer.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
    });
  });
});

// Newsletter Button Animation
const newsletterButtons = document.querySelectorAll('.newsletter-form button');
newsletterButtons.forEach(button => {
  button.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.95)';
  });
  
  button.addEventListener('mouseup', function() {
    this.style.transform = 'scale(1)';
  });
});

console.log('Footer Designs Showcase Loaded');
