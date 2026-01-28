document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Show success message
  document.getElementById("successMessage").style.display = "block";

  // Reset form after success
  setTimeout(() => {
    document.getElementById("contactForm").reset();
    document.getElementById("successMessage").style.display = "none";
  }, 2000); // message visible for 2 seconds
});