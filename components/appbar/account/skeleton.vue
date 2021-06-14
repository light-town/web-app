<template>
  <ui-grid align-items="center" class="appbar__account">
    <ui-skeleton width="44px" height="44px"></ui-skeleton>
  </ui-grid>
</template>

<script>
import { UiGrid, UiSkeleton } from '@light-town/ui';

export default {
  name: 'Account',
  components: {
    UiGrid,
    UiSkeleton,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
