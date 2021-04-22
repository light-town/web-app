<template>
  <ui-grid aligh-items="center" class="ui-dropdown">
    <slot name="anchor" :open="open" :opened="Boolean(anchor)">
      <ui-button variant="text" @click="open">{{ title }}</ui-button>
    </slot>
    <ui-popup
      :open="Boolean(anchor)"
      :anchor="{ root: anchor }"
      position="left-bottom"
      @close="handlePopupClose"
    >
      <ui-menu :items="items">
        <template #menu-item-template="{ item }">
          <slot name="dropdown-item-template" :item="item">
            <ui-menu-item @click="$emit('dropdown-item-click')">
              <template #text>
                <p>{{ item.name }}</p>
              </template>
            </ui-menu-item>
          </slot>
        </template>
      </ui-menu>
    </ui-popup>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiPopup from '~/ui/popup/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiMenu from '~/ui/menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';

export default {
  name: 'UiDropdown',
  components: {
    UiGrid,
    UiPopup,
    UiButton,
    UiMenu,
    UiMenuItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return { anchor: null };
  },
  methods: {
    open(e) {
      this.anchor = e.currentTarget ?? e.target;
    },
    handlePopupClose() {
      this.anchor = null;
    },
    handleItemClick() {
      this.anchor = null;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
