const form = document.getElementById('myForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  validateInputs();
});

function validateInputs() {
  // Name validation
  const nameValue = nameInput.value.trim();
  if(nameValue === '') {
    setError(nameInput, 'Name is required');
  } else {
    setSuccess(nameInput);
  }

  // Email validation
  const emailValue = emailInput.value.trim();
  if(emailValue === '') {
    setError(emailInput, 'Email is required');
  } else if(!isValidEmail(emailValue)) {
    setError(emailInput, 'Email is not valid');
  } else {
    setSuccess(emailInput);
  }

  // Password validation
  const passwordValue = passwordInput.value.trim();
  if(passwordValue === '') {
    setError(passwordInput, 'Password is required');
  } else if(passwordValue.length < 6) {
    setError(passwordInput, 'Password must be at least 6 characters');
  } else {
    setSuccess(passwordInput);
  }

  // Confirm Password
  const confirmPasswordValue = confirmPasswordInput.value.trim();
  if(confirmPasswordValue === '') {
    setError(confirmPasswordInput, 'Please confirm your password');
  } else if(confirmPasswordValue !== passwordValue) {
    setError(confirmPasswordInput, 'Passwords do not match');
  } else {
    setSuccess(confirmPasswordInput);
  }
}

function setError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

function setSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}