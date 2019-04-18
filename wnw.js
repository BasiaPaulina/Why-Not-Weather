console.log(axios);
let apiKey = "ace2c200d6c61096c76082a9e2846e29";
let url = "https://api.openweathermap.org/data/2.5/";
let path = "weather";
let city = "Lisbon";
let units = "metric";
let appParams = `q=${city}&appid=${apiKey}&units=${units}`;

console.log(`${url}/${path}?${appParams}`);

axios.get(`${url}/${path}?${appParams}`).then(function(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWindSpeed = `${response.data.wind.speed}`;
  let description = response.data.weather[0].description;
  let currentHumidity = response.data.main.humidity;
  let location = document.querySelector(".location-h1");
  location.innerHTML = city;
  let mainTemperature = document.querySelector(".temperature-main");
  let mainWindSpeed = document.querySelector(".wind-speed-main");
  let mainDescription = document.querySelector(".description-main");
  let mainPercipitation = document.querySelector(".percipitation-main");
  mainTemperature.innerHTML = `Temp: ${currentTemperature} C`;
  mainWindSpeed.innerHTML = `Wind Speed: ${currentWindSpeed} m/s`;
  mainDescription.innerHTML = `${description}`;
  mainPercipitation.innerHTML = `Humidity ${currentHumidity}%`;
});

let now = new Date();
function formatDate(date) {
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let year = date.getFullYear();
  let weekDay = weekDays[date.getDay()];
  let dayOfMonth = date.getDate();
  return `${dayOfMonth} ${weekDay} ${year}`;
}

function formatTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  let fullTime = `${hour}:${minute}`;
  if (hour < 10 && minute < 10) {
    return `0${hour}:0${minute}`;
  }
  if (hour < 10 && minute >= 10) {
    return `0${hour}:${minute}`;
  }
  if (hour >= 10 && minute < 10) {
    return `${hour}:0${minute}`;
  } else {
    return `${hour}:${minute}`;
  }
}
let date = document.querySelector(".date");
date.innerHTML = `${formatDate(now)} ${formatTime(now)}`;
