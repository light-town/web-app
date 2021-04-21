<template>
  <ui-grid>
    <slot name="anchor" :open="handleOpen" :opened="Boolean(root)"></slot>
    <ui-popup
      :open="Boolean(root)"
      :anchor="{ root }"
      :x="x"
      :y="y"
      @close="handleClose"
    >
      <ui-menu :items="items">
        <template #menu-item-template="{ item }">
          <slot
            name="menu-item-template"
            :item="item"
            :anchor="anchor"
            :close="handleClose"
          ></slot>
        </template>
      </ui-menu>
    </ui-popup>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiPopup from '~/ui/popup/index.vue';
import UiMenu from '~/ui/menu/index.vue';

export default {
  name: 'UiContextMenu',
  components: {
    UiGrid,
    UiPopup,
    UiMenu,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    anchor: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return { x: 0, y: 0, root: null };
  },
  methods: {
    handleOpen(e) {
      this.x = e.pageX;
      this.y = e.pageY;
      this.root = e.target;
    },
    handleClose() {
      this.root = null;
    },
  },
};
</script>
