const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    // Close other open items
    document.querySelectorAll(".accordion-content").forEach(item => {
      if (item !== content) {
        item.style.maxHeight = null;
      }
    });

    // Toggle current item
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});