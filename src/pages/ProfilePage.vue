<template>
  <div>
    <Header />
    <button class="add-card-btn" @click="openNoteModal">
      <img src="../assets/images/plus.svg" alt="плюс" />
    </button>
    <BaseModal
      :modalTitle="loginTitle"
      :isOpen="isNoteModalOpen"
      @close="closeNoteModal"
    >
      <NoteModal @submit-note="addNewCard" />
    </BaseModal>
    <NotesList :notes="notes" @delete-note="deleteNote" />
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import NoteModal from '../components/modals/NoteModal.vue';
import BaseModal from '../components/modals/BaseModal.vue';
import NotesList from '../components/NotesList.vue';

export default {
  name: 'ProfilePage',
  components: {
    Header,
    NoteModal,
    BaseModal,
    NotesList,
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
  z-index: 5;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: #97ab0d;
  }
  &:active {
    background-color: #819400;
  }
}
</style>
