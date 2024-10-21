<template>
  <form class="register" @submit.prevent="register">
    <label class="register__label" for="register__email">Email</label>
    <input
      class="register__input"
      type="email"
      id="register__email"
      v-model="email"
      required
      placeholder="Введите Email"
    />
    <label class="register__label" for="register__password">Пароль</label>
    <input
      class="register__input"
      type="password"
      id="register__password"
      v-model="password"
      required
      placeholder="******"
    />
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
  width: 100%;

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
    font-family: 'Montserrat';
    background-color: #ffffff;
    border-radius: 36px;
    padding: 23px 28px;
    width: 100%;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    border: 0;
    margin-bottom: 24px;
  }
  &__input:hover {
    border: 2px solid #b1c909;
    padding: 21.5px 26.5px;
  }
  &__input:active {
    border: 2px solid #b1c909;
    padding: 21.5px 26.5px;
    outline: none;
  }
  &__input:focus {
    border: 2px solid #b1c909;
    padding: 21.5px 26.5px;
    outline: none;
  }
  &__input:placeholder {
    color: #9da5af;
  }
  &__block-submit {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;
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
    font-family: 'Montserrat';
    padding: 0 24px;
    height: 56px;
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
@media (max-width: 1366px) {
  .register {
    &__registration {
      max-width: 200px;
      margin: 0;
    }
  }
}
@media (max-width: 768px) {
  .register {
    &__input {
      margin-bottom: 16px;
    }
    &__block-submit {
      flex-direction: column;
      align-items: center;
    }
    &__button {
      order: 1;
      width: 100%;
    }
    &__registration {
      order: 2;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      max-width: 400px;
      margin-top: 10px;
    }
    &__link {
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>
