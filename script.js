
const apikey = '3265874a2c77ae4a04bb96236a642d2f'

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=London&appid=3265874a2c77ae4a04bb96236a642d2f`;
  
// image url
// "https://openweathermap.org/img/w/${data.weather[0].icon}.png"

const headerEl = document.querySelector(".header");
const weatherBodyEl = document.querySelector(".weather-body");
const mainEl = document.getElementById("main");


const formEl = document.getElementById("form")
const searchEl = document.getElementById("search")
const heroEl = document.querySelector(".hero");
const errorEl = document.getElementById("err")


async function getWeatherByLocation(city) {
    const resp = await fetch(url(city));
    const respData = await resp.json();
    console.log(respData);
    addWeatherToHeader(respData);
    addWeatherToBody(respData)
}

function addWeatherToHeader(data) {
  const temp = KelvinToCelcuis(data.main.temp);
  const feels = KelvinToCelcuis(data.main.feels_like);

  let timeValue = weatherDate();
  let date = new Date().toDateString();
  let result = `
  <h4 class="weather-header">
  <p class="weather-header-content">${data.name}</p>
  <p class="weather-date">${date}</p>
  <button id="searchBtn">search</button>
  </h4>
  <h1 class="weather-degree">${temp}°<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="weather-icon" /></h1>
  <p class="feels">Feels like <span> ${feels} </span></p>
  <div class="latLong">
    <div class="lon"><h4>Lon</h4><p>${data.coord.lon}</p></div>
    <div class="lat"><h4>Lat</h4><p>${data.coord.lat}</p></div>
  </div>
  <span class="mood">${data.weather[0].main}</span>
<div class="weather-calender">
  <div class="weather-days">
    <a href="#" id="today" class="active">Today</a>
    <a href="#" id="tomorrow">Tomorrow</a>
    <a href="#" id="next-tomorrow">Next 2 days <i class="fas fa-arrow-right"></i></a>
  </div>
  <div class="weather-dialogues">
    <div class="dialogue">
      <p class="now">Now</p>
      <div class="dialogue-condition">
        <i class="fas fa-sun"></i><p>-1°</p>
      </div></div>
    <div class="dialogue">
      <p class="now">11 AM</p>
      <div class="dialogue-condition">
        <i class="fas fa-sun"></i><p>-1°</p>
        </div></div>
    <div class="dialogue">
      <p class="now">12 PM</p>
      <div class="dialogue-condition">
        <i class="fas fa-cloud"></i><p>4°</p>
      </div></div>
    <div class="dialogue">
      <p class="now">1 PM</p>
      <div class="dialogue-condition">
        <i class="fas fa-sun"></i><p>3°</p>
      </div></div>
    <div class="dialogue">
      <p class="now">2 PM</p>
      <div class="dialogue-condition">
        <i class="fas fa-cloud"></i><p>-2°</p>
      </div></div>
    <div class="dialogue">
      <p class="now">3 PM</p>
      <div class="dialogue-condition">
        <i class="fas fa-cloud"></i><p>-1°</p>
      </div></div>
  </div>
</div>
<ul class="nav-info">
  <li><i class="fas fa-tint"></i><p>${data.main.humidity}%</p></li>
  <li><i class="fas fa-info-circle"></i><p>${data.main.pressure/1000}mBar</p></li>
  <li><i class="fas fa-tachometer-alt"></i><p>${data.wind.speed}km/h</p></li>
</ul>
<div class="date-early">
  <span class="pink-bg"></span>
  <p class="date-content">${timeValue}</p>
</div>
<div class="date-late">
  <span class="milk-bg"></span>
  <p class="date-content">06.00 PM</p>
</div>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="wheat" fill-opacity="1" d="M0,128L60,122.7C120,117,240,107,360,90.7C480,75,600,53,720,85.3C840,117,960,203,1080,240C1200,277,1320,267,1380,261.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
  `;

  headerEl.innerHTML = result;

  const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", () => {
    headerEl.classList.remove("display");
    weatherBodyEl.classList.remove("display");
    heroEl.classList.remove("close");
  })

}

function addWeatherToBody(data) {
  let result =  `
    <div class="weather-body-content">
      <div class="row1">
        <h3 class="desc">
        <p>description</p><p>${data.weather[0].description}</p></h3>
        <h3 class="deg">
        <p>degree</p><p>${data.wind.deg}°</p>
        </h3>
      </div>
      <div class="row2">
        <h3 class="gust">
        <p>gust</p><p>${data.wind.gust}</p>
        </h3>
        <h3 class="speed">
        <p>speed</p><p>${data.wind.speed}km/h</p>
        </h3>
      </div>
    </div>
  `;
  weatherBodyEl.innerHTML = result;
}

function KelvinToCelcuis(K) {
  return (K - 273.15).toFixed(1);
}
function weatherDate() {
  let min = new Date().getMinutes();
  let hour = new Date().getHours();
  let ampm = hour >= 12 ? "PM": "AM";
  hour = hour % 12;
  hour = hour ? hour : 12 ;
  min = min < 10 ? `0${min}`: min;
  let result = `${hour}:${min} ${ampm}`;
  return result
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = searchEl.value;

  if (city) {
      getWeatherByLocation(city);
      headerEl.classList.add("display");
      weatherBodyEl.classList.add("display");
      heroEl.classList.add("close");
      searchEl.value = ""
  } else {
    errorEl.innerHTML = `Input a Location!!!`
    setTimeout(function(){
      errorEl.innerHTML = "";
    }, 4000)
  }
  
})

