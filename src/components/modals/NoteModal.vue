<template>
  <form @submit.prevent="addNote" class="note">
    <div class="note__form-group">
      <label class="note__label" for="name">Название заметки</label>
      <input
        class="note__input"
        type="name"
        id="name"
        v-model="noteName"
        placeholder="Введите название"
        maxlength="100"
        aria-describedby="note-name-length note-name-error"
      />
      <span
        id="note-name-length"
        class="note__span"
        :class="{ note__span_red: noteName.length >= 100 }"
        >{{ noteName.length }}/100</span
      >
      <span id="note-name-error" class="note__error" v-if="errors.noteName">{{
        errors.noteName
      }}</span>
    </div>

    <div class="note__form-group">
      <label class="note__label note__label_textarea" for="text"
        >Текст заметки</label
      >
      <textarea
        class="note__input note__input_textarea"
        type="text"
        id="text"
        v-model="noteTextarea"
        placeholder="Введите текст"
        maxlength="500"
        aria-describedby="note-text-length note-text-error"
      />
      <span
        class="note__span"
        id="note-text-length"
        :class="{ note__span_red: noteTextarea.length >= 500 }"
        >{{ noteTextarea.length }}/500</span
      >
      <span
        id="note-text-error"
        class="note__error"
        v-if="errors.noteTextarea"
        role="alert"
        >{{ errors.noteTextarea }}</span
      >
    </div>
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
import {
  validateNameNote,
  validateTextarea,
} from '../../validation/validation.js';

export default {
  name: 'NoteModal',
  components: {
    Button,
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
  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    margin: 0 0 8px 24px;
    &_textarea {
      margin-top: 24px;
    }
  }
  &__input {
    font-family: 'Montserrat';
    background-color: #ffffff;
    border-radius: 36px;
    padding: 23px 28px;
    width: 100%;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    border: 0;
    color: #0a1f38;
    &_textarea {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      min-height: 244px;
    }
    &_textarea:placeholder {
      color: #9da5af;
    }
    &:hover {
      border: 2px solid #b1c909;
      padding: 21.5px 26.5px;
    }
    &:active {
      border: 2px solid #b1c909;
      padding: 21.5px 26.5px;
      outline: none;
    }
    &:focus {
      border: 2px solid #b1c909;
      padding: 21.2px 26.5px;
      outline: none;
    }
    &:placeholder {
      color: #9da5af;
    }
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
  &__error {
    margin: -28px 0 0 24px;
    color: #ff7461;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
  }
  &__span {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-align: right;
    color: #9da5af;
    margin: 8px 20px 0 0;
    &_red {
      color: #ff7461;
    }
  }
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
@media (max-width: 1366px) {
  .note {
    &__input {
      &_textarea {
        min-height: 168px;
      }
    }
    &__error {
      margin-top: -28px;
      font-size: 15px;
    }
  }
}
@media (max-width: 768px) {
  .note {
    &__input {
      width: 100%;
    }
    &__span {
      margin-right: 40px;
      margin-bottom: 16px;
    }
    &__label {
      margin-top: 5px;
    }
    &__button {
      margin-top: 28px;
      width: 150px;
    }

    &__error {
      margin-top: -40px;
      line-height: 20px;
      max-width: 280px;
    }
  }
}
@media (max-width: 500px) {
  .note {
    &__title {
      margin-bottom: 24px;
    }
    &__error {
      max-width: 200px;
    }
    &__button {
      margin-top: 12px;
    }
    &__span {
      margin-right: 24px;
    }
  }
}
@media (max-width: 360px) {
  .note {
    max-width: 320px;
  }
}
</style>
