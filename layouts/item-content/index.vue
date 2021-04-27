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
import { mapGetters, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';
import FolderTreeView from '~/components/folders/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';

export default {
  name: 'ItemContentLayout',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Listbar,
    FolderTreeView,
  },
  computed: {
    ...mapGetters(['currentVault']),
  },
  async created() {
    await this.setCurrentVaultFolder({
      uuid: this.$route.params.vaultFolderUuid ?? null,
    });
    this.getVaultCategories();
  },
  methods: {
    ...mapActions({
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
      getVaultCategories: vaultCategoryActionTypes.GET_VAULT_CATEGORIES,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
