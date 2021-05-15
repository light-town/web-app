<template>
  <main-page-layout :title="currentVaultName" :loading="loading">
    <template #breadcrumbs>
      <p class="management-title">{{ $t('Vault') }}</p>
    </template>
    <template #nav>
      <account-navbar :show-tool-btns="true" />
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
import AccountNavbar from '~/components/navbars/account/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';

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
  created() {
    this.loading = true;

    Promise.all([
      this.getVault({ uuid: this.$route.params.vaultUuid }),
    ]).finally(() => {
      this.currentVaultName = this.currentVault.overview.name;
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getVault: vaultActionTypes.GET_VAULT,
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
