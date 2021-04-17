<template>
  <header class="site-navigation">
    <router-link class="logo" :to="{ name: 'Home' }" aria-label="На главную">
      <svg
        width="109px"
        height="24px"
        aria-hidden="true"
        role="img"
        focusable="false"
      >
        <use :xlink:href="require('../assets/baseIcons.svg') + '#logo'"></use>
      </svg>
    </router-link>
    <nav class="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <button
            class="button"
            type="button"
            aria-label="Добавить город"
            @click="addCity"
          >
            <svg
              width="24px"
              height="24px"
              aria-hidden="true"
              role="img"
              focusable="false"
            >
              <use
                :xlink:href="require('../assets/baseIcons.svg') + '#plus'"
              ></use>
            </svg>
          </button>
        </li>
        <li class="navigation__item">
          <button
            class="button"
            type="button"
            aria-label="Обновить страницу"
            @click="refreshApp"
          >
            <svg
              width="24px"
              height="24px"
              aria-hidden="true"
              role="img"
              focusable="false"
            >
              <use
                :xlink:href="require('../assets/baseIcons.svg') + '#refresh'"
              ></use>
            </svg>
          </button>
        </li>
        <li class="navigation__item">
          <a
            class="button"
            href="https://github.com/AlexOdnov"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Github"
          >
            <svg
              width="24px"
              height="24px"
              aria-hidden="true"
              role="img"
              focusable="false"
            >
              <use
                :xlink:href="require('../assets/baseIcons.svg') + '#github'"
              ></use></svg
          ></a>
        </li>
        <li class="navigation__item"><theme-toggler /></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ThemeToggler from './ThemeToggler.vue';

export default {
  name: 'SiteNavigation',

  components: { ThemeToggler },

  emits: ['addCity', 'refreshApp'],

  methods: {
    addCity() {
      this.$emit('addCity');
    },
    refreshApp() {
      this.$emit('refreshApp');
    },
  },
};
</script>

<style lang="scss" scoped>
.site-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 15px;
  background-color: var(--bgColor);
  box-shadow: 0 2px 5px #000;

  @media (min-width: 480px) {
    padding: 20px;
  }
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.3s;
  outline: none;

  &:hover {
    filter: drop-shadow(0 0 2px var(--color));
  }

  &:focus-visible {
    filter: drop-shadow(0 0 2px var(--color));
  }
}
.navigation__list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color);
  background-color: transparent;
  border: none;
  transition: filter 0.3s;
  outline: none;

  &:hover {
    filter: drop-shadow(0 0 2px var(--color));
  }

  &:focus-visible {
    filter: drop-shadow(0 0 2px var(--color));
  }

  @media (min-width: 480px) {
    padding: 4px;
  }
}
</style>
