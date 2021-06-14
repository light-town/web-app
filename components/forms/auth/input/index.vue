<template>
  <ui-input v-bind="$attrs" class="auth-form__input" v-on="$listeners" />
</template>

<script>
import { UiInput } from '@light-town/ui';

export default {
  name: 'AuthFormInput',
  components: {
    UiInput,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
