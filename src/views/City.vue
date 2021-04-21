<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'City',

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

<style lang="scss" scoped></style>
