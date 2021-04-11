<template>
  <ui-table :fields="fields" :items="items">
    <template #cell(name)="{ value }">
      <ui-grid align-items="center">
        <ui-avatar
          :name="value"
          :size="32"
          class="team-table__cell-icon"
        ></ui-avatar>
        <p class="team-table__cell-title">{{ value }}</p>
      </ui-grid>
    </template>
    <template #cell(position)="{ value }">
      <ui-badge v-if="value === 'Owner'" variant="contained" color="black">
        {{ value }}
      </ui-badge>
      <ui-badge v-if="value === 'Member'" variant="contained" color="blue">
        {{ value }}
      </ui-badge>
    </template>
  </ui-table>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiTable from '~/ui/table/index.vue';
import UiBadge from '~/ui/badge/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';

export default {
  name: 'TeamsTable',
  components: {
    UiGrid,
    UiTable,
    UiBadge,
    UiAvatar,
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
};
</script>

<style lang="scss" src="./index.scss"></style>
