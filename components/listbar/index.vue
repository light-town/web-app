<template>
  <ui-grid direction="column" class="listbar">
    <ui-grid class="listbar__header">
      <slot name="header"></slot>
      <!--  <p class="listbar__title"></p> -->
    </ui-grid>
    <span class="listbar__separator"></span>
    <ui-grid direction="column" class="listbar__body">
      <slot name="menu"></slot>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'Listbar',
  components: {
    UiGrid,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
