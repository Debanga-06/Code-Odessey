const optionsList = document.getElementById('optionsList');
const totalVotesEl = document.getElementById('totalVotes');
const resetBtn = document.getElementById('resetBtn');
const votedMsg = document.getElementById('votedMsg');

let pollOptions = [
  { id: 1, label: 'React', votes: 42 },
  { id: 2, label: 'Vue', votes: 18 },
  { id: 3, label: 'Svelte', votes: 15 },
  { id: 4, label: 'Angular', votes: 12 },
  { id: 5, label: 'Vanilla JS', votes: 9 }
];

let selectedOptionId = null;

function getTotalVotes() {
  return pollOptions.reduce((sum, option) => sum + option.votes, 0);
}

function getPercentage(votes, total) {
  if (total === 0) return 0;
  return Math.round((votes / total) * 100);
}

function renderOptions() {
  const totalVotes = getTotalVotes();
  optionsList.innerHTML = '';

  pollOptions.forEach(option => {
    const percentage = getPercentage(option.votes, totalVotes);
    const isSelected = option.id === selectedOptionId;

    const optionEl = document.createElement('div');
    optionEl.classList.add('option');
    if (isSelected) optionEl.classList.add('selected');

    optionEl.innerHTML = `
      <div class="option-fill" style="width: ${percentage}%"></div>
      <div class="option-content">
        <span class="option-label">
          <span class="option-check">${isSelected ? '✓' : ''}</span>
          ${option.label}
        </span>
        <span class="option-stats">
          <span>${option.votes} votes</span>
          <span class="option-percentage">${percentage}%</span>
        </span>
      </div>
    `;

    optionEl.addEventListener('click', () => castVote(option.id));
    optionsList.appendChild(optionEl);
  });

  totalVotesEl.textContent = `${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`;
}

function castVote(optionId) {
  if (selectedOptionId === optionId) return;

  if (selectedOptionId !== null) {
    const previousOption = pollOptions.find(option => option.id === selectedOptionId);
    previousOption.votes--;
  }

  const newOption = pollOptions.find(option => option.id === optionId);
  newOption.votes++;
  selectedOptionId = optionId;

  votedMsg.classList.remove('hidden');
  renderOptions();
}

function resetPoll() {
  pollOptions = pollOptions.map(option => ({ ...option, votes: 0 }));
  selectedOptionId = null;
  votedMsg.classList.add('hidden');
  renderOptions();
}

resetBtn.addEventListener('click', resetPoll);

renderOptions();