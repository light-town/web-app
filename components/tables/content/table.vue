<template>
  <ui-table
    v-if="show"
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
      <empty-folder-stub />
    </template>
  </ui-table>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiTable from '~/ui/table/index.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import KeyIcon from '~/assets/key.svg?inline';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';

export default {
  name: 'EntityContentTable',
  components: {
    UiGrid,
    UiTable,
    FolderIcon,
    KeyIcon,
    EmptyFolderStub,
  },
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
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
          bcClass: 'folder-content-table__table-body-cell-name',
          hcClass: 'folder-content-table__table-body-cell-name',
        },
        {
          key: 'desc',
          label: this.$t('Description'),
          bcClass: 'folder-content-table__table-body-cell-desc',
          hcClass: 'folder-content-table__table-body-cell-desc',
        },
        {
          key: 'lastUpdatedAt',
          label: this.$t('Last Updated'),
          bcClass: 'folder-content-table__table-body-cell-updated-at',
          hcClass: 'folder-content-table__table-body-cell-updated-at',
        },
        {
          key: 'createdAt',
          label: this.$t('Created'),
          bcClass: 'folder-content-table__table-body-cell-created-at',
          hcClass: 'folder-content-table__table-body-cell-created-at',
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
