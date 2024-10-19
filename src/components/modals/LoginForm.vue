<template>
  <form class="login" @submit.prevent="handleSubmit">
    <div class="login__form-group">
      <label class="login__label" for="login__email">Email</label>
      <input
        class="login__input"
        type="email"
        id="email"
        v-model="email"
        required
        placeholder="Введите ваш email"
      />
    </div>
    <div class="login__form-group">
      <label class="login__label" for="password">Пароль</label>
      <input
        class="login__input"
        type="password"
        id="password"
        v-model="password"
        required
        placeholder="Введите ваш пароль"
      />
    </div>
    <div class="login__block-submit">
      <p class="login__registration">
        У вас нет аккаунта?
        <a class="login__link" href="#" @click.prevent="register"
          >Зарегистрируйтесь</a
        >
      </p>
      <button class="login__button" type="submit">Войти</button>
    </div>
  </form>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    handleSubmit() {},
    register() {},
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__form-group {
    display: flex;
    flex-direction: column;
  }
  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    margin: 0 0 8px 24px;
  }
  &__input {
    background-color: #ffffff;
    border-radius: 36px;
    padding: 23px 28px;
    width: 620px;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
  }
  &__block-submit {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__registration {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
  }
  &__link {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #b1c909;
  }
  &__button {
    padding: 12px 24px;
    background-color: #b1c909;
    border-radius: 32px;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
