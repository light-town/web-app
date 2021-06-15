<template>
  <grid-template :items="items" :loading="loading">
    <template #item-template="{ item, selected, select }">
      <team-member-card
        :key="item.uuid"
        :name="item.accountName"
        :desc="item.roleName"
        :active="selected"
        :entries-inside-exists="false"
        class="content-grid__cell"
        @click="hadnleClick($event, item, select)"
        @dblclick="hadnleDblClick($event, item)"
      />
    </template>
  </grid-template>
</template>

<script>
import GridTemplate from './grid.template.vue';
import TeamMemberCard from '~/components/cards/vault/index.vue';

export default {
  name: 'FoldersGrid',
  components: {
    TeamMemberCard,
    GridTemplate,
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    hadnleClick(e, item, select) {
      select();
      this.$emit('item-click', e, item);
    },
    hadnleDblClick(e, item) {
      this.$emit('item-dbl-click', e, item);
    },
  },
};
</script>
