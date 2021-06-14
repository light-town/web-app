<template>
  <ui-grid align-items="center" class="appbar__account">
    <ui-avatar
      :name="name"
      :alt="name"
      :size="44"
      class="appbar__account-icon"
    />
  </ui-grid>
</template>

<script>
import { UiAvatar, UiGrid } from '@light-town/ui';

export default {
  name: 'Account',
  components: {
    UiGrid,
    UiAvatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
