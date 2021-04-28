<template>
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
          { 'folders-treeview__node_active': nodeContextMenu === node.uuid },
        ]"
        @expand="expandFolderNode(node)"
        @click="activeFolderNode(node)"
        @contextmenu="e => openContextMenu(e, node)"
      >
        <template #icon>
          <ui-avatar
            v-if="node.isVault"
            :name="node.overview.name"
            :size="24"
            class="folders-treeview__node__vault-icon"
          ></ui-avatar>
          <folder-icon
            v-else
            class="folders-treeview__node__folder-icon"
          ></folder-icon>
        </template>
        <template #text>
          <p v-if="node.isVault" class="folders-treeview__node__vault-text">
            {{ node.overview.name }}
          </p>
          <p v-else class="folders-treeview__node__folder-text">
            {{ node.overview.name }}
          </p>
        </template>
      </ui-tree-view-node>
      <folder-context-menu
        v-if="nodeContextMenu"
        ref="folderContextMenu"
        :folder-uuid="nodeContextMenu"
      >
      </folder-context-menu>
    </template>
  </ui-tree-view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import FolderContextMenu from '../context-menus/folder/index.vue';
import UiTreeView from '~/ui/treeview/index.vue';
import UiTreeViewNode from '~/ui/treeview/node.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import FolderIcon from '~/assets/folder.svg?inline';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'FoldersTreeView',
  components: {
    UiTreeView,
    UiTreeViewNode,
    UiAvatar,
    FolderIcon,
    FolderContextMenu,
  },
  data() {
    return {
      loading: false,
      vaultNodeExpanded: true,
      nodeContextMenu: null,
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
      const vaultNode = {
        ...this.currentVault,
        expanded: this.vaultNodeExpanded,
        isVault: true,
      };
      const folderNodes = Object.values(this.folders).map(folder => ({
        ...folder,
        parentFolderUuid: folder.parentFolderUuid ?? vaultNode.uuid,
        isFolder: true,
      }));

      return [vaultNode, ...folderNodes];
    },
  },
  watch: {
    currentVaultFolderUuid() {
      this.leadWay();
    },
  },
  async created() {
    this.loading = true;

    if (!this.currentVaultFolderUuid) await this.getRootVaultFolders();

    await this.leadWay();

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
      setExpandedVaultFolder: vaultFolderActionTypes.SET_EXPANDED_VAULT_FOLDER,
    }),
    async activeFolderNode(node) {
      if (node.isVault) {
        await this.setCurrentVaultFolder({ uuid: null });

        this.$router.push(`/vaults/${node.uuid}/`);
        return;
      }

      await this.setCurrentVaultFolder({ uuid: node.uuid });

      this.$router.push(
        `/vaults/${this.currentVault.uuid}/folders/${node.uuid}`
      );
    },
    async expandFolderNode(node) {
      const currentExpandState = !node.expanded;

      if (node.isVault) this.vaultNodeExpanded = currentExpandState;
      else
        await this.setExpandedVaultFolder({
          uuid: node.uuid,
          expanded: currentExpandState,
        });

      if (!currentExpandState) return;

      if (node.isVault) {
        this.getRootVaultFolders();
        return;
      }

      this.getNestedVaultFolders({
        parentFolderUuid: node.uuid,
      });
    },
    async leadWay() {
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
      return (
        (!this.currentVaultFolderUuid && node.isVault) ||
        node.uuid === this.currentVaultFolderUuid
      );
    },
    openContextMenu(e, node) {
      if (node.isVault) return;

      this.nodeContextMenu = node.uuid;
      this.$nextTick(() => {
        this.$refs.folderContextMenu.open(e);
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
