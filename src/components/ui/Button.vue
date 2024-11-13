<template>
  <button
    :class="['button', buttonClass]"
    :type="buttonType"
    @click="$emit('click')"
  >
    <img v-if="iconSrc" :src="iconSrc" :alt="iconAlt" class="button__icon" />
    <p v-if="buttonText" class="button__text">
      {{ buttonText }}
    </p>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    buttonText: String,
    buttonClass: String,
    buttonType: {
      type: String,
      default: 'button',
    },
    iconSrc: String,
    iconAlt: String,
    iconClass: String,
    textClass: String,
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-family: 'Montserrat', sans-serif;
  border: 0;
  background-color: transparent;
  &__text {
    margin: 0;
  }
}
</style>
