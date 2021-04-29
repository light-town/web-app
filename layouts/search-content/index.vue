<template>
  <ui-grid class="main-layout">
    <sidebar></sidebar>
    <listbar>
      <template #menu>
        <folder-tree-view></folder-tree-view>
      </template>
    </listbar>
    <ui-grid direction="column">
      <appbar>
        <search-vault-content-by-tokens></search-vault-content-by-tokens>
      </appbar>
      <ui-grid direction="column" class="container-layout">
        <ui-grid class="search-content-layout">
          <slot></slot>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';
import FolderTreeView from '~/components/folders/index.vue';
import SearchVaultContentByTokens from '~/components/search-lines/vault-content/index.vue';

export default {
  name: 'SearchContentLayout',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Listbar,
    FolderTreeView,
    SearchVaultContentByTokens,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
