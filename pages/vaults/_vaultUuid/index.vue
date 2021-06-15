<template>
  <vault-page-layout>
    <content-viewer>
      <template #table>
        <vault-contents-table
          :rows="items"
          :loading="loading"
          :vault-uuid="currentVaultUuid"
          @row-dbl-click="openItem"
        />
      </template>
      <template #grid>
        <vault-contents-grid
          :items="items"
          :loading="loading"
          @item-dbl-click="openItem"
        />
      </template>
    </content-viewer>
  </vault-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VaultPageLayout from '~/layouts/vault.vue';
import VaultContentsTable from '~/components/tables/vault-contents.table.vue';
import VaultContentsGrid from '~/components/grids/vault-contents.grid.vue';
import ContentViewer from '~/components/content-viewer/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'VaultPage',
  components: {
    VaultPageLayout,
    VaultContentsTable,
    VaultContentsGrid,
    ContentViewer,
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
  },
  watch: {
    vaultFolders() {
      this.items = [...this.formatedVaultFolders, ...this.formatedVaultItems];
    },
    vaultItems() {
      this.items = [...this.formatedVaultFolders, ...this.formatedVaultItems];
    },
  },
  mounted() {
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
