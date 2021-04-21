<template>
  <div class="additional-info">
    <h3 class="additional-info__title">
      {{ title }}
    </h3>
    <div class="additional-info__content">
      <span class="additional-info__value">
        {{ value }}
      </span>
      <div class="additional-info__unit">
        <slot name="unit"></slot>
      </div>
      <span class="additional-info__addition">
        {{ addition }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalInfo',

  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    addition: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
.additional-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.additional-info__title {
  margin-bottom: 6px;
  font-size: 16px;
  text-transform: capitalize;
}
.additional-info__content {
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: repeat(2, 1fr);
  column-gap: 6px;
  line-height: 1;
  font-size: 15px;
}
.additional-info__value {
  grid-row: 1 / -1;
  font-size: 38px;
  font-weight: normal;
}
.additional-info__unit {
  align-self: stretch;
  white-space: nowrap;
}
.additional-info__addition {
  white-space: nowrap;
}
</style>
