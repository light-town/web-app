<template>
  <item-page-layout>
    <ui-grid
      v-if="!loading"
      direction="column"
      class="ui-h-full ui-mb-9 ui-p-1"
    >
      <new-item-form
        v-model="item"
        :schema="schema"
        :item="item"
        mode="viewing"
      />
      <ui-grid
        align-items="center"
        justify="space-between"
        direction="row-reverse"
      >
        <ui-button variant="outlined" @click="editItem">
          {{ $t('Edit') }}
        </ui-button>
      </ui-grid>
    </ui-grid>
    <ui-grid v-else align-items="center" justify="center" class="ui-mt-8">
      <ui-loading :size="24"></ui-loading>
    </ui-grid>
  </item-page-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { UiGrid, UiButton, UiLoading } from '@light-town/ui';
import ItemPageLayout from '~/layouts/item.vue';
import NewItemForm from '~/components/forms/new-item/index.vue';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'VaultItemPage',
  components: {
    UiGrid,
    UiButton,
    UiLoading,
    ItemPageLayout,
    NewItemForm,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      item: null,
    };
  },
  computed: {
    ...mapGetters(['currentVaultItem']),
    ...mapState({
      currentVaultUuid: state => state.vaults.currentVaultUuid,
      currentVaultItemUuid: state => state['vault-items'].currentVaultItemUuid,
      currentVaultCategory(state) {
        return state['vault-categories'].all[
          this.currentVaultItem?.categoryUuid
        ];
      },
    }),
  },
  async created() {
    this.loading = true;

    await this.getVaultItem({
      uuid: this.currentVaultItemUuid,
    });

    await this.getVaultCategory({ uuid: this.currentVaultItem.categoryUuid });

    this.item = this.currentVaultItem;
    this.schema = this.currentVaultCategory?.details.schema;

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getVaultCategory: vaultCategoryActionTypes.GET_VAULT_CATEGORY,
      getVaultItem: vaultItemActionTypes.GET_VAULT_ITEM,
    }),
    editItem() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
