let mainTemperature = document.querySelector("#temperature-main");
let mainWindSpeed = document.querySelector("#wind-speed-main");
let mainDescription = document.querySelector("#description-main");
let mainHumidity = document.querySelector("#humidity-main");
let timeStamp = document.querySelector("#weather-date");
let mainCity = document.querySelector("#location-h1");
let search = document.querySelector("#city-form");
let apiKey = "ace2c200d6c61096c76082a9e2846e29";
let url = "https://api.openweathermap.org/data/2.5/";
let pathWeather = "weather";
let pathForecast = "forecast";
let units = "metric";
let weatherIconMain = document.querySelector("#weather-icon-main");
let weatherIconRoot = "http://openweathermap.org/img/w";
function createURL(path) {
  return `${url}/${path}`;
}
let dayOne = document.querySelector("#first-day");
let firstTemp = document.querySelector("#first-temp");
let firstMain = document.querySelector("#first-main");
let firstImage = document.querySelector("#first-image");
let dayTwo = document.querySelector("#second-day");
let secondTemp = document.querySelector("#second-temp");
let secondMain = document.querySelector("#second-main");
let secondImage = document.querySelector("#second-image");
let dayThree = document.querySelector("#third-day");
let thirdTemp = document.querySelector("#third-temp");
let thirdMain = document.querySelector("#third-main");
let thirdImage = document.querySelector("#third-image");
let dayFour = document.querySelector("#fourth-day");
let fourthTemp = document.querySelector("#fourth-temp");
let fourthMain = document.querySelector("#fourth-main");
let fourthImage = document.querySelector("#fourth-image");
let dayFive = document.querySelector("#fifth-day");
let fifthTemp = document.querySelector("#fifth-temp");
let fifthMain = document.querySelector("#fifth-main");
let fifthImage = document.querySelector("#fifth-image");

function formatDate(date) {
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let year = date.getFullYear();
  let weekDay = weekDays[date.getDay()];
  let dayOfMonth = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let fullTime = `${hour}:${minute}`;
  if (hour < 10 && minute < 10) {
    return `${dayOfMonth} ${weekDay} ${year}, 0${hour}:0${minute}`;
  }
  if (hour < 10 && minute >= 10) {
    return `${dayOfMonth} ${weekDay} ${year}, 0${hour}:${minute}`;
  }
  if (hour >= 10 && minute < 10) {
    return `${dayOfMonth} ${weekDay} ${year}, ${hour}:0${minute}`;
  } else {
    return `${dayOfMonth} ${weekDay} ${year}, ${hour}:${minute}`;
  }
}

function handleApiResponse(response) {
  mainTemperature.innerHTML = Math.round(response.data.main.temp);
  mainWindSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  mainDescription.innerHTML = response.data.weather[0].description;
  mainHumidity.innerHTML = `${response.data.main.humidity}%`;
  timeStamp.innerHTML = formatDate(new Date(response.data.dt * 1000));
  mainCity.innerHTML = response.data.name;
  weatherIconMain.setAttribute(
    "src",
    `${weatherIconRoot}/${response.data.weather[0].icon}.png`
  );
  weatherIconMain.setAttribute("alt", response.data.weather[0].description);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let coordinates = `lat=${lat}&lon=${lon}`;
  let apiURL = `${createURL(
    pathWeather
  )}?${coordinates}&appid=${apiKey}&units=${units}`;
  console.log(apiURL);
  axios.get(apiURL).then(handleApiResponse);
}

navigator.geolocation.getCurrentPosition(handlePosition);

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city.length > 0) {
    axios
      .get(`${createURL(pathWeather)}?q=${city}&appid=${apiKey}&units=${units}`)
      .then(handleApiResponse);
  } else {
    handlePosition;
  }
}

function getForecast(day, temp, main, image, weekDay) {
  let urlForecast = `${createURL(
    pathForecast
  )}?q=London&appid=${apiKey}&units=${units}`;
  axios.get(urlForecast).then(function(response) {
    day.innerHTML = formatDate(new Date(response.data.list[weekDay].dt * 1000));
    temp.innerHTML = Math.round(response.data.list[weekDay].main.temp);
    main.innerHTML = response.data.list[weekDay + 1].weather[0].main;
    image.setAttribute(
      "src",
      `${weatherIconRoot}/${
        response.data.list[weekDay + 1].weather[0].icon
      }.png`
    );
  });
}

search.addEventListener("submit", handleSearch);
getForecast(dayOne, firstTemp, firstMain, firstImage, 0);
getForecast(dayTwo, secondTemp, secondMain, secondImage, 6);
getForecast(dayThree, thirdTemp, thirdMain, thirdImage, 12);
getForecast(dayFour, fourthTemp, fourthMain, fourthImage, 18);
getForecast(dayFive, fifthTemp, fifthMain, fifthImage, 24);
