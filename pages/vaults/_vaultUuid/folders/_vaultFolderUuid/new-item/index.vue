<template>
  <item-content-layout>
    <new-item-form
      v-if="!loading"
      v-model="itemFields"
      :schema="currentVaultCategory.details.schema"
      :item="item"
      mode="editing"
    ></new-item-form>
    <ui-grid align-items="center" justify="space-between">
      <ui-button variant="outlined">{{ $t('Cancel') }}</ui-button>
      <ui-button variant="contained" @click="saveItem">{{
        $t('Save')
      }}</ui-button>
    </ui-grid>
  </item-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import ItemContentLayout from '~/layouts/item-content/index.vue';
import NewItemForm from '~/components/forms/new-item/index.vue';
import * as vaultCategoryActionTypes from '~/store/vault-categories/types';

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
      itemFields: [],
      item: null,
    };
  },
  computed: {
    ...mapState({
      currentVaultCategory(state) {
        return state['vault-categories'].all[this.currentVaultCategoryUuid];
      },
    }),
    currentVaultCategoryUuid() {
      return this.$route.query['category-uuid'];
    },
  },
  created() {
    this.loading = true;
    this.getVaultCategory({ uuid: this.$route.query['category-uuid'] }).finally(
      () => (this.loading = false)
    );
  },
  methods: {
    ...mapActions({
      getVaultCategory: vaultCategoryActionTypes.GET_VAULT_CATEGORY,
    }),
    saveItem() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
