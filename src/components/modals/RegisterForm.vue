<template>
  <form class="register" @submit.prevent="register">
    <div class="register__form-group">
      <label class="register__label" for="register__email">Email</label>
      <input
        class="register__input"
        type="email"
        id="register__email"
        v-model="email"
        required
        placeholder="Введите Email"
      />
    </div>
    <div class="register__form-group">
      <label class="register__label" for="register__password">Пароль</label>
      <input
        class="register__input"
        type="password"
        id="register__password"
        v-model="password"
        required
        placeholder="******"
      />
    </div>
    <div class="register__form-group">
      <label class="register__label" for="register__confirmPassword"
        >Пароль еще раз</label
      >
      <input
        class="register__input"
        type="password"
        id="register__confirmPassword"
        v-model="confirmPassword"
        required
        placeholder="******"
      />
    </div>
    <div class="register__block-submit">
      <p class="register__registration">
        У вас нет аккаунта?
        <a class="register__link" href="#" @click.prevent="loginModal"
          >Войдите</a
        >
      </p>
      <button class="register__button" type="submit">Зарегистрироваться</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    loginModal() {
      this.$emit('open-login-modal');
    },
    async register() {
      if (this.password !== this.confirmPassword) {
        alert('Пароли не совпадают');
        return;
      }
      try {
        const userData = {
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        };

        const response = await fetch('https://dist.nd.ru/api/reg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Регистрация прошла успешно:', data);
          this.$emit('open-login-modal');
          this.$emit('close-register-modal');
        }
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.register {
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
    border: 0;
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
    border: 0;
  }
}
</style>
