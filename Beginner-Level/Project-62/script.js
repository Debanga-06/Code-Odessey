const gameTree = {
    start: {
      text: 'Are you feeling adventurous today?',
      yes: 'forest',
      no: 'home'
    },
    forest: {
      text: 'You step into a dark forest. Do you hear footsteps behind you?',
      yes: 'chase',
      no: 'clearing'
    },
    home: {
      text: 'You decide to stay in. Do you want to read a book?',
      yes: 'endingReader',
      no: 'endingBored'
    },
    chase: {
      text: 'Something is following you. Do you run?',
      yes: 'endingEscape',
      no: 'endingCaught'
    },
    clearing: {
      text: 'You find a quiet clearing with a locked chest. Do you open it?',
      yes: 'endingTreasure',
      no: 'endingWalkAway'
    },
    endingReader: {
      ending: true,
      title: 'A Cozy Evening',
      text: 'You spend the night lost in a good book. Peaceful, but the adventure will have to wait.'
    },
    endingBored: {
      ending: true,
      title: 'Missed Opportunity',
      text: 'You stayed home and did nothing much. Maybe next time, adventure will call again.'
    },
    endingEscape: {
      ending: true,
      title: 'Narrow Escape',
      text: 'You sprint through the trees and lose whatever was following you. Heart racing, you make it out safely.'
    },
    endingCaught: {
      ending: true,
      title: 'Caught Off Guard',
      text: 'You freeze. It turns out to be a curious deer. Still, your heart nearly stopped.'
    },
    endingTreasure: {
      ending: true,
      title: 'Treasure Found',
      text: 'Inside the chest: an old map to somewhere even more mysterious. Your adventure has just begun.'
    },
    endingWalkAway: {
      ending: true,
      title: 'The Cautious Path',
      text: 'You leave the chest untouched and continue on. Some mysteries are better left alone.'
    }
  };
  
  const pathTrail = document.getElementById('pathTrail');
  const nodeText = document.getElementById('nodeText');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const backBtn = document.getElementById('backBtn');
  const gameScreen = document.getElementById('gameScreen');
  const endingScreen = document.getElementById('endingScreen');
  const endingTitle = document.getElementById('endingTitle');
  const endingText = document.getElementById('endingText');
  const restartBtn = document.getElementById('restartBtn');
  const themeButtons = document.querySelectorAll('.theme-btn');
  const body = document.body;
  
  let currentNodeKey = 'start';
  let history = [];
  
  function renderNode() {
    const node = gameTree[currentNodeKey];
  
    if (node.ending) {
      showEnding(node);
      return;
    }
  
    gameScreen.classList.remove('hidden');
    endingScreen.classList.add('hidden');
  
    nodeText.textContent = node.text;
    pathTrail.textContent = `Step ${history.length + 1}`;
    backBtn.classList.toggle('hidden', history.length === 0);
  }
  
  function showEnding(node) {
    gameScreen.classList.add('hidden');
    endingScreen.classList.remove('hidden');
  
    endingTitle.textContent = node.title;
    endingText.textContent = node.text;
  }
  
  function handleChoice(choice) {
    const node = gameTree[currentNodeKey];
    history.push(currentNodeKey);
    currentNodeKey = node[choice];
    renderNode();
  }
  
  function goBack() {
    if (history.length === 0) return;
    currentNodeKey = history.pop();
    renderNode();
  }
  
  function restartGame() {
    currentNodeKey = 'start';
    history = [];
    renderNode();
  }
  
  yesBtn.addEventListener('click', () => handleChoice('yes'));
  noBtn.addEventListener('click', () => handleChoice('no'));
  backBtn.addEventListener('click', goBack);
  restartBtn.addEventListener('click', restartGame);
  
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      body.className = button.dataset.theme;
      themeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  renderNode();