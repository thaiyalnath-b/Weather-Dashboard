const searchBtn = document.getElementById('btn');
const cityInput = document.getElementById('givenData');
const cityName = document.getElementById('cityName');
const weather = document.getElementById('weather');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const loading = document.getElementById('loading');
const weatherInfo = document.querySelector('.info');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;

    if (city) {
        fetchWeather(city);
        cityInput.value = '';
    }
});

async function fetchWeather(city) {

    weatherInfo.style.display = 'none';
    cityName.textContent = '';
    temperature.textContent = '';
    weather.textContent = '';
    humidity.textContent = '';
    wind.textContent = '';

    loading.innerHTML = 'Loading...';
    loading.style.display = 'block';

    const url = `https://api.weatherapi.com/v1/current.json?key=e985ae2aa0ea40fda3153809260603&q=${city}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        displayWeather(data);

        loading.style.display = 'none';

    } catch (error) {

        loading.innerHTML = 'Something went wrong. Try again later';
        console.log(error.message);

    }
}

function displayWeather(data) {

    cityName.textContent = data.location.name;

    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

    weather.textContent = `Weather: ${data.current.condition.text}`;

    humidity.textContent = `Humidity: ${data.current.humidity}%`;

    wind.textContent = `Wind Speed: ${data.current.wind_kph} Km/h`;

    weatherInfo.style.display = 'block';
}