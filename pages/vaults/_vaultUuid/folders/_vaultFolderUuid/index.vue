<template>
  <folder-page-layout>
    <folder-content-table
      v-if="isTableContentViewWay"
      :items="items"
      :loading="loading"
      :vault-uuid="currentVaultUuid"
      :folder-uuid="currentVaultFolderUuid"
      @row-dbl-click="openItem"
    />
    <folder-content-grid
      v-else-if="isGridContentViewWay"
      :items="items"
      :loading="loading"
      @item-dbl-click="openItem"
    />
  </folder-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FolderPageLayout from '~/layouts/folder.vue';
import FolderContentTable from '~/components/tables/content/folder.vue';
import FolderContentGrid from '~/components/grids/content/folders.vue';
import * as ContentViewWays from '~/store/config/content-view-ways';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'VaultFolderPage',
  components: {
    FolderPageLayout,
    FolderContentTable,
    FolderContentGrid,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  computed: {
    ...mapState({
      vaultFolders: state => state['vault-folders'].all,
      vaultItems: state => state['vault-items'].all,
      currentContentViewWay: state => state.config.contentViewWay,
      currentVaultUuid: state => state.vaults.currentVaultUuid,
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
    }),
    formatedVaultFolders() {
      return Object.values(this.vaultFolders)
        .filter(
          f =>
            f.vaultUuid === this.currentVaultUuid &&
            f.parentFolderUuid === this.currentVaultFolderUuid
        )
        .map(f => ({ ...f, isFolder: true }));
    },
    formatedVaultItems() {
      return Object.values(this.vaultItems)
        .filter(
          i =>
            i.vaultUuid === this.currentVaultUuid &&
            i.folderUuid === this.currentVaultFolderUuid
        )
        .map(i => ({ ...i, isItem: true }));
    },
    isTableContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.GRID;
    },
  },
  watch: {
    vaultFolders() {
      this.items = [...this.formatedVaultFolders, ...this.formatedVaultItems];
    },
    vaultItems() {
      this.items = [...this.formatedVaultFolders, ...this.formatedVaultItems];
    },
  },
  created() {
    this.loading = true;

    Promise.all([
      this.getNestedVaultFolders({
        parentFolderUuid: this.currentVaultFolderUuid,
      }),
      this.getVaultItems({ folderUuid: this.currentVaultFolderUuid }),
    ]).finally(() => {
      this.items = [...this.formatedVaultFolders, ...this.formatedVaultItems];
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
      getVaultItems: vaultItemActionTypes.GET_VAULT_ITEMS,
    }),
    openItem(_, item) {
      if (item.isFolder) {
        this.$router.push(
          `/vaults/${this.currentVaultUuid}/folders/${item.uuid}`
        );
        return;
      }

      if (item.isItem) {
        if (item.folderUuid)
          this.$router.push(
            `/vaults/${this.currentVaultUuid}/folders/${item.folderUuid}/items/${item.uuid}`
          );
        else
          this.$router.push(
            `/vaults/${this.currentVaultUuid}/items/${item.uuid}`
          );
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
