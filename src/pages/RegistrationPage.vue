<template>
  <div class="login">
    <div class="login__block-text">
      <h1 class="login__title">Мои заметки</h1>
      <p class="login__subtitle">Не забывай о важном, храни его в облаке.</p>
    </div>
    <img src="../assets/bg-login.png" />
  </div>
</template>
<script></script>
<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__title {
    width: 488px;
    font-weight: 900;
    font-size: 104px;
    line-height: 104px;
    color: #ffffff;
    margin: 0;
  }
  &__subtitle {
    width: 394px;
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;
    color: #9da5af;
    margin: 40px 0 0;
  }
}
</style>
