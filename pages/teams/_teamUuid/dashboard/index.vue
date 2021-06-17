<template>
  <team-page-layout>
    <ui-grid>
      <team-category
        :title="$t('Invitations')"
        class="team-category_orange ui-mr-8 ui-my-8"
      >
        <team-invitation-category
          :title="$tc('{n} awaiting configurations', awaitingCount)"
        >
        </team-invitation-category>
        <team-invitation-category
          :title="$tc('{n} invitations sent', sentCount)"
        >
        </team-invitation-category>
      </team-category>
      <team-category
        :title="$t('Members')"
        class="team-category_purple ui-mr-8 ui-my-8"
      >
        <team-avatar-category
          v-for="member in members"
          :key="member.uuid"
          :name="member.accountName"
        >
        </team-avatar-category>
      </team-category>
      <team-category
        :title="$t('Vaults')"
        class="team-category_green ui-mr-8 ui-my-8"
      >
        <team-avatar-category
          v-for="vault in vaults"
          :key="vault.uuid"
          :name="vault.overview.name"
        >
        </team-avatar-category>
      </team-category>
    </ui-grid>
  </team-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UiGrid } from '@light-town/ui';
import TeamCategory from './categories/index.vue';
import TeamInvitationCategory from './categories/invitations/index.vue';
import TeamAvatarCategory from './categories/avatar/index.vue';
import TeamPageLayout from '~/layouts/team.vue';
import * as vaultsActionTypes from '~/store/vaults/types';

export default {
  name: 'TeamDashboardPage',
  components: {
    UiGrid,
    TeamPageLayout,
    TeamCategory,
    TeamAvatarCategory,
    TeamInvitationCategory,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      members: [],
      awaitingCount: 0,
      sentCount: 0,
    };
  },
  computed: {
    ...mapState({
      currentTeamUuid: state => state.teams.currentTeamUuid,
      vaults: state =>
        Object.values(state.vaults.all).filter(
          v => v.ownerTeamUuid === state.teams.currentTeamUuid
        ),
    }),
  },
  async created() {
    this.loading = true;

    this.members = (
      await this.$api.teamMembers.getTeamMembers(this.currentTeamUuid)
    ).data;

    await this.getTeamVaults();

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getTeamVaults: vaultsActionTypes.GET_TEAM_VAULTS,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
