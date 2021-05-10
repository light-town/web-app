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
        <tools-bar>
          <breadcrumbs></breadcrumbs>
        </tools-bar>
        <ui-grid class="folder-content-layout">
          <slot></slot>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';
import FolderTreeView from '~/components/treeviews/folders/index.vue';
import Breadcrumbs from '~/components/breadcrumbs/index.vue';
import SearchVaultContentByTokens from '~/components/search-lines/vault-content/index.vue';
import ToolsBar from '~/components/tools-bar/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'VaultContentLayout',
  components: {
    UiGrid,
    Breadcrumbs,
    Sidebar,
    Appbar,
    Listbar,
    ToolsBar,
    FolderTreeView,
    SearchVaultContentByTokens,
  },
  created() {
    this.setCurrentVaultFolder({
      uuid: null,
    });
  },
  methods: {
    ...mapActions({
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
