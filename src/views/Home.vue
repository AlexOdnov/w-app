<template>
  <div class="cities-weather">
    <short-city
      class="cities-weather__item"
      v-for="weather in currentWeathers"
      :key="weather.id"
      :cityName="weather.name"
      :weatherCondition="weather.weather[0].icon"
      :weatherDescription="weather.weather[0].description"
      :temperature="weather.main.temp"
      :windSpeed="weather.wind.speed"
      @deleteCity="removeCity"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ShortCity from '../components/ShortCity.vue';

export default {
  name: 'Home',

  components: { ShortCity },

  computed: {
    currentWeathers() {
      return [];
    },
  },

  methods: {
    ...mapActions(['removeCity']),
  },
};
</script>

<style lang="scss" scoped>
.cities-weather {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.cities-weather__item {
  --header-height: 54px;

  max-width: 640px;
  min-height: 250px;
  height: calc((100vh - var(--header-height)) / 2);
  flex-basis: 320px;
  flex-grow: 1;

  @media (min-width: 480px) {
    --header-height: 72px;
  }

  @media (min-width: 960px) {
    flex-basis: 360px;
  }

  @media (min-width: 1440px) {
    flex-basis: 380px;
  }
}
</style>
