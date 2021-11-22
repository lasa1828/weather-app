let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${hour}:${minutes}`;

function conversionFahrenheitLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahreneitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature");

  temperatureElement.innerHTML = Math.round(fahreneitTemperature);
}
function conversionCelsiusLink(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#current-temperature");

  temperatureElement.innerHTML = Math.round(fahreneitTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", conversionFahrenheitLink);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", conversionCelsiusLink);

function getForecast(coordinates) {
  let apiKey = "c5e1f4b02577647cb3da3a656eabc850";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let currentTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = `${currentTemperature}`;
  celsiusTemperature = response.data.main.temp;

  let currentWeather = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${currentWeather}`;

  let currentWind = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${currentWind}km/h`;

  let currentHumidity = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "c5e1f4b02577647cb3da3a656eabc850";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Rome");
