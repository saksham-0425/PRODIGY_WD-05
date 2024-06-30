document.getElementById('location-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let locationInput = document.getElementById('location-input').value.trim();
    
    fetchWeather(locationInput);
});

async function fetchWeather(location) {
    const apiKey = 'your_api_key_here'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();

        if (weatherData.cod === '404') {
            displayErrorMessage('Location not found. Please try again.');
        } else {
            displayWeatherInfo(weatherData);
        }
    } catch (error) {
        displayErrorMessage('There was a problem fetching weather data. Please try again later.');
    }
}

function displayWeatherInfo(data) {
    const weatherInfoContainer = document.getElementById('weather-info');
    weatherInfoContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${new Date().toDateString()}</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayErrorMessage(message) {
    const weatherInfoContainer = document.getElementById('weather-info');
    weatherInfoContainer.innerHTML = `<p>${message}</p>`;
}
