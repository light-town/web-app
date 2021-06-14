<template>
  <ui-grid align-items="center" class="app-page-navbar">
    <ui-grid align-items="center" class="app-page-nav__new-element-btn">
      <slot name="creation-button">
        <creation-team-elements-button />
      </slot>
    </ui-grid>
    <app-page-nav :items="items">
      <template v-for="item in items" #[`item-icon-template(${item.name})`]>
        <component
          :is="item.icon"
          :key="item.name"
          class="app-page-nav__list-item-icon"
        />
      </template>
    </app-page-nav>
    <ui-grid
      v-if="showToolBtns"
      align-items="center"
      justify="flex-end"
      class="app-page-nav__tool-btns"
    >
      <ui-button
        variant="text"
        class="app-page-nav__tool-btn"
        @click="changeContentView"
      >
        <menu-icon
          v-if="isTableContentViewWay"
          class="app-page-nav__tool-btn-icon"
        />
        <list-icon
          v-else-if="isGridContentViewWay"
          class="app-page-nav__tool-btn-icon"
        />
      </ui-button>
      <ui-button variant="text" class="app-page-nav__tool-btn">
        <info-icon class="app-page-nav__tool-btn-icon" />
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { UiGrid, UiButton, UiBadge } from '@light-town/ui';
import AppPageNav from '../nav/index.vue';
import CreationTeamElementsButton from '../creation-team-elements-button/index.vue';
import CubeOfNotesStackIcon from '~/assets/cube-of-notes-stack.svg?inline';
import InfoIcon from '~/assets/info.svg?inline';
import MenuIcon from '~/assets/menu.svg?inline';
import ListIcon from '~/assets/list.svg?inline';
import SpeedometerIcon from '~/assets/speedometer.svg?inline';
import TeamOfWorkersIcon from '~/assets/team-of-workers.svg?inline';
import InvitationIcon from '~/assets/invitation.svg?inline';
import DocumentIcon from '~/assets/document.svg?inline';
import ShieldIcon from '~/assets/shield.svg?inline';
import * as configActionTypes from '~/store/config/types';
import * as ContentViewWays from '~/store/config/content-view-ways';

export const NavigationListItemEnum = {
  DASHBOARD: 'Dashboard',
  MEMBERS: 'Members',
  INVITATIONS: 'Invitations',
  VAULTS: 'Vaults',
  ACTIVITY_LOGS: 'Activity Logs',
  SECURITY: 'Security',
};

export default {
  name: 'TeamNavBar',
  components: {
    UiGrid,
    UiButton,
    UiBadge,
    CubeOfNotesStackIcon,
    AppPageNav,
    CreationTeamElementsButton,
    InfoIcon,
    MenuIcon,
    ListIcon,
    SpeedometerIcon,
    TeamOfWorkersIcon,
    InvitationIcon,
    DocumentIcon,
    ShieldIcon,
  },
  props: {
    showToolBtns: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState({
      contentViewWay: state => state.config.contentViewWay,
      vaults: state => Object.values(state.vaults.all),
      currentTeamUuid: state => state.teams.currentTeamUuid,
    }),
    ...mapGetters(['currentTeam']),
    vaultsNumber() {
      return this.currentTeam?.vaultsCount ?? 0;
    },
    teamMembers() {
      return this.currentTeam?.membersCount ?? 0;
    },
    invitationsNumber() {
      return 0;
    },
    isTableContentViewWay() {
      return this.contentViewWay === ContentViewWays.TABLE;
    },
    isGridContentViewWay() {
      return this.contentViewWay === ContentViewWays.GRID;
    },
    items() {
      const currentTeamUrl = `/teams/${this.currentTeamUuid}`;
      return [
        {
          name: this.$t(NavigationListItemEnum.DASHBOARD),
          count: 0,
          icon: 'speedometer-icon',
          href: `${currentTeamUrl}/dashboard`,
          active: /^\/teams\/.+\/dashboard\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.MEMBERS),
          count: this.teamMembers,
          icon: 'team-of-workers-icon',
          href: `${currentTeamUrl}/members`,
          active: /^\/teams\/.+\/members\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.INVITATIONS),
          count: this.invitationsNumber,
          icon: 'invitation-icon',
          href: `${currentTeamUrl}/invitations`,
          active: /^\/teams\/.+\/invitations\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.VAULTS),
          count: this.vaultsNumber,
          icon: 'cube-of-notes-stack-icon',
          href: `/teams/${this.currentTeamUuid}/vaults`,
          active: /^\/teams\/.+\/vaults\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.ACTIVITY_LOGS),
          count: 0,
          icon: 'document-icon',
          href: `/teams/${this.currentTeamUuid}/activity-logs`,
          active: /^\/teams\/.+\/activity-logs\/?/.test(this.$route.path),
        },
        {
          name: this.$t(NavigationListItemEnum.SECURITY),
          count: 0,
          icon: 'shield-icon',
          href: `/teams/${this.currentTeamUuid}/security`,
          active: /^\/teams\/.+\/security\/?/.test(this.$route.path),
        },
      ];
    },
  },
  created() {
    this.loadContentViewWay();
  },
  updated() {
    this.loadContentViewWay();
  },
  methods: {
    ...mapActions({
      loadContentViewWay: configActionTypes.LOAD_CONTENT_VIEW_WAY,
      setContentViewWay: configActionTypes.SET_CONTENT_VIEW_WAY,
    }),
    changeContentView() {
      this.setContentViewWay({
        way:
          this.contentViewWay === ContentViewWays.GRID
            ? ContentViewWays.TABLE
            : ContentViewWays.GRID,
      });
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
