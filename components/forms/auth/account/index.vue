<template>
  <ui-grid
    align-items="center"
    class="auth-form__account"
    @click="$emit('click', $event)"
  >
    <user-icon class="auth-form__account-icon" />
    <ui-grid direction="column">
      <p class="auth-form__account-username">{{ name }}</p>
      <p class="auth-form__account-key">
        {{ version }}-{{ uuid }} •••••• ••••• ••••• ••••• •••••
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import UserIcon from '~/assets/user.svg?inline';

export default {
  name: 'Account',
  components: {
    UiGrid,
    UserIcon,
  },
  props: {
    version: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
