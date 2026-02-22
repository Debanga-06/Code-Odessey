const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett"
  },
  {
    text: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  }
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quote").textContent = `"${randomQuote.text}"`;
  document.getElementById("author").textContent = `- ${randomQuote.author}`;
}