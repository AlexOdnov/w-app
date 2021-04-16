<template>
  <div class="app" :class="{ light: !isDark, dark: isDark }">
    <site-navigation
      id="site-navigation"
      @addCity="addCity"
      @refreshApp="refreshApp"
    />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SiteNavigation from './components/SiteNavigation.vue';

export default {
  components: { SiteNavigation },
  computed: { ...mapState(['isDark']) },

  methods: {
    ...mapActions(['getTheme']),
    ...mapMutations(['toggleTheme']),
    addCity() {},
    refreshApp() {
      location.reload();
    },
  },

  created() {
    this.getTheme().catch(() => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.toggleTheme();
      }
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', this.toggleTheme);
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.light {
  --bgColor: #fff;
  --color: #1a1a55;
}
.dark {
  --bgColor: #1a1a55;
  --color: #fff;
}
.app {
  min-height: 100vh;
  color: var(--color);
  font-weight: bold;
  background-color: var(--bgColor);
  transition: background-color 0.3s, color 0.3s;
}
#site-navigation {
  position: sticky;
  top: 0;
}
</style>
