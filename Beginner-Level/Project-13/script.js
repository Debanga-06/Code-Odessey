// Function to check visibility of elements
function checkVisibility() {
  const elements = document.querySelectorAll("section");
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}

// Check visibility on page load
window.addEventListener("load", checkVisibility);

// Check visibility on scroll
window.addEventListener("scroll", checkVisibility);