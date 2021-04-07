<template>
  <ui-grid align-items="center" justify="space-between" class="appbar">
    <ui-grid align-items="center">
      <slot></slot>
    </ui-grid>
    <ui-grid align-items="center" justify="flex-end">
      <account></account>
    </ui-grid>
  </ui-grid>
</template>

<script>
import Account from './account/index.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    Account,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
