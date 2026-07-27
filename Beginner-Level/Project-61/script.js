const questions = [
    {
      question: 'Which keyword declares a block-scoped variable in JavaScript?',
      options: ['var', 'let', 'function', 'global'],
      answerIndex: 1
    },
    {
      question: 'What does DOM stand for?',
      options: ['Data Object Model', 'Document Object Model', 'Display Output Mode', 'Digital Ordering Method'],
      answerIndex: 1
    },
    {
      question: 'Which method converts a JSON string into a JavaScript object?',
      options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'],
      answerIndex: 1
    },
    {
      question: 'Which operator checks both value and type equality?',
      options: ['==', '=', '===', '!=='],
      answerIndex: 2
    },
    {
      question: 'Which array method adds an item to the end?',
      options: ['shift()', 'unshift()', 'pop()', 'push()'],
      answerIndex: 3
    }
  ];
  
  const quizScreen = document.getElementById('quizScreen');
  const resultScreen = document.getElementById('resultScreen');
  const questionCounter = document.getElementById('questionCounter');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const progressFill = document.getElementById('progressFill');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const feedbackMsg = document.getElementById('feedbackMsg');
  const nextBtn = document.getElementById('nextBtn');
  const finalScore = document.getElementById('finalScore');
  const resultMsg = document.getElementById('resultMsg');
  const restartBtn = document.getElementById('restartBtn');
  const themeButtons = document.querySelectorAll('.theme-btn');
  const body = document.body;
  
  let currentIndex = 0;
  let score = 0;
  let hasAnswered = false;
  
  function loadQuestion() {
    hasAnswered = false;
    feedbackMsg.textContent = '';
    nextBtn.disabled = true;
  
    const current = questions[currentIndex];
    questionCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    progressFill.style.width = `${((currentIndex) / questions.length) * 100}%`;
    questionText.textContent = current.question;
  
    optionsContainer.innerHTML = '';
  
    current.options.forEach((optionText, index) => {
      const button = document.createElement('button');
      button.classList.add('option-btn');
      button.textContent = optionText;
      button.addEventListener('click', () => handleAnswer(index, button));
      optionsContainer.appendChild(button);
    });
  }
  
  function handleAnswer(selectedIndex, selectedButton) {
    if (hasAnswered) return;
    hasAnswered = true;
  
    const current = questions[currentIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
  
    optionButtons.forEach(btn => btn.disabled = true);
  
    if (selectedIndex === current.answerIndex) {
      score++;
      selectedButton.classList.add('correct');
      feedbackMsg.textContent = 'Correct!';
    } else {
      selectedButton.classList.add('incorrect');
      optionButtons[current.answerIndex].classList.add('correct');
      feedbackMsg.textContent = 'Incorrect.';
    }
  
    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.disabled = false;
  }
  
  function nextQuestion() {
    currentIndex++;
  
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
  
    finalScore.textContent = `You scored ${score} / ${questions.length}`;
  
    const percentage = (score / questions.length) * 100;
    let message;
  
    if (percentage === 100) {
      message = 'Perfect score! Excellent work.';
    } else if (percentage >= 60) {
      message = 'Good job! Solid understanding.';
    } else {
      message = 'Keep practicing, you will get there.';
    }
  
    resultMsg.textContent = message;
  }
  
  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
  }
  
  nextBtn.addEventListener('click', nextQuestion);
  restartBtn.addEventListener('click', restartQuiz);
  
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      body.className = button.dataset.theme;
      themeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  loadQuestion();