<template>
  <ui-grid class="main-layout">
    <sidebar></sidebar>
    <listbar>
      <template #title> Teams </template>
      <template #menu> </template>
    </listbar>
    <ui-grid direction="column">
      <appbar> </appbar>
      <ui-grid class="team-table" wrap="wrap">
        <search-teams-by-tokens></search-teams-by-tokens>
        <team-table></team-table>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapState } from 'vuex';
import TeamTable from './table/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';
import SearchTeamsByTokens from '~/components/search-teams-by-tokens/index.vue';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Listbar,
    TeamTable,
    SearchTeamsByTokens,
  },
  /*   middleware: ['auth'], */
  computed: {
    ...mapState({}),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
