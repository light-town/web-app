<template>
  <team-page-layout :show-tool-btns="true">
    <content-viewer>
      <template #table>
        <team-members-table :rows="members" :loading="loading" />
      </template>
      <template #grid>
        <team-members-grid :items="members" :loading="loading" />
      </template>
    </content-viewer>
  </team-page-layout>
</template>

<script>
import { mapState } from 'vuex';
import TeamPageLayout from '~/layouts/team.vue';
import ContentViewer from '~/components/content-viewer/index.vue';
import TeamMembersTable from '~/components/tables/team-members.table.vue';
import TeamMembersGrid from '~/components/grids/team-members.grid.vue';

export default {
  name: 'TeamMembersPage',
  components: {
    TeamPageLayout,
    ContentViewer,
    TeamMembersTable,
    TeamMembersGrid,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      members: [],
    };
  },
  computed: {
    ...mapState({
      currentTeamUuid: state => state.teams.currentTeamUuid,
    }),
  },
  async created() {
    this.loading = true;

    this.members = (
      await this.$api.teamMembers.getTeamMembers(this.currentTeamUuid)
    ).data;

    this.loading = false;
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
