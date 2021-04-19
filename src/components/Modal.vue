<template>
  <div
    class="modal__wrapper"
    tabindex="-1"
    role="dialog"
    :aria-label="name"
    aria-modal="true"
    @mousedown.self="closeModal"
    @touchstart.self="closeModal"
    @keydown="keydown"
    ref="modal"
  >
    <div class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const focusableSelector = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
];

export default {
  name: 'Modal',

  props: {
    name: {
      type: String,
      default: '',
    },
  },

  emits: ['closeModal'],

  data() {
    return {
      focusableElement: [],
      previousFocusedElement: null,
    };
  },

  methods: {
    closeModal() {
      this.$emit('closeModal');
      this.previousFocusedElement.focus();
    },
    focusController(event) {
      if (!this.focusableElements.length) {
        event.preventDefault();
        return;
      }

      if (!this.$refs.modal.contains(document.activeElement)) {
        this.focusableElements[0].focus();
        event.preventDefault();
      } else {
        const focusedElementIndex = this.focusableElements.indexOf(
          document.activeElement
        );
        if (event.shiftKey && focusedElementIndex === 0) {
          this.focusableElements[this.focusableElements.length - 1].focus();
          event.preventDefault();
        }
        if (
          !event.shiftKey &&
          focusedElementIndex === this.focusableElements.length - 1
        ) {
          this.focusableElements[0].focus();
          event.preventDefault();
        }
      }
    },
    keydown(event) {
      if (event.code === 'Escape') {
        this.closeModal();
        return;
      }
      if (event.code === 'Tab') {
        this.focusController(event);
        return;
      }
    },
  },

  created() {
    this.previousFocusedElement = document.activeElement;
  },

  mounted() {
    this.focusableElements = [
      ...this.$refs.modal.querySelectorAll(focusableSelector),
    ];
    this.$refs.modal.focus();
  },
};
</script>

<style scoped>
.modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
.modal__content {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  cursor: default;
}
</style>
