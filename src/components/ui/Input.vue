<template>
  <div class="input">
    <label v-if="label" :for="id" class="input__label">{{ label }}</label>
    <div class="input__wrapper">
      <input
        class="input__field"
        :type="type"
        :id="id"
        v-model="inputValue"
        :placeholder="placeholder"
        :required="required"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :aria-describedby="ariaDescribedBy"
        @input="updateValue"
      />
      <div
        v-if="isPasswordInput"
        class="input__icon"
        @click="togglePasswordVisibility"
      >
        <img
          :src="isPasswordVisible ? visibleIcon : invisibleIcon"
          alt="видимость"
        />
      </div>
    </div>
    <span
      v-if="showLength"
      :class="[
        'input__span',
        { input__span_red: inputValue.length >= maxlength },
      ]"
      >{{ inputValue.length }}/{{ maxlength }}</span
    >
    <span class="input__error" v-if="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import visibleIcon from '../../assets/images/visible.svg';
import invisibleIcon from '../../assets/images/invisible.svg';

export default {
  name: 'Input',
  props: {
    id: { type: String, required: true },
    label: { type: String, default: '' },
    value: { type: String, required: true },
    type: { type: String },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    autocomplete: { type: String, default: 'off' },
    errorMessage: { type: String, default: '' },
    ariaDescribedBy: { type: String, default: '' },
    showLength: { type: Boolean, default: false },
    maxlength: { type: Number, default: 100 },
  },
  data() {
    return {
      inputValue: this.value,
      isPasswordVisible: false,
      visibleIcon,
      invisibleIcon,
    };
  },
  computed: {
    isPasswordInput() {
      return this.type === 'password';
    },
  },
  methods: {
    updateValue() {
      this.$emit('input', this.inputValue);
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #9da5af;
    margin-left: 24px;
  }
  &__wrapper {
    position: relative;
    width: 100%;
  }
  &__icon {
    position: absolute;
    top: 34px;
    right: 26px;
    width: 20px;
    height: 20px;
    cursor: pointer;
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
    color: #0a1f38;
    border: 0;
    margin: 7px 0 24px;
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
      padding: 21.5px 26.5px;
      outline: none;
    }
    &:placeholder {
      color: #9da5af;
    }
  }
  &__span {
    display: block;
    font-weight: 400;
    font-size: 18px;
    text-align: right;
    color: #9da5af;
    margin: -14px 24px 0 0;
    &_red {
      color: #ff7461;
    }
  }
  &__error {
    display: block;
    color: #ff7461;
    font-weight: 400;
    font-size: 18px;
    margin: -22px 0 0 24px;
  }
}
@media (max-width: 768px) {
  .input {
    &__label {
      margin-top: 5px;
    }
    &__error {
      margin-top: -15px;
      font-size: 14px;
    }
  }
}
@media (max-width: 400px) {
  .input {
    &__label {
      margin-top: 0;
    }
    &__error {
      font-size: 12px;
    }
  }
}
</style>
