<template>
  <ui-grid component="li" class="ui-menu-separator">
    <span
      class="ui-menu-separator__marker"
      :style="{
        height: `${weight}px`,
      }"
    ></span>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiMenuSeparator',
  components: {
    UiGrid,
  },
  props: {
    weight: {
      type: Number,
      required: false,
      default: 1,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
