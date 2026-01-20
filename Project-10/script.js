const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

function handleSubmit() {
  console.log('Handle submit called');
  let valid = true;

  // Username validation
  if (username.value.trim() === "") {
    usernameError.style.display = "block";
    valid = false;
  } else {
    usernameError.style.display = "none";
  }

  // Email validation (check format)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required";
    emailError.style.display = "block";
    valid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = "Please enter a valid email";
    emailError.style.display = "block";
    valid = false;
  } else {
    emailError.style.display = "none";
  }

  // Password validation
  if (password.value.length < 6) {
    passwordError.style.display = "block";
    valid = false;
  } else {
    passwordError.style.display = "none";
  }

  // If valid, simulate login
  if (valid) {
    console.log('Valid, showing success');
    successMessage.textContent = "Successfully Login ✅";
    successMessage.style.display = "block";

    // Reset form fields
    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  } else {
    successMessage.style.display = "none";
  }
}