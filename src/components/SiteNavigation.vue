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
          <icon-button label="Добавить город" icon="plus" @click="addCity" />
        </li>
        <li class="navigation__item">
          <icon-button
            label="Обновить страницу"
            icon="refresh"
            @click="refreshApp"
          />
        </li>
        <li class="navigation__item">
          <a
            class="button"
            href="https://github.com/AlexOdnov"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Ссылка на Github"
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
import IconButton from './IconButton.vue';

export default {
  name: 'SiteNavigation',

  components: { ThemeToggler, IconButton },

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
  transition: opacity 0.3s;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
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
  position: relative;
  display: flex;
  place-items: center;

  &:before {
    content: attr(aria-label);

    position: absolute;
    right: 0;
    bottom: -5px;
    display: inline-block;
    opacity: 0;
    visibility: hidden;
    padding: 10px;
    font-size: 12px;
    line-height: 1;
    color: #fff;
    white-space: nowrap;
    background-color: #161b22;
    border-radius: 4px;
    transform: translate(0, 100%);
  }

  & svg {
    transition: opacity 0.3s;
  }

  &:hover,
  &:focus-visible {
    svg {
      opacity: 0.7;
    }

    &:before {
      animation: 0.3s ease-in 0.4s forwards tooltip-appear;
    }
  }

  @media (min-width: 480px) {
    padding: 4px;
  }
}

@keyframes tooltip-appear {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
</style>
