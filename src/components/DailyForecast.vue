<template>
  <div class="daily-forecast">
    <h2 class="daily-forecast__title">Прогноз по дням</h2>
    <forecast-slider>
      <forecast-column
        class="daily-forecast__slide"
        v-for="(el, index) in dailyForecast"
        :key="index"
        :date="date(dailyForecast[index].dt)"
        :description="dailyForecast[index].weather[0].description"
        :condition="dailyForecast[index].weather[0].icon"
        :maxTemp="dailyForecast[index].temp.day"
        :minTemp="dailyForecast[index].temp.night"
        :windSpeed="dailyForecast[index].wind_speed"
        :windDeg="dailyForecast[index].wind_deg"
        :humidity="dailyForecast[index].humidity"
        :pressure="dailyForecast[index].pressure"
        :precipitation="{
          rain: dailyForecast[index].rain?.['1h'],
          snow: dailyForecast[index].snow?.['1h'],
        }"
      />
    </forecast-slider>
  </div>
</template>

<script>
import ForecastColumn from './ForecastColumn.vue';
import ForecastSlider from './ForecastSlider.vue';

export default {
  name: 'DailyForecast',

  components: { ForecastColumn, ForecastSlider },

  props: {
    dailyForecast: {
      type: Array,
      required: true,
    },
  },

  methods: {
    date(date) {
      const options = {
        weekday: 'short',
        day: 'numeric',
      };
      return new Date(date * 1000).toLocaleString('ru-ru', options);
    },
  },
};
</script>

<style lang="scss" scoped>
.daily-forecast {
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 15px;

  @media (min-width: 480px) {
    padding: 20px;
  }
}
.daily-forecast__title {
  line-height: 36px;
}
</style>
