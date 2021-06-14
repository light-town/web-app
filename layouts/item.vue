<template>
  <main-page-layout :title="currentVaultItemName" :loading="loading">
    <template #breadcrumbs>
      <breadcrumbs />
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
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'ItemPageLayout',
  components: {
    UiGrid,
    Breadcrumbs,
    FolderTreeView,
    MainPageLayout,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return { currentVaultItemName: '', loading: false };
  },
  computed: {
    ...mapGetters(['currentVaultItem']),
  },
  created() {
    this.loading = true;

    Promise.all([
      this.getVault({ uuid: this.$route.params.vaultUuid }),
      this.getVaultFolder({
        uuid: this.$route.params.vaultFolderUuid,
      }),
      this.getVaultItem({
        uuid: this.$route.params.vaultItemUuid,
        folderUuid: this.$route.params.vaultFolderUuid,
      }),
    ]).then(() => {
      this.currentVaultItemName = this.currentVaultItem.overview.name;
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getVaultFolder: vaultFolderActionTypes.GET_VAULT_FOLDER,
      getVaultItem: vaultItemActionTypes.GET_VAULT_ITEM,
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
