const searchBtn = document.getElementById('btn');
const cityInput = document.getElementById('givenData');
const cityName = document.getElementById('cityName');
const weather = document.getElementById('weather');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const loading = document.getElementById('loading');
const weatherInfo = document.querySelector('.info');

searchBtn.addEventListener('click', ()=>{
    const city = cityInput.value;
    if(city){
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    const url = `https://wttr.in/${city}?format=j1`;

    try{
        loading.style.display = 'block'
        const response = await fetch(url);

        if(!response.ok){
            throw new Error('city not found');
        }
        const data = await response.json();
        displayWeather(data);
        loading.style.display = 'none';
    }
    catch (error) {
        loading.innerHTML = `Something went wrong,  Try again later`;
        console.log(error.message);
    }
}

function displayWeather(data){
     const currentCondition = data.current_condition[0];
     cityName.textContent = data.nearest_area[0].areaName[0].value;
     temperature.textContent = `Temperature: ${currentCondition.temp_C}°C`;
     weather.textContent = `Weather: ${currentCondition.weatherDesc[0].value}`;
     humidity.textContent =  `Humidity: ${currentCondition.humidity}%`;
     wind.textContent = `Wind Speed: ${currentCondition.windspeedKmph} Km/h`;
     weatherInfo.style.display = 'block';
};
