<template>
  <ui-grid>
    <ui-context-menu :items="items" @close="$emit('close', $event)">
      <template #anchor="{ open, opened }">
        <slot :open="open" :opened="opened"></slot>
      </template>
      <template #menu-item-template="{ item, close }">
        <ui-menu-item
          v-if="!item.separator"
          @click="handleItemClick(item.key, close)"
        >
          <template #text>
            <p>{{ item.name }}</p>
          </template>
        </ui-menu-item>
        <ui-menu-item-separator v-else></ui-menu-item-separator>
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
import UiMenuItemSeparator from '~/ui/menu/separator.vue';
import NewVaultFolderModal from '~/components/modals/new-vault-folder/index.vue';

export default {
  name: 'ContextMenu',
  components: {
    UiGrid,
    UiContextMenu,
    UiMenuItem,
    UiMenuItemSeparator,
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
      items: [
        { key: 'create-folder', name: this.$t('Create folder') },
        { separator: true },
        { key: 'rename', name: this.$t('Rename') },
        { key: 'change-color', name: this.$t('Сhange color') },
        { separator: true },
        { key: 'delete', name: this.$t('Detete') },
      ],
      showNewVaultFolderModal: false,
    };
  },
  methods: {
    handleItemClick(itemKey, closeFn) {
      if (itemKey === 'create-folder') this.showNewVaultFolderModal = true;
      closeFn();
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
