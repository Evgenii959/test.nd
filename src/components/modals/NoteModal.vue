<template>
  <form @submit.prevent="addNote">
    <div class="note__form-group">
      <label class="note__label" for="name">Название заметки</label>
      <input
        class="note__input"
        type="name"
        id="name"
        v-model="noteName"
        placeholder="Введите название"
        maxlength="100"
      />
      <span
        class="note__span"
        :class="{ note__span_red: noteName.length >= 100 }"
        >{{ noteName.length }}/100</span
      >
      <span class="note__error" v-if="errors.noteName">{{
        errors.noteName
      }}</span>
    </div>

    <div class="note__form-group">
      <label class="note__label note__label_textarea" for="name"
        >Текст заметки</label
      >
      <textarea
        class="note__input note__input_textarea"
        type="text"
        id="text"
        v-model="noteTextarea"
        placeholder="Введите текст"
        maxlength="500"
      />
      <span
        class="note__span"
        :class="{ note__span_red: noteTextarea.length >= 500 }"
        >{{ noteTextarea.length }}/500</span
      >
      <span class="note__error" v-if="errors.noteTextarea">{{
        errors.noteTextarea
      }}</span>
    </div>
    <div class="note__button-container">
      <button class="note__button" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script>
import {
  validateNameNote,
  validateTextarea,
} from '../../validation/validation.js';

export default {
  name: 'NoteModal',
  data() {
    return {
      noteName: '',
      noteTextarea: '',
      errors: {},
    };
  },
  watch: {
    noteName(name) {
      const nameNoteErrors = validateNameNote(name);
      this.errors.noteName = nameNoteErrors.join('. ');
    },
    noteTextarea(text) {
      const textareaErrors = validateTextarea(text);
      this.errors.noteTextarea = textareaErrors.join('. ');
    },
  },
  methods: {
    async addNote() {
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
  display: flex;
  flex-direction: column;
  gap: 24px;

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
  }
  &__input:hover {
    border: 2px solid #b1c909;
    padding: 21.5px 26.5px;
  }
  &__input:active {
    border: 2px solid #b1c909;
    padding: 21.5px 26.5px;
    outline: none;
  }
  &__input:focus {
    border: 2px solid #b1c909;
    padding: 21.5px 26.5px;
    outline: none;
  }
  &__input:placeholder {
    color: #9da5af;
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
  &__button-container {
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
    &__span {
      margin-right: 40px;
      margin-bottom: 16px;
    }
    &__label {
      margin-top: 0px;
    }
    &__button {
      margin-top: 28px;
      width: 100%;
    }

    &__error {
      margin-top: -40px;
      line-height: 20px;
      max-width: 280px;
    }
  }
}
@media (max-width: 550px) {
  .note {
    &__error {
      max-width: 200px;
    }
  }
}
</style>
