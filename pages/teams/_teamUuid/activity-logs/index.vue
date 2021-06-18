<template>
  <team-page-layout>
    <empty-team-actions-list-stub />
  </team-page-layout>
</template>

<script>
import TeamPageLayout from '~/layouts/team.vue';
import EmptyTeamActionsListStub from '~/components/stubs/empty-team-actions-list/index.vue';

export default {
  name: 'TeamDashboardPage',
  components: {
    TeamPageLayout,
    EmptyTeamActionsListStub,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
