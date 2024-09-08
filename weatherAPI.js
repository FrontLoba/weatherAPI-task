const main = document.querySelector('main');
const dayTime = document.querySelector('#morning');

const dayWatch = new Date();
const locale = navigator.language;

const option = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  Weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const liveDate = new Intl.DateTimeFormat(locale, option).format(dayWatch);

const day = dayWatch.getDate();
const month = dayWatch.getMonth() + 1;
const year = dayWatch.getFullYear();
const hour = dayWatch.getHours();
const minute = dayWatch.getMinutes();

let apiKey = '1eabe2d63816573e581ac7e73ac69250';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiCall =
  'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

// dateFormat.textContent = `${day}/${month}/${year} ${hour}:${minute}`

function renderDetail(data) {
  let x = data.main.temp - 273;
  let tmax = data.main.temp_max - 273;
  let tmin = data.main.temp_min - 273;
  const html = `      
      <h1 class="cur-state">${data.name}</h1>
      <p class="description">${data.weather[0].main}</p>
      <img class="hero" id="wicon" src=${`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="weather icon">
        <div class="degree">
            <h2 class="digit">${x.toFixed()}</h2>
            <span id="deg-unit">
                &#8451;
            </span>
        </div>
        <p class="date" id="date-time">${liveDate}</p>
         
        <table>
            <tr>
                <td class="day">Latitude</td>
                <td class="cloud-icon" id="cloud-sign">
                    <img src="" alt="">
                </td>
                <td id="lat">${data.coord.lat}</td>
            </tr>
            <tr>
                <td class="day">Longitude</td>
                <td class="cloud-icon" id="cloud-sign">
                    <img src="" alt="">
                </td>
                <td id="lon">${data.coord.lon}</td>
            </tr>
            <tr>
                <td class="day" id="day">Temp Max</td>
                <td class="cloud-icon" id="cloud-sign">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="3.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>

                </td>
                <td class="temp-max">${tmax.toFixed(2)}</td>
            </tr>
            <tr>
                <td class="day" id="day">Temp Mini</td>
                <td class="cloud-icon" id="cloud-sign">
                    <i class="fa-light fa-temperature-arrow-down"></i>
                </td>
                <td class="temp-min">${tmin.toFixed(2)}</td>
            </tr>
            <tr>
                <td class="day" id="day">Humidity</td>
                <td class="cloud-icon" id="cloud-sign">
                    <img src="" alt="">
                </td>
                <td id="humidity">${data.main.humidity}</td>
            </tr>
            
            <tr>
                <td class="day" id="day">Country</td>
                <td class="cloud-icon" id="cloud-sign">
                    <img src="" alt="">
                </td>
                <td id="country">${data.sys.country}</td>
               
            </tr>

        </table>
    `;
  dayTime.insertAdjacentHTML('beforeend', html);

  if (hour > '17') {
    dayTime.classList.add('night');
    dayTime.classList.remove('daytime');
  }
}

function renderError(msg) {
  main.insertAdjacentText('beforeend', msg);
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayWeather);
  } else {
    alert('The browser does not support geolocation');
  }
}

function displayWeather(position) {
  const { latitude, longitude } = position.coords;

  // const latPost = position.coords.latitude;
  // const longPost = position.coords.longitude;

  fetch(`${baseURL}lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      JSON.stringify(data);
      console.log(data);
      renderDetail(data);
    })
    .catch((err) => {
      console.log(err);
      renderError(`Something went wrong. ${err.message}`);
    })
    .finally(() => {
      main.style.opacity = 1;
    });
}

getUserLocation();
