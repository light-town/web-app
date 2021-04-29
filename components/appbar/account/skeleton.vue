<template>
  <ui-grid align-items="center" class="appbar__account">
    <ui-skeleton width="44px" height="44px"></ui-skeleton>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiSkeleton from '~/ui/skeleton/index.vue';

export default {
  name: 'Account',
  components: {
    UiGrid,
    UiSkeleton,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
