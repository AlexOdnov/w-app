import { createStore } from 'vuex';
import { localStorageServices } from './../services/localStorageServices';

export default createStore({
  state: {
    isDark: false,
  },
  mutations: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
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
  },
  modules: {},
});
