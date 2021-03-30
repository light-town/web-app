<template>
  <ui-grid>
    <slot name="anchor" :selectedItem="value" :handle="handleBtnClick"></slot>
    <ui-popup
      :open="Boolean(anchor)"
      :anchor="{ root: anchor }"
      position="left-bottom"
      @close="handlePopupClose"
    >
      <slot name="items" :items="items" :handle="handleItemClick"></slot>
    </ui-popup>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiPopup from '~/ui/popup/index.vue';

export default {
  name: 'UiSelect',
  components: { UiGrid, UiPopup },
  props: {
    items: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return { anchor: null };
  },
  methods: {
    handleBtnClick(e) {
      this.anchor = e.currentTarget;
    },
    handlePopupClose() {
      this.anchor = null;
    },
    handleItemClick(item) {
      this.selected = item;
      this.anchor = null;

      this.$emit('input', this.selected);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
