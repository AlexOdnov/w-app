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
    <additional-info title="Ветер" :value="windSpeed" :addition="windDirection">
      <template #unit>м/с</template>
    </additional-info>
    <additional-info
      title="Давление"
      :value="pressureInmmHg"
      addition="рт. ст."
    >
      <template #unit>мм</template>
    </additional-info>
    <additional-info title="Влажность" :value="humidity">
      <template #unit>
        <span class="centered">%</span>
      </template>
    </additional-info>
    <additional-info title="Осадки" :value="precipitation">
      <template #unit>мм</template>
    </additional-info>
  </div>
</template>

<script>
import CurrentTemperature from './CurrentTemperature.vue';
import AdditionalInfo from './AdditionalInfo.vue';
import { getWindDirection } from '../helpers/getWindDirection.js';

export default {
  name: 'CurrentWeather',

  components: { CurrentTemperature, AdditionalInfo },

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
    windSpeed() {
      return Math.round(this.currentWeather.wind_speed);
    },
    windDirection() {
      return getWindDirection(this.currentWeather.wind_deg);
    },
    pressureInmmHg() {
      return Math.round(this.currentWeather.pressure * 0.75);
    },
    humidity() {
      return Math.round(this.currentWeather.humidity);
    },
    precipitation() {
      const perc =
        this.currentWeather.rain?.['1h'] || this.currentWeather.snow?.['1h'];
      return perc ? +perc.toFixed(1) : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.current-weather {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  row-gap: 10px;
  padding: 15px;

  @media (min-width: 480px) {
    padding: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
}
.current-weather__title {
  grid-column: 1 / -1;
  place-self: start center;
  text-transform: capitalize;
  line-height: 36px;

  @media (min-width: 480px) {
    grid-column: 1 / 3;
    justify-self: start;
  }
}
.current-weather__date {
  grid-column: 1 / -1;
  align-self: start;
  font-size: 20px;
  text-transform: capitalize;
  text-align: center;
  line-height: 36px;

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
.centered {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
