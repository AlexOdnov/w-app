<template>
  <button
    class="toggler"
    type="button"
    aria-label="переключатель темы"
    @click="toggleTheme"
  >
    <span
      class="toggler__thumb"
      :class="{
        'toggler__thumb--light': !isDark,
        'toggler__thumb--dark': isDark,
      }"
    >
      <svg
        width="18px"
        height="18px"
        aria-hidden="true"
        role="img"
        focusable="false"
        v-show="!isDark"
      >
        <use :xlink:href="require('../assets/baseIcons.svg') + '#day'"></use>
      </svg>
      <svg
        width="18px"
        height="18px"
        aria-hidden="true"
        role="img"
        focusable="false"
        v-show="isDark"
      >
        <use :xlink:href="require('../assets/baseIcons.svg') + '#night'"></use>
      </svg>
    </span>
  </button>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ThemeToggler',

  computed: mapState(['isDark']),

  methods: mapActions(['toggleTheme']),
};
</script>

<style lang="scss" scoped>
.toggler {
  position: relative;
  display: block;
  height: 24px;
  width: 48px;
  color: var(--color);
  border: 2px solid var(--color);
  border-radius: 12px;
  background-color: var(--bgColor);
  transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
  outline: none;

  &:hover {
    box-shadow: 0 0 6px var(--color);
  }

  &:focus-visible {
    box-shadow: 0 0 6px var(--color);
  }
}
.toggler__thumb {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin: 1px;
  transition: left 0.5s, transform 0.5s;
}
.toggler__thumb--light {
  left: 0;
}
.toggler__thumb--dark {
  left: 50%;
  transform: rotate(240deg);
}
</style>
