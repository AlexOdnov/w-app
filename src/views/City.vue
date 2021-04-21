<template>
  <div class="forecast" v-if="forecast">
    <current-weather
      class="forecast__current"
      :city-name="cityName"
      :current-weather="forecast.current"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CurrentWeather from '../components/CurrentWeather.vue';

export default {
  name: 'City',

  components: { CurrentWeather },

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
  max-width: 1440px;
  margin: 0 auto;

  @media (min-width: 480px) {
    justify-items: center;
  }
  @media (min-width: 960px) {
    grid-template-columns: auto 1fr;
  }
  @media (min-width: 1440px) {
    grid-template-columns: 1fr 2fr;
  }
}
.forecast__current {
  grid-column: 1 / 2;
  max-width: 480px;
}
</style>
