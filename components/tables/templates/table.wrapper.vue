<template>
  <ui-grid direction="column" class="content-table">
    <template v-if="!loading && items.length > 0">
      <slot
        name="table-template"
        :rows="items"
        :handleRowContextMenu="handleRowContextMenu"
        :handleRowDblClick="handleRowDblClick"
        :handleRowClick="handleRowClick"
      >
      </slot>
    </template>
    <slot v-else-if="loading" name="loading-table-template">
      <ui-grid align-items="center" justify="center" class="ui-mt-8">
        <ui-loading :size="24" />
      </ui-grid>
    </slot>
    <slot v-else name="empty-table-template"> Empty </slot>
  </ui-grid>
</template>

<script>
import { UiGrid, UiLoading } from '@light-town/ui';
import DateFormater from '~/tools/date-formater';

export default {
  name: 'TemplateContentTable',
  components: {
    UiGrid,
    UiLoading,
  },
  props: {
    rows: {
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
      activeRow: null,
    };
  },
  computed: {
    items() {
      return this.rows.map(i => ({
        ...i,
        lastUpdatedAt: DateFormater.formatFromString(i.lastUpdatedAt),
        createdAt: DateFormater.formatFromString(i.createdAt),
        brClass:
          this.activeRow?.uuid === i.uuid
            ? 'content-table__table-body-row_active'
            : '',
      }));
    },
  },
  methods: {
    handleRowDblClick(e, item) {
      this.$emit('row-dbl-click', e, item);
    },
    handleRowClick(e, item) {
      this.activeRow = item;
      this.$emit('input', item);

      this.$emit('row-click', e, item);
    },
    handleRowContextMenu(e, item) {
      this.activeRow = item;
      this.$emit('input', item);

      this.$emit('row-context-menu', e, item);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
