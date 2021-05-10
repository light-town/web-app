<template>
  <folder-content-layout>
    <client-only>
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
    </client-only>
  </folder-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import FolderContentLayout from '~/layouts/contents/folder.vue';
import FolderContentTable from '~/components/tables/content/folder.vue';
import FolderContentGrid from '~/components/grids/content/folders.vue';
import * as ContentViewWays from '~/store/config/content-view-ways';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'VaultFolderPage',
  components: {
    FolderContentTable,
    FolderContentLayout,
    FolderContentGrid,
  },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      loading: true,
      items: [],
    };
  },
  computed: {
    ...mapState({
      currentContentViewWay: state => state.config.contentViewWay,
      currentVaultUuid: state => state.vaults.currentVaultUuid,
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
      vaultFolders(state) {
        return Object.values(state['vault-folders'].all)
          .filter(
            f =>
              this.currentVaultUuid &&
              f.vaultUuid === this.currentVaultUuid &&
              this.currentVaultFolderUuid &&
              f.parentFolderUuid === this.currentVaultFolderUuid
          )
          .map(f => ({ ...f, isFolder: true }));
      },
      vaultItems(state) {
        return Object.values(state['vault-items'].all)
          .filter(
            i =>
              this.currentVaultUuid &&
              i.vaultUuid === this.currentVaultUuid &&
              this.currentVaultFolderUuid &&
              i.folderUuid === this.currentVaultFolderUuid
          )
          .map(i => ({ ...i, isItem: true }));
      },
    }),

    isTableContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.GRID;
    },
  },
  created() {
    this.setCurrentVaultFolder({
      uuid: this.$route.params.vaultFolderUuid ?? null,
    });

    Promise.all([
      this.getNestedVaultFolders({
        parentFolderUuid: this.currentVaultFolderUuid,
      }),
      this.getVaultItems({ folderUuid: this.currentVaultFolderUuid }),
    ]).finally(() => {
      this.loading = false;
      this.items = [...this.vaultFolders, ...this.vaultItems];
    });
  },
  methods: {
    ...mapActions({
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
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
