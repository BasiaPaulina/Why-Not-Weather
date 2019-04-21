let mainTemperature = document.querySelector("#temperature-main");
let mainWindSpeed = document.querySelector("#wind-speed-main");
let mainDescription = document.querySelector("#description-main");
let mainHumidity = document.querySelector("#humidity-main");
let timeStamp = document.querySelector("#weather-date");
let mainCity = document.querySelector("#location-h1");
let apiKey = "ace2c200d6c61096c76082a9e2846e29";
let url = "https://api.openweathermap.org/data/2.5/";
let path = "weather";
let city = "Lisbon";
let units = "metric";
let appParams = `q=${city}&appid=${apiKey}&units=${units}`;
console.log(`${url}/${path}?${appParams}`);

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

axios.get(`${url}/${path}?${appParams}`).then(function(response) {
  mainTemperature.innerHTML = Math.round(response.data.main.temp);
  mainWindSpeed.innerHTML = `${response.data.wind.speed} km/h`;
  mainDescription.innerHTML = response.data.weather[0].description;
  mainHumidity.innerHTML = `${response.data.main.humidity}%`;
  timeStamp.innerHTML = formatDate(new Date(response.data.dt * 1000));
  mainCity.innerHTML = city;
});
