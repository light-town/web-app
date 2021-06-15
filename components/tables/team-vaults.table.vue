<template>
  <default-table-template
    :rows="rows"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import DefaultTableTemplate from './templates/default-table.template.vue';

export default {
  name: 'TeamVaultsTable',
  components: {
    DefaultTableTemplate,
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
};
</script>
