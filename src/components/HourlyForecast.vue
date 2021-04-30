<template>
  <div class="hourly-forecast">
    <h2 class="hourly-forecast__title">Прогноз по часам</h2>
    <forecast-slider>
      <forecast-column
        class="hourly-forecast__slide"
        v-for="(el, index) in hourlyForecast"
        :key="index"
        :date="date(hourlyForecast[index].dt)"
        :description="hourlyForecast[index].weather[0].description"
        :condition="hourlyForecast[index].weather[0].icon"
        :maxTemp="hourlyForecast[index].temp"
        :windSpeed="hourlyForecast[index].wind_speed"
        :windDeg="hourlyForecast[index].wind_deg"
        :humidity="hourlyForecast[index].humidity"
        :pressure="hourlyForecast[index].pressure"
        :precipitation="{
          rain: hourlyForecast[index].rain?.['1h'],
          snow: hourlyForecast[index].snow?.['1h'],
        }"
      />
    </forecast-slider>
  </div>
</template>

<script>
import ForecastColumn from './ForecastColumn.vue';
import ForecastSlider from './ForecastSlider.vue';

export default {
  name: 'HourlyForecast',

  components: { ForecastColumn, ForecastSlider },

  props: {
    hourlyForecast: {
      type: Array,
      required: true,
    },
  },

  methods: {
    date(date) {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
      };
      return new Date(date * 1000).toLocaleString('ru-ru', options);
    },
  },
};
</script>

<style lang="scss" scoped>
.hourly-forecast {
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 15px;

  @media (min-width: 480px) {
    padding: 20px;
  }
}
.hourly-forecast__title {
  line-height: 36px;
}
</style>
