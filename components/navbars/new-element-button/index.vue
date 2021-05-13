<template>
  <ui-grid>
    <ui-dropdown>
      <template #anchor="{ open }">
        <ui-button variant="outlined" class="new-element-button" @click="open">
          <add-icon class="new-element-button__icon" />
          <p class="new-element-button__text">{{ $t('New') }}</p>
        </ui-button>
      </template>
      <template #dropdown-items="{ close }">
        <ui-menu-item
          id="folder"
          @click="handleDropdownItemClick($event, 'folder', close)"
        >
          <template #text>
            {{ $t('Folder') }}
          </template>
        </ui-menu-item>
        <ui-menu-separator />
        <ui-menu-title :text="$t('Categories')" />
      </template>
    </ui-dropdown>
    <new-vault-folder-modal
      v-if="vaultUuid"
      :open="showNewVaultFolderModal"
      :folder-uuid="vaultFolderUuid"
      :vault-uuid="vaultUuid"
      @close="showNewVaultFolderModal = false"
    />
  </ui-grid>
</template>
<script>
import { mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import UiMenuTitle from '~/ui/menu/title.vue';
import UiMenuSeparator from '~/ui/menu/separator.vue';
import AddIcon from '~/assets/add.svg?inline';
import NewVaultFolderModal from '~/components/modals/new-vault-folder/index.vue';

export default {
  name: 'NewElementButton',
  components: {
    UiGrid,
    UiButton,
    UiDropdown,
    UiMenuItem,
    UiMenuTitle,
    UiMenuSeparator,
    AddIcon,
    NewVaultFolderModal,
  },
  data() {
    return {
      showNewVaultFolderModal: false,
    };
  },
  computed: {
    ...mapState({
      vaultUuid: state => state.vaults.currentVaultUuid,
      vaultFolderUuid: state => state['vault-folders'].currentVaultFolderUuid,
    }),
  },
  methods: {
    handleDropdownItemClick(e, item, close) {
      if (item === 'folder') {
        this.showNewVaultFolderModal = true;
        close(e);
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
