// Initialize all tab containers
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container');
  
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const panels = container.querySelectorAll('.tab-panel');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels in this container
        buttons.forEach(btn => btn.classList.remove('active'));
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Add active class to corresponding panel
        const targetPanel = container.querySelector(`#${targetTab}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
        
        // Update ARIA attributes
        button.setAttribute('aria-selected', 'true');
        buttons.forEach(btn => {
          if (btn !== button) {
            btn.setAttribute('aria-selected', 'false');
          }
        });
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
initTabs();