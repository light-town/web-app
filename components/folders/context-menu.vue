<template>
  <ui-grid>
    <ui-context-menu
      @close="$emit('close', $event)"
      @menu-item-click="handleItemClick"
    >
      <slot></slot>
      <template #menu-items>
        <ui-menu-item id="create">
          <template #text> Create </template>
          <template #submenu:items>
            <ui-menu-item id="create-folder">
              <template #text> Folder </template>
            </ui-menu-item>
            <ui-menu-separator></ui-menu-separator>
            <ui-menu-item id="create-item">
              <template #text> Item </template>
              <template #submenu:items>
                <ui-menu-item id="create-item-password">
                  <template #text> Password </template>
                </ui-menu-item>
                <ui-menu-item id="create-item-secure-note">
                  <template #text> Secure Note </template>
                </ui-menu-item>
              </template>
            </ui-menu-item>
          </template>
        </ui-menu-item>
        <ui-menu-separator></ui-menu-separator>
        <ui-menu-item id="rename">
          <template #text> Rename </template>
        </ui-menu-item>
        <ui-menu-separator></ui-menu-separator>
        <ui-menu-item id="detele-folder">
          <template #text> Delete </template>
        </ui-menu-item>
      </template>
    </ui-context-menu>
    <new-vault-folder-modal
      :open="showNewVaultFolderModal"
      :folder-uuid="anchor.uuid"
      @close="showNewVaultFolderModal = false"
    ></new-vault-folder-modal>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiContextMenu from '~/ui/context-menu/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuSeparator from '~/ui/menu/separator.vue';
import NewVaultFolderModal from '~/components/modals/new-vault-folder/index.vue';

export default {
  name: 'ContextMenu',
  components: {
    UiGrid,
    UiContextMenu,
    UiMenuItem,
    UiMenuSeparator,
    NewVaultFolderModal,
  },
  props: {
    anchor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showNewVaultFolderModal: false,
    };
  },
  methods: {
    handleItemClick({ id }) {
      if (id === 'create-folder') this.showNewVaultFolderModal = true;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
