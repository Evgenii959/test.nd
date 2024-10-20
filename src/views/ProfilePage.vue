<template>
  <div>
    <Header />
    <button class="add-card-btn" @click="openNoteModal">
      <img src="../assets/plus.svg" alt="плюс" />
    </button>
    <BaseModal
      :modalTitle="loginTitle"
      :isOpen="isNoteModalOpen"
      @close="closeNoteModal"
    >
      <NoteModal @submit-note="addNewCard" />
    </BaseModal>
    <div v-if="notes.length">
      <ul class="list">
        <li v-for="(note, index) in notes" :key="index" class="card">
          <h3 class="card__title">{{ note.title }}</h3>
          <p class="card__content">{{ note.content }}</p>
          <div class="card__button-wrapper">
            <button class="card__button">
              <img src="../assets/close.svg" alt="удаление" />
              <p class="card__button-text" @click="deleteNote(note.id)">
                Удалить
              </p>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import NoteModal from '../components/modals/NoteModal.vue';
import BaseModal from '../components/modals/BaseModal.vue';

export default {
  name: 'ProfilePage',
  components: {
    Header,
    NoteModal,
    BaseModal,
  },
  data() {
    return {
      isNoteModalOpen: false,
      loginTitle: 'Добавление заметки',
      notes: [],
    };
  },
  methods: {
    openNoteModal() {
      this.isNoteModalOpen = true;
    },
    closeNoteModal() {
      this.isNoteModalOpen = false;
    },
    addNewCard(note) {
      this.notes.push(note);
      localStorage.setItem('notes', JSON.stringify(this.notes));
      this.closeNoteModal();
    },
    closeModal() {
      this.$emit('close');
    },
    async getNotes() {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch('https://dist.nd.ru/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          this.notes = await response.json();
        } else {
          console.error('Ошибка при получении заметок:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка сети или запроса:', error);
      }
    },
    async deleteNote(id) {
      console.log(id)
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch(`https://dist.nd.ru/api/notes/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          this.notes = this.notes.filter((note) => note.id !== id);
          console.log('Карточка удалена.');
        } else {
          console.error('Ошибка при получении заметок:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка сети или запроса:', error);
      }
    },
  },
  mounted() {
    this.getNotes();
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
  transition: background-color 0.3s ease;
}

.add-card-btn:hover {
  background-color: #0056b3;
}

.list {
  display: flex;
  gap: 40px;
}
.card {
  position: relative;
  background-color: #b1c909;
  border-radius: 12px;
  padding: 20px 28px;
  color: #ffffff;
  list-style: none;
  border: 0;
  z-index: 0;
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
  &__content {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    width: 450px;
  }
  &__button {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 0;
    color: #ffffff;
    background-color: transparent;
    cursor: pointer;
  }
  &__icon {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
  }
  &__button-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    margin: 0;
  }
  &__button-wrapper {
    display: flex;
    justify-content: end;
  }
  &__button-wrapper:hover {
    opacity: 0.7;
  }
}
.card::before {
  content: '';
  position: absolute;
  top: -0.5px;
  right: -0.5px;
  width: 40px;
  height: 40px;
  background-color: #0a1f38;
  border-radius: 0 0 0 8px;
  clip-path: polygon(100% 100%, 100% 100%, 100% 0, 0 0);
  z-index: 1;
}
.card::after {
  content: '';
  position: absolute;
  top: -0.5px;
  right: -0.5px;
  width: 40px;
  height: 40px;
  background-color: #a5bb0c;
  border-radius: 0 0 0 8px;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 100%);
  z-index: 2;
}
</style>
