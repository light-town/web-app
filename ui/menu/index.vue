<template>
  <ui-grid component="ul" direction="column" class="ui-menu">
    <template v-for="item in items">
      <slot name="menu-item-template" :item="item"> </slot>
    </template>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiMenu',
  components: {
    UiGrid,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
