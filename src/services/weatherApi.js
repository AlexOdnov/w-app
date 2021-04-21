export const loadCurrentWeather = function (cityName) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&units=metric&appid=${process.env.VUE_APP_API_KEY}`
  );
};

export const loadCityForecast = function (lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${process.env.VUE_APP_API_KEY}`
  );
};
