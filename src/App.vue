<template>
  <div>
    <Header />
    <RegistrationPage />
  </div>
</template>
<script>
import Header from './components/Header.vue';
import RegistrationPage from './pages/RegistrationPage.vue';

export default {
  components: {
    Header,
    RegistrationPage,
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
</style>
