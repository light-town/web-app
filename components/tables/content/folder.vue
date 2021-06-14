<template>
  <ui-grid direction="column" class="folder-content-table">
    <default-content-table
      v-if="showTable"
      :rows="rows"
      @body-row-context-menu="handleRowContextMenu"
      @body-row-dbl-click="handleRowDblClick"
      @body-row-click="handleRowClick"
    />
    <folder-context-menu
      v-if="activeRowUuid"
      ref="folderContextMenu"
      :folder-uuid="activeRowUuid"
      :vault-uuid="vaultUuid"
    >
    </folder-context-menu>
    <slot v-if="loading" name="loading-table">
      <ui-grid align-items="center" justify="center" class="mt-8">
        <ui-loading :size="24"></ui-loading>
      </ui-grid>
    </slot>
  </ui-grid>
</template>

<script>
import { UiGrid, UiLoading } from '@light-town/ui';
import DefaultContentTable from './default-table';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import DateFormater from '~/tools/date-formater';

export default {
  name: 'FolderContentTable',
  components: {
    UiGrid,
    UiLoading,
    FolderContextMenu,
    DefaultContentTable,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    vaultUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeRowUuid: null,
    };
  },
  computed: {
    rows() {
      return this.items.map(i => ({
        ...i,
        lastUpdatedAt: DateFormater.formatFromString(i.lastUpdatedAt),
        createdAt: DateFormater.formatFromString(i.createdAt),
        brClass:
          this.activeRowUuid === i.uuid
            ? 'folder-content-table__table-body-row_active'
            : '',
      }));
    },
    showTable() {
      return !this.loading;
    },
  },
  methods: {
    handleRowDblClick(e, item) {
      this.$emit('row-dbl-click', e, item);
    },
    handleRowClick(e, item) {
      this.activeRowUuid = item.uuid;

      this.$emit('row-click', e, item);
    },
    handleRowContextMenu(e, item) {
      this.activeRowUuid = item.uuid;

      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(e);

        this.$emit('row-contextmenu', e, item);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
