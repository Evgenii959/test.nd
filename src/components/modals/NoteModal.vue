<template>
  <form @submit.prevent="addNote">
    <div class="note__form-group">
      <label class="note__label" for="name">Название заметки</label>
      <input
        class="note__input"
        type="name"
        id="name"
        v-model="noteName"
        required
        placeholder="Введите название"
        maxlength="100"
      />
      <span
        class="note__span"
        :class="{ note__span_red: noteName.length >= 100 }"
        >{{ noteName.length }}/100</span
      >
    </div>

    <div class="note__form-group">
      <label class="note__label note__label_textarea" for="name"
        >Текст заметки</label
      >
      <textarea
        class="note__input note__input_textarea"
        type="text"
        id="text"
        v-model="noteText"
        required
        placeholder="Введите текст"
        maxlength="500"
      />
      <span
        class="note__span"
        :class="{ note__span_red: noteText.length >= 500 }"
        >{{ noteText.length }}/500</span
      >
    </div>
    <div class="note__button-container">
      <button class="note__button" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'NoteModal',
  data() {
    return {
      noteName: '',
      noteText: '',
    };
  },
  methods: {
    async addNote() {
      const newNote = {
        title: this.noteName,
        content: this.noteText,
      };
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
          console.log('Заметка успешно добавлена:', result);
          this.$emit('submit-note', { ...newNote, id: result.id });
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
  &__span {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-align: right;
    color: #9da5af;
    margin: 8px 20px 0 0;
    &_red {
      color: red;
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
  }
}
@media (max-width: 768px) {
  .note {
    &__span {
      margin-right: 40px;
    }
    &__label {
      &_textarea {
        margin-top: 16px;
      }
    }
    &__button {
      margin-top: 28px;
      width: 100%;
    }
  }
}
</style>
