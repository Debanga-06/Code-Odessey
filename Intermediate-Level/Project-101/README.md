# Weather App - API Integration ☁️

![Project Status](https://img.shields.io/badge/status-completed-success)
![Difficulty](https://img.shields.io/badge/difficulty-intermediate-orange)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-OpenWeatherMap-orange)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [API Setup](#api-setup)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [API Integration Details](#api-integration-details)
- [Code Walkthrough](#code-walkthrough)
- [Error Handling](#error-handling)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

A **production-ready weather application** that demonstrates professional API integration, async/await patterns, error handling, and real-time data processing. This intermediate-level project fetches live weather data from OpenWeatherMap API, displays current conditions, detailed metrics, and a 5-day forecast. Features geolocation support, search functionality, and a polished dark-themed UI.

**Live Demo:** [View Project](#) *(Add your live demo link)*

## ✨ Features

### Core Functionality
- 🔍 **City Search** - Search weather by city name with auto-complete support
- 📍 **Geolocation** - Get weather for current location with one click
- 🌡️ **Current Weather** - Real-time temperature, conditions, and feels-like data
- 📊 **Detailed Metrics** - Wind speed, humidity, pressure, visibility
- 🌅 **Sun Times** - Sunrise and sunset with timezone conversion
- 📅 **5-Day Forecast** - Daily temperature predictions with weather icons
- ⏱️ **Real-Time Updates** - Current date and time display
- 🎨 **Weather Icons** - Emoji-based icons matching weather conditions

### Technical Features
- ⚡ **Async/Await** - Modern asynchronous JavaScript patterns
- 🔄 **Multiple API Calls** - Parallel data fetching and aggregation
- 🛡️ **Error Handling** - Comprehensive try-catch with user-friendly messages
- 🔑 **API Key Management** - Secure API configuration
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 💾 **Data Transformation** - Unit conversion, time formatting, data parsing
- 🎯 **Loading States** - Visual feedback during API calls
- 🚨 **Error States** - Clear error messages for different failure scenarios

## 🎓 Learning Outcomes

This intermediate project teaches:

1. **Fetch API** - Making HTTP requests to external APIs
2. **Async/Await** - Modern asynchronous JavaScript syntax
3. **Promises** - Understanding promise chains and error handling
4. **API Keys** - Secure API authentication and configuration
5. **JSON Parsing** - Working with JSON data structures
6. **Error Handling** - Try-catch blocks and graceful degradation
7. **HTTP Status Codes** - Handling 200, 404, 401, 500 responses
8. **Geolocation API** - Browser geolocation access
9. **Date Manipulation** - Working with timestamps and timezones
10. **Data Transformation** - Converting units, formatting data
11. **State Management** - Managing UI states (loading, error, success)
12. **API Documentation** - Reading and implementing API specs
13. **Environment Variables** - Managing sensitive data
14. **CORS** - Understanding cross-origin requests

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with custom properties
- **JavaScript ES6+** - Async/await, fetch API, arrow functions
- **OpenWeatherMap API** - Weather data provider
- **Geolocation API** - Browser location services
- **Date API** - Time and date manipulation

## 🔑 API Setup

### Step 1: Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click **"Sign Up"** (it's free!)
3. Verify your email
4. Go to **API Keys** section in your account
5. Copy your API key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 2: Add API Key to Project

Open `index.html` and replace the placeholder:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace this
```

With your actual key:

```javascript
const API_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'; // Your real key
```

### Step 3: Test the App

1. Open `index.html` in your browser
2. Search for a city or use geolocation
3. Weather data should appear!

⚠️ **Important:** Never commit your API key to public repositories! See [Security Best Practices](#security-best-practices) below.

## 📁 Project Structure

```
Weather-App/
│
├── index.html          # Complete weather app (HTML + CSS + JS)
├── README.md           # This file
└── .env.example        # Example environment file (optional)
```

## 🚀 Installation

### Method 1: Direct Download

1. **Download the file**
   ```bash
   # Or clone the entire repository
   git clone https://github.com/Debanga-06/Code-Odessey.git
   cd Code-Odessey/Weather-App
   ```

2. **Add your API key** (see [API Setup](#api-setup))

3. **Open in browser**
   ```bash
   open index.html
   ```

### Method 2: Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000`

## 💻 Usage Guide

### Searching for a City

1. Type a city name in the search box
2. Press **Enter** or click **Search**
3. Weather data loads within 1-2 seconds

**Supported formats:**
- Single city: `London`
- City with country: `London,UK`
- City with state (US): `Portland,OR,US`

### Using Geolocation

1. Click the **📍 Location** button
2. Allow location access in browser prompt
3. Weather for your current location loads automatically

### Reading the Data

**Main Card:**
- Large number = current temperature in °C
- Icon + description = current conditions
- "Feels like" = wind chill / heat index

**Detail Cards:**
- Wind Speed (km/h)
- Humidity (percentage)
- Pressure (hPa)
- Visibility (km)
- Sunrise/Sunset (local time)

**Forecast Cards:**
- Day of week
- Weather icon
- High/Low temperatures

## 🔗 API Integration Details

### Endpoints Used

#### 1. Current Weather Data
```
GET https://api.openweathermap.org/data/2.5/weather
```

**Parameters:**
- `q` - City name (e.g., `London` or `London,UK`)
- `lat` & `lon` - Coordinates for geolocation
- `units` - `metric` (Celsius) or `imperial` (Fahrenheit)
- `appid` - Your API key

**Response Example:**
```json
{
  "name": "London",
  "main": {
    "temp": 15.5,
    "feels_like": 14.2,
    "humidity": 72,
    "pressure": 1013
  },
  "weather": [{
    "description": "overcast clouds",
    "icon": "04d"
  }],
  "wind": {
    "speed": 3.5
  },
  "sys": {
    "country": "GB",
    "sunrise": 1704524400,
    "sunset": 1704556800
  },
  "coord": {
    "lat": 51.5074,
    "lon": -0.1278
  }
}
```

#### 2. 5-Day Forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
```

**Parameters:**
- `lat` & `lon` - Coordinates (from current weather response)
- `units` - `metric`
- `appid` - Your API key

**Response:** Array of 40 forecasts (3-hour intervals for 5 days)

### API Call Flow

```
User Action → Show Loading
     ↓
Fetch Current Weather (by city or coords)
     ↓
Extract Coordinates
     ↓
Fetch 5-Day Forecast (using coords)
     ↓
Process & Display Data → Hide Loading
```

## 🔍 Code Walkthrough

### 1. Fetch Weather by City

```javascript
async function fetchWeatherByCity(city) {
  showLoading();
  
  try {
    // Construct API URL with city name
    const currentWeatherUrl = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    
    // Make the API request
    const currentResponse = await fetch(currentWeatherUrl);
    
    // Check if request was successful
    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        throw new Error('City not found');
      }
      throw new Error('Failed to fetch weather');
    }

    // Parse JSON response
    const currentData = await currentResponse.json();
    
    // Extract coordinates for forecast
    const { coord } = currentData;

    // Fetch forecast using coordinates
    const forecastUrl = `${API_BASE_URL}/forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${API_KEY}`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Display the data
    displayWeather(currentData, forecastData);
    showWeather();
    
  } catch (error) {
    showError(error.message);
    console.error('Error:', error);
  }
}
```

### 2. Data Transformation

```javascript
// Convert wind speed from m/s to km/h
const windSpeedKmh = Math.round(current.wind.speed * 3.6);

// Convert visibility from meters to kilometers
const visibilityKm = (current.visibility / 1000).toFixed(1);

// Format Unix timestamp to readable time
function formatTime(timestamp, timezone) {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}
```

### 3. Geolocation Integration

```javascript
async function handleGeolocation() {
  if (!navigator.geolocation) {
    showError('Geolocation not supported');
    return;
  }

  showLoading();
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (error) => {
      showError('Unable to retrieve location');
    }
  );
}
```

### 4. Error Handling Patterns

```javascript
try {
  const response = await fetch(url);
  
  if (!response.ok) {
    // Handle specific HTTP errors
    if (response.status === 404) {
      throw new Error('City not found');
    } else if (response.status === 401) {
      throw new Error('Invalid API key');
    } else {
      throw new Error('Network error');
    }
  }

  const data = await response.json();
  // Process data...
  
} catch (error) {
  // Display user-friendly error
  showError(error.message);
  // Log technical details
  console.error('Technical error:', error);
}
```

## 🛡️ Error Handling

### Error Types & Messages

| Error | User Message | Technical Cause |
|---|---|---|
| 404 | "City not found. Please check spelling." | Invalid city name |
| 401 | "Invalid API key. Check configuration." | Wrong/missing API key |
| Network | "Failed to fetch. Try again later." | No internet / API down |
| Geolocation | "Unable to retrieve location." | Permission denied |
| Timeout | "Request timed out. Try again." | Slow connection |

### Error State UI

```javascript
function showError(message) {
  hideLoading();
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  weatherContent.classList.add('hidden');
}
```

## 🎨 Customization Guide

### Change Temperature Units

Replace `metric` with `imperial` in API URLs:

```javascript
const url = `${API_BASE_URL}/weather?q=${city}&units=imperial&appid=${API_KEY}`;
```

Then update display:
```javascript
<span class="unit">°F</span> // Instead of °C
```

### Add More Weather Details

The API provides additional data you can display:

```javascript
// From current weather response
current.clouds.all        // Cloud coverage %
current.main.temp_min     // Minimum temperature
current.main.temp_max     // Maximum temperature
current.main.sea_level    // Sea-level pressure
current.wind.deg          // Wind direction (degrees)
```

### Change Color Theme

Edit CSS variables:

```css
:root {
  --bg-primary: #0f1419;      /* Page background */
  --bg-card: #242b36;         /* Card background */
  --accent: #3b82f6;          /* Accent color */
  --text-primary: #f8fafc;    /* Main text */
}
```

### Add Weather Icons

Replace emoji icons with image icons:

```javascript
const weatherIcons = {
  '01d': '<img src="icons/sun.png">',
  '01n': '<img src="icons/moon.png">',
  // ... etc
};
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub** (with API key in code for now)

2. **Import in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Add Environment Variable** (Optional - for security):
   - In Vercel dashboard → Settings → Environment Variables
   - Add `API_KEY` with your key value
   - Update code to use `process.env.API_KEY` (requires build step)

### Security Best Practices

⚠️ **Never commit API keys to public repos!**

**Option 1: Environment Variables (Recommended)**

Create a `.env` file (don't commit this):
```
WEATHER_API_KEY=your_actual_key_here
```

**Option 2: Serverless Function**

Move API calls to a backend function that stores the key securely.

**Option 3: API Key Restrictions**

In OpenWeatherMap dashboard, restrict your key to specific domains:
- Add your Vercel domain: `your-app.vercel.app`
- Add localhost for development: `localhost`

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

**Required Features:**
- Fetch API
- Async/Await
- Geolocation API
- ES6+ JavaScript

## 🚀 Future Enhancements

- [ ] Add temperature unit toggle (°C ↔ °F)
- [ ] Save favorite cities in localStorage
- [ ] Display hourly forecast (24 hours)
- [ ] Add weather maps integration
- [ ] Show air quality index (AQI)
- [ ] Add weather alerts/warnings
- [ ] Implement autocomplete for city search
- [ ] Add historical weather data
- [ ] Show weather radar/satellite imagery
- [ ] Add voice search capability
- [ ] Implement dark/light theme toggle
- [ ] Add weather-based background animations
- [ ] Show UV index and pollen count
- [ ] Add PWA support (offline mode)
- [ ] Implement i18n (multi-language support)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Commit and push
6. Open a Pull Request

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](../../LICENSE) file.

---

## 📚 Related Projects

- [Project 010 - Login Page UI](../Project-10/)
- [Project 027 - Mobile Responsive Page](../Project-27/)

## 🎓 Learning Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [JavaScript.info - Async](https://javascript.info/async)

## 📞 Contact

**DEBANGA** — [@Debanga-06](https://github.com/Debanga-06)

Project Link: [https://github.com/Debanga-06/Code-Odessey](https://github.com/Debanga-06/Code-Odessey)

---

**Part of the [Code-Odessey](https://github.com/Debanga-06/Code-Odessey) Project Series** 🚀

*Intermediate-level project demonstrating professional API integration*

**Happy Coding!** ☁️✨