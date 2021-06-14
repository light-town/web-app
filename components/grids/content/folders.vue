<template>
  <ui-grid wrap="wrap" class="grid-content">
    <template v-if="!loading && items.length > 0">
      <template v-for="item in items">
        <folder-card
          v-if="item.isFolder"
          :key="item.uuid"
          :name="item.overview.name"
          :desc="item.overview.desc"
          :entries-count="item.containedFoldersCount"
          class="grid-content__card"
          @dblclick="hadnleDblClick($event, item)"
        />
        <item-card
          v-else-if="item.isItem"
          :key="item.uuid"
          :name="item.overview.name"
          :desc="item.overview.desc"
          category-name="Password"
          :datetime="formatDateTime(item.createdAt)"
          class="grid-content__card"
          @dblclick="hadnleDblClick($event, item)"
        />
      </template>
    </template>
    <template v-else-if="loading">
      <ui-grid
        align-items="center"
        justify="center"
        class="grid-content__loading"
      >
        <ui-loading :size="24" />
      </ui-grid>
    </template>
    <template v-else>
      <empty-folder-stub />
    </template>
  </ui-grid>
</template>

<script>
import { UiGrid, UiLoading } from '@light-town/ui';
import FolderCard from '~/components/cards/folder/index.vue';
import ItemCard from '~/components/cards/item/index.vue';
import DateFormater from '~/tools/date-formater';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';

export default {
  name: 'FoldersGrid',
  components: {
    UiGrid,
    UiLoading,
    FolderCard,
    ItemCard,
    EmptyFolderStub,
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
    hadnleDblClick(e, item) {
      this.$emit('item-dbl-click', e, item);
    },
  },
};
</script>

<style lang="scss">
.grid-content {
  height: 100%;

  overflow-x: auto;

  &__card {
    margin: 0.5rem;
  }

  &__loading {
    margin-top: 2rem;
  }
}
</style>
