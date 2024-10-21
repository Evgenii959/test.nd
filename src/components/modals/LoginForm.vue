<template>
  <form class="login" @submit.prevent="login" novalidate>
    <label class="login__label" for="login__email">Email</label>
    <input
      class="login__input"
      type="email"
      id="email"
      v-model="email"
      required
      placeholder="Введите значение"
    />
    <span class="login__error" v-if="errors.email">{{ errors.email }}</span>
    <label class="login__label" for="password">Пароль</label>
    <div class="login__input-wrapper">
      <input
        class="login__input"
        :type="passwordVisible ? 'text' : 'password'"
        id="login__password"
        v-model="password"
        required
        placeholder="******"
      />
      <div class="login__icon-password" @click="togglePasswordVisibility">
        <img
          :src="passwordVisible ? visibleIcon : invisibleIcon"
          alt="видимость"
        />
      </div>
    </div>
    <span class="login__error" v-if="errors.password">{{
      errors.password
    }}</span>
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
import visibleIcon from '../../assets/images/visible.svg';
import invisibleIcon from '../../assets/images/invisible.svg';
import {
  validateEmail,
  validatePassword,
} from '../../validation/validation.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordVisible: false,
      visibleIcon,
      invisibleIcon,
      errors: {},
    };
  },
  watch: {
    email(value) {
      if (!value) {
        this.errors.email = 'E-Mail не может быть пустым';
      } else if (!validateEmail(value)) {
        this.errors.email = 'Невалидный адрес электронной почты';
      } else {
        this.errors.email = '';
      }
    },
    password(value) {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        this.errors.password = passwordErrors.join('. ');
      } else {
        this.errors.password = '';
      }
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
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
        const data = await response.json();

        if (response.ok) {
          if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userEmail', this.email);
            this.$emit('login-success', this.email);
            
            await this.fetchProtectedData();
            this.email = '';
            this.password = '';
          } else {
            console.error('Токен не был возвращен.');
          }
        } else {
          console.error(data.message);
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
    margin: -5px 0 8px 24px;
  }
  &__input-wrapper {
    position: relative;
    width: 100%;
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
    color: #0a1f38;
    border: 0;
    margin-bottom: 29px;
    &:hover {
      border: 2px solid #b1c909;
      padding: 21.5px 26.5px;
    }
    &:active {
      border: 2px solid #b1c909;
      padding: 21.5px 26.5px;
      outline: none;
    }
    &:focus {
      border: 2px solid #b1c909;
      padding: 21.5px 26.5px;
      outline: none;
    }
    &:placeholder {
      color: #9da5af;
    }
  }
  &__icon-password {
    position: absolute;
    top: 28px;
    right: 29px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  &__error {
    margin: -28px 0 0 24px;
    color: #ff7461;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
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
  &__link:hover {
    color: #ffffff;
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
