<template>
  <client-only>
    <ui-grid class="test">
      <ui-menu>
        <ui-menu-item @click="handleItemClick('create-folder')">
          <template #text> Create folder </template>
        </ui-menu-item>
        <ui-menu-item>
          <template #text> Create item </template>
          <template #submenu-items>
            <ui-menu-item @click="handleItemClick('create-item-password')">
              <template #text> Password </template>
            </ui-menu-item>
            <ui-menu-item @click="handleItemClick('create-item-secure-notes')">
              <template #text> Secure Notes </template>
            </ui-menu-item>
            <ui-menu-item @click="handleItemClick('create-item-credit-cards')">
              <template #text> Credit Cards </template>
            </ui-menu-item>
          </template>
        </ui-menu-item>
        <ui-menu-separator></ui-menu-separator>
        <ui-menu-item @click="handleItemClick('rename-folder')">
          <template #text> Rename </template>
        </ui-menu-item>
        <ui-menu-separator></ui-menu-separator>
        <ui-menu-item @click="handleItemClick('detele-folder')">
          <template #text> Delete </template>
        </ui-menu-item>
      </ui-menu>
    </ui-grid>
  </client-only>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import UiGrid from '~/ui/grid/index.vue';
import UiMenu from '~/ui/menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuSeparator from '~/ui/menu/separator.vue';

export default {
  name: 'IndexPage',
  components: {
    UiGrid,
    UiMenu,
    UiMenuItem,
    UiMenuSeparator,
  },
  methods: {
    handleItemClick(e) {
      /* console.log(e); */
    },
  },
};
</script>

<style>
.test {
  width: auto;
  display: inline-flex;
  padding: 40px;
}
</style>
