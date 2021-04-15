<template>
  <div class="app" :class="{ light: !isDark, dark: isDark }">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: { ...mapState(['isDark']) },

  methods: { ...mapMutations(['toggleTheme']) },

  created() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.toggleTheme();
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', this.toggleTheme);
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
</style>
