<template>
  <div class="textarea">
    <label :for="id" class="textarea__label">{{ label }}</label>
    <textarea
      :class="['textarea__field', { textarea__field_error: errorMessage }]"
      :id="id"
      v-model="textareaValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :aria-describedby="`${id}-length ${id}-error`"
      @input="updateValue"
    ></textarea>
    <span
      :id="`${id}-length`"
      :class="[
        'textarea__span',
        { textarea__span_red: textareaValue.length >= maxlength },
      ]"
    >
      {{ textareaValue.length }}/{{ maxlength }}
    </span>
    <span
      :id="`${id}-error`"
      class="textarea__error"
      v-if="errorMessage"
      role="alert"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    id: { type: String, required: true },
    label: { type: String, default: '' },
    value: { type: String, required: true },
    placeholder: { type: String, default: '' },
    maxlength: { type: String, default: '500' },
    errorMessage: { type: String, default: '' },
  },
  data() {
    return {
      textareaValue: this.value,
    };
  },
  methods: {
    updateValue() {
      this.$emit('input', this.textareaValue);
    },
  },
  watch: {
    value(newVal) {
      this.textareaValue = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.textarea {
  display: flex;
  flex-direction: column;
  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    margin: 24px 0 8px 24px;
  }
  &__field {
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
    min-height: 244px;
    resize: none;
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
}
@media (max-width: 1366px) {
  .textarea {
    &__field {
      min-height: 168px;
    }
    &__error {
      margin-top: -28px;
      font-size: 15px;
    }
  }
}
@media (max-width: 768px) {
  .textarea {
    &__field {
      width: 100%;
    }
    &__span {
      margin-right: 40px;
      margin-bottom: 16px;
    }
    &__label {
      margin-top: 5px;
    }
    &__error {
      margin-top: -40px;
      line-height: 20px;
      max-width: 280px;
    }
  }
}
@media (max-width: 500px) {
  .textarea {
    &__error {
      max-width: 200px;
    }
    &__span {
      margin-right: 24px;
    }
  }
}
@media (max-width: 360px) {
  .textarea {
    max-width: 320px;
  }
}
</style>
