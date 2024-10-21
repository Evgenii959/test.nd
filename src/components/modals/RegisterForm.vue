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
    <span class="register__error" v-if="errors.email">{{ errors.email }}</span>
    <label class="register__label" for="register__password">Пароль</label>
    <div class="register__input-wrapper">
      <input
        class="register__input"
        :type="passwordVisible ? 'text' : 'password'"
        id="register__password"
        v-model="password"
        required
        placeholder="******"
      />

      <div class="register__icon-password" @click="togglePasswordVisibility">
        <img
          :src="passwordVisible ? visibleIcon : invisibleIcon"
          alt="видимость"
        />
      </div>
    </div>
    <span class="register__error" v-if="errors.password">{{
      errors.password
    }}</span>
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
    <span class="register__error" v-if="errors.confirmPassword">{{
      errors.confirmPassword
    }}</span>
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
import visibleIcon from '../../assets/images/visible.svg';
import invisibleIcon from '../../assets/images/invisible.svg';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../validation/validation.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
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
    confirmPassword(value) {
      const passwordConfirmErrors = validateConfirmPassword(
        value,
        this.password
      );
      if (passwordConfirmErrors.length > 0) {
        this.errors.confirmPassword = passwordConfirmErrors.join('. ');
      } else {
        this.errors.confirmPassword = '';
      }
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
