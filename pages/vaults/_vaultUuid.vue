<template>
  <ui-grid class="main-layout">
    <sidebar></sidebar>
    <client-only>
      <listbar>
        <template #title> {{ currentVault.overview.name }}</template>
        <template #menu>
          <folder-tree-view></folder-tree-view>
        </template>
      </listbar>
    </client-only>
    <ui-grid direction="column">
      <appbar> </appbar>
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

export default {
  name: 'VaultPage',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Listbar,
    FolderTreeView,
  },
  middleware: ['auth'],
  computed: {
    ...mapGetters(['currentVault']),
  },
  created() {
    this.loadRootVaultFolders();
  },
  methods: {
    ...mapActions({
      loadRootVaultFolders: vaultFolderActionTypes.INIT,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
