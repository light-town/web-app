<template>
  <main-page-layout :title="$t('My teams')">
    <template #breadcrumbs>
      <p class="management-title">{{ $t('Team management') }}</p>
    </template>
    <template #nav>
      <account-navbar>
        <template #creation-button>
          <creation-teams-button />
        </template>
      </account-navbar>
    </template>
    <template #main>
      <teams-grid
        :items="teams"
        :loading="loading"
        @item-dbl-click="openTeam"
      />
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MainPageLayout from '~/layouts/main/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';
import CreationTeamsButton from '~/components/navbars/creation-teams-button/index.vue';
import * as teamActionTypes from '~/store/teams/types';
import TeamsGrid from '~/components/grids/teams.grid.vue';

export default {
  name: 'TeamsPage',
  components: {
    MainPageLayout,
    TeamsGrid,
    AccountNavbar,
    CreationTeamsButton,
  },
  middleware: ['auth'],
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState({
      teams: state => Object.values(state.teams.all),
    }),
  },
  created() {
    this.loading = true;

    this.getTeams().finally(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      getTeams: teamActionTypes.GET_TEAMS,
      setCurrentTeam: teamActionTypes.SET_CURRENT_TEAM_UUID,
    }),
    async openTeam(_, team) {
      await this.setCurrentTeam({ uuid: team.uuid });

      this.$router.push(`/teams/${team.uuid}/dashboard`);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
