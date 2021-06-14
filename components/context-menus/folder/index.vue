<template>
  <ui-grid>
    <ui-context-menu
      ref="contextMenu"
      @close="$emit('close', $event)"
      @menu-item-click="handleItemClick"
    >
      <template #menu-items>
        <ui-menu-item id="create">
          <template #text> {{ $t('Create') }} </template>
          <template #submenu:items>
            <ui-menu-item id="create-folder">
              <template #text> {{ $t('Folder') }} </template>
            </ui-menu-item>
            <ui-menu-separator></ui-menu-separator>
            <ui-menu-title :text="$t('Categories')"></ui-menu-title>
            <ui-menu-item
              v-for="category in vaultCategories"
              :id="category.uuid"
              :key="category.uuid"
            >
              <template #text>
                {{
                  category.overview.default
                    ? $t(category.overview.name)
                    : category.overview.name
                }}
              </template>
            </ui-menu-item>
          </template>
        </ui-menu-item>
        <ui-menu-separator></ui-menu-separator>
        <ui-menu-item id="rename">
          <template #text> {{ $t('Rename') }} </template>
        </ui-menu-item>
        <ui-menu-separator></ui-menu-separator>
        <ui-menu-item id="detele-folder">
          <template #text> {{ $t('Delete') }} </template>
        </ui-menu-item>
      </template>
    </ui-context-menu>
    <new-vault-folder-modal
      :open="showNewVaultFolderModal"
      :folder-uuid="folderUuid"
      :vault-uuid="vaultUuid"
      @close="showNewVaultFolderModal = false"
    ></new-vault-folder-modal>
  </ui-grid>
</template>

<script>
import { mapState } from 'vuex';
import {
  UiGrid,
  UiContextMenu,
  UiMenuItem,
  UiMenuSeparator,
  UiMenuTitle,
} from '@light-town/ui';
import NewVaultFolderModal from '~/components/modals/new-vault-folder/index.vue';

export default {
  name: 'ContextMenu',
  components: {
    UiGrid,
    UiContextMenu,
    UiMenuItem,
    UiMenuSeparator,
    UiMenuTitle,
    NewVaultFolderModal,
  },
  props: {
    folderUuid: {
      type: String,
      required: false,
      default: null,
    },
    vaultUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showNewVaultFolderModal: false,
    };
  },
  computed: {
    /// getting THE vault categories
    ...mapState({
      vaultCategories: state => Object.values(state['vault-categories'].all),
    }),
  },
  methods: {
    handleItemClick({ id }) {
      if (id === 'create-folder') {
        this.showNewVaultFolderModal = true;
        return;
      }

      if (this.vaultCategories.find(c => c.uuid === id)) {
        this.$router.push(
          `/vaults/${this.currentVault.uuid}/folders/${this.folderUuid}/new-item?category-uuid=${id}`
        );
      }
    },
    open(e) {
      this.$refs.contextMenu.open(e);
    },
  },
};
</script>
