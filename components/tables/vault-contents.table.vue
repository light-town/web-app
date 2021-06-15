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
        <empty-vault-stub />
      </template>
    </default-table-template>
    <folder-context-menu
      ref="folderContextMenu"
      :folder-uuid="folderUuid"
      :vault-uuid="vaultUuid"
    />
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import DefaultTableTemplate from './templates/default-table.template.vue';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import EmptyVaultStub from '~/components/stubs/empty-vault/index.vue';

export default {
  name: 'VaultContentsTable',
  components: {
    UiGrid,
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
  computed: {
    folderUuid() {
      return this.activeRow?.uuid ?? null;
    },
  },
  methods: {
    async handleRowContextMenu(e) {
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();
      await this.$nextTick();

      if (!this.$refs.folderContextMenu) return;

      this.$refs.folderContextMenu.open(e);
    },
  },
};
</script>
