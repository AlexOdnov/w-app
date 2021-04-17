<template>
  <div class="preloader" aria-hidden="true" role="presentation">
    <span class="spinner"></span>
  </div>
</template>
<script>
export default {
  name: 'Preloader',
};
</script>
<style lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--bgColor);
}
.spinner {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 3px solid;
  border-radius: 50%;
  border-color: var(--color) var(--color) transparent transparent;
  animation: rotation 1s linear infinite;

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 40px;
    margin: auto;
    border: 3px solid;
    border-radius: 50%;
    border-color: transparent transparent var(--color) var(--color);
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }

  &:before {
    width: 32px;
    height: 32px;
    border-color: var(--color) var(--color) transparent transparent;
    animation: rotation 1.5s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
