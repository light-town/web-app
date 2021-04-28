<template>
  <ui-grid direction="column" class="folder-content-table">
    <content-table
      :open="showTable"
      :rows="rows"
      @body-row-context-menu="handleRowContextMenu"
      @body-row-dbl-click="handleRowDblClick"
      @body-row-click="handleRowClick"
    ></content-table>
    <folder-context-menu
      v-if="activeRowUuid"
      ref="folderContextMenu"
      :folder-uuid="activeRowUuid"
    >
    </folder-context-menu>
    <slot v-if="isTableEmpty" name="empty-table">table is empty</slot>
    <slot v-if="loading" name="loading-table">
      <ui-grid align-items="center" justify="center">
        <ui-loading :size="24"></ui-loading>
      </ui-grid>
    </slot>
  </ui-grid>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ContentTable from './table';
import UiGrid from '~/ui/grid/index.vue';
import UiLoading from '~/ui/loading/index.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import DateFormater from '~/tools/date-formater';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'FolderContentTable',
  components: {
    UiGrid,
    UiLoading,
    FolderContextMenu,
    ContentTable,
  },
  data() {
    return {
      loading: false,
      activeRowUuid: null,
    };
  },
  computed: {
    ...mapState({
      folders: state => state['vault-folders'].all,
      items: state => state['vault-items'].all,
    }),
    ...mapGetters(['currentVault']),
    filteredFolders() {
      return Object.values(this.folders)
        .filter(f => !f.parentFolderUuid)
        .map(f => ({ ...f, isFolder: true }));
    },
    filteredItems() {
      return Object.values(this.items)
        .filter(f => !f.folderUuid)
        .map(f => ({ ...f, isItem: true }));
    },
    rows() {
      return [...this.filteredFolders, ...this.filteredItems].map(i => ({
        ...i,
        lastUpdatedAt: DateFormater.formatFromString(i.lastUpdatedAt),
        createdAt: DateFormater.formatFromString(i.createdAt),
        brClass:
          this.activeRowUuid === i.uuid
            ? 'folder-content-table__table-body-row_active'
            : '',
      }));
    },
    isTableEmpty() {
      return !this.rows.length && !this.loading;
    },
    showTable() {
      return !this.isTableEmpty && !this.loading;
    },
  },
  async created() {
    this.loading = true;

    await Promise.all([this.getRootVaultFolders(), this.getVaultItems()]);

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
      getVaultItems: vaultItemActionTypes.GET_VAULT_ITEMS,
    }),
    handleRowDblClick(_, item) {
      if (item.isFolder) {
        this.$router.push(
          `/vaults/${this.currentVault.uuid}/folders/${item.uuid}`
        );
      } else if (item.isItem) {
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
    handleRowClick(_, item) {
      this.activeRowUuid = item.uuid;
    },
    handleRowContextMenu(event, item) {
      this.activeRowUuid = item.uuid;

      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(event);
        this.$emit('contextmenu', event);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
