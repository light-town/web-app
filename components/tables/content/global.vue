<template>
  <ui-grid direction="column" class="global-content-table">
    <content-table
      v-if="showTable"
      :rows="rows"
      @body-row-context-menu="handleRowContextMenu"
      @body-row-dbl-click="handleRowDblClick"
      @body-row-click="handleRowClick"
    ></content-table>
    <folder-context-menu
      v-if="activeRow"
      ref="folderContextMenu"
      :folder-uuid="activeRow.uuid"
      :vault-uuid="activeRow.vaultUuid"
    >
    </folder-context-menu>
    <slot v-if="loading" name="loading-table">
      <ui-grid align-items="center" justify="center">
        <ui-loading :size="32"></ui-loading>
      </ui-grid>
    </slot>
  </ui-grid>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import core from '@light-town/core';
import ContentTable from './global-table';
import UiGrid from '~/ui/grid/index.vue';
import UiLoading from '~/ui/loading/index.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import DateFormater from '~/tools/date-formater';

const EQUAL = 'equal';
const NOT_EQUAL = 'not';

const VAULT_NAME_CRITERIA = 'vault-name';
const FOLDER_NAME_CRITERIA = 'folder-name';
const ITEM_NAME_CRITERIA = 'item-name';

export default {
  name: 'GlobalContentTable',
  components: {
    UiGrid,
    UiLoading,
    FolderContextMenu,
    ContentTable,
  },
  props: {
    query: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      activeRow: null,
      folders: [],
      items: [],
    };
  },
  computed: {
    ...mapGetters(['currentAccount']),
    ...mapState({
      muk: state => state['key-sets'].masterUnlockKey,
    }),
    filteredFolders() {
      return this.folders.map(f => ({ ...f, isFolder: true }));
    },
    filteredItems() {
      return this.items.map(i => ({ ...i, isItem: true }));
    },
    rows() {
      return [...this.filteredFolders, ...this.filteredItems].map(i => ({
        ...i,
        lastUpdatedAt: DateFormater.formatFromString(i.lastUpdatedAt),
        createdAt: DateFormater.formatFromString(i.createdAt),
        brClass:
          this.activeRow?.uuid === i.uuid
            ? 'folder-content-table__table-body-row_active'
            : '',
      }));
    },
    showTable() {
      return !this.loading;
    },
    parsedQuery() {
      const regex = /^(\w+)\[([a-zA-Z0-9\- ]+)\]$/u;
      return Object.entries(this.query)
        .map(([queryName, value]) => {
          const matches = queryName.match(regex);

          if (!matches || matches.length !== 3) {
            console.error('invalud key search');
            return {};
          }

          // eslint-disable-next-line no-unused-vars
          const [_, op, criteria] = matches;

          return {
            criteria,
            op,
            value,
          };
        })
        .reduce((prev, val) => ({ ...prev, [val?.criteria]: val }), {});
    },
  },
  watch: {
    query() {
      this.computeResult();
    },
  },
  created() {
    this.computeResult();
  },
  methods: {
    async computeResult() {
      this.loading = true;

      const [
        { data: encKeySets },
        { data: encVaults },
        { data: encVaultFolders },
        { data: encVaultItems },
      ] = await Promise.all([
        this.$api.keySets.getKeySets(this.currentAccount.uuid),
        this.$api.vaults.getVaults(),
        this.$api.vaultFolders.getFolders(),
        this.$api.vaultItems.getItems({
          onlyOverview: true,
        }),
      ]);

      const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
        encKeySets.find(k => k.isPrimary),
        this.muk
      );

      const vaults = (
        await Promise.all(
          encVaults
            .filter(v => v.keySetUuid === primaryKeySet.uuid)
            .map(v =>
              core.helpers.vaults.decryptVaultByPrivateKeyHelper(
                v,
                primaryKeySet.privateKey
              )
            )
        )
      ).filter(
        v =>
          !this.parsedQuery[VAULT_NAME_CRITERIA] ||
          this.compareBy(
            v.overview.name,
            this.parsedQuery[VAULT_NAME_CRITERIA].op,
            this.parsedQuery[VAULT_NAME_CRITERIA].value
          )
      );

      const allFolders = (
        await Promise.all(
          vaults.map(v =>
            core.helpers.vaultFolders.decryptVaultFoldersHelper(
              encVaultFolders
                .filter(f => v.uuid === f.vaultUuid)
                .map(f => ({ ...f, vaultName: v.overview.name })),
              v.key
            )
          )
        )
      ).reduce((prev, val) => [...prev, ...val], []);

      const folders = allFolders
        .filter(
          f =>
            !this.parsedQuery[FOLDER_NAME_CRITERIA] ||
            this.compareBy(
              f.overview.name,
              this.parsedQuery[FOLDER_NAME_CRITERIA].op,
              this.parsedQuery[FOLDER_NAME_CRITERIA].value
            )
        )
        .map(f => ({
          ...f,
          folderName:
            allFolders.find(af => af.uuid === f.parentFolderUuid)?.overview
              .name ?? '',
        }));

      const allItems = (
        await Promise.all(
          vaults.map(v =>
            core.helpers.vaultItems.decryptVaultItemsHelper(
              encVaultItems
                .filter(
                  i =>
                    v.uuid === i.vaultUuid &&
                    ((i.folderUuid &&
                      folders.find(f => f.uuid === i.folderUuid)) ||
                      !this.parsedQuery[FOLDER_NAME_CRITERIA])
                )
                .map(i => ({ ...i, vaultName: v.overview.name })),
              v.key
            )
          )
        )
      ).reduce((prev, val) => [...prev, ...val], []);

      const items = allItems
        .filter(
          i =>
            !this.parsedQuery[ITEM_NAME_CRITERIA] ||
            this.compareBy(
              i.overview.name,
              this.parsedQuery[ITEM_NAME_CRITERIA].op,
              this.parsedQuery[ITEM_NAME_CRITERIA].value
            )
        )
        .map(f => ({
          ...f,
          folderName:
            allFolders.find(af => af.uuid === f.folderUuid)?.overview.name ??
            '',
        }));

      this.folders = !this.parsedQuery[ITEM_NAME_CRITERIA] ? folders : [];
      this.items = items;
      this.loading = false;
    },
    compareBy(value, op, needs) {
      const regexResult = new RegExp(`^${needs.toLowerCase()}`).test(
        value.toLowerCase()
      );

      return (
        (op === EQUAL && regexResult) || (op === NOT_EQUAL && !regexResult)
      );
    },
    handleRowDblClick(_, item) {
      if (item.isFolder) {
        this.$router.push(`/vaults/${item.vaultUuid}/folders/${item.uuid}`);
      } else if (item.isItem) {
        if (item.folderUuid)
          this.$router.push(
            `/vaults/${item.vaultUuid}/folders/${item.folderUuid}/items/${item.uuid}`
          );
        else this.$router.push(`/vaults/${item.vaultUuid}/items/${item.uuid}`);
      }
    },
    handleRowClick(_, item) {
      this.activeRow = item;
    },
    handleRowContextMenu(event, item) {
      this.activeRow = item;

      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(event);
        this.$emit('contextmenu', event);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
