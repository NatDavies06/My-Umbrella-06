// Function to make the API call
function getWeather(city) {
    const apiKey = '35bf8b92820530c7a388856c0e79bf01';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            getForecast(city);
            saveSearchHistory(city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to display current weather data
function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    currentWeatherDiv.innerHTML = ''; // Clear previous data

    const cityName = data.name;
    const date = new Date(data.dt * 1000);
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherIcon = data.weather[0].icon;
    const weatherDescription = data.weather[0].description;

    const currentWeatherHTML = `
        <h2>Current Weather in ${cityName}</h2>
        <p>Date: ${date.toLocaleDateString()}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Weather: ${weatherDescription}</p>
        <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
    `;
    currentWeatherDiv.innerHTML = currentWeatherHTML;
}

// Function to get 5-day forecast
function getForecast(city) {
    const apiKey = '35bf8b92820530c7a388856c0e79bf01';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}

// Function to display 5-day forecast
function displayForecast(data) {
    const forecastWeatherDiv = document.getElementById('forecastWeather');
    forecastWeatherDiv.innerHTML = '';

    // Get first five forecast
    const forecastList = data.list.slice(0, 5);
    const forecastHTML = `
        <h2>5-Day Forecast</h2>
        <div id="forecastCards"></div>
    `;
    forecastWeatherDiv.innerHTML = forecastHTML;

    const forecastCardsDiv = document.getElementById('forecastCards');

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        const weatherIcon = forecast.weather[0].icon;
        const weatherDescription = forecast.weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p>Date: ${date.toLocaleDateString()}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        `;
        forecastCardsDiv.appendChild(forecastCard);
    });
}

// Function to save search history
function saveSearchHistory(city) {
    const searchHistoryDiv = document.getElementById('searchHistory');
    const searchItem = document.createElement('div');
    searchItem.textContent = city;
    searchItem.classList.add('search-item');
    searchItem.addEventListener('click', () => {
        getWeather(city);
    });
    searchHistoryDiv.appendChild(searchItem);

    // Moved this code inside saveSearchHistory function
    if (!searchHistoryDiv.firstChild) {
        const header = document.createElement('h3');
        header.textContent = 'Search History';
        searchHistoryDiv.appendChild(header);
    }
}

// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value.trim();
    if (cityInput !== '') {
        getWeather(cityInput);
    }
});

// Initial load: Get weather for a default city
getWeather('New York');
