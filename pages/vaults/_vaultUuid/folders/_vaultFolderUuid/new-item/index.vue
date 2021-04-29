<template>
  <item-content-layout>
    <new-item-form
      v-if="!loading"
      v-model="item"
      :schema="currentVaultCategory.details.schema"
      mode="editing"
    ></new-item-form>
    <ui-grid align-items="center" justify="space-between">
      <ui-button variant="outlined">{{ $t('Cancel') }}</ui-button>
      <ui-button variant="contained" :loading="saving" @click="saveItem">
        {{ $t('Save') }}
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
      saving: false,
      item: null,
      /* currentVaultCategory: {
        details: {
          schema: {
            fields: {
              Password: {
                name: 'Password',
                view: {
                  element: 'password',
                },
                editor: {
                  element: 'password',
                },
                position: 2,
                count: {
                  max: 1,
                  min: 1,
                },
                required: true,
                pinned: true,
              },
              Username: {
                name: 'Username',
                view: {
                  element: 'text',
                },
                editor: {
                  element: 'text',
                },
                position: 1,
                count: {
                  max: 1,
                  min: 1,
                },
                required: true,
                pinned: true,
              },
              'Website URL': {
                name: 'Website URL',
                view: {
                  element: 'link',
                },
                editor: {
                  element: 'link',
                },
                required: false,
                pinned: false,
              },
            },
          },
        },
      }, */
    };
  },
  computed: {
    ...mapState({
      currentVaultCategory(state) {
        return state['vault-categories'].all[this.currentVaultCategoryUuid];
      },
    }),
    ...mapGetters(['currentVault', 'currentVaultFolder']),
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

  /*
  item: {
        overview: {
          name: 'The name of a vault item',
          desc: 'The desc of a vault item',
        },
        details: {
          fields: [
            {
              position: 1,
              fieldName: 'Username',
              name: 'username',
              value: 'test username',
            },
            {
              position: 2,
              fieldName: 'Password',
              name: 'password',
              value: 'test password',
            },
            {
              position: 3,
              fieldName: 'Website URL',
              name: 'website',
              value: 'test website',
            },
          ],
        },
        lastUpdatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
  
  */
};
</script>

<style lang="scss" src="./index.scss"></style>
