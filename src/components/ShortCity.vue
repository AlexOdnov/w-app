<template>
  <router-link
    class="short-city"
    :aria-label="`Перейти к городу ${cityName}`"
    :to="{ name: 'City', query: { city: cityName } }"
  >
    <video
      class="short-city__video"
      :src="require(`../assets/videoConditions/${videoId}.mp4`)"
      autoplay
      loop
      muted
      aria-hidden="true"
      role="presentation"
      focusable="false"
      tabindex="-1"
    ></video>
    <div class="short-city__cover">
      <h2 class="short-city__name">{{ cityName }}</h2>
      <button
        class="short-city__delete"
        type="button"
        aria-label="Удалить город"
        @click.prevent="deleteCity"
      >
        <svg
          width="24px"
          height="24px"
          aria-hidden="true"
          role="img"
          focusable="false"
        >
          <use
            :xlink:href="require('../assets/baseIcons.svg') + '#close'"
          ></use>
        </svg>
      </button>
      <p class="short-city__description">{{ weatherDescription }}</p>
      <div class="short-city__weather">
        <svg
          width="32px"
          height="32px"
          aria-label="Облачно"
          role="img"
          focusable="false"
        >
          <use
            :xlink:href="
              require('../assets/weatherConditionIcons.svg') +
              `#${weatherCondition}`
            "
          ></use>
        </svg>
        <span aria-label="температура">{{ temperatureRounded }}&deg;</span>
        <span aria-label="скорость ветра">{{ windSpeedRounded }} м/с</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import getVideoForCondition from '../helpers/getVideoForCondition.js';

export default {
  name: 'ShortCity',

  props: {
    cityName: {
      type: String,
      required: true,
    },
    weatherCondition: {
      type: String,
      required: true,
    },
    weatherDescription: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    windSpeed: {
      type: Number,
      required: true,
    },
  },

  emits: ['deleteCity'],

  computed: {
    videoId() {
      return getVideoForCondition[this.weatherCondition];
    },
    temperatureRounded() {
      const tempRounded = Math.round(this.temperature);
      return tempRounded < 0 ? tempRounded : `+${tempRounded}`;
    },
    windSpeedRounded() {
      return Math.round(this.windSpeed);
    },
  },

  methods: {
    deleteCity() {
      this.$emit('deleteCity', this.cityName);
    },
  },
};
</script>

<style lang="scss" scoped>
.short-city {
  --color: #fff;

  position: relative;
  overflow: hidden;
  display: block;
  height: 100%;
  outline: none;

  &:hover {
    --color: rgba(255, 255, 255, 0.7);

    .short-city__cover {
      box-shadow: 0 0 20px #000 inset;
    }
  }

  &:focus-visible {
    --color: rgba(255, 255, 255, 0.7);

    .short-city__cover {
      box-shadow: 0 0 20px #000 inset;
    }
  }
}
.short-city__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.short-city__cover {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  grid-template-rows: 1fr min-content;
  gap: 10px;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: rgba(#000, 0.25);
  transition: box-shadow 0.3s;

  @media (min-width: 480px) {
    padding: 20px;
  }
}
.short-city__name {
  grid-column: 1 / 3;
  text-transform: uppercase;
  color: var(--color);
  font-size: 20px;
  overflow-wrap: break-word;
  transition: color 0.3s;
}
.short-city__delete {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: -1 / -2;
  justify-self: end;
  align-self: start;
  color: var(--color);
  background-color: transparent;
  border: none;
  transition: color 0.3s;
  outline: none;

  &:hover {
    filter: drop-shadow(0 0 2px rgba(#ff0000, 0.6));
    color: rgba(#ff0000, 0.6);
  }

  &:focus-visible {
    filter: drop-shadow(0 0 2px rgba(#ff0000, 0.6));
    color: rgba(#ff0000, 0.6);
  }

  @media (min-width: 480px) {
    padding: 4px;
  }
}
.short-city__description {
  display: flex;
  align-items: center;
  grid-row: -1 / -2;
  color: var(--color);
  font-size: 18px;
  text-transform: capitalize;
  overflow-wrap: break-word;
  transition: color 0.3s;
}
.short-city__weather {
  display: flex;
  align-items: center;
  gap: 8px;
  grid-row: -1 / -2;
  grid-column: -1 / -3;
  justify-self: end;
  color: var(--color);
  font-size: 18px;
  white-space: nowrap;
  transition: color 0.3s;
}
</style>
