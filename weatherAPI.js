const state = document.querySelector('.cur-state');
const dateFormat = document.querySelector('.date');
const weatherImage =  document.getElementById('wicon');
const dateOfWeek = document.getElementById('date-time');
const description = document.querySelector('.description');
const tempMax = document.querySelector('.temp-max');
const tempMin = document.querySelector('.temp-min');
const temp = document.querySelector('.digit');
const latitude = document.getElementById('lat');
const longitude = document.getElementById('lon');
const humidity = document.getElementById('humidity');
const country = document.getElementById('country')
const dayWeek = document.querySelector('.digit');
const unit = document.getElementById('deg-unit').innerHTML = '&deg;C'

let apiKey = '1eabe2d63816573e581ac7e73ac69250';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiCall = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

dateFormat.textContent = new Date()

function getUserLocation () { 
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayWeather)
    } else {
        alert('The browser does not support geolocation')
    };
}

function displayWeather (position) {
    fetch (`${baseURL}lat=${position.coords.latitude}&lon=${position.coords.latitude}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        JSON.stringify(data)
        console.log(data);
        state.textContent = data.name;
        weatherImage.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        description.textContent = data.weather[0].main;
        let x = (data.main.temp - 273)
        temp.textContent = x.toFixed();
        let tmax = (data.main.temp_max - 273)
        tempMax.textContent = tmax.toFixed()
        let tmin = (data.main.temp_min - 273)
        tempMin.textContent = tmin.toFixed()
        latitude.textContent = data.coord.lat;
        longitude.textContent = data.coord.lon;
        humidity.textContent = data.main.humidity;
        country.textContent = data.sys.country;
        
        // tempMax.
    }
    );
}
getUserLocation();



