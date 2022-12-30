function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

/*function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#current-location");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${inputCity.value}`;
  }*/

//let currentCity = document.querySelector("#search-city");
//currentCity.addEventListener("submit", search);

function showWeather(response) {
  let city = response.data.name;
  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
  //console.log(response.data.main.temp);
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${temperature}`;
}

function searchCity(city) {
  let apiKey = "6a460c2c284dff920100422153255b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  let currentCity = document.querySelector("#current-location");
  currentCity.innerHTML = `${inputCity.value}`;

  searchCity(inputCity.value);
}

let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6a460c2c284dff920100422153255b5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
