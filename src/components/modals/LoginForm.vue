<template>
  <form class="login" @submit.prevent="signIn" novalidate>
    <Input
      id="email"
      label="Email"
      v-model="email"
      type="email"
      required
      placeholder="Введите значение"
      :errorMessage="errors.email"
      autocomplete="email"
    />
    <Input
      id="password"
      label="Пароль"
      v-model="password"
      :type="'password'"
      placeholder="******"
      :errorMessage="errors.password"
      required
      aria-describedby="password-error"
      :showPasswordToggle="true"
    />
    <div class="login__block-submit">
      <p class="login__registration">
        У вас нет аккаунта?
        <a class="login__link" href="#" @click.prevent="openRegisterModal"
          >Зарегистрируйтесь</a
        >
      </p>
      <Button
        :buttonType="'submit'"
        :buttonText="'Войти'"
        :buttonClass="'login__button'"
      />
    </div>
    <span class="login__error" v-if="errors.general">{{ errors.general }}</span>
  </form>
</template>

<script>
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import {
  validateEmail,
  validatePassword,
} from '../../validation/validation.js';

export default {
  name: 'LoginForm',
  components: {
    Button,
    Input,
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    };
  },
  watch: {
    email(email) {
      this.errors.email = validateEmail(email).join('. ');
    },
    password(password) {
      this.errors.password = validatePassword(password).join('. ');
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    openRegisterModal() {
      this.$emit('open-register-modal');
    },

    validateForm() {
      this.errors.email = validateEmail(this.email).join('. ');
      this.errors.password = validatePassword(this.password).join('. ');

      return !(this.errors.email || this.errors.password);
    },

    async signIn() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await this.$api.auth.signIn({
          email: this.email,
          password: this.password,
        });
        if (response.data.accessToken) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('userEmail', this.email);
          this.$emit('login-success', this.email);

          await this.fetchProtectedData();
          this.email = '';
          this.password = '';
        } else {
          console.error('Токен не был возвращен.');
        }
      } catch (error) {
        if (error.response.status === 404) {
          this.$set(
            this.errors,
            'general',
            'Пользователь с таким логином не найден'
          );
        } else if (error.response.status === 400) {
          this.$set(this.errors, 'general', 'Ошибка авторизации');
        } else {
          this.errors.general = 'Ошибка при сетевом запросе';
        }
      }
    },

    async fetchProtectedData() {
      try {
        const response = await this.$api.auth.protectedData();

        if (response.status === 200) {
          this.$emit('close-login-modal');
        } else {
          const errorMessage =
            response.data.message || 'Ошибка доступа к защищённому ресурсу';
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Ошибка при запросе:', error.message);
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
  &__error {
    margin-top: 20px;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #ff7461;
    background-color: rgba(255, 116, 97, 0.1);
    padding: 8px 20px;
    border-radius: 24px;
    width: 100%;
    box-sizing: border-box;
  }
  &__block-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    width: 100%;
  }
  &__registration {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    margin: 0;
  }
  &__link {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: #b1c909;
    &:hover {
      color: #ffffff;
    }
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
    &:hover {
      background-color: #97ab0d;
    }
    &:active {
      background-color: #819400;
    }
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
      width: 100%;
    }
    &__block-submit {
      display: flex;
      align-items: center;
      margin-top: 22px;
    }
    &__label {
      margin-top: 5px;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
    }
    &__link {
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
    }
    &__registration {
      max-width: 400px;
    }
  }
}
@media (max-width: 400px) {
  .login {
    max-width: 320px;
    &__block-submit {
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 12px;
    }
    &__label {
      margin-top: 0;
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
      width: 100%;
      margin-top: 10px;
    }
    &__link {
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>
