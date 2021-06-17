<template>
  <default-table-template
    :rows="rows"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #empty-table-template>
      <empty-team-vault-list-stub />
    </template>
  </default-table-template>
</template>

<script>
import DefaultTableTemplate from './templates/default-table.template.vue';
import EmptyTeamVaultListStub from '~/components/stubs/empty-team-vault-list/index.vue';

export default {
  name: 'TeamVaultsTable',
  components: {
    DefaultTableTemplate,
    EmptyTeamVaultListStub,
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
