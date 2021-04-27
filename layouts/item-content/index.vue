<template>
  <ui-grid class="main-layout">
    <sidebar></sidebar>
    <listbar>
      <template #title> {{ currentVault.overview.name }}</template>
      <template #menu>
        <folder-tree-view></folder-tree-view>
      </template>
    </listbar>
    <ui-grid direction="column">
      <appbar> </appbar>
      <ui-grid direction="column" class="container-layout item-content-layout">
        <slot></slot>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapGetters } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';
/* import FolderTreeView from '~/components/folders/index.vue'; */

export default {
  name: 'ItemContentLayout',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Listbar,
    /* FolderTreeView, */
  },
  computed: {
    ...mapGetters(['currentVault']),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
