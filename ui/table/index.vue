<template>
  <ui-grid component="table" role="table" class="ui-table" direction="column">
    <ui-grid component="thead" role="rowgroup">
      <ui-grid
        component="thead"
        role="row"
        :class="['ui-table__row', hrClass]"
        @click="$emit('header-row-click', $event)"
      >
        <ui-grid
          v-for="field in fields"
          :key="field.key"
          component="th"
          role="cell"
          align-items="center"
          :class="['ui-table__cell', 'ui-table__cell-header', field.thClass]"
          @click="$emit('header-cell-click', $event, field)"
        >
          <slot :name="`head`">
            <slot
              :name="`head(${field.key})`"
              :label="field.label"
              :item="field"
            >
              {{ field.label }}
            </slot>
          </slot>
        </ui-grid>
      </ui-grid>
    </ui-grid>
    <ui-grid component="tbody" role="rowgroup" direction="column">
      <ui-grid
        v-for="i in items.length"
        :key="i"
        component="tr"
        role="row"
        :class="['ui-table__row', brClass, items[i - 1].brClass]"
        @click.native="$emit('body-row-click', $event, items[i - 1])"
        @dblclick.native="$emit('body-row-dbl-click', $event, items[i - 1])"
        @contextmenu.native="
          e => {
            $emit('body-row-context-menu', e, items[i - 1]);
            $emit('contextmenu', e, items[i - 1]);
          }
        "
      >
        <ui-grid
          v-for="field in fields"
          :key="field.key"
          component="td"
          role="cell"
          align-items="center"
          :class="['ui-table__cell', 'ui-table__cell-body', field.thClass]"
          @click="$emit('body-cell-click', $event, field, items)"
        >
          <slot :name="`cell`">
            <slot
              :name="`cell(${field.key})`"
              :value="items[i - 1][field.key]"
              :item="items[i - 1]"
            >
              {{ items[i - 1][field.key] }}
            </slot>
          </slot>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiTable',
  components: {
    UiGrid,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    hrClass: {
      type: String,
      required: false,
      default: '',
    },
    brClass: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
