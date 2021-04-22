<template>
  <ui-grid class="folders-and-items-table">
    <folder-context-menu v-if="rows.length" :anchor="{ uuid: activeRawUuid }">
      <template #default="{ open }">
        <ui-table
          :fields="fields"
          :items="rows"
          br-class="folders-and-items-table__table-body-row"
          @body-raw-context-menu="
            (item, event) => {
              activeRawUuid = item.uuid;
              open(event);
            }
          "
          @body-raw-dbl-click="handleRawDblClick"
          @body-raw-click="item => (activeRawUuid = item.uuid)"
        >
          <template #cell(name)="{ item }">
            <ui-grid align-items="center">
              <folder-icon
                class="folders-and-items-table__table-body-cell__icon"
              ></folder-icon>
              <p class="folders-and-items-table__table-body-cell__title">
                {{ item.overview.name }}
              </p>
            </ui-grid>
          </template>
          <template #cell(desc)="{ item }">
            <ui-grid align-items="center">
              <p class="folders-and-items-table__table-body-cell__title">
                {{ item.overview.desc }}
              </p>
            </ui-grid>
          </template>
          <template #cell(lastUpdatedAt)="{ item }">
            <ui-grid align-items="center">
              <p class="folders-and-items-table__table-body-cell__title">
                {{ item.lastUpdatedAt }}
              </p>
            </ui-grid>
          </template>
          <template #cell(createdAt)="{ item }">
            <ui-grid align-items="center">
              <p class="folders-and-items-table__table-body-cell__title">
                {{ item.createdAt }}
              </p>
            </ui-grid>
          </template>
        </ui-table>
      </template>
    </folder-context-menu>
    <slot v-else name="empty-table"></slot>
  </ui-grid>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiTable from '~/ui/table/index.vue';
import FolderContextMenu from '~/components/folders/context-menu.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'FoldersAndItemsTable',
  components: {
    UiGrid,
    UiTable,
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
      fields: [
        {
          key: 'name',
          label: this.$t('Name'),
          thClass: 'folders-and-items-table__table-body-cell-name',
        },
        {
          key: 'desc',
          label: this.$t('Description'),
          thClass: 'folders-and-items-table__table-body-cell-desc',
        },
        {
          key: 'lastUpdatedAt',
          label: this.$t('Last Updated'),
          thClass: 'folders-and-items-table__table-body-cell-updated-at',
        },
        {
          key: 'createdAt',
          label: this.$t('Created'),
          thClass: 'folders-and-items-table__table-body-cell-created-at',
        },
      ],
      activeRawUuid: null,
    };
  },
  computed: {
    ...mapState({
      folders: state => state['vault-folders'].all,
      items: () => ({}),
    }),
    ...mapGetters(['currentVault', 'currentVaultFolder']),
    rows() {
      const folders = Object.values(this.folders)
        .filter(f => f.parentFolderUuid === this.folderUuid)
        .map(f => ({
          ...f,
          lastUpdatedAt: this.formatDate(new Date(f.lastUpdatedAt)),
          createdAt: this.formatDate(new Date(f.createdAt)),
          isFolder: true,
          brClass:
            this.activeRawUuid === f.uuid
              ? 'folders-and-items-table__table-body-row_active'
              : '',
        }));
      const items = Object.values(this.items).map(i => ({
        ...i,
        lastUpdatedAt: this.formatDate(new Date(i.lastUpdatedAt)),
        createdAt: this.formatDate(new Date(i.createdAt)),
        isItem: true,
        brClass:
          this.activeRawUuid === i.uuid
            ? 'folders-and-items-table__table-body-row_active'
            : '',
      }));
      return [...folders, ...items];
    },
  },
  watch: {
    folderUuid() {
      if (this.folderUuid)
        this.getNestedVaultFolders({
          parentFolderUuid: this.folderUuid,
        });
    },
  },
  created() {
    if (this.folderUuid)
      this.getNestedVaultFolders({
        parentFolderUuid: this.folderUuid,
      });
  },
  methods: {
    ...mapActions({
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
    }),
    formatDate(d) {
      const month = d.toLocaleString('default', {
        month: 'long',
      });
      return `${d.getDate()} ${month[0].toUpperCase()}${month.slice(
        1
      )} ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    },
    handleRawDblClick(item) {
      if (item.isFolder) {
        this.$router.push(
          `/vaults/${this.currentVault.uuid}/folders/${item.uuid}`
        );
        /* return; */
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
