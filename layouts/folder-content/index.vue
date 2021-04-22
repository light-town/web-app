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
      <ui-grid direction="column" class="container-layout">
        <ui-grid align-items="center" class="controls-layout">
          <breadcrumbs></breadcrumbs>
        </ui-grid>
        <ui-grid align-items="center" class="folder-content-layout">
          <slot></slot>
        </ui-grid>
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
import FolderTreeView from '~/components/folders/index.vue';
import Breadcrumbs from '~/components/breadcrumbs/index.vue';

export default {
  name: 'FolderContentLayout',
  components: {
    UiGrid,
    Breadcrumbs,
    Sidebar,
    Appbar,
    Listbar,
    FolderTreeView,
  },
  computed: {
    ...mapGetters(['currentVault', 'currentVaultFolder', 'pathToFolder']),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
