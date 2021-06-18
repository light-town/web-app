<template>
  <ui-grid align-items="center" justify="center" class="team-category__loading">
    <ui-loading :size="20" />
  </ui-grid>
</template>

<script>
import { UiGrid, UiLoading } from '@light-town/ui';

export default {
  name: 'TeamCategory',
  components: {
    UiGrid,
    UiLoading,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
