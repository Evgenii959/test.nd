<template>
  <form class="login" @submit.prevent="login">
    <label class="login__label" for="login__email">Email</label>
    <input
      class="login__input"
      type="email"
      id="email"
      v-model="email"
      required
      placeholder="Введите значение"
    />

    <label class="login__label" for="password">Пароль</label>
    <input
      class="login__input"
      type="password"
      id="password"
      v-model="password"
      required
      placeholder="******"
    />

    <div class="login__block-submit">
      <p class="login__registration">
        У вас нет аккаунта?
        <a class="login__link" href="#" @click.prevent="openRegisterModal"
          >Зарегистрируйтесь</a
        >
      </p>
      <button class="login__button" type="submit">Войти</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    openRegisterModal() {
      this.$emit('open-register-modal');
    },
    async login() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
        };

        const response = await fetch('https://dist.nd.ru/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();

          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userEmail', this.email);
            this.$emit('login-success', this.email);
            console.log('Токен сохранен:', data.accessToken);

            await this.fetchProtectedData();

            this.email = '';
            this.password = '';
          } else {
            console.error('Токен не был возвращен.');
          }
        } else {
          console.error('Ошибка авторизации:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при авторизации:', error);
      }
    },

    async fetchProtectedData() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://dist.nd.ru/api/auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.$emit('close-login-modal');
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.message || 'Ошибка доступа к защищённому ресурсу'
          );
        }
      } catch (error) {
        console.error('Ошибка при запросе:', error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
    margin-top: 12px;
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
  .login {
    &__registration {
      max-width: 200px;
      margin: 0;
    }
  }
}
@media (max-width: 768px) {
  .login {
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
