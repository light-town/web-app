<template>
  <item-page-layout>
    <ui-grid
      v-if="!loading && schema"
      direction="column"
      class="h-full mb-5 p-1"
    >
      <new-item-form
        v-model="item"
        :schema="schema"
        :item="currentVaultItem"
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
    <ui-grid v-else align-items="center" justify="center" class="mt-8">
      <ui-loading :size="24"></ui-loading>
    </ui-grid>
  </item-page-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiLoading from '~/ui/loading/index.vue';
import ItemPageLayout from '~/layouts/item.vue';
import NewItemForm from '~/components/forms/new-item/index.vue';
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
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
      currentVaultItemUuid: state => state['vault-items'].currentVaultItemUuid,
      currentVaultCategory(state) {
        return state['vault-categories'].all[
          this.currentVaultItem?.categoryUuid
        ];
      },
    }),
    schema() {
      return this.currentVaultCategory?.details.schema;
    },
  },
  async created() {
    this.loading = true;

    await this.getVault({ uuid: this.currentVaultUuid });

    await this.getVaultItem({
      uuid: this.currentVaultItemUuid,
      folderUuid: this.currentVaultFolderUuid,
    });

    await this.getVaultCategory({ uuid: this.currentVaultItem.categoryUuid });

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getVault: vaultActionTypes.GET_VAULT,
      getVaultCategory: vaultCategoryActionTypes.GET_VAULT_CATEGORY,
      getVaultItem: vaultItemActionTypes.GET_VAULT_ITEM,
    }),
    editItem() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
