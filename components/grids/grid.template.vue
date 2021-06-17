<template>
  <ui-grid wrap="wrap" class="content-grid">
    <template v-if="!loading && items.length > 0">
      <template v-for="item in items">
        <slot
          name="item-template"
          :item="item"
          :selected="item === selectedItem"
          :select="e => handleSelectItem(e, item)"
        />
      </template>
    </template>
    <template v-else-if="loading">
      <ui-grid
        align-items="center"
        justify="center"
        class="content-grid__loading"
      >
        <ui-loading :size="24" />
      </ui-grid>
    </template>
    <template v-else>
      <slot name="empty-grid-template"> </slot>
    </template>
  </ui-grid>
</template>

<script>
import { UiGrid, UiLoading } from '@light-town/ui';

export default {
  name: 'GridTemplate',
  components: {
    UiGrid,
    UiLoading,
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
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
    handleSelectItem(_, item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style lang="scss">
.content-grid {
  @include ui-h-full;
  @include ui-overflow-x-auto;

  &__cell {
    @include ui-m-4;
  }

  &__loading {
    @include ui-mt-12;
  }
}
</style>
