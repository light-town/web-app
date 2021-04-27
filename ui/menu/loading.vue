<template>
  <ui-grid component="li" class="ui-menu-loading" justify="center">
    <ui-loading></ui-loading>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiLoading from '~/ui/loading/index.vue';

export default {
  name: 'UiMenuSeparator',
  components: {
    UiGrid,
    UiLoading,
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
