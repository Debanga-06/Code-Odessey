const dateText = document.getElementById('dateText');
const forecastRow = document.getElementById('forecastRow');

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const FORECAST_DATA = [
  { day: 'Thu', icon: '☀️', temp: '31°' },
  { day: 'Fri', icon: '🌦️', temp: '28°' },
  { day: 'Sat', icon: '⛅', temp: '29°' },
  { day: 'Sun', icon: '🌧️', temp: '25°' },
  { day: 'Mon', icon: '☀️', temp: '30°' }
];

function displayTodayDate() {
  const today = new Date();
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];
  const monthName = MONTH_NAMES[today.getMonth()];
  const date = today.getDate();

  dateText.textContent = `${dayName}, ${date} ${monthName}`;
}

function renderForecast() {
  forecastRow.innerHTML = '';

  FORECAST_DATA.forEach(dayData => {
    const dayBlock = document.createElement('div');
    dayBlock.classList.add('forecast-day');

    dayBlock.innerHTML = `
      <span class="forecast-name">${dayData.day}</span>
      <span class="forecast-icon">${dayData.icon}</span>
      <span class="forecast-temp">${dayData.temp}</span>
    `;

    forecastRow.appendChild(dayBlock);
  });
}

displayTodayDate();
renderForecast();