<template>
  <NuxtLink :to="to" class="auth-form__link">
    {{ text }}
  </NuxtLink>
</template>

<script>
export default {
  name: 'AuthFormLink',
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
