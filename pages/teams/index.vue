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
        <ui-table :fields="fields" :items="items">
          <template #cell(position)="{ value }">
            <ui-badge
              v-if="value === 'Owner'"
              variant="contained"
              color="black"
            >
              {{ value }}
            </ui-badge>
            <ui-badge
              v-if="value === 'Member'"
              variant="contained"
              color="blue"
            >
              <ui-grid alighn-items="center">
                <ui-loading></ui-loading>
                <p>{{ value }}</p>
              </ui-grid>
            </ui-badge>
          </template>
        </ui-table>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiTable from '~/ui/table/index.vue';
import UiBadge from '~/ui/badge/index.vue';
import UiLoading from '~/ui/loading/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    UiTable,
    UiBadge,
    UiLoading,
    Sidebar,
    Appbar,
    Listbar,
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'desc',
          label: 'Description',
        },
        {
          key: 'position',
          label: 'Position',
        },
        {
          key: 'created',
          label: 'Created',
        },
      ],
      items: [
        {
          name: 'Team 1',
          desc: 'Desc Team 1',
          created: '01 July 2021 at 15:50',
          position: 'Owner',
        },
        {
          name: 'Team 2',
          desc: 'Desc Team 2',
          created: '01 July 2021 at 15:50',
          position: 'Member',
        },
        {
          name: 'Team 3',
          desc: 'Desc Team 3',
          created: '01 July 2021 at 15:50',
          position: 'Owner',
        },
      ],
    };
  },
  /*   middleware: ['auth'], */
  computed: {
    ...mapState({
      showVaultList: state => state.vaults.isInit,
      vaults: state => Object.values(state.vaults.all),
    }),
  },
  methods: {
    openVault() {},
    manageVault() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
