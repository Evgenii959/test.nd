<template>
  <form @submit.prevent="addNote" class="note">
    <Input
      id="name"
      label="Название заметки"
      v-model="noteName"
      placeholder="Введите название"
      maxlength="100"
      :showLength="true"
      :errorMessage="errors.noteName"
    />
    <Textarea
      id="note-text"
      label="Текст заметки"
      v-model="noteTextarea"
      placeholder="Введите текст"
      maxlength="500"
      :errorMessage="errors.noteTextarea"
      class="note__textarea"
    />
    <div class="note__button-wrapper">
      <Button
        :buttonType="'submit'"
        :buttonText="'Добавить'"
        :iconAlt="'Добавить'"
        :buttonClass="'note__button'"
      />
    </div>
  </form>
</template>

<script>
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import Textarea from '../ui/Textarea.vue';
import {
  validateNameNote,
  validateTextarea,
} from '../../validation/validation.js';

export default {
  name: 'NoteModal',
  components: {
    Button,
    Input,
    Textarea,
  },
  data() {
    return {
      noteName: '',
      noteTextarea: '',
      errors: {
        noteName: '',
        noteTextarea: '',
      },
    };
  },
  watch: {
    noteName(name) {
      this.errors.noteName = validateNameNote(name).join('. ');
    },
    noteTextarea(text) {
      this.errors.noteTextarea = validateTextarea(text).join('. ');
    },
  },
  methods: {
    validateForm() {
      this.errors.noteName = validateNameNote(this.noteName).join('. ');
      this.errors.noteTextarea = validateTextarea(this.noteTextarea).join('. ');

      return !(this.errors.noteName || this.errors.noteTextarea);
    },
    async addNote() {
      if (!this.validateForm()) {
        return;
      }

      const newNote = {
        title: this.noteName,
        content: this.noteTextarea,
      };
      const notes = JSON.parse(localStorage.getItem('notes'));
      const token = localStorage.getItem('accessToken');
      try {
        const response = await fetch('https://dist.nd.ru/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newNote),
        });

        if (response.ok) {
          const result = await response.json();
          this.$emit('submit-note', { ...newNote, id: result.id });
          localStorage.setItem('notes', JSON.stringify(notes));
        } else {
          console.error('Ошибка при добавлении заметки:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка сети или запроса:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  &__form-group {
    display: flex;
    flex-direction: column;
  }
  &__button {
    font-family: 'Montserrat';
    padding: 0 24px;
    height: 56px;
    background-color: #b1c909;
    border-radius: 32px;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: #ffffff;
    cursor: pointer;
    border: 0;
    margin-top: 40px;
    &:hover {
      background-color: #97ab0d;
    }
    &:active {
      background-color: #819400;
    }
  }
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
@media (max-width: 768px) {
  .note {
    &__button {
      margin-top: 28px;
      width: 150px;
    }
    &__textarea {
      margin-top: 20px;
    }
  }
}
@media (max-width: 500px) {
  .note {
    &__title {
      margin-bottom: 24px;
    }
    &__button {
      margin-top: 12px;
    }
  }
}
@media (max-width: 360px) {
  .note {
    max-width: 320px;
    &__button {
      width: 100%;
    }
  }
}
</style>
