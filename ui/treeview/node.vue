<template>
  <ui-button
    component="li"
    variant="text"
    :class="[
      'ui-tree-view__node',
      { 'ui-tree-view__node_active': active },
      { 'ui-tree-view__node_expanded': expanded },
      { 'ui-tree-view__node_hovered': hovered },
    ]"
    @click="$emit('click', $event)"
  >
    <ui-grid align-items="center" class="node__left">
      <slot name="icon" :node="node"></slot>
      <slot name="text" :node="node"></slot>
    </ui-grid>
    <ui-grid v-if="expandable" align-items="center" justify="flex-end">
      <ui-button
        variant="text"
        class="ui-tree-view__node__btn"
        @click.native.stop="$emit('expand', $event)"
      >
        <arrow-icon></arrow-icon>
      </ui-button>
    </ui-grid>
  </ui-button>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'UiTreeViewNode',
  components: {
    UiGrid,
    UiButton,
    ArrowIcon,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    expanded: {
      type: Boolean,
      required: false,
      default: false,
    },
    expandable: {
      type: Boolean,
      required: false,
      default: false,
    },
    hovered: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" src="./index.vue"></style>
