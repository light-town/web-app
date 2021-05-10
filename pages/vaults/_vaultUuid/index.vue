<template>
  <vault-content-layout>
    <vault-content-table
      v-if="isTableContentViewWay"
      :items="items"
      :loading="loading"
      :vault-uuid="currentVaultUuid"
      @row-dbl-click="openItem"
    />
    <vault-content-grid
      v-else-if="isGridContentViewWay"
      :items="items"
      :loading="loading"
      @item-dbl-click="openItem"
    />
  </vault-content-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import VaultContentLayout from '~/layouts/contents/vault.vue';
import VaultContentTable from '~/components/tables/content/vault.vue';
import VaultContentGrid from '~/components/grids/content/folders.vue';
import * as ContentViewWays from '~/store/config/content-view-ways';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'VaultPage',
  components: {
    VaultContentLayout,
    VaultContentTable,
    VaultContentGrid,
  },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      currentContentViewWay: state => state.config.contentViewWay,
      currentVaultUuid: state => state.vaults.currentVaultUuid,
      vaultFolders(state) {
        return Object.values(state['vault-folders'].all)
          .filter(
            f => f.vaultUuid === this.currentVaultUuid && !f.parentFolderUuid
          )
          .map(f => ({ ...f, isFolder: true }));
      },
      vaultItems(state) {
        return Object.values(state['vault-items'].all)
          .filter(i => i.vaultUuid === this.currentVaultUuid && !i.folderUuid)
          .map(i => ({ ...i, isItem: true }));
      },
    }),
    ...mapGetters(['currentVault']),
    items() {
      return [...this.vaultFolders, ...this.vaultItems];
    },
    isTableContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.currentContentViewWay === ContentViewWays.GRID;
    },
  },
  created() {
    Promise.all([this.getRootVaultFolders(), this.getVaultItems()]).finally(
      () => (this.loading = false)
    );
  },
  methods: {
    ...mapActions({
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
      getVaultItems: vaultItemActionTypes.GET_VAULT_ITEMS,
    }),
    openItem(_, item) {
      if (item.isFolder) {
        this.$router.push(
          `/vaults/${this.currentVault.uuid}/folders/${item.uuid}`
        );
        return;
      }

      if (item.isItem) {
        if (item.folderUuid)
          this.$router.push(
            `/vaults/${this.currentVault.uuid}/folders/${item.folderUuid}/items/${item.uuid}`
          );
        else
          this.$router.push(
            `/vaults/${this.currentVault.uuid}/items/${item.uuid}`
          );
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
