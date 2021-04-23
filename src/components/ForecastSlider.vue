<template>
  <div class="forecast-slider">
    <button
      class="forecast-slider__button"
      type="button"
      aria-label="Промотать слайдер назад"
      v-if="hasControls"
      @click="scrollToLeft"
    >
      <svg
        width="30px"
        height="30px"
        aria-hidden="true"
        role="img"
        focusable="false"
      >
        <use :xlink:href="require('../assets/baseIcons.svg') + '#prev'"></use>
      </svg>
    </button>
    <div class="forecast-slider__slides-wrapper">
      <div class="forecast-slider__slides-list" ref="slider">
        <slot></slot>
      </div>
      <div class="forecast-slider__descriptions-list" aria-hidden="true">
        <span class="forecast-slider__description forecast-slider__wind"
          >Скорость ветра, м/с</span
        >
        <span class="forecast-slider__description forecast-slider__humidity"
          >Влажность, %</span
        >
        <span class="forecast-slider__description forecast-slider__pressure"
          >Давление, мм рт. ст.</span
        >
        <span
          class="forecast-slider__description forecast-slider__precipitation"
          >Осадки, мм</span
        >
      </div>
    </div>
    <button
      class="forecast-slider__button"
      type="button"
      aria-label="Промотать слайдер вперед"
      v-if="hasControls"
      @click="scrollToRight"
    >
      <svg
        width="30px"
        height="30px"
        aria-hidden="true"
        role="img"
        focusable="false"
      >
        <use :xlink:href="require('../assets/baseIcons.svg') + '#next'"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { debounce } from '../helpers/debounce.js';
export default {
  name: 'ForecastSlider',

  props: {
    breakPoint: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      hasControls: true,
    };
  },

  methods: {
    scrollToRight() {
      const step = this.$refs.slider.offsetWidth / 3;
      this.$refs.slider.scrollLeft += step;
    },
    scrollToLeft() {
      const step = this.$refs.slider.offsetWidth / 3;
      this.$refs.slider.scrollLeft -= step;
    },
    checkControls: debounce(function () {
      this.hasControls =
        this.$refs.slider.offsetWidth !== this.$refs.slider.scrollWidth;
    }, 500),
  },

  mounted() {
    this.checkControls();
    window.addEventListener('resize', this.checkControls);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkControls);
  },
};
</script>

<style lang="scss" scoped>
.forecast-slider {
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  height: 100%;
}
.forecast-slider__slides-wrapper {
  position: relative;
  place-self: stretch;
  grid-column: 2 / 3;
  overflow: hidden;
}
.forecast-slider__slides-list {
  overflow-x: auto;
  display: grid;
  grid-auto-columns: 60px;
  grid-auto-flow: column;
  justify-content: space-between;
  gap: 12px;
  height: 100%;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 0px;
  }
}
.forecast-slider__descriptions-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.forecast-slider__description {
  position: absolute;
  left: 0;
  font-size: 14px;
  font-weight: normal;
  transform: translate(0, 100%);
}
.forecast-slider__wind {
  bottom: 57.2%;
}
.forecast-slider__humidity {
  bottom: 42.9%;
}
.forecast-slider__pressure {
  bottom: 28.6%;
}
.forecast-slider__precipitation {
  bottom: 14.3%;
}
.forecast-slider__button {
  display: none;
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
    display: flex;
    padding: 4px;
  }
}
</style>
