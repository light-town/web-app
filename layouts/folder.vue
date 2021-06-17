<template>
  <main-page-layout :title="currentVaultFolderName" :loading="loading">
    <template #breadcrumbs>
      <breadcrumbs class="-ui-ml-2" />
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
import Breadcrumbs from '~/components/breadcrumbs/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'FolderPageLayout',
  components: {
    UiGrid,
    Breadcrumbs,
    FolderTreeView,
    MainPageLayout,
    AccountNavbar,
  },
  data() {
    return { loading: false };
  },
  computed: {
    ...mapGetters(['currentVaultFolder']),
    currentVaultFolderName() {
      return this.currentVaultFolder?.overview?.name;
    },
  },
  created() {
    if (this.currentVaultFolderName) return;

    this.loading = true;

    Promise.all([
      this.getVault({ uuid: this.$route.params.vaultUuid }),
      this.getVaultFolder({
        uuid: this.$route.params.vaultFolderUuid,
      }),
    ]).finally(() => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getVaultFolder: vaultFolderActionTypes.GET_VAULT_FOLDER,
      getVault: vaultActionTypes.GET_ACCOUNT_VAULT,
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
