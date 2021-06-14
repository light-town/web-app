<template>
  <main-page-layout :title="$t('My Teams')">
    <template #breadcrumbs>
      <p class="management-title">{{ $t('Team Management') }}</p>
    </template>
    <template #nav>
      <account-navbar>
        <template #creation-button>
          <creation-teams-button />
        </template>
      </account-navbar>
    </template>
    <template #main>
      <ui-grid class="team-list" wrap="wrap">
        <template v-if="!loading && teams.length > 0">
          <team-card
            v-for="team in teams"
            :key="team.uuid"
            :name="team.overview.name"
            :desc="team.overview.desc"
            :entries-count="team.membersCount"
            class="team-list__team"
            @dblclick="openTeam(team)"
          />
        </template>
        <template v-else-if="loading">
          <team-card-skeleton v-for="i in 6" :key="i" class="team-list__team" />
        </template>
        <template v-else>
          <empty-team-list-stub />
        </template>
      </ui-grid>
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { UiGrid } from '@light-town/ui';
import MainPageLayout from '~/layouts/main/index.vue';
import TeamCard from '~/components/cards/vault/index.vue';
import EmptyTeamListStub from '~/components/stubs/empty-team-list/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';
import TeamCardSkeleton from '~/components/cards/skeleton/index.vue';
import CreationTeamsButton from '~/components/navbars/creation-teams-button/index.vue';
import * as teamActionTypes from '~/store/teams/types';

export default {
  name: 'TeamsPage',
  components: {
    UiGrid,
    MainPageLayout,
    TeamCard,
    TeamCardSkeleton,
    AccountNavbar,
    CreationTeamsButton,
    EmptyTeamListStub,
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
    async openTeam(team) {
      await this.setCurrentTeam({ uuid: team.uuid });

      this.$router.push(`/teams/${team.uuid}`);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
