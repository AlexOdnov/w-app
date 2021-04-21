<template>
  <div class="current-weather">
    <h1 class="current-weather__title">{{ cityName }}</h1>
    <p class="current-weather__date">{{ currentDate }}</p>
    <current-temperature
      class="current-weather__temperature"
      :sunrise="currentWeather.sunrise"
      :sunset="currentWeather.sunset"
      :temperature="currentWeather.temp"
      :feels-like="currentWeather.feels_like"
      :description="currentWeather.weather[0].description"
    />
    <div class="current-weather__wind"></div>
    <div class="current-weather__pressure"></div>
    <div class="current-weather__humidity"></div>
    <div class="current-weather__precipitation"></div>
  </div>
</template>

<script>
import CurrentTemperature from './CurrentTemperature.vue';

export default {
  name: 'CurrentWeather',

  components: { CurrentTemperature },

  props: {
    cityName: {
      type: String,
      required: true,
    },
    currentWeather: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currentDate() {
      const options = {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Date(this.currentWeather.dt * 1000).toLocaleString(
        'ru-ru',
        options
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.current-weather {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  padding: 15px;

  @media (min-width: 480px) {
    padding: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
}
.current-weather__title {
  grid-column: 1 / -1;
  justify-self: start;
  text-transform: capitalize;

  @media (min-width: 480px) {
    grid-column: 1 / 3;
  }
}
.current-weather__date {
  grid-column: 1 / -1;
  font-size: 20px;
  text-transform: capitalize;

  @media (min-width: 480px) {
    grid-column: -1 / -3;
    justify-self: end;
  }
}
.current-weather__temperature {
  grid-column: 1 / -1;
  justify-self: center;
  margin: 20px 0;
}
</style>
