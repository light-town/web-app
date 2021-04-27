<template>
  <input
    class="ui-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input.prevent="handleInput"
  />
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    type: {
      type: String,
      required: false,
      validator(val) {
        return ['text', 'password', 'email', 'url', 'tel'].includes(val);
      },
      default: 'text',
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
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
