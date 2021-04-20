<template>
  <form class="add-city__body" @submit.prevent="onAddCity">
    <h2 class="add-city__title">Добавьте новый город</h2>
    <div class="add-city__wrapper">
      <input
        class="add-city__input"
        type="text"
        id="add-city"
        required
        v-model="city"
      />
      <label class="add-city__label" for="add-city">Название города</label>
      <transition name="error">
        <span class="add-city__error" v-if="isDuplicate"
          >Такой город уже добавлен</span
        >
      </transition>
      <transition name="error">
        <span class="add-city__error" v-if="isError"
          >Не удалось загрузить данный город</span
        >
      </transition>
    </div>
    <button class="add-city__button" type="submit">добавить</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AddCityForm',

  data() {
    return {
      isError: false,
      city: '',
    };
  },

  computed: {
    ...mapState(['cities']),
    isDuplicate() {
      return this.cities.includes(this.city.toLowerCase());
    },
  },

  methods: {
    ...mapActions(['addCity']),
    onAddCity() {
      if (this.isDuplicate) {
        return;
      }
      this.addCity(this.city);
    },
  },
};
</script>

<style lang="scss">
.add-city__body {
  --width: 320px;
  --outer-padding: 30px;
  --margin-bottom: 20px;

  width: var(--width);
  padding: var(--outer-padding);
  background-color: var(--bgColor);
  border-radius: 10px;

  @media (min-width: 480px) {
    --width: 480px;
    --outer-padding: 35px;
    --margin-bottom: 25px;
  }
}
.add-city__title {
  margin-bottom: var(--margin-bottom);
  text-align: center;
  font-size: 20px;
}
.add-city__wrapper {
  position: relative;
}
.add-city__input {
  width: 100%;
  padding: 10px 0;
  margin-bottom: var(--margin-bottom);
  color: var(--color);
  font-size: 20px;
  line-height: 1;
  text-transform: capitalize;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid var(--color);
  outline: none;

  &:focus,
  &:valid {
    ~ .add-city__label {
      top: -20px;
      font-size: 14px;
    }
  }
}
.add-city__label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 20px;
  line-height: 1;
  pointer-events: none;
  transition: 0.5s;
}
.add-city__error {
  position: absolute;
  bottom: 0;
  left: 0;
  color: red;
  font-size: 14px;
  font-weight: normal;
}
.add-city__button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  color: var(--color);
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: transparent;
  border: none;
  transition: text-shadow 0.3s;
  outline: none;

  &:hover {
    text-shadow: 0 0 2px var(--color);
  }

  &:focus-visible {
    text-shadow: 0 0 2px var(--color);
  }
}
.error-enter-active,
.error-leave-active {
  transition: opacity 0.3s;
}
.error-enter-from,
.error-leave-to {
  opacity: 0;
}
</style>
