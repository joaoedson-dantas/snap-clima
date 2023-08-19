/* Variáveis de interação */
const citySearchInput = document.getElementById("city-search-input");
const citySearchButton = document.getElementById("city-search-button");

/* Variáveis de exibição */
const currentDate = document.getElementById("current-date");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const currentTemperature = document.getElementById("current-temperature");
const windSpeed = document.getElementById("wind-speed");
const feelsLikeTemperature = document.getElementById("feels-like-temperature");
const currentHumidity = document.getElementById("current-humidity");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const api_key = "05548647f85f0cb5cd6f7ea9a3c917d1";

/*  */
// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}
citySearchButton.addEventListener("click", () => {
  let cityName = citySearchInput.value;
  getCityWeather(cityName);
});

navigator.geolocation.getCurrentPosition(
  (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getCurrentLocationWeather(lat, lon);
  },
  (erro) => {
    if (erro.code === 1) {
      alert(
        "Geolocalização negada pelo o usuário, busque manualmente por um cidade através da barra de pesquisa."
      );
    } else {
      console.log(erro);
    }
  }
);

function getCurrentLocationWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

function getCityWeather(cityName) {
  weatherIcon.src = `/assets/loading-icon.svg`;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
}

function displayWeather(data) {
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data;
  currentDate.textContent = formatDate(dt);
  cityName.textContent = name;
  weatherIcon.src = `/assets/${icon}.svg`;

  weatherDescription.textContent = description;
  currentTemperature.textContent = `${Math.round(temp)}ºC`;
  windSpeed.textContent = `${Math.round(speed * 3.6)} Km/h`;
  feelsLikeTemperature.textContent = `${Math.round(feels_like)}ºC`;
  currentHumidity.textContent = `${humidity} %`;
  sunriseTime.textContent = formatTime(sunrise);
  sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000);
  let formatDate = date.toLocaleDateString("pt-bt", {
    month: "long",
    day: "numeric",
  });
  return `Hoje, ${formatDate}`;
}

function formatTime(epochTime) {
  let date = new Date(epochTime * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}
