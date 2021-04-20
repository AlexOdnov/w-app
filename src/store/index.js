import { createStore } from 'vuex';
import { localStorageServices } from './../services/localStorageServices';

export default createStore({
  state: {
    isDark: false,
    cities: [],
  },
  mutations: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    addCity(state, city) {
      state.cities.push(city.toLowerCase());
    },
    removeCity(state, city) {
      state.cities = state.cities.filter((el) => el !== city.toLowerCase());
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
    addCity({ commit, state }, city) {
      commit('addCity', city);
      localStorageServices.setItem('cities', state.cities);
    },
    removeCity({ commit, state }, city) {
      commit('removeCity', city);
      localStorageServices.setItem('cities', state.cities);
    },
    getCities({ commit }) {
      const cities = localStorageServices.getItem('cities');
      if (cities) {
        cities.forEach((city) => {
          commit('addCity', city);
        });
      }
    },
  },
  modules: {},
});
