<template>
  <div class="forecast" v-if="forecast">
    <current-weather
      class="forecast__current"
      :city-name="cityName"
      :current-weather="forecast.current"
    />
    <hourly-forecast
      class="forecast__hourly"
      :hourly-forecast="forecast.hourly"
    />
    <daily-forecast class="forecast__daily" :daily-forecast="forecast.daily" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CurrentWeather from '../components/CurrentWeather.vue';
import HourlyForecast from '../components/HourlyForecast.vue';
import DailyForecast from '../components/DailyForecast.vue';

export default {
  name: 'City',

  components: { CurrentWeather, HourlyForecast, DailyForecast },

  data() {
    return {
      cityName: null,
    };
  },

  computed: {
    forecast() {
      return this.$store.getters.forecastByCityName(this.cityName);
    },
  },

  methods: {
    ...mapActions(['getCityForecast']),
  },

  created() {
    this.cityName = this.$route.query.city;
    this.getCityForecast(this.cityName);
  },
};
</script>

<style lang="scss" scoped>
.forecast {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: 960px) {
    --header-height: 72px;

    grid-template-columns: 480px 1fr;
    grid-template-rows: 1fr 1fr;
    min-height: calc(100vh - var(--header-height));
  }
}
.forecast__current {
  grid-column: 1 / 2;
  max-width: 480px;
  width: 100%;
}
.forecast__hourly {
  place-self: stretch;

  @media (min-width: 960px) {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
  }
}
.forecast__daily {
  place-self: stretch;

  @media (min-width: 960px) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}
</style>
