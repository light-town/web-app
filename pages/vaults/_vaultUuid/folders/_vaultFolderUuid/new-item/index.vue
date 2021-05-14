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
        class="h-full overflow-auto"
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
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiLoading from '~/ui/loading/index.vue';
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
      /* item: {
        overview: {
          name: 'The name of a vault item',
          fields: [
            {
              id: '158dsf',
              position: 1,
              fieldName: 'Avatar',
              name: 'avatar',
              value: 'Google',
            },
            {
              id: '1s8dsf',
              position: 2,
              fieldName: 'Username',
              name: 'username',
              value: 'test username',
            },
            {
              id: '258dsf',
              position: 4,
              fieldName: 'Website URL',
              name: 'website',
              value: 'test website',
            },
          ],
        },
        details: {
          fields: [
            {
              id: '158d7f',
              position: 3,
              fieldName: 'Password',
              name: 'password',
              value: 'test password',
            },
          ],
        },
        lastUpdatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      schema: {
        fields: {
          Avatar: {
            name: 'Avatar',
            view: {
              element: 'avatar',
            },
            editor: {
              element: 'avatar',
            },
            position: 1,
            count: {
              max: 1,
              min: 1,
            },
            required: true,
            pinned: true,
            useInOverview: true,
          },
          Username: {
            name: 'Username',
            view: {
              element: 'text',
            },
            editor: {
              element: 'text',
            },
            position: 2,
            count: {
              max: 1,
              min: 1,
            },
            required: true,
            pinned: true,
            useInOverview: true,
          },
          Password: {
            name: 'Password',
            view: {
              element: 'password',
            },
            editor: {
              element: 'password',
            },
            position: 3,
            count: {
              max: 1,
              min: 1,
            },
            required: true,
            pinned: true,
            useInOverview: false,
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
            useInOverview: true,
          },
        },
      }, */
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
      getVault: vaultActionTypes.GET_VAULT,
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
