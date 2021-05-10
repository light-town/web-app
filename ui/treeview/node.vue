<template>
  <ui-button
    component="li"
    variant="text"
    :class="[
      'ui-tree-view__node',
      { 'ui-tree-view__node_active': active },
      { 'ui-tree-view__node_expanded': expanded },
      { 'ui-tree-view__node_hovered': opened },
    ]"
    @click="$emit('click', $event)"
    @contextmenu.native="$emit('contextmenu', $event)"
  >
    <ui-grid align-items="center" class="ui-tree-view__node__left">
      <ui-button
        variant="text"
        class="ui-tree-view__node__btn"
        :class="{ 'ui-tree-view__node__btn_hidden': !expandable }"
        :disabled="!expandable"
        @click.native.stop="$emit('expand', $event)"
      >
        <arrow-icon class="ui-tree-view__node__btn__icon"></arrow-icon>
      </ui-button>
    </ui-grid>
    <ui-grid align-items="center">
      <slot name="icon" :node="node"></slot>
      <slot name="text" :node="node"></slot>
    </ui-grid>
  </ui-button>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import ArrowIcon from '~/assets/triangle.svg?inline';

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
  },
  data() {
    return {
      opened: false,
    };
  },
};
</script>

<style lang="scss" src="./index.vue"></style>
