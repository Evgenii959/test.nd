<template>
  <div>
    <main class="login">
      <section class="login__block-text">
        <h1 class="login__title">Мои заметки</h1>
        <p class="login__subtitle">Не забывай о важном, храни его в облаке.</p>
      </section>
      <section class="login__image-container">
        <img
          src="../assets/images/bg-login.png"
          class="login__image"
          alt="заметка"
        />
      </section>
    </main>
  </div>
</template>
<script>
export default {
  name: 'HomePage',
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__block-text {
    margin-top: -50px;
  }
  &__title {
    max-width: 488px;
    font-weight: 900;
    font-size: 104px;
    line-height: 104px;
    color: #ffffff;
    margin: 0;
  }
  &__subtitle {
    max-width: 394px;
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    color: #9da5af;
    margin: 40px 0 0;
  }
  &__image-container {
    width: 100%;
    max-width: 898px;
    height: auto;
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

@media (max-width: 1366px) {
  .login {
    &__image-container {
      max-width: 628px;
    }
    &__block-text {
      margin-top: 0px;
    }
  }
}
@media (max-width: 1000px) {
  .login {
    gap: 30px;
    &__title {
      font-size: 70px;
      line-height: 70px;
    }
    &__subtitle {
      font-size: 32px;
      line-height: 40px;
    }
  }
}
@media (max-width: 768px) {
  .login {
    gap: 0;
    flex-direction: column;
    &__image-container {
      max-width: 628px;
    }
    &__block-text {
      display: flex;
      flex-direction: column;
      margin-top: 0px;
      text-align: center;
      align-items: center;
      margin-top: 40px;
    }
    &__title {
      font-size: 104px;
      line-height: 104px;
    }
    &__subtitle {
      max-width: 582px;
      line-height: 48px;
      width: 100%;
      margin-top: 20px;
    }
    &__image-container {
      max-width: 561px;
    }
  }
}
@media (max-width: 600px) {
  .login {
    &__block-text {
      margin: 20px 0 17px;
    }
    &__title {
      width: 320px;
      font-weight: 900;
      font-size: 60px;
      line-height: 64px;
    }
    &__subtitle {
      width: 320px;
      height: 72px;
      font-weight: 400;
      font-size: 24px;
      line-height: 36px;
      text-align: center;
    }
  }
}
@media (max-width: 360px) {
  .login {
    &__image-container {
      max-width: 298px;
    }
  }
}
</style>
