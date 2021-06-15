<template>
  <table-wrapper v-bind="$attrs" v-on="$listeners">
    <template
      #table-template="{
        rows: items,
        handleRowContextMenu,
        handleRowDblClick,
        handleRowClick,
      }"
    >
      <ui-table
        :fields="fields"
        :items="items"
        br-class="content-table__table-body-row"
        @body-row-context-menu="handleRowContextMenu"
        @body-row-dbl-click="handleRowDblClick"
        @body-row-click="handleRowClick"
      >
        <template #cell(name)="{ item }">
          <ui-grid align-items="center">
            <folder-icon
              v-if="item.isFolder"
              class="content-table__table-body-cell__icon"
            />
            <key-icon
              v-else-if="item.isItem"
              class="content-table__table-body-cell__icon"
            />
            <p class="content-table__table-body-cell__title">
              {{ item.overview.name }}
            </p>
          </ui-grid>
        </template>
        <template #cell(desc)="{ item }">
          <ui-grid align-items="center">
            <p class="content-table__table-body-cell__title">
              {{ item.overview.desc }}
            </p>
          </ui-grid>
        </template>
        <template #cell(lastUpdatedAt)="{ item }">
          <ui-grid align-items="center">
            <p class="content-table__table-body-cell__title">
              {{ item.lastUpdatedAt }}
            </p>
          </ui-grid>
        </template>
        <template #cell(createdAt)="{ item }">
          <ui-grid align-items="center">
            <p class="content-table__table-body-cell__title">
              {{ item.createdAt }}
            </p>
          </ui-grid>
        </template>
      </ui-table>
    </template>
    <template #loading-table-template>
      <slot name="loading-table-template"></slot>
    </template>
    <template #empty-table-template>
      <slot name="empty-table-template"></slot>
    </template>
    <slot />
  </table-wrapper>
</template>

<script>
import { UiGrid, UiTable } from '@light-town/ui';
import TableWrapper from './table.wrapper.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import KeyIcon from '~/assets/key.svg?inline';

export default {
  name: 'EntityContentTable',
  components: {
    UiGrid,
    UiTable,
    FolderIcon,
    KeyIcon,
    TableWrapper,
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('Name'),
          bcClass: 'content-table__table-body-cell-name',
          hcClass: 'content-table__table-body-cell-name',
        },
        {
          key: 'desc',
          label: this.$t('Description'),
          bcClass: 'content-table__table-body-cell-desc',
          hcClass: 'content-table__table-body-cell-desc',
        },
        {
          key: 'lastUpdatedAt',
          label: this.$t('Last Updated'),
          bcClass: 'content-table__table-body-cell-updated-at',
          hcClass: 'content-table__table-body-cell-updated-at',
        },
        {
          key: 'createdAt',
          label: this.$t('Created'),
          bcClass: 'content-table__table-body-cell-created-at',
          hcClass: 'content-table__table-body-cell-created-at',
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
