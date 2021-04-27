<template>
  <item-content-layout>
    <new-item-form
      v-model="itemFields"
      :schema="schema"
      :item="item"
      mode="viewing"
    ></new-item-form>
    <ui-grid align-items="center" justify="space-between">
      <ui-button variant="outlined">{{ $t('Cancel') }}</ui-button>
      <ui-button variant="contained">{{ $t('Save') }}</ui-button>
    </ui-grid>
  </item-content-layout>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import ItemContentLayout from '~/layouts/item-content/index.vue';
import NewItemForm from '~/components/forms/new-item/index.vue';

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
      itemFields: [],
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
    };
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
