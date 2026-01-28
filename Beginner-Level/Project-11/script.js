document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Show success message
  document.getElementById("successMessage").style.display = "block";

  // Reset form after showing success
  setTimeout(() => {
    document.getElementById("signupForm").reset();
    document.getElementById("successMessage").style.display = "none";
  }, 2000); // message visible for 2 seconds
});