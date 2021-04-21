<template>
  <ui-button
    component="li"
    variant="text"
    class="ui-menu-item"
    @click.native.stop="$emit('click', $event)"
  >
    <ui-grid align-items="center" class="ui-menu-item__left">
      <slot name="icon"></slot>
      <slot name="text"></slot>
    </ui-grid>
    <ui-grid
      align-items="center"
      justify="flex-end"
      class="ui-menu-item__right"
    >
      <slot name="controls"></slot>
    </ui-grid>
  </ui-button>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';

export default {
  name: 'UiMenuItem',
  components: {
    UiGrid,
    UiButton,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
