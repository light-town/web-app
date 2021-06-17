<template>
  <search-table-template
    v-bind="$attrs"
    v-on="$listeners"
    @body-row-context-menu="handleRowContextMenu"
    @body-row-dbl-click="handleRowDblClick"
  />
</template>

<script>
import SearchTableTemplate from './templates/search-table.template.vue';

export default {
  name: 'SearchTable',
  components: {
    SearchTableTemplate,
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
    handleRowContextMenu(event) {
      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(event);
      });
    },
  },
};
</script>
