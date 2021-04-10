<template>
  <table role="table" class="ui-table">
    <thead role="rowgroup">
      <tr role="row" class="ui-table__row">
        <th
          v-for="field in fields"
          :key="field.key"
          role="cell"
          :class="['ui-table__cell', 'ui-table__head', field.thClass]"
        >
          <slot :name="`head(${field.key})`" :label="field.label">
            {{ field.label }}
          </slot>
        </th>
      </tr>
    </thead>
    <tbody role="rowgroup">
      <tr v-for="i in items.length" :key="i" role="row" class="ui-table__row">
        <td
          v-for="field in fields"
          :key="field.key"
          role="cell"
          :class="['ui-table__cell', field.thClass]"
        >
          <slot
            :name="`cell(${field.key})`"
            :value="items[i - 1][field.key]"
            :item="items[i - 1]"
          >
            {{ items[i - 1][field.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UiTable',
  props: {
    fields: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
