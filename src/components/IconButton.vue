<template>
  <button class="button" type="button" :aria-label="label">
    <svg
      width="24px"
      height="24px"
      aria-hidden="true"
      role="img"
      focusable="false"
    >
      <use :xlink:href="require('../assets/baseIcons.svg') + `#${icon}`"></use>
    </svg>
  </button>
</template>
<script>
export default {
  name: 'IconButton',

  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.button {
  position: relative;
  display: flex;
  place-items: center;
  color: var(--color);
  background-color: transparent;
  border: none;

  &:before {
    content: attr(aria-label);

    position: absolute;
    right: 0;
    bottom: -5px;
    display: inline-block;
    opacity: 0;
    visibility: hidden;
    padding: 10px;
    font-size: 12px;
    line-height: 1;
    color: #fff;
    white-space: nowrap;
    background-color: #161b22;
    border-radius: 4px;
    transform: translate(0, 100%);
  }

  & svg {
    transition: opacity 0.3s;
  }

  &:hover {
    outline: none;
    svg {
      opacity: 0.7;
    }

    &:before {
      animation: 0.3s ease-in 0.4s forwards tooltip-appear;
    }
  }

  @media (min-width: 480px) {
    padding: 4px;
  }
}

@keyframes tooltip-appear {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
</style>
