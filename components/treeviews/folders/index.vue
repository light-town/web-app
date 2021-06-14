<template>
  <ui-grid>
    <ui-tree-view
      :nodes="nodes"
      unique-node-key="uuid"
      nested-node-key="parentFolderUuid"
      class="folders-treeview"
    >
      <template #default="{ node }">
        <ui-tree-view-node
          :node="node"
          :active="isNodeActive(node)"
          :expanded="node.expanded"
          :expandable="node.containedFoldersCount > 0"
          :class="[
            'folders-treeview__node',
            {
              'folders-treeview__node_active':
                currentContextMenuNode &&
                currentContextMenuNode.uuid === node.uuid,
            },
          ]"
          @expand="expandFolderNode(node)"
          @click="activeFolderNode(node)"
          @contextmenu="e => openContextMenu(e, node)"
        >
          <template #icon>
            <folder-icon class="folders-treeview__node__folder-icon" />
          </template>
          <template #text>
            <p class="folders-treeview__node__folder-text">
              {{ node.overview.name }}
            </p>
          </template>
        </ui-tree-view-node>
        <folder-context-menu
          v-if="currentContextMenuNode"
          ref="folderContextMenu"
          :folder-uuid="currentContextMenuNode.uuid"
          :vault-uuid="currentContextMenuNode.vaultUuid"
        />
      </template>
    </ui-tree-view>
  </ui-grid>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { UiGrid, UiTreeView, UiTreeViewNode } from '@light-town/ui';
import FolderContextMenu from '~/components/context-menus/folder/index.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'FoldersTreeView',
  components: {
    UiGrid,
    UiTreeView,
    UiTreeViewNode,
    FolderContextMenu,
    FolderIcon,
  },
  data() {
    return {
      loading: true,
      currentContextMenuNode: null,
    };
  },
  computed: {
    ...mapState({
      folders: state => state['vault-folders'].all,
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
    }),
    ...mapGetters(['currentVault', 'pathToFolder']),
    nodes() {
      return Object.values(this.folders);
    },
  },
  created() {
    if (!this.currentVaultFolderUuid) {
      this.getRootVaultFolders().finally(() => (this.loading = false));
      return;
    }

    this.leadWay().finally(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
      setExpandedVaultFolder: vaultFolderActionTypes.SET_EXPANDED_VAULT_FOLDER,
      getVaultFolder: vaultFolderActionTypes.GET_VAULT_FOLDER,
    }),
    activeFolderNode(node) {
      this.$router.push(
        `/vaults/${this.currentVault.uuid}/folders/${node.uuid}`
      );
    },
    async expandFolderNode(node) {
      const currentExpandState = !node.expanded;

      await this.setExpandedVaultFolder({
        uuid: node.uuid,
        expanded: currentExpandState,
      });

      if (!currentExpandState) return;

      await this.getNestedVaultFolders({
        parentFolderUuid: node.uuid,
      });
    },
    async leadWay() {
      let currentVaultFolderUuid = this.currentVaultFolderUuid;

      while (currentVaultFolderUuid) {
        await this.getVaultFolder({ uuid: currentVaultFolderUuid });
        currentVaultFolderUuid = this.folders[currentVaultFolderUuid]
          ?.parentFolderUuid;
      }

      const folders = this.pathToFolder(this.currentVaultFolderUuid);
      folders.pop(); /// detete current folder

      for (const folder of folders) {
        await this.setExpandedVaultFolder({
          uuid: folder?.uuid,
          expanded: true,
        });
      }
    },
    isNodeActive(node) {
      return node.uuid === this.currentVaultFolderUuid;
    },
    openContextMenu(e, node) {
      this.currentContextMenuNode = node;

      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(e);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
