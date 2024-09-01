const main = document.querySelector('main');
const dayTime = document.querySelector('#morning');

const dayWatch = new Date();
const liveDate = new Intl.DateTimeFormat('en-GB').format(now);
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

      //   state.textContent = data.name;
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
                    <i class="fa-light fa-temperature-arrow-up"></i>
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

      // tempMax.
    });
  if (hour > '17') {
    dayTime.classList.add('night');
    dayTime.classList.remove('daytime');
  }
}

getUserLocation();
