<template>
  <team-page-layout>
    <template #main>
      <content-viewer>
        <template #table> </template>
        <template #grid> </template>
      </content-viewer>
    </template>
  </team-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TeamPageLayout from '~/layouts/team.vue';
import ContentViewer from '~/components/content-viewer/index.vue';
import * as keySetsActionTypes from '~/store/key-sets/types';
import * as teamsActionTypes from '~/store/teams/types';

export default {
  name: 'TeamPage',
  components: {
    TeamPageLayout,
    ContentViewer,
  },
  middleware: ['auth', 'url-params'],
  computed: {
    ...mapState({
      currentTeamUuid: state => state.teams.currentTeamUuid,
    }),
  },
  async created() {
    await this.getTeam({ uuid: this.currentTeamUuid });
    await this.getTeamKeySets();
  },
  methods: {
    ...mapActions({
      getTeam: teamsActionTypes.GET_TEAM,
      getTeamKeySets: keySetsActionTypes.GET_TEAM_KEY_SETS,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
