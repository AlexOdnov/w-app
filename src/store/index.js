import { createStore } from 'vuex';
import { localStorageServices } from './../services/localStorageServices';
import { loadCityForecast, loadCurrentWeather } from './../services/weatherApi';

export default createStore({
  state: {
    isDark: false,
    isLoad: true,
    cities: [],
    currentWeathers: [],
    citiesForecast: {},
  },
  mutations: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    addCity(state, city) {
      state.cities.push(city);
    },
    removeCity(state, cityName) {
      state.cities = state.cities.filter(
        (city) => city.name !== cityName.toLowerCase()
      );
    },
    changeLoadingState(state, flag) {
      state.isLoad = flag;
    },
    addCurrentWeather(state, weather) {
      state.currentWeathers.push(weather);
    },
    removeCurrentWeather(state, cityName) {
      state.currentWeathers = state.currentWeathers.filter(
        (weather) => weather.name.toLowerCase() !== cityName.toLowerCase()
      );
    },
    addCityForecast(state, { cityName, cityForecast }) {
      state.citiesForecast[cityName.toLowerCase()] = cityForecast;
    },
  },
  actions: {
    toggleTheme({ commit, state }) {
      commit('toggleTheme');
      localStorageServices.setItem('isDark', state.isDark);
    },
    getTheme({ commit }) {
      return new Promise((resolve, reject) => {
        const theme = localStorageServices.getItem('isDark');
        if (theme !== null) {
          if (theme) {
            commit('toggleTheme');
          }
          resolve();
        } else {
          reject();
        }
      });
    },
    addCity({ commit, dispatch, state }, city) {
      return new Promise((resolve, reject) => {
        dispatch('getCurrentWeather', city)
          .then((coord) => {
            commit('addCity', {
              name: city.toLowerCase(),
              lon: coord.lon,
              lat: coord.lat,
            });
            localStorageServices.setItem('cities', state.cities);
            resolve();
          })
          .catch(() => reject());
      });
    },
    removeCity({ commit, state }, cityName) {
      commit('removeCity', cityName);
      commit('removeCurrentWeather', cityName);
      localStorageServices.setItem('cities', state.cities);
    },
    getCities({ commit }) {
      const cities = localStorageServices.getItem('cities');
      if (cities) {
        cities.forEach((city) => commit('addCity', city));
      }
    },
    getCurrentWeather({ commit }, cityName) {
      return new Promise((resolve, reject) => {
        commit('changeLoadingState', true);
        loadCurrentWeather(cityName)
          .then((response) => response.json())
          .then((response) => {
            if (response.cod === '404') {
              reject();
            } else {
              commit('addCurrentWeather', response);
              resolve({ lon: response.coord.lon, lat: response.coord.lat });
            }
          })
          .finally(() => commit('changeLoadingState', false));
      });
    },
    getCurrentWeathers({ commit, state }) {
      commit('changeLoadingState', true);
      if (state.currentWeathers.length !== state.cities.length) {
        state.cities.forEach((el) => commit('removeCurrentWeather', el.name));
        const response = state.cities.map((city) => {
          return loadCurrentWeather(city.name);
        });
        Promise.all(response)
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((responses) =>
            responses.forEach((res) => commit('addCurrentWeather', res))
          )
          .then(() => commit('changeLoadingState', false));
      } else {
        //?????? ???????????????? ?????????????????? ???? ???????????????? ??????????????????????
        setTimeout(() => commit('changeLoadingState', false), 0);
      }
    },
    getCityForecast({ commit, getters }, cityName) {
      commit('changeLoadingState', true);
      if (!getters.forecastByCityName(cityName)) {
        const coord = getters.coordByCityName(cityName);
        loadCityForecast(coord.lat, coord.lon)
          .then((response) => response.json())
          .then((response) =>
            commit('addCityForecast', { cityName, cityForecast: response })
          )
          .then(() => commit('changeLoadingState', false));
      } else {
        //?????? ???????????????? ?????????????????? ???? ???????????????? ??????????????????????
        setTimeout(() => commit('changeLoadingState', false), 0);
      }
    },
  },
  getters: {
    forecastByCityName: (state) => (cityName) => {
      return state.citiesForecast[cityName.toLowerCase()];
    },
    coordByCityName: (state) => (cityName) => {
      const city = state.cities.find(
        (city) => city.name === cityName.toLowerCase()
      );
      return {
        lon: city.lon,
        lat: city.lat,
      };
    },
  },
  modules: {},
});
