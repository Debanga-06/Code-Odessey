const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

passwordInput.addEventListener('input', updateStrength);

function updateStrength() {
  const password = passwordInput.value;
  let strength = 0;

  // Check for different conditions
  const regexes = [
    /[a-z]/,        // Lowercase
    /[A-Z]/,        // Uppercase
    /[0-9]/,        // Numbers
    /[^A-Za-z0-9]/  // Special characters
  ];

  regexes.forEach((regex) => {
    if (regex.test(password)) strength++;
  });

  if (password.length >= 8) strength++;

  // Update strength bar
  switch(strength) {
    case 0:
    case 1:
    case 2:
      strengthBar.style.width = '25%';
      strengthBar.style.background = 'red';
      strengthText.textContent = 'Password Strength: Weak';
      break;
    case 3:
    case 4:
      strengthBar.style.width = '75%';
      strengthBar.style.background = 'orange';
      strengthText.textContent = 'Password Strength: Medium';
      break;
    case 5:
      strengthBar.style.width = '100%';
      strengthBar.style.background = 'green';
      strengthText.textContent = 'Password Strength: Strong';
      break;
  }
}