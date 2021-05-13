<template>
  <vault-page-layout>
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
  </vault-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VaultPageLayout from '~/layouts/vault.vue';
import VaultContentTable from '~/components/tables/content/vault.vue';
import VaultContentGrid from '~/components/grids/content/folders.vue';
import * as ContentViewWays from '~/store/config/content-view-ways';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'VaultPage',
  components: {
    VaultPageLayout,
    VaultContentTable,
    VaultContentGrid,
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
    }),
    formatedVaultFolders() {
      return Object.values(this.vaultFolders)
        .filter(
          f => f.vaultUuid === this.currentVaultUuid && !f.parentFolderUuid
        )
        .map(f => ({ ...f, isFolder: true }));
    },
    formatedVaultItems() {
      return Object.values(this.vaultItems)
        .filter(i => i.vaultUuid === this.currentVaultUuid && !i.folderUuid)
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

    Promise.all([this.getRootVaultFolders(), this.getVaultItems()]).finally(
      () => {
        this.items = [...this.formatedVaultFolders, ...this.formatedVaultItems];
        this.loading = false;
      }
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
