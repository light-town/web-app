<template>
  <main-page-layout :title="currentVaultFolderName">
    <template #breadcrumbs>
      <breadcrumbs class="-ml-2 mt-5" />
    </template>
    <template #main>
      <ui-grid class="h-full overflow-auto">
        <ui-grid direction="column" class="app-page__sidebar">
          <folder-tree-view />
        </ui-grid>
        <ui-grid direction="column" class="h-full overflow-auto">
          <slot></slot>
        </ui-grid>
      </ui-grid>
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MainPageLayout from './main.vue';
import UiGrid from '~/ui/grid/index.vue';
import FolderTreeView from '~/components/treeviews/folders/index.vue';
import Breadcrumbs from '~/components/breadcrumbs/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'FolderPageLayout',
  components: {
    UiGrid,
    Breadcrumbs,
    FolderTreeView,
    MainPageLayout,
  },
  computed: {
    ...mapGetters(['currentVaultFolder']),
    currentVaultFolderName() {
      return this.currentVaultFolder?.overview.name ?? '';
    },
  },
  created() {
    Promise.all([
      this.getVault({ uuid: this.$route.params.vaultUuid }),
      this.getVaultFolder({
        uuid: this.$route.params.vaultFolderUuid,
      }),
    ]);
  },
  methods: {
    ...mapActions({
      getVaultFolder: vaultFolderActionTypes.GET_VAULT_FOLDER,
      getVault: vaultActionTypes.GET_VAULT,
    }),
  },
};
</script>

<style lang="scss">
.app-page {
  &__sidebar {
    flex: 0 0 300px;

    height: 100%;

    padding: 0.625rem 0;
    padding-right: 40px;
  }
}
</style>
