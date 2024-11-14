<template>
  <form class="register" @submit.prevent="signUp" novalidate>
    <Input
      id="register__email"
      label="Email"
      v-model="email"
      type="email"
      required
      placeholder="Введите значение"
      :errorMessage="errors.email"
      autocomplete="email"
    />
    <Input
      id="register__password"
      label="Пароль"
      v-model="password"
      :type="'password'"
      placeholder="******"
      :errorMessage="errors.password"
      required
      aria-describedby="password-error"
      :showPasswordToggle="true"
    />
    <Input
      id="register__confirmPassword"
      label="Пароль еще раз"
      v-model="confirmPassword"
      :type="'password'"
      placeholder="******"
      :errorMessage="errors.confirmPassword"
      required
      aria-describedby="confirm-password-error"
      :showPasswordToggle="true"
    />
    <div class="register__block-submit">
      <p class="register__registration">
        У вас нет аккаунта?
        <a class="register__link" href="#" @click.prevent="loginModal"
          >Войдите</a
        >
      </p>
      <Button
        :buttonType="'submit'"
        :buttonText="'Зарегистрироваться'"
        :buttonClass="'register__button'"
      />
    </div>
    <span class="register__error-user" v-if="errors.general" role="alert">{{
      errors.general
    }}</span>
  </form>
</template>

<script>
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../validation/validation.js';

export default {
  name: 'RegisterForm',
  components: {
    Button,
    Input,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  watch: {
    email(value) {
      const emailErrors = validateEmail(value);
      this.errors.email = emailErrors.join('. ');
    },
    password(value) {
      const passwordErrors = validatePassword(value);
      this.errors.password = passwordErrors.join('. ');

      const passwordConfirmErrors = validateConfirmPassword(
        this.confirmPassword,
        value
      );
      this.errors.confirmPassword = passwordConfirmErrors.join('. ');
    },
    confirmPassword(value) {
      const passwordConfirmErrors = validateConfirmPassword(
        value,
        this.password
      );
      this.errors.confirmPassword = passwordConfirmErrors.join('. ');
    },
  },
  methods: {
    loginModal() {
      this.$emit('open-login-modal');
    },

    registerModal() {
      this.$emit('close-register-modal');
    },

    validateForm() {
      this.errors.email = validateEmail(this.email).join('. ');
      this.errors.password = validatePassword(this.password).join('. ');
      this.errors.confirmPassword = validateConfirmPassword(
        this.confirmPassword,
        this.password
      ).join('. ');

      return (
        !this.errors.email &&
        !this.errors.password &&
        !this.errors.confirmPassword
      );
    },

    async signUp() {
      if (!this.validateForm()) {
        return;
      }

      try {
        const response = await this.$api.auth.signUp({
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        });

        if (response) {
          this.$emit('close-register-modal');
          this.$emit('open-login-modal');
        }
      } catch (error) {
        if (error.response.status === 409) {
          this.$set(
            this.errors,
            'general',
            'Пользователь с таким e-mail уже зарегистрирован'
          );
        } else {
          this.$set(this.errors, 'general', 'Ошибка при регистрации:', error);
        }
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
  &__block-submit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 5px;
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
  &__error-user {
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
    &__block-submit {
      display: flex;
      align-items: center;
      margin-top: 22px;
    }
    &__registration {
      max-width: 400px;
    }
  }
}
@media (max-width: 400px) {
  .register {
    max-width: 320px;
    &__block-submit {
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-top: 12px;
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
      margin-top: 20px;
    }
    &__link {
      font-size: 14px;
      line-height: 24px;
    }
  }
}
</style>
