<template>
  <div class="forecast" role="group">
    <span class="forecast__date" aria-label="дата">{{ date }}</span>
    <svg
      class="forecast__icon"
      width="36px"
      height="36px"
      :aria-label="description"
      role="img"
      focusable="false"
    >
      <use
        :xlink:href="
          require('../assets/weatherConditionIcons.svg') + `#${condition}`
        "
      ></use>
    </svg>
    <div class="forecast__max-min-temp" v-if="minTemp">
      <span class="forecast__max-temp" aria-label="максимальная температура"
        >{{ maxTempRounded }}&deg;</span
      >
      <span class="forecast__min-temp" aria-label="минимальная температура"
        >{{ minTempRounded }}&deg;</span
      >
    </div>
    <span class="forecast__temp" v-else aria-label="температура"
      >{{ maxTempRounded }}&deg;</span
    >
    <span class="forecast__wind" aria-label="скорость ветра, м/с"
      >{{ windSpeedRounded }} {{ windDirection }}</span
    >
    <span class="forecast__humidity" aria-label="влажность, %">{{
      humidityRounded
    }}</span>
    <span
      class="forecast__pressure"
      aria-label="давление, мм ртутного столба"
      >{{ pressureRounded }}</span
    >
    <span class="forecast__precipitation" aria-label="осадки, мм">{{
      precipitationValue
    }}</span>
  </div>
</template>

<script>
import { getWindDirection } from '../helpers/getWindDirection.js';

export default {
  name: 'ForecastColumn',

  props: {
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    maxTemp: {
      type: Number,
      required: true,
    },
    minTemp: {
      type: Number,
      required: false,
    },
    windSpeed: {
      type: Number,
      required: true,
    },
    windDeg: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
    precipitation: {
      type: Object,
      required: true,
    },
  },

  computed: {
    maxTempRounded() {
      return Math.round(this.maxTemp);
    },
    minTempRounded() {
      return Math.round(this.minTemp);
    },
    windSpeedRounded() {
      return Math.round(this.windSpeed);
    },
    windDirection() {
      return getWindDirection(this.windDeg);
    },
    humidityRounded() {
      return Math.round(this.humidity);
    },
    pressureRounded() {
      return Math.round(this.pressure * 0.75);
    },
    precipitationValue() {
      const perc = this.precipitation.rain || this.precipitation.snow;
      return perc ? perc.toFixed(1) : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.forecast {
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  align-items: center;
  justify-items: center;
  font-size: 20px;
  font-weight: normal;
}
.forecast__date {
  font-size: 16px;
}
.forecast__max-min-temp {
  position: relative;
  place-self: stretch;

  &:before {
    content: '';
    position: absolute;
    top: 55%;
    left: 55%;
    width: 2px;
    height: 50%;
    background-color: var(--color);
    transform: translate(-50%, -50%) skewX(-45deg);
  }
}
.forecast__max-temp {
  position: absolute;
  top: 5%;
  left: 30%;
  font-size: 22px;
  transform: translate(-50%, 0);
}
.forecast__min-temp {
  position: absolute;
  bottom: 5%;
  right: 0;
  font-size: 16px;
}
.forecast__temp {
  font-size: 24px;
}
.forecast__wind {
  text-transform: lowercase;
}
.forecast__wind,
.forecast__humidity,
.forecast__pressure,
.forecast__precipitation {
  padding-top: 18px;
}
</style>
