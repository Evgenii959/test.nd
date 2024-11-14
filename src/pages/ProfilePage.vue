<template>
  <div>
    <Button
      :iconAlt="'добавить'"
      :iconSrc="require('@/assets/images/plus.svg')"
      :buttonClass="'add-card-btn'"
      @click="openNoteModal"
    />
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
import NoteModal from '../components/modals/NoteModal.vue';
import BaseModal from '../components/modals/BaseModal.vue';
import NotesList from '../components/NotesList.vue';
import Button from '../components/ui/Button.vue';

export default {
  name: 'ProfilePage',
  components: {
    NoteModal,
    BaseModal,
    NotesList,
    Button,
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
      try {
        const response = await this.$api.notes.getNotes();
        this.notes = response.data;
      } catch (error) {
        if (error.response) {
          console.error(
            'Ошибка при получении заметок:',
            error.response.statusText
          );
        } else {
          console.error('Ошибка сети или запроса:', error.message);
        }
      }
    },
    async deleteNote(id) {
      try {
        const response = await this.$api.notes.deleteNote(id);

        if (response.status === 200) {
          this.notes = this.notes.filter((note) => note.id !== id);
        } else {
          console.error('Ошибка при удалении заметки:', response.statusText);
        }
      } catch (error) {
        if (error.response) {
          console.error(error.response.statusText);
        } else {
          console.error('Ошибка сети или запроса:', error.message);
        }
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
    transition: all 0.5s;
  }
  &:active {
    background-color: #819400;
  }
}
</style>
