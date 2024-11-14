<template>
  <header class="header">
    <img
      v-if="isLoggedIn && isMobile && isProfilePath"
      src="../assets/images/logo-mobile.svg"
      class="header__logo-mobile"
      alt="заметки"
    />
    <img
      v-else
      src="../assets/images/logo.svg"
      class="header__logo"
      alt="заметки"
    />
    <Button
      v-if="!isLoggedIn"
      :buttonText="'Вход'"
      :iconAlt="'войти'"
      :iconSrc="require('@/assets/images/enter.svg')"
      :buttonClass="'header__button'"
      @click="openLoginModal"
    />

    <section v-if="isLoggedIn" class="header__user-info">
      <p class="header__email">{{ userEmail }}</p>
      <div class="header__user-wrapper">
        <img
          src="../assets/images/user.svg"
          alt="пользователь"
          class="header__user-icon"
          @click="toggleLogoutModal"
        />

        <LogoutModal
          :isOpen="isLogoutModalOpen"
          @logout="handleLogout"
          @close="closeLogoutModal"
          class="header__logout-modal"
        />
      </div>
    </section>
    <BaseModal
      :isOpen="isLoginModalOpen"
      @close="closeLoginModal"
      :modalTitle="loginTitle"
    >
      <LoginForm
        @open-register-modal="openRegisterModal"
        @close-login-modal="closeLoginModal"
        @login-success="handleLoginSuccess"
      />
    </BaseModal>

    <BaseModal
      :isOpen="isRegisterModalOpen"
      @close="closeRegisterModal"
      :modalTitle="registerTitle"
    >
      <RegisterForm
        @open-login-modal="openLoginModal"
        @close-register-modal="closeRegisterModal"
      />
    </BaseModal>
  </header>
</template>

<script>
import LogoutModal from './modals/LogoutModal.vue';
import BaseModal from './modals/BaseModal.vue';
import LoginForm from './modals/LoginForm.vue';
import RegisterForm from './modals/RegisterForm.vue';
import Button from './ui/Button.vue';

export default {
  name: 'Header',
  components: {
    BaseModal,
    LogoutModal,
    LoginForm,
    RegisterForm,
    Button,
  },
  data() {
    return {
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      isLogoutModalOpen: false,
      loginTitle: 'Вход в ваш аккаунт',
      registerTitle: 'Регистрация',
      isLoggedIn: false,
      userEmail: '',
      isMobile: false,
    };
  },
  computed: {
    isProfilePath() {
      return this.$route.path === '/test.nd/profile';
    },
  },
  created() {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      this.isLoggedIn = true;
      this.userEmail = email;
    } else {
      console.log('Токен не найден.');
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
      document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
    const modal = document.querySelector('.header__logout-modal');
    const userIcon = document.querySelector('.header__user-icon');

    if (
      this.isLogoutModalOpen && 
      modal && 
      !modal.contains(event.target) && 
      userIcon && 
      !userIcon.contains(event.target)
    ) {
      this.closeLogoutModal();
    }
  },
    openLoginModal() {
      this.isLoginModalOpen = true;
      this.isRegisterModalOpen = false;
    },
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    openRegisterModal() {
      this.isRegisterModalOpen = true;
      this.isLoginModalOpen = false;
    },
    closeRegisterModal() {
      this.isRegisterModalOpen = false;
    },
    closeLogoutModal() {
      this.isLogoutModalOpen = false;
    },
    toggleLogoutModal() {
      this.isLogoutModalOpen = !this.isLogoutModalOpen;
    },
    handleLoginSuccess(email) {
      this.isLoggedIn = true;
      this.userEmail = email;
      this.closeLoginModal();
      this.$router.push('/test.nd/profile');
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.userEmail = '';
      this.$router.push('/test.nd/');
    },
    handleResize() {
      this.isMobile = window.innerWidth < 600;
    },
  },
};
</script>
<style lang="scss" scoped>
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
    color: #ffffff;
    gap: 12px;
    padding: 12px 24px;
    border: 0;
    cursor: pointer;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    &:hover {
      background-color: #97ab0d;
    }
    &:active {
      background-color: #819400;
    }
  }
  &__user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #ffffff;
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
  }
  &__email {
    margin: 0;
    width: 200px;
    text-align: end;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__logo-mobile {
    display: none;
  }
  &__user-wrapper {
    position: relative;
    height: 56px;
  }
  &__user-icon {
    background-color: #1b2f46;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    &:hover {
      opacity: 0.7;
    }
  }
}
@media (max-width: 1366px) {
  .header {
    display: flex;
    height: 96px;
  }
}
@media (max-width: 600px) {
  .header {
    &__logo {
      width: 154px;
    }
    &__email {
      max-width: 200px;
    }
    &__logo-mobile {
      display: flex;
    }
    &__user-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__user-icon {
      width: 36px;
      height: 36px;
    }
  }
}
</style>
