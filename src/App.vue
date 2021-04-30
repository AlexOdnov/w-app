<template>
  <div class="app" :class="{ light: !isDark, dark: isDark }">
    <site-navigation
      id="site-navigation"
      @addCity="addCity"
      @refreshApp="refreshApp"
    />
    <router-view />
    <transition name="modal">
      <modal v-if="isModalOpen" @closeModal="closeModal" name="добавить город">
        <add-city-form />
      </modal>
    </transition>
    <transition name="preloader">
      <preloader v-show="isLoad" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import SiteNavigation from './components/SiteNavigation.vue';
import Modal from './components/Modal.vue';
import AddCityForm from './components/AddCityForm.vue';
import Preloader from './components/Preloader.vue';

export default {
  components: { SiteNavigation, Modal, AddCityForm, Preloader },

  data() {
    return {
      isModalOpen: false,
    };
  },

  computed: { ...mapState(['isDark', 'isLoad']) },

  methods: {
    ...mapActions(['getTheme', 'getCities']),
    ...mapMutations(['toggleTheme']),
    addCity() {
      this.isModalOpen = true;
    },
    refreshApp() {
      location.reload();
    },
    closeModal() {
      this.isModalOpen = false;
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
    this.getCities();
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
  transition: background-color 0.3s;
}
#site-navigation {
  position: sticky;
  top: 0;
  z-index: 2;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.preloader-leave-active {
  transition: opacity 0.2s 0.5s;
}
.preloader-leave-to {
  opacity: 0;
}
</style>
