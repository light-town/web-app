<template>
  <ui-modal
    :open="open"
    :title="$t('Create Vault Item')"
    @close="handleCloseModal"
  >
    <ui-grid align-items="center" justify="center" class="new-vault-item-modal">
      <item-model
        v-if="!loading"
        v-model="item"
        :schema="schema"
        :item="item"
        mode="editing"
        class="ui-h-full ui-overflow-auto"
      />
      <ui-loading v-else :size="24" class="ui-mt-8"></ui-loading>
    </ui-grid>

    <template #footer>
      <ui-button variant="text" @click="handleCloseModal">
        {{ $t('Cancel') }}
      </ui-button>
      <ui-button variant="contained" :loading="saving" @click="createItem">
        {{ $t('Create') }}
      </ui-button>
    </template>
  </ui-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UiGrid, UiButton, UiModal, UiLoading } from '@light-town/ui';
import ItemModel from '~/components/forms/new-item/index.vue';
import * as vaultItemActionTypes from '~/store/vault-items/types';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';

export default {
  name: 'CreateVaultItemModal',
  components: {
    UiModal,
    UiGrid,
    UiButton,
    UiLoading,
    ItemModel,
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
    folderUuid: {
      type: String,
      required: false,
      default: null,
    },
    vaultUuid: {
      type: String,
      required: true,
    },
    categoryUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      saving: false,
      item: null,
    };
  },
  computed: {
    ...mapState({
      currentVaultCategory(state) {
        return state['vault-categories'].all[this.categoryUuid];
      },
    }),
    schema() {
      return this.currentVaultCategory?.details?.schema;
    },
  },
  async created() {
    this.loading = true;

    await this.getVaultCategory({
      uuid: this.categoryUuid,
    });

    this.loading = false;
  },
  methods: {
    ...mapActions({
      createVaultItem: vaultItemActionTypes.CREATE_VAULT_ITEM,
      getVaultCategory: vaultCategoryActionTypes.GET_VAULT_CATEGORY,
    }),
    handleCloseModal(e) {
      this.$emit('close', e);
    },
    async createItem(e) {
      this.saving = true;

      await this.createVaultItem({
        vaultUuid: this.vaultUuid,
        folderUuid: this.folderUuid,
        categoryUuid: this.categoryUuid,
        overview: this.item.overview,
        details: this.item.details,
      });

      this.saving = false;

      this.handleCloseModal(e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
