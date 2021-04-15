import { createStore } from 'vuex';

export default createStore({
  state: {
    isDark: false,
  },
  mutations: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
  },
  actions: {},
  modules: {},
});
