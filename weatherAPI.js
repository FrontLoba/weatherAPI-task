const state = document.querySelector('.cur-state');
const date = document.querySelector('.date');
const weatherImage =  document.getElementById('wicon');
const dateOfWeek = document.getElementById('date-time');
const description = document.querySelector('.description');
const tempMax = document.querySelector('.temp-max');
const tempMin = document.querySelector('.temp-min');
const temp = document.querySelector('.digit')
const dayWeek = document.querySelector('.digit')

let apiKey = '1eabe2d63816573e581ac7e73ac69250';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiCall = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';


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
        temp.textContent = x.toFixed()
    }
    );
}
getUserLocation();

date.textContent = Date()

