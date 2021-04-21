<template>
  <div class="current-temperature">
    <p class="current-temperature__sun">
      <span>Рассвет</span><span>{{ sunriseTime }}</span>
    </p>
    <span class="current-temperature__temperature"
      >{{ roundedTemperature }}&deg;</span
    >
    <p class="current-temperature__sun">
      <span>Закат</span><span>{{ sunsetTime }}</span>
    </p>
    <p class="current-temperature__feels">
      Ощущается как {{ roundedFeelsTemperature }}&deg;
    </p>
    <p class="current-temperature__description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'CurrentTemperature',

  props: {
    sunrise: {
      type: Number,
      required: true,
    },
    sunset: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    feelsLike: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  computed: {
    roundedTemperature() {
      const roundedTemp = +this.temperature.toFixed(1);
      return roundedTemp < 0 ? roundedTemp : `+${roundedTemp}`;
    },
    roundedFeelsTemperature() {
      const roundedFeelsTemp = +this.feelsLike.toFixed(1);
      return roundedFeelsTemp < 0 ? roundedFeelsTemp : `+${roundedFeelsTemp}`;
    },
    sunriseTime() {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Date(this.sunrise * 1000).toLocaleString('ru-ru', options);
    },
    sunsetTime() {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
      };
      return new Date(this.sunset * 1000).toLocaleString('ru-ru', options);
    },
  },
};
</script>

<style lang="scss" scoped>
.current-temperature {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  gap: 10px;
  text-align: center;
}
.current-temperature__sun {
  display: none;
  flex-direction: column;
  align-items: center;

  @media (min-width: 480px) {
    display: flex;
  }
}
.current-temperature__temperature {
  grid-column: 1 / -1;
  font-size: 100px;
  line-height: 1.1;
  font-weight: normal;

  @media (min-width: 480px) {
    grid-column: 2 / 3;
  }
}
.current-temperature__feels {
  grid-column: 1 / -1;
  font-size: 20px;
}
.current-temperature__description {
  grid-column: 1 / -1;
  font-size: 20px;
  text-transform: capitalize;
}
</style>
