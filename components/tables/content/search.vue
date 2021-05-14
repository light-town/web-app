<template>
  <ui-grid direction="column" class="global-content-table">
    <search-params-parser :query="query">
      <template #default="{ items: rows, loading }">
        <search-content-table
          v-if="!loading"
          :rows="rows"
          @body-row-context-menu="handleRowContextMenu"
          @body-row-dbl-click="handleRowDblClick"
          @body-row-click="handleRowClick"
        />
        <slot v-else name="loading-table">
          <ui-grid align-items="center" justify="center" class="mt-8">
            <ui-loading :size="24"></ui-loading>
          </ui-grid>
        </slot>
      </template>
    </search-params-parser>
    <folder-context-menu
      v-if="activeRow"
      ref="folderContextMenu"
      :folder-uuid="activeRow.uuid"
      :vault-uuid="activeRow.vaultUuid"
    />
  </ui-grid>
</template>

<script>
import SearchContentTable from './search-table';
import UiGrid from '~/ui/grid/index.vue';
import UiLoading from '~/ui/loading/index.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import SearchParamsParser from '~/components/search-params-parser/index.vue';

export default {
  name: 'SearchTable',
  components: {
    UiGrid,
    UiLoading,
    FolderContextMenu,
    SearchContentTable,
    SearchParamsParser,
  },
  props: {
    query: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeRow: null,
    };
  },
  methods: {
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
