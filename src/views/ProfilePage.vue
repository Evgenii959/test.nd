<template>
  <div>
    <Header />
    <button class="add-card-btn" @click="addNewCard">
      <img src="../assets/plus.svg" alt='плюс'/>
    </button>
  </div>
</template>
<script>
import Header from '../components/Header.vue';

export default {
  name: 'ProfilePage',
  components: {
    Header,
  },
  methods: {
    addNewCard() {
      console.log('Добавить новую карточку');
    },
  },
};
</script>
<style lang="scss" scoped>
.add-card-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #b1c909;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.add-card-btn:hover {
  background-color: #0056b3;
}
</style>
