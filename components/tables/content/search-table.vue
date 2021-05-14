<template>
  <ui-table
    :fields="fields"
    :items="rows"
    br-class="folder-content-table__table-body-row"
    @body-row-context-menu="handleRowContextMenu"
    @body-row-dbl-click="handleRowDblClick"
    @body-row-click="handleRowClick"
  >
    <template #cell(name)="{ item }">
      <ui-grid align-items="center">
        <folder-icon
          v-if="item.isFolder"
          class="folder-content-table__table-body-cell__icon"
        ></folder-icon>
        <key-icon
          v-else-if="item.isItem"
          class="folder-content-table__table-body-cell__icon"
        ></key-icon>
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
    <template #cell(location-folder)="{ item }">
      <ui-grid align-items="center">
        <p class="folder-content-table__table-body-cell__title">
          {{ item.folderName }}
        </p>
      </ui-grid>
    </template>
    <template #cell(vault)="{ item }">
      <ui-grid align-items="center">
        <p class="folder-content-table__table-body-cell__title">
          {{ item.vaultName }}
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
    <template #table-empty-template>
      <ui-grid
        direction="column"
        align-items="center"
        justify="center"
        class="folder-content-table__plug"
      >
        <search-empty-icon
          class="folder-content-table__plug__illustrate"
        ></search-empty-icon>
        <ui-grid
          direction="column"
          align-items="center"
          class="folder-content-table__plug__text"
        >
          <p class="folder-content-table__plug__title">
            {{ $t('Sorry, your filter produced no results') }}
          </p>
          <p class="folder-content-table__plug__desc">
            {{ $t('To widen your search, change or remove filters above') }}
          </p>
        </ui-grid>
      </ui-grid>
    </template>
  </ui-table>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiTable from '~/ui/table/index.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import KeyIcon from '~/assets/key.svg?inline';
import SearchEmptyIcon from '~/assets/search-empty.svg?inline';

export default {
  name: 'EntityContentTable',
  components: {
    UiGrid,
    UiTable,
    FolderIcon,
    KeyIcon,
    SearchEmptyIcon,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('Name'),
          hcClass: 'folder-content-table__table-body-cell-name',
          bcClass: 'folder-content-table__table-body-cell-name',
        },
        {
          key: 'desc',
          label: this.$t('Description'),
          hcClass: 'folder-content-table__table-body-cell-desc',
          bcClass: 'folder-content-table__table-body-cell-desc',
        },
        {
          key: 'location-folder',
          label: this.$t('Location Folder'),
          hcClass: 'folder-content-table__table-body-cell-location-folder',
          bcClass: 'folder-content-table__table-body-cell-location-folder',
        },
        {
          key: 'vault',
          label: this.$t('Vault'),
          hcClass: 'folder-content-table__table-body-cell-vault',
          bcClass: 'folder-content-table__table-body-cell-vault',
        },
        {
          key: 'lastUpdatedAt',
          label: this.$t('Last Updated'),
          hcClass: 'folder-content-table__table-body-cell-updated-at',
          bcClass: 'folder-content-table__table-body-cell-updated-at',
        },
        {
          key: 'createdAt',
          label: this.$t('Created'),
          hcClass: 'folder-content-table__table-body-cell-created-at',
          bcClass: 'folder-content-table__table-body-cell-created-at',
        },
      ],
    };
  },
  methods: {
    handleRowContextMenu(...args) {
      this.$emit('body-row-context-menu', ...args);
    },
    handleRowDblClick(...args) {
      this.$emit('body-row-dbl-click', ...args);
    },
    handleRowClick(...args) {
      this.$emit('body-row-click', ...args);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
