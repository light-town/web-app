<template>
  <item-page-layout :title="$t('New Item')">
    <ui-grid
      v-if="!loading"
      direction="column"
      class="h-full mb-5 overflow-auto"
    >
      <item-model
        v-model="item"
        :schema="schema"
        :item="item"
        mode="editing"
        class="ui-h-full ui-overflow-auto"
      />
      <ui-grid align-items="center" justify="space-between">
        <ui-button variant="outlined">{{ $t('Cancel') }}</ui-button>
        <ui-button variant="contained" :loading="saving" @click="saveItem">
          {{ $t('Save') }}
        </ui-button>
      </ui-grid>
    </ui-grid>
    <ui-grid v-else align-items="center" justify="center" class="mt-8">
      <ui-loading :size="24"></ui-loading>
    </ui-grid>
  </item-page-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { UiGrid, UiButton, UiLoading } from '@light-town/ui';
import ItemPageLayout from '~/layouts/item.vue';
import ItemModel from '~/components/forms/new-item/index.vue';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'NewItemPage',
  components: {
    UiGrid,
    UiButton,
    UiLoading,
    ItemPageLayout,
    ItemModel,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      saving: false,
      item: null,
    };
  },
  computed: {
    ...mapState({
      currentVaultUuid: state => state.vaults.currentVaultUuid,
      currentVaultCategory(state) {
        return state['vault-categories'].all[this.currentVaultCategoryUuid];
      },
    }),
    ...mapGetters(['currentVault', 'currentVaultFolder']),
    currentVaultCategoryUuid() {
      return this.$route.query['category-uuid'];
    },
    schema() {
      return this.currentVaultCategory.details.schema;
    },
  },
  async created() {
    this.loading = true;

    await this.getVault({ uuid: this.currentVaultUuid });

    await this.getVaultCategory({
      uuid: this.$route.query['category-uuid'],
    }).finally(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      getVault: vaultActionTypes.GET_ACCOUNT_VAULT,
      getVaultCategory: vaultCategoryActionTypes.GET_VAULT_CATEGORY,
      createVaultItem: vaultItemActionTypes.CREATE_VAULT_ITEM,
    }),
    async saveItem() {
      this.saving = true;

      await this.createVaultItem({
        folderUuid: this.currentVaultFolder?.uuid,
        categoryUuid: this.currentVaultCategoryUuid,
        overview: this.item.overview,
        details: this.item.details,
      });

      this.$router.push(
        `/vaults/${this.currentVault.uuid}/folders/${this.currentVaultFolder.uuid}`
      );

      this.saving = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
