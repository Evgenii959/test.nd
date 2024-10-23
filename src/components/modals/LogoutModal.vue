<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content" @click.stop>
      <p class="modal__text" @click="handleLogout">Выйти</p>
    </div>
  </div>
</template>

<script>
export default {
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
      this.$emit('close-logout-modal');
    },
    handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.$emit('close');
      }
    },
    async handleLogout() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('https://dist.nd.ru/api/auth', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          this.$emit('logout');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userEmail');
        } else {
          throw new Error('Ошибка при выходе');
        }
      } catch (error) {
        console.error('Ошибка при выходе:', error);
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
  }
  &__text:hover {
    opacity: 0.7;
  }
}
</style>