<template>
  <team-page-layout>
    <ui-grid>
      <ui-grid direction="column" class="team-invitations__bar ui-mr-8 ui-my-8">
        <ui-grid align-items="center" class="team-invitations__bar-header">
          <ui-button variant="text" class="team-invitations__invite-btn">
            <add-icon class="team-invitations__invite-btn-icon" />
          </ui-button>
          <p class="team-invitations__bar-title">{{ $t('Invitations') }}</p>
        </ui-grid>
        <ui-grid class="team-invitations__bar-body">
          <p class="team-invitations__bar-text">
            Use the + button to invite your teammates one by one, or use the
            Sign Up Link to invite your whole Team at the same time.
          </p>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column" class="team-invitations__bar-groups">
        <ui-grid
          direction="column"
          class="team-invitations__bar ui-mr-8 ui-my-8"
        >
          <ui-grid align-items="center" class="team-invitations__bar-header">
            <p class="team-invitations__bar-title">{{ $t('Sign Up Link') }}</p>
          </ui-grid>
          <ui-grid class="team-invitations__bar-body">
            <p class="team-invitations__bar-text">
              Anyone with LightTown account can join your Team by following this
              secret link:
            </p>
          </ui-grid>
        </ui-grid>
        <ui-grid
          align-items="center"
          justify="space-between"
          class="team-invitations__bar ui-mr-8"
        >
          <p class="team-invitations__bar-text">
            http://team-name/join?e=jfscr23t2nf34nvg4vb554m349yjn3fg
          </p>
          <ui-button variant="text" class="team-invitations__copy-btn">
            <copy-icon class="team-invitations__copy-btn-icon" />
          </ui-button>
        </ui-grid>
      </ui-grid>
      <ui-grid
        direction="column"
        class="
          team-invitations__bar team-invitations__bar-category
          ui-mr-8 ui-my-8
        "
      >
        <team-invitation-category
          :title="$tc('{n} awaiting configurations', awaitingCount)"
        >
        </team-invitation-category>
        <team-invitation-category
          :title="$tc('{n} invitations sent', sentCount)"
        >
        </team-invitation-category>
      </ui-grid>
    </ui-grid>
  </team-page-layout>
</template>

<script>
import { mapState } from 'vuex';
import { UiGrid, UiButton } from '@light-town/ui';
import TeamPageLayout from '~/layouts/team.vue';
import AddIcon from '~/assets/add.svg?inline';
import CopyIcon from '~/assets/copy.svg?inline';
import TeamInvitationCategory from '~/pages/teams/_teamUuid/dashboard/categories/invitations/index.vue';

export default {
  name: 'TeamiInvitationsPage',
  components: {
    UiGrid,
    UiButton,
    TeamPageLayout,
    AddIcon,
    CopyIcon,
    TeamInvitationCategory,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      awaitingCount: 0,
      sentCount: 0,
    };
  },
  computed: {
    ...mapState({
      currentTeamUuid: state => state.teams.currentTeamUuid,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
