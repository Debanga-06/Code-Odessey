    // Initialize all accordions
    function initAccordions() {
      const accordions = document.querySelectorAll('.accordion');
      
      accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
          header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = header.classList.contains('active');
            
            // Toggle active state
            header.classList.toggle('active');
            content.classList.toggle('active');
            
            // Update ARIA attribute
            header.setAttribute('aria-expanded', !isActive);
          });
        });
      });
    }

    // Copy code functionality
    function copyCode(btn) {
      const codeBlock = btn.nextElementSibling;
      const code = codeBlock.textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      });
    }

    // Initialize on page load
    initAccordions();