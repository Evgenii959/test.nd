<template>
  <div v-if="isOpen" class="modal" @click.self="close" @keydown.esc="close">
    <Button
      :buttonText="'Выйти'"
      :buttonClass="'modal__text'"
      @click="logOut"
    />
  </div>
</template>

<script>
import Button from '../ui/Button.vue';
export default {
  name: 'LogoutModal',
  components: {
    Button,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },
    async logOut() {
      try {
        const response = await this.$api.auth.logOut();

        if (response.status === 200) {
          this.$emit('logout');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('notes');
          this.close();
        } else {
          throw new Error('Ошибка при выходе');
        }
      } catch (error) {
        console.error('Ошибка при выходе:', error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background-color: #1b2f46;
  padding: 40px;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
  top: 77px;
  right: 0px;
  border-radius: 12px;
  z-index: 3;
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 20px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #1b2f46;
  }
  &__text {
    margin: 0;
    font-size: 18px;
    line-height: 28px;
    font-weight: 700;
    color: #b1c909;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
      transition: all 0.5s;
    }
  }
}
</style>
