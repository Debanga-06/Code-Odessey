const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const emailStatusIcon = document.getElementById('emailStatusIcon');
const emailError = document.getElementById('emailError');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const toggleVisibility = document.getElementById('toggleVisibility');
const strengthFill = document.getElementById('strengthFill');
const strengthLabel = document.getElementById('strengthLabel');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MIN_PASSWORD_LENGTH = 8;

let isEmailValid = false;
let isPasswordValid = false;
let hasEmailBeenTouched = false;
let hasPasswordBeenTouched = false;

function validateEmail() {
  const email = emailInput.value.trim();
  isEmailValid = EMAIL_REGEX.test(email);

  if (!hasEmailBeenTouched) {
    updateSubmitState();
    return;
  }

  emailInput.classList.toggle('valid', isEmailValid);
  emailInput.classList.toggle('invalid', !isEmailValid && email.length > 0);
  emailStatusIcon.textContent = isEmailValid ? '✓' : '';
  emailError.classList.toggle('hidden', isEmailValid || email.length === 0);

  updateSubmitState();
}

function validatePassword() {
  const password = passwordInput.value;
  isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;

  updatePasswordStrength(password);

  if (!hasPasswordBeenTouched) {
    updateSubmitState();
    return;
  }

  passwordInput.classList.toggle('valid', isPasswordValid);
  passwordInput.classList.toggle('invalid', !isPasswordValid && password.length > 0);
  passwordError.classList.toggle('hidden', isPasswordValid || password.length === 0);

  updateSubmitState();
}

function updatePasswordStrength(password) {
  if (password.length === 0) {
    strengthFill.style.width = '0%';
    strengthLabel.textContent = '';
    return;
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very weak', color: '#ff4d5e', width: 20 },
    { label: 'Weak', color: '#f4a261', width: 40 },
    { label: 'Fair', color: '#ffcb47', width: 60 },
    { label: 'Strong', color: '#57c785', width: 80 },
    { label: 'Very strong', color: '#2be0d0', width: 100 }
  ];

  const level = levels[Math.min(score, levels.length - 1)];
  strengthFill.style.width = `${level.width}%`;
  strengthFill.style.background = level.color;
  strengthLabel.textContent = level.label;
}

function updateSubmitState() {
  submitBtn.disabled = !(isEmailValid && isPasswordValid);
}

function togglePasswordVisibility() {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleVisibility.textContent = isPassword ? 'Hide' : 'Show';
}

function handleSubmit(event) {
  event.preventDefault();

  if (!isEmailValid || !isPasswordValid) {
    formStatus.textContent = 'Please fix the errors above.';
    formStatus.style.color = '#ff4d5e';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';
  formStatus.textContent = '';

  setTimeout(() => {
    submitBtn.textContent = 'Sign In';
    submitBtn.disabled = false;
    formStatus.textContent = 'Signed in successfully!';
    formStatus.style.color = '#57c785';
  }, 1200);
}

emailInput.addEventListener('input', validateEmail);
emailInput.addEventListener('blur', () => {
  hasEmailBeenTouched = true;
  validateEmail();
});

passwordInput.addEventListener('input', validatePassword);
passwordInput.addEventListener('blur', () => {
  hasPasswordBeenTouched = true;
  validatePassword();
});

toggleVisibility.addEventListener('click', togglePasswordVisibility);
loginForm.addEventListener('submit', handleSubmit);

updateSubmitState();