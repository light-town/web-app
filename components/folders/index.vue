<template>
  <ui-tree-view
    :nodes="nodes"
    unique-node-key="uuid"
    nested-node-key="parentFolderUuid"
  >
    <template #default="{ node: folder, nestedNodes }">
      <context-menu :anchor="folder.vault ? { uuid: null } : folder">
        <template #default="{ open, opened }">
          <ui-tree-view-node
            :node="folder"
            :active="
              (!currentVaultFolder && folder.vault) ||
              (currentVaultFolder && folder.uuid === currentVaultFolder.uuid)
            "
            :expanded="folder.expanded"
            :expandable="
              folder.containedFoldersCount > 0 ||
              (folder.vault && nestedNodes.length > 0)
            "
            :hovered="opened"
            @expand="expandFolderNode(folder)"
            @click="activeFolder(folder)"
            @contextmenu.native.prevent="open"
          >
            <template #icon>
              <ui-avatar
                v-if="folder.vault"
                :name="folder.overview.name"
                :size="24"
                class="treeview-vault__icon"
              ></ui-avatar>
              <folder-icon v-else class="treeview-folder__icon"></folder-icon>
            </template>
            <template #text>
              <p v-if="folder.vault" class="treeview-vault__text">
                {{ folder.overview.name }}
              </p>
              <p v-else class="treeview-folder__text">
                {{ folder.overview.name }}
              </p>
            </template>
          </ui-tree-view-node>
        </template>
      </context-menu>
    </template>
  </ui-tree-view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ContextMenu from './context-menu.vue';
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
    ContextMenu,
  },
  data() {
    return {
      nodes: [],
    };
  },
  computed: {
    ...mapState({
      folders: state => state['vault-folders'].all,
    }),
    ...mapGetters(['currentVaultFolder', 'currentVault']),
  },
  watch: {
    folders() {
      this.initNodes();
    },
  },
  created() {
    this.initNodes();
  },
  methods: {
    ...mapActions({
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
    }),
    activeFolder(folder) {
      if (folder.vault) return;

      this.$router.push(
        `/vaults/${this.currentVault.uuid}/folders/${folder.uuid}`
      );
    },
    expandFolderNode(folder) {
      const intex = this.nodes.indexOf(folder);
      this.nodes[intex].expanded = !this.nodes[intex].expanded;

      if (!this.nodes[intex].expanded) return;

      if (folder.vault) {
        this.getRootVaultFolders();
        return;
      }

      this.getNestedVaultFolders({
        parentFolderUuid: folder.uuid,
      });
    },
    initNodes() {
      const isExpanded = folder => {
        return this.nodes.find(f => f.uuid === folder.uuid)?.expanded;
      };

      const vaultNode = {
        ...this.currentVault,
        vault: true,
        expanded: !this.nodes.length ? true : isExpanded(this.currentVault),
      };
      const folderNodes = Object.values(this.folders).map(folder => ({
        ...folder,
        parentFolderUuid: folder.parentFolderUuid ?? vaultNode.uuid,
        expanded: isExpanded(folder),
      }));

      this.nodes = [vaultNode, ...folderNodes];
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
