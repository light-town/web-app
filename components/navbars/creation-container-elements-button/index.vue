<template>
  <ui-grid>
    <ui-dropdown :loading="loading">
      <template #anchor="{ open }">
        <ui-button variant="outlined" class="new-element-button" @click="open">
          <add-icon class="new-element-button__icon" />
          <p class="new-element-button__text">{{ $t('New') }}</p>
        </ui-button>
      </template>
      <template #dropdown-items="{ close }">
        <ui-menu-item
          id="folder"
          @click="handleDropdownItemClick($event, { type: 'folder' }, close)"
        >
          <template #text>
            {{ $t('Folder') }}
          </template>
        </ui-menu-item>
        <ui-menu-separator v-if="categories.length" />
        <ui-menu-title v-if="categories.length" :text="$t('Categories')" />
        <template v-for="category in categories">
          <ui-menu-item
            :id="category.uuid"
            :key="category.uuid"
            @click="handleDropdownItemClick($event, category, close)"
          >
            <template #text>
              {{ $t(category.overview.name) }}
            </template>
          </ui-menu-item>
        </template>
      </template>
    </ui-dropdown>
    <new-vault-folder-modal
      v-if="currentVaultUuid"
      :open="showNewVaultFolderModal"
      :folder-uuid="currentVaultFolderUuid"
      :vault-uuid="currentVaultUuid"
      @close="showNewVaultFolderModal = false"
    />
    <new-vault-item-modal
      v-if="currentVaultCategoryUuid"
      :open="showNewVaultItemModal"
      :folder-uuid="currentVaultFolderUuid"
      :vault-uuid="currentVaultUuid"
      :category-uuid="currentVaultCategoryUuid"
      @close="showNewVaultItemModal = false"
    />
  </ui-grid>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
  UiGrid,
  UiButton,
  UiDropdown,
  UiMenuItem,
  UiMenuTitle,
  UiMenuSeparator,
} from '@light-town/ui';
import AddIcon from '~/assets/add.svg?inline';
import NewVaultFolderModal from '~/components/modals/new-vault-folder/index.vue';
import NewVaultItemModal from '~/components/modals/new-vault-item/index.vue';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';

export default {
  name: 'CreationContainerElementsButton',
  components: {
    UiGrid,
    UiButton,
    UiDropdown,
    UiMenuItem,
    UiMenuTitle,
    UiMenuSeparator,
    AddIcon,
    NewVaultFolderModal,
    NewVaultItemModal,
  },
  data() {
    return {
      showNewVaultFolderModal: false,
      showNewVaultItemModal: false,
      loading: false,
      currentVaultCategoryUuid: null,
    };
  },
  computed: {
    ...mapState({
      currentVaultUuid: state => state.vaults.currentVaultUuid,
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
      vaultCategories: state => state['vault-categories'].all,
    }),
    categories() {
      return Object.values(this.vaultCategories)
        .filter(c => c.vaultUuid === this.currentVaultUuid)
        .map(c => ({
          ...c,
          type: 'category',
        }));
    },
  },
  async created() {
    this.currentVaultCategoryUuid = null;
    this.loading = true;

    await this.getVaultCategories();

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getVaultCategories: vaultCategoryActionTypes.GET_VAULT_CATEGORIES,
    }),
    handleDropdownItemClick(e, item, close) {
      switch (item.type) {
        case 'folder': {
          this.showNewVaultFolderModal = true;
          break;
        }
        case 'category': {
          this.currentVaultCategoryUuid = item.uuid;
          this.showNewVaultItemModal = true;
          break;
        }
      }

      close(e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
