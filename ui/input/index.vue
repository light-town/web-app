<template>
  <input
    v-model="text"
    class="ui-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
  />
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    type: {
      type: String,
      required: true,
      validator(val) {
        return ['text', 'password', 'email'].includes(val);
      },
    },
    placeholder: {
      type: String,
      require: false,
      default: '',
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      text: '',
    };
  },
  watch: {
    text() {
      this.$emit('input', this.text);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
