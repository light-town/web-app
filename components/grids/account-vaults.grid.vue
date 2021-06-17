<template>
  <grid-template :items="items" :loading="loading">
    <template #item-template="{ item, selected, select }">
      <vault-card
        :key="item.uuid"
        :name="item.overview.name"
        :desc="item.overview.desc"
        :entries-count="item.foldersCount + item.itemsCount"
        :active="selected"
        class="content-grid__cell"
        @click="hadnleClick($event, item, select)"
        @dblclick="hadnleDblClick($event, item)"
      />
    </template>
    <template #empty-grid-template>
      <empty-vault-list-stub />
    </template>
  </grid-template>
</template>

<script>
import GridTemplate from './grid.template.vue';
import VaultCard from '~/components/cards/vault/index.vue';
import EmptyVaultListStub from '~/components/stubs/empty-team-list/index.vue';

export default {
  name: 'FoldersGrid',
  components: {
    VaultCard,
    GridTemplate,
    EmptyVaultListStub,
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
