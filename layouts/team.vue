<template>
  <main-page-layout
    :title="currentTeamName"
    :desc="$t('Team')"
    :loading="loading"
  >
    <template #nav>
      <team-navbar :show-tool-btns="showToolBtns" />
    </template>
    <template #main>
      <ui-grid direction="column" class="ui-h-full ui-overflow-auto">
        <slot></slot>
      </ui-grid>
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { UiGrid } from '@light-town/ui';
import MainPageLayout from './main/index.vue';
import TeamNavbar from '~/components/navbars/team/index.vue';
import * as teamActionTypes from '~/store/teams/types';

export default {
  name: 'TeamPageLayout',
  components: {
    UiGrid,
    MainPageLayout,
    TeamNavbar,
  },
  props: {
    showToolBtns: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return { currentTeamName: '', loading: false };
  },
  computed: {
    ...mapState({
      currentTeamUuid: state => state.teams.currentTeamUuid,
    }),
    ...mapGetters(['currentTeam']),
  },
  created() {
    if (this.currentTeam) {
      this.currentTeamName = this.currentTeam.overview.name;
      return;
    }

    this.loading = true;

    this.getTeam({ uuid: this.currentTeamUuid })
      .then(() => {
        this.currentTeamName = this.currentTeam.overview.name;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    ...mapActions({
      getTeam: teamActionTypes.GET_TEAM,
    }),
  },
};
</script>

<style lang="scss">
.app-page {
  &__sidebar {
    flex: 0 0 300px;

    overflow: auto;

    height: 100%;

    padding: 0.625rem 0;
    padding-right: 40px;
  }
}
</style>
