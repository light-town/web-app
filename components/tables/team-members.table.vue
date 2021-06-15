<template>
  <team-members-table-template
    :rows="rows"
    :loading="loading"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import TeamMembersTableTemplate from './templates/team-members-table.template.vue';

export default {
  name: 'TeamVaultsTable',
  components: {
    TeamMembersTableTemplate,
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
