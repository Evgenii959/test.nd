<template>
  <li class="card">
    <h3 class="card__title">{{ note.title }}</h3>
    <p class="card__content">{{ note.content }}</p>
    <div class="card__button-wrapper">
      <button class="card__button" @click="$emit('delete-note')">
        <img src="../assets/images/close.svg" alt="удаление" />
        <p class="card__button-text">Удалить</p>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background-color: #b1c909;
  border-radius: 12px;
  padding: 20px 28px;
  color: #ffffff;
  list-style: none;
  border: 0;
  z-index: 0;
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  word-wrap: break-word;
  word-break: break-word;
  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }
  &__content {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    width: 450px;
    margin: 40px 0 48px;
  }
  &__button {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 0;
    color: #ffffff;
    background-color: transparent;
    cursor: pointer;
  }
  &__icon {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
  }
  &__button-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin: 0;
  }
  &__button-wrapper {
    display: flex;
    justify-content: end;
  }
  &__button-wrapper:hover {
    opacity: 0.7;
  }
  &::before {
    content: '';
    position: absolute;
    top: -0.5px;
    right: -0.5px;
    width: 40px;
    height: 40px;
    background-color: #0a1f38;
    border-radius: 0 0 0 8px;
    clip-path: polygon(100% 100%, 100% 100%, 100% 0, 0 0);
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    top: -0.5px;
    right: -0.5px;
    width: 40px;
    height: 40px;
    background-color: #a5bb0c;
    border-radius: 0 0 0 8px;
    clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 100%);
    z-index: 2;
  }
}
@media (max-width: 1366px) {
  .card {
    max-width: 332px;
    &__content {
      width: 333px;
    }
  }
}
@media (max-width: 768px) {
  .card {
    width: 100%;
    max-width: 688px;
    &__content {
      width: 333px;
    }
  }
}
@media (max-width: 420px) {
  .card {
    max-width: 320px;
    &__content {
      width: 264px;
    }
    &__title {
      max-width: 250px;
    }
  }
}
</style>
