// API Configuration

const API_KEY = '43e07afa90ccdabbe1e721d858e9a4ea';
console.log("Using API Key:", API_KEY);
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const weatherContent = document.getElementById('weatherContent');

// Weather icon mapping
const weatherIcons = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️'
};

// Initialize app
function init() {
  searchBtn.addEventListener('click', handleSearch);
  locationBtn.addEventListener('click', handleGeolocation);
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Load default city on page load
  fetchWeatherByCity('London');
}

// Show/Hide UI states
function showLoading() {
  loading.classList.remove('hidden');
  errorMessage.classList.add('hidden');
  weatherContent.classList.add('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}

function showError(message) {
  hideLoading();
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  weatherContent.classList.add('hidden');
}

function showWeather() {
  hideLoading();
  errorMessage.classList.add('hidden');
  weatherContent.classList.remove('hidden');
}

// Handle search
function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Please enter a city name');
    return;
  }
  fetchWeatherByCity(city);
}

// Handle geolocation
async function handleGeolocation() {
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser');
    return;
  }

  showLoading();
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (error) => {
      showError('Unable to retrieve your location. Please enter a city manually.');
    }
  );
}

// Fetch weather by city name
async function fetchWeatherByCity(city) {
  showLoading();
  
  try {
    const currentWeatherUrl = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const currentResponse = await fetch(currentWeatherUrl);
    
    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (currentResponse.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Failed to fetch weather data. Please try again later.');
      }
    }

    const currentData = await currentResponse.json();
    const { coord } = currentData;

    // Fetch 5-day forecast
    const forecastUrl = `${API_BASE_URL}/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const forecastData = await forecastResponse.json();

    displayWeather(currentData, forecastData);
    showWeather();
    
  } catch (error) {
    showError(error.message);
    console.error('Error fetching weather:', error);
  }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  try {
    const currentWeatherUrl = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const currentResponse = await fetch(currentWeatherUrl);
    
    if (!currentResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const currentData = await currentResponse.json();

    const forecastUrl = `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const forecastData = await forecastResponse.json();

    displayWeather(currentData, forecastData);
    showWeather();
    
  } catch (error) {
    showError(error.message);
    console.error('Error fetching weather:', error);
  }
}

// Display weather data
function displayWeather(current, forecast) {
  // Location info
  document.getElementById('cityName').textContent = current.name;
  document.getElementById('countryName').textContent = current.sys.country;

  // Date and time
  const now = new Date();
  document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Temperature
  document.getElementById('temperature').textContent = Math.round(current.main.temp);
  document.getElementById('feelsLike').textContent = Math.round(current.main.feels_like);

  // Weather description and icon
  const iconCode = current.weather[0].icon;
  document.getElementById('weatherIcon').textContent = weatherIcons[iconCode] || '☀️';
  document.getElementById('weatherDescription').textContent = current.weather[0].description;

  // Weather details
  document.getElementById('windSpeed').textContent = Math.round(current.wind.speed * 3.6); // m/s to km/h
  document.getElementById('humidity').textContent = `${current.main.humidity}%`;
  document.getElementById('pressure').textContent = current.main.pressure;
  document.getElementById('visibility').textContent = (current.visibility / 1000).toFixed(1);

  // Sunrise and sunset
  document.getElementById('sunrise').textContent = formatTime(current.sys.sunrise, current.timezone);
  document.getElementById('sunset').textContent = formatTime(current.sys.sunset, current.timezone);

  // 5-day forecast
  displayForecast(forecast);
}

// Display forecast
function displayForecast(forecast) {
  const forecastGrid = document.getElementById('forecastGrid');
  forecastGrid.innerHTML = '';

  // Get one forecast per day (around noon)
  const dailyForecasts = forecast.list.filter(item => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12;
  }).slice(0, 5);

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const iconCode = day.weather[0].icon;
    const icon = weatherIcons[iconCode] || '☀️';
    const tempMax = Math.round(day.main.temp_max);
    const tempMin = Math.round(day.main.temp_min);

    const forecastCard = `
      <div class="forecast-card">
        <div class="day">${dayName}</div>
        <div class="icon">${icon}</div>
        <div class="temps">
          <span class="temp-max">${tempMax}°</span>
          <span class="temp-min">${tempMin}°</span>
        </div>
      </div>
    `;

    forecastGrid.innerHTML += forecastCard;
  });
}

// Format unix timestamp to time
function formatTime(timestamp, timezone) {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

// Initialize app when DOM is loaded
init();