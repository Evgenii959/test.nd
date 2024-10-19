<template>
  <header class="header">
    <img src="../assets/logo.svg" />
    <button class="header__button" @click="openModal">
      <img src="../assets/enter.svg" class="header__button-img" />
      <p class="header__button-text">Вход</p>
    </button>
    <BaseModal :isOpen="isModalOpen" @close="closeModal">
      <LoginForm />
    </BaseModal>
  </header>
</template>
<script>
import BaseModal from './modals/BaseModal.vue';
import LoginForm from './modals/LoginForm.vue';
export default {
  components: {
    BaseModal,
    LoginForm,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
<style lang="scss">
.header {
  display: flex;
  height: 136px;
  justify-content: space-between;
  align-items: center;
  &__button {
    display: flex;
    align-items: center;
    background-color: #b1c909;
    border-radius: 32px;
    gap: 12px;
    padding: 12px 24px;
    border: 0;
    cursor: pointer;
  }
  &__button:hover {
    opacity: 0.8;
  }
  &__button-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: #ffffff;
    margin: 0;
  }
  &__button-img {
    height: 32px;
  }
}
.modal {
  display: flex; /* Центрируем модальное окно */
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
}
</style>
