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
            <ui-avatar
              :name="item.accountName"
              :alt="item.accountName"
              :size="32"
              class="ui-mr-8"
            />
            <p class="content-table__table-body-cell__title">
              {{ item.accountName }}
            </p>
          </ui-grid>
        </template>
        <template #cell(role_name)="{ item }">
          <ui-grid align-items="center">
            <p class="content-table__table-body-cell__title">
              {{ item.roleName }}
            </p>
          </ui-grid>
        </template>
        <template #cell(joined_at)="{ item }">
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
import { UiGrid, UiTable, UiAvatar } from '@light-town/ui';
import TableWrapper from './table.wrapper.vue';

export default {
  name: 'EntityContentTable',
  components: {
    UiGrid,
    UiTable,
    UiAvatar,
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
          key: 'role_name',
          label: this.$t('Role'),
          bcClass: 'content-table__table-body-cell-desc',
          hcClass: 'content-table__table-body-cell-desc',
        },
        {
          key: 'joined_at',
          label: this.$t('Joined at'),
          bcClass: 'content-table__table-body-cell-created-at',
          hcClass: 'content-table__table-body-cell-created-at',
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
