<template>
  <default-table-template
    v-model="activeRow"
    :rows="rows"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
    @row-context-menu="handleRowContextMenu"
  >
    <folder-context-menu
      v-if="activeRow"
      ref="folderContextMenu"
      :folder-uuid="activeRow.uuid"
      :vault-uuid="vaultUuid"
    />
    <template #empty-table-template>
      <empty-vault-stub />
    </template>
  </default-table-template>
</template>

<script>
import DefaultTableTemplate from './templates/default-table.template.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import EmptyVaultStub from '~/components/stubs/empty-vault/index.vue';

export default {
  name: 'VaultContentsTable',
  components: {
    FolderContextMenu,
    DefaultTableTemplate,
    EmptyVaultStub,
  },
  props: {
    rows: {
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
      activeRow: null,
    };
  },
  methods: {
    handleRowContextMenu(e) {
      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(e);
      });
    },
  },
};
</script>
