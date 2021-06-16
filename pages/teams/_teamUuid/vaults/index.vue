<template>
  <team-page-layout :show-tool-btns="true">
    <content-viewer>
      <template #table>
        <team-vaults-table
          :rows="items"
          :loading="loading"
          @row-dbl-click="openVault"
        />
      </template>
      <template #grid>
        <team-vaults-grid
          :items="items"
          :loading="loading"
          @item-dbl-click="openVault"
        />
      </template>
    </content-viewer>
  </team-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TeamPageLayout from '~/layouts/team.vue';
import ContentViewer from '~/components/content-viewer/index.vue';
import TeamVaultsTable from '~/components/tables/team-vaults.table.vue';
import TeamVaultsGrid from '~/components/grids/team-vaults.grid.vue';
import * as keySetsActionTypes from '~/store/key-sets/types';
import * as vaultsActionTypes from '~/store/vaults/types';
import * as teamsActionTypes from '~/store/teams/types';

export default {
  name: 'TeamVaultsPage',
  components: {
    TeamPageLayout,
    ContentViewer,
    TeamVaultsTable,
    TeamVaultsGrid,
  },
  middleware: ['auth', 'url-params'],
  data() {
    return {
      loading: false,
      items: [],
    };
  },
  computed: {
    ...mapState({
      currentTeamUuid: state => state.teams.currentTeamUuid,
      teamVaults: state =>
        Object.values(state.vaults.all).filter(
          v => v.ownerTeamUuid === state.teams.currentTeamUuid
        ),
    }),
  },
  watch: {
    teamVaults() {
      this.items = this.teamVaults;
    },
  },
  async created() {
    this.loading = true;

    await this.getTeam({ uuid: this.currentTeamUuid });
    await this.getTeamKeySets();
    await this.getTeamVaults();

    this.items = this.teamVaults;

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getTeam: teamsActionTypes.GET_TEAM,
      getTeamKeySets: keySetsActionTypes.GET_TEAM_KEY_SETS,
      getTeamVaults: vaultsActionTypes.GET_TEAM_VAULTS,
    }),
    openVault() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
