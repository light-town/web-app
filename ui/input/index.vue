<template>
  <input :type="type" :placeholder="placeholder" class="ui-input" />
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    type: {
      type: String,
      require: true,
      validator(val) {
        return ['text', 'password', 'email'].includes(val);
      },
    },
    placeholder: {
      type: String,
      require: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
