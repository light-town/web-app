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
          id="vault"
          @click="handleDropdownItemClick($event, close)"
        >
          <template #text>
            {{ $t('Vault') }}
          </template>
        </ui-menu-item>
      </template>
    </ui-dropdown>
    <new-vault-modal
      :open="showNewVaultModal"
      @close="showNewVaultModal = false"
    />
  </ui-grid>
</template>
<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiDropdown from '~/ui/dropdown/index.vue';
import UiMenuItem from '~/ui/menu/item.vue';
import AddIcon from '~/assets/add.svg?inline';
import NewVaultModal from '~/components/modals/new-vault/index.vue';

export default {
  name: 'CreationContainerElementsButton',
  components: {
    UiGrid,
    UiButton,
    UiDropdown,
    UiMenuItem,
    AddIcon,
    NewVaultModal,
  },
  data() {
    return {
      showNewVaultModal: false,
      loading: false,
    };
  },
  methods: {
    handleDropdownItemClick(e, close) {
      this.showNewVaultModal = true;
      close(e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
