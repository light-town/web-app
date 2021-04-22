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
  computed: {
    ...mapState({
      folders: state => state['vault-folders'].all,
    }),
    ...mapGetters(['currentVaultFolder', 'currentVault']),
    nodes() {
      const vaultNode = {
        ...this.currentVault,
        vault: true,
        expanded: true,
      };
      const folderNodes = Object.values(this.folders).map(folder => ({
        ...folder,
        parentFolderUuid: folder.parentFolderUuid ?? vaultNode.uuid,
      }));

      return [vaultNode, ...folderNodes];
    },
  },
  watch: {
    nodes() {
      this.leadWay();
    },
    currentVaultFolder() {
      this.leadWay();
    },
  },
  created() {
    this.getRootVaultFolders();

    if (!this.$route.params.vaultFolderUuid) return;

    this.setCurrentVaultFolder({
      uuid: this.$route.params.vaultFolderUuid,
    });

    this.leadWay();
  },
  methods: {
    ...mapActions({
      getRootVaultFolders: vaultFolderActionTypes.GET_ROOT_VAULT_FOLDERS,
      getNestedVaultFolders: vaultFolderActionTypes.GET_NESTED_VAULT_FOLDERS,
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
      setExpandedVaultFolder: vaultFolderActionTypes.SET_EXPANDED_VAULT_FOLDER,
    }),
    async activeFolder(folder) {
      if (folder.vault) {
        await this.setCurrentVaultFolder({ uuid: null });
        this.$router.push(`/vaults/${folder.uuid}/`);
        return;
      }

      this.$router.push(
        `/vaults/${this.currentVault.uuid}/folders/${folder.uuid}`
      );
    },
    async expandFolderNode(folder) {
      const intex = this.nodes.indexOf(folder);
      const currentExpandState = !this.nodes[intex].expanded;

      if (folder.vault) this.nodes[intex].expanded = currentExpandState;
      else
        await this.setExpandedVaultFolder({
          uuid: folder.uuid,
          expanded: currentExpandState,
        });

      if (!currentExpandState) return;

      if (folder.vault) {
        this.getRootVaultFolders();
        return;
      }

      this.getNestedVaultFolders({
        parentFolderUuid: folder.uuid,
      });
    },
    leadWay() {
      let currentFolderUuid = this.currentVaultFolder?.parentFolderUuid;
      while (currentFolderUuid) {
        this.setExpandedVaultFolder({
          uuid: currentFolderUuid,
          expanded: true,
        });
        currentFolderUuid = this.folders[currentFolderUuid]?.parentFolderUuid;
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
