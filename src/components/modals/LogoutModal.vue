<template>
  <div v-if="isOpen" class="modal">
    <p class="modal__text" @click="handleLogout">Выйти</p>
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
  methods: {
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

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 77px;
  right: 0px;
  background-color: #1b2f46;
  border-radius: 12px;
  padding: 40px;
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
