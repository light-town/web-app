<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="ui-input"
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
};
</script>

<style lang="scss" src="./index.scss"></style>
