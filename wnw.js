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
  let description = response.data.weather[2];
  let currentPericipation = response.data.rain;
  let location = document.querySelector(".location-h1");
  location.innerHTML = city;
  let mainWeather = document.querySelector(".main-weather");
  mainWeather.innerHTML = `${currentTemperature} C ${currentWindSpeed} ${description} ${currentPericipation}`;
});
