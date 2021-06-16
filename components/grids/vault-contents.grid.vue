<template>
  <grid-template :items="items" :loading="loading">
    <template #item-template="{ item, selected, select }">
      <folder-card
        v-if="item.isFolder"
        :key="item.uuid"
        :name="item.overview.name"
        :desc="item.overview.desc"
        :entries-count="item.containedFoldersCount"
        :active="selected"
        class="content-grid__cell"
        @click="hadnleClick($event, item, select)"
        @dblclick="hadnleDblClick($event, item)"
      />
      <item-card
        v-else-if="item.isItem"
        :key="item.uuid"
        :name="item.overview.fields[0].value"
        :desc="item.overview.fields[1].value"
        :datetime="formatDateTime(item.createdAt)"
        category-name="Password"
        class="content-grid__cell"
        @click="hadnleClick($event, item, select)"
        @dblclick="hadnleDblClick($event, item)"
      />
    </template>
    <template #empty-grid-template>
      <empty-vault-stub />
    </template>
  </grid-template>
</template>

<script>
import GridTemplate from './grid.template.vue';
import FolderCard from '~/components/cards/folder/index.vue';
import ItemCard from '~/components/cards/item/index.vue';
import DateFormater from '~/tools/date-formater';
import EmptyVaultStub from '~/components/stubs/empty-vault/index.vue';

export default {
  name: 'FolderContentsGrid',
  components: {
    FolderCard,
    ItemCard,
    EmptyVaultStub,
    GridTemplate,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    formatDateTime(date) {
      return DateFormater.formatFromString(date);
    },
    hadnleClick(e, item, select) {
      select();
      this.$emit('item-click', e, item);
    },
    hadnleDblClick(e, item) {
      this.$emit('item-dbl-click', e, item);
    },
  },
};
</script>
