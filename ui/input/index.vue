<template>
  <input
    class="ui-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
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
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
