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
    <button v-if="!isLoggedIn" class="header__button" @click="openLoginModal">
      <img
        src="../assets/images/enter.svg"
        class="header__button-img"
        alt="войти"
      />
      <p class="header__button-text">Вход</p>
    </button>

    <div v-if="isLoggedIn" class="header__user-info">
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
        />
      </div>
    </div>

    <BaseModal
      :isOpen="isLoginModalOpen"
      @close="closeLoginModal"
      :modalTitle="loginTitle"
    >
      <LoginForm
        @open-register-modal="openRegisterModal"
        @close-register-modal="closeRegisterModal"
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
        @close-login-modal="closeLoginModal"
      />
    </BaseModal>
  </header>
</template>

<script>
import LogoutModal from './modals/LogoutModal.vue';
import BaseModal from './modals/BaseModal.vue';
import LoginForm from './modals/LoginForm.vue';
import RegisterForm from './modals/RegisterForm.vue';

export default {
  name: 'Header',
  components: {
    BaseModal,
    LogoutModal,
    LoginForm,
    RegisterForm,
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
      return this.$route.path === '/profile';
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
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
      this.$router.push('/profile');
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.userEmail = '';
      this.$router.push('/');
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
    gap: 12px;
    padding: 12px 24px;
    border: 0;
    cursor: pointer;
    &:hover {
      background-color: #97ab0d;
    }
    &:active {
      background-color: #819400;
    }
  }
  &__button-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: #ffffff;
    margin: 0;
    letter-spacing: 1.5px;
  }
  &__button-img {
    height: 32px;
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
  }
  &__user-icon:hover {
    opacity: 0.7;
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
