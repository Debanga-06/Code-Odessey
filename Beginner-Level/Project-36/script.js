let randomNumber = Math.floor(Math.random() * 100) + 1;
let totalAttempts = 0;

function checkGuess() {
  const userGuess = Number(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const attempts = document.getElementById("attempts");

  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = "⚠️ Please enter a number between 1 and 100!";
    return;
  }

  totalAttempts++;

  if (userGuess === randomNumber) {
    message.textContent = "🎉 Correct! You guessed the number!";
  } 
  else if (userGuess > randomNumber) {
    message.textContent = "📉 Too high! Try again.";
  } 
  else {
    message.textContent = "📈 Too low! Try again.";
  }

  attempts.textContent = `Attempts: ${totalAttempts}`;
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  totalAttempts = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent = "";
}