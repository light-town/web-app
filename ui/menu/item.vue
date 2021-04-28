<template>
  <ui-button
    component="li"
    variant="text"
    :class="['ui-menu-item', { 'ui-menu-item_active': active }]"
    @click.native="$emit('click', $event)"
    @mouseover.native="$emit('mouseover', $event)"
    @mouseenter.native="$emit('mouseenter', $event)"
    @mouseleave.native="$emit('mouseleave', $event)"
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
      <slot name="controls">
        <arrow-icon
          v-if="existsSubmenu"
          class="ui-menu-item__submenu-expand-icon"
        ></arrow-icon>
      </slot>
    </ui-grid>
    <ui-portal
      v-if="showSubmenus"
      :anchor="anchor"
      position="right-top"
      class="ui-menu-popup"
    >
      <ui-menu
        ref="submenu"
        :root-menu-ref="_menuContext.root"
        @menu-item-click="e => $emit('menu-item-click', e)"
      >
        <slot name="submenu:items"></slot>
      </ui-menu>
    </ui-portal>
  </ui-button>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiPortal from '~/ui/portal/index.vue';
import UiMenu from '~/ui/menu/index.vue';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'UiMenuItem',
  components: {
    UiGrid,
    UiButton,
    UiPortal,
    UiMenu,
    ArrowIcon,
  },
  activable: true,
  inject: ['_menuContext'],
  props: {
    id: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      anchor: { root: null },
    };
  },
  computed: {
    existsSubmenu() {
      return this.$slots['submenu:items']?.length > 0;
    },
    active() {
      return this._menuContext.activeItemId === this.id;
    },
    showSubmenus() {
      return (
        this.existsSubmenu &&
        this._menuContext.isAvailableShowing &&
        this.anchor.root &&
        this.active
      );
    },
  },
  mounted() {
    this.anchor = { root: this.$el };
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
