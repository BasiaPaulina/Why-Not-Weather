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
  let currentWindSpeed = `${response.data.wind.speed} m/s`;
  let description = response.data.weather[0].description;
  let currentPericipation = response.data.rain;
  let location = document.querySelector(".location-h1");
  location.innerHTML = city;
  let mainWeather = document.querySelector(".main-weather");
  if (currentPericipation === true) {
    mainWeather.innerHTML = `${currentTemperature} C ${currentWindSpeed} ${description} ${currentPericipation}`;
  } else {
    mainWeather.innerHTML = `${currentTemperature} C ${currentWindSpeed} ${description} No Rain`;
  }
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
  if (hour >= 10) {
    return fullTime;
  } else {
    return `0${fullTime}`;
  }
}
let date = document.querySelector(".date");
date.innerHTML = `${formatDate(now)} ${formatTime(now)}`;
