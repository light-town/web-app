<template>
  <main-page-layout :title="currentVaultName">
    <template #breadcrumbs>
      <p class="management-title">{{ $t('Vault') }}</p>
    </template>
    <template #nav>
      <account-navbar :show-tool-btns="true" />
    </template>
    <template #main>
      <ui-grid class="ui-h-full ui-overflow-auto">
        <ui-grid direction="column" class="app-page__sidebar">
          <folder-tree-view />
        </ui-grid>
        <ui-grid direction="column" class="ui-h-full ui-overflow-auto">
          <slot></slot>
        </ui-grid>
      </ui-grid>
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { UiGrid } from '@light-town/ui';
import MainPageLayout from './main/index.vue';
import FolderTreeView from '~/components/treeviews/folders/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';
import * as vaultFoldersActionTypes from '~/store/vault-folders/types';

export default {
  name: 'VaultPageLayout',
  components: {
    UiGrid,
    MainPageLayout,
    AccountNavbar,
    FolderTreeView,
  },
  data() {
    return { currentVaultName: '', loading: false };
  },
  computed: {
    ...mapGetters(['currentVault']),
  },
  async created() {
    this.setCurrentVaultFolderUuid({ uuid: null });
    this.currentVaultName = this.currentVault?.overview?.name ?? '';

    if (this.currentVaultName.length) return;

    await this.getVault({ uuid: this.$route.params.vaultUuid });

    this.currentVaultName = this.currentVault.overview.name;
  },
  methods: {
    ...mapActions({
      getVault: vaultActionTypes.GET_ACCOUNT_VAULT,
      setCurrentVaultFolderUuid:
        vaultFoldersActionTypes.SET_CURRENT_VAULT_FOLDER,
    }),
  },
};
</script>

<style lang="scss">
.app-page {
  &__sidebar {
    flex: 0 0 300px;

    overflow: auto;

    height: 100%;

    padding: 0.625rem 0;
    padding-right: 40px;
  }
}
</style>
