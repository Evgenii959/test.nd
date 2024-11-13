<template>
  <form class="register" @submit.prevent="signUp" novalidate>
    <label class="register__label" for="register__email">Email</label>
    <input
      class="register__input"
      type="email"
      id="register__email"
      v-model="email"
      required
      placeholder="Введите Email"
      autocomplete="email"
      aria-describedby="email-error"
    />
    <span
      id="email-error"
      class="register__error"
      v-if="errors.email"
      role="alert"
      >{{ errors.email }}</span
    >
    <label class="register__label" for="register__password">Пароль</label>
    <div class="register__input-wrapper">
      <input
        class="register__input"
        :type="passwordVisible ? 'text' : 'password'"
        id="register__password"
        v-model="password"
        required
        placeholder="******"
        autocomplete="password"
        aria-describedby="password-error"
      />

      <div class="register__icon-password" @click="togglePasswordVisibility">
        <img
          :src="passwordVisible ? visibleIcon : invisibleIcon"
          alt="видимость"
        />
      </div>
    </div>
    <span
      id="password-error"
      class="register__error"
      v-if="errors.password"
      role="alert"
      >{{ errors.password }}</span
    >
    <label class="register__label" for="register__confirmPassword"
      >Пароль еще раз</label
    >
    <div class="register__input-wrapper">
      <input
        class="register__input"
        :type="confirmPasswordVisible ? 'text' : 'password'"
        id="register__confirmPassword"
        v-model="confirmPassword"
        required
        placeholder="******"
        autocomplete="confirm-password"
        aria-describedby="confirm-password-error"
      />
      <div
        class="register__icon-password"
        @click="toggleConfirmPasswordVisibility"
      >
        <img
          :src="confirmPasswordVisible ? visibleIcon : invisibleIcon"
          alt="видимость"
        />
      </div>
    </div>
    <span
      id="confirm-password-error"
      class="register__error"
      v-if="errors.confirmPassword"
      role="alert"
      >{{ errors.confirmPassword }}</span
    >
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
import visibleIcon from '../../assets/images/visible.svg';
import invisibleIcon from '../../assets/images/invisible.svg';
import Button from '../ui/Button.vue';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../validation/validation.js';

export default {
  name: 'RegisterForm',
  components: {
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
      visibleIcon,
      invisibleIcon,
      errors: {
        email: '',
        password: '',
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
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    loginModal() {
      this.$emit('open-login-modal');
    },

    validateForm() {
      this.errors.email = validateEmail(this.email).join('. ');
      this.errors.password = validatePassword(this.password).join('. ');

      return !(this.errors.email || this.errors.password);
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

        if (response.data.ok) {
          this.$emit('open-login-modal');
          this.$emit('close-register-modal');
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

  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    margin: -5px 0 8px 24px;
  }
  &__input-wrapper {
    position: relative;
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
    &__error {
      margin-top: -15px;
      margin-bottom: -13px;
      font-size: 14px;
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
      margin-top: 20px;
    }
    &__link {
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
    }
    &__error {
      font-size: 12px;
    }
  }
}
</style>
