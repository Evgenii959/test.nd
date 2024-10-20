<template>
  <div v-if="isOpen" class="modal" @keydown.esc="close">
    <div class="modal__content">
      <img src="../../assets/close.svg" class="modal__close" @click="close" />
      <h2 class="modal__title">{{ modalTitle }}</h2>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modalTitle: {
      type: String,
      required: true,
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(10, 31, 56, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  &__content {
    background-color: #1b2f46;
    padding: 20px;
    border-radius: 40px;
    position: relative;
    padding: 80px;
  }
  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    background-color: #b1c909;
    padding: 20px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    border: 0;
  }
  &__title {
    font-weight: 600;
    font-size: 48px;
    line-height: 72px;
    color: #ffffff;
    margin: 0 0 40px;
    width: 100%;
  }
}
</style>
