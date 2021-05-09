<template>
  <ui-input
    v-bind="$attrs"
    class="auth-form__input"
    v-on="$listeners"
  ></ui-input>
</template>

<script>
import UiInput from '~/ui/input/index.vue';

export default {
  name: 'AuthFormInput',
  components: {
    UiInput,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
