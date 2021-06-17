<template>
  <ui-grid>
    <default-table-template
      v-model="activeRow"
      :rows="rows"
      :loading="loading"
      v-bind="$attrs"
      v-on="$listeners"
      @row-context-menu="handleRowContextMenu"
    >
      <template #empty-table-template>
        <empty-folder-stub />
      </template>
    </default-table-template>
    <folder-context-menu
      v-if="activeRow && activeRow.isFolder"
      ref="folderContextMenu"
      :folder-uuid="activeRow.uuid"
      :vault-uuid="vaultUuid"
    />
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import DefaultTableTemplate from './templates/default-table.template.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';

export default {
  name: 'FolderContentsTable',
  components: {
    UiGrid,
    FolderContextMenu,
    DefaultTableTemplate,
    EmptyFolderStub,
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
    async handleRowContextMenu(e) {
      await this.$nextTick();

      this.$refs.folderContextMenu.open(e);
    },
  },
};
</script>
