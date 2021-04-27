<template>
  <ui-grid direction="column" class="folder-content-table">
    <folder-context-menu v-if="showTable" :folder-uuid="activeRowUuid">
      <ui-table
        :fields="fields"
        :items="rows"
        br-class="folder-content-table__table-body-row"
        @body-row-context-menu="
          (event, item) => handleRowContextMenu(item, event)
        "
        @body-row-dbl-click="handleRowDblClick"
        @body-row-click="(_, item) => (activeRowUuid = item.uuid)"
      >
        <template #cell(name)="{ item }">
          <ui-grid align-items="center">
            <folder-icon
              class="folder-content-table__table-body-cell__icon"
            ></folder-icon>
            <p class="folder-content-table__table-body-cell__title">
              {{ item.overview.name }}
            </p>
          </ui-grid>
        </template>
        <template #cell(desc)="{ item }">
          <ui-grid align-items="center">
            <p class="folder-content-table__table-body-cell__title">
              {{ item.overview.desc }}
            </p>
          </ui-grid>
        </template>
        <template #cell(lastUpdatedAt)="{ item }">
          <ui-grid align-items="center">
            <p class="folder-content-table__table-body-cell__title">
              {{ item.lastUpdatedAt }}
            </p>
          </ui-grid>
        </template>
        <template #cell(createdAt)="{ item }">
          <ui-grid align-items="center">
            <p class="folder-content-table__table-body-cell__title">
              {{ item.createdAt }}
            </p>
          </ui-grid>
        </template>
      </ui-table>
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
import UiGrid from '~/ui/grid/index.vue';
import UiTable from '~/ui/table/index.vue';
import UiLoading from '~/ui/loading/index.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'FolderContentTable',
  components: {
    UiGrid,
    UiTable,
    UiLoading,
    FolderIcon,
    FolderContextMenu,
  },
  props: {
    folderUuid: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      fields: [
        {
          key: 'name',
          label: this.$t('Name'),
          thClass: 'folder-content-table__table-body-cell-name',
        },
        {
          key: 'desc',
          label: this.$t('Description'),
          thClass: 'folder-content-table__table-body-cell-desc',
        },
        {
          key: 'lastUpdatedAt',
          label: this.$t('Last Updated'),
          thClass: 'folder-content-table__table-body-cell-updated-at',
        },
        {
          key: 'createdAt',
          label: this.$t('Created'),
          thClass: 'folder-content-table__table-body-cell-created-at',
        },
      ],
      activeRowUuid: null,
    };
  },
  computed: {
    ...mapState({
      folders: state => state['vault-folders'].all,
      items: () => ({}),
    }),
    ...mapGetters(['currentVault', 'currentVaultFolder']),
    formatedFolders() {
      return Object.values(this.folders)
        .filter(f => f.parentFolderUuid === this.folderUuid)
        .map(f => ({
          ...f,
          lastUpdatedAt: this.formatDate(new Date(f.lastUpdatedAt)),
          createdAt: this.formatDate(new Date(f.createdAt)),
          isFolder: true,
          brClass:
            this.activeRowUuid === f.uuid
              ? 'folder-content-table__table-body-row_active'
              : '',
        }));
    },
    formatedItems() {
      return Object.values(this.items)
        .filter(f => f.folderUuid === this.folderUuid)
        .map(i => ({
          ...i,
          lastUpdatedAt: this.formatDate(new Date(i.lastUpdatedAt)),
          createdAt: this.formatDate(new Date(i.createdAt)),
          isItem: true,
          brClass:
            this.activeRowUuid === i.uuid
              ? 'folder-content-table__table-body-row_active'
              : '',
        }));
    },
    rows() {
      return [...this.formatedFolders, ...this.formatedItems];
    },
    isTableEmpty() {
      return !this.rows.length && !this.loading;
    },
    showTable() {
      return !this.isTableEmpty && !this.loading;
    },
  },
  created() {
    Promise.all([
      this.folderUuid
        ? this.getNestedVaultFolders({
            parentFolderUuid: this.folderUuid,
          })
        : this.getRootVaultFolders(),
    ]).finally(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
    }),
    formatDate(d) {
      const month = d.toLocaleString('default', {
        month: 'long',
      });
      return `${d.getDate()} ${month[0].toUpperCase()}${month.slice(
        1
      )} ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    },
    handleRowDblClick(_, item) {
      if (item.isFolder) {
        this.$router.push(
          `/vaults/${this.currentVault.uuid}/folders/${item.uuid}`
        );
        /* return; */
      }
    },
    handleRowContextMenu(item, event) {
      this.activeRowUuid = item.uuid;
      this.$emit('contextmenu', event);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
