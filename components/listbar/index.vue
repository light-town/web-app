<template>
  <ui-grid direction="column" class="listbar">
    <p class="listbar__title"><slot name="title"></slot></p>
    <span class="listbar__separator"></span>
    <ui-grid direction="column" class="listbar__menu">
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
