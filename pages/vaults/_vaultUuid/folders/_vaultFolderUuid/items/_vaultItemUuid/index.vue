<template>
  <item-content-layout>
    <new-item-form
      v-if="!loading"
      v-model="item"
      :schema="currentVaultCategory.details.schema"
      :item="currentVaultItem"
      mode="viewing"
    ></new-item-form>
    <ui-grid
      align-items="center"
      justify="space-between"
      direction="row-reverse"
    >
      <ui-button variant="outlined" @click="editItem">
        {{ $t('Edit') }}
      </ui-button>
    </ui-grid>
  </item-content-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import ItemContentLayout from '~/layouts/contents/item.vue';
import NewItemForm from '~/components/forms/new-item/index.vue';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';

export default {
  name: 'NewItemPage',
  components: {
    UiGrid,
    UiButton,
    ItemContentLayout,
    NewItemForm,
  },
  middleware: ['auth'],
  data() {
    return {
      loading: false,
      item: null,
    };
  },
  computed: {
    ...mapGetters(['currentVault', 'currentVaultItem']),
    ...mapState({
      currentVaultCategory(state) {
        return state['vault-categories'].all[
          this.currentVaultItem?.categoryUuid
        ];
      },
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
    }),
  },
  async created() {
    this.loading = true;

    await this.setCurrentVaultItem({ uuid: this.$route.params.vaultItemUuid });
    await this.getVaultItem({
      uuid: this.$route.params.vaultItemUuid,
      folderUuid: this.currentVaultFolderUuid,
    });
    await this.getVaultCategory({ uuid: this.currentVaultItem.categoryUuid });

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getVaultCategory: vaultCategoryActionTypes.GET_VAULT_CATEGORY,
      getVaultItem: vaultItemActionTypes.GET_VAULT_ITEM,
      setCurrentVaultItem: vaultItemActionTypes.SET_CURRENT_VAULT_ITEM,
    }),
    editItem() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
