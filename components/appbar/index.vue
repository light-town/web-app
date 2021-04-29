<template>
  <ui-grid direction="column">
    <ui-grid align-items="center" justify="space-between" class="appbar">
      <ui-grid align-items="center">
        <slot></slot>
      </ui-grid>
      <ui-grid align-items="center" justify="flex-end">
        <account v-if="currentAccount" :name="currentAccount.name"></account>
        <account-skeleton v-else></account-skeleton>
      </ui-grid>
    </ui-grid>
    <div class="appbar__separator"></div>
  </ui-grid>
</template>

<script>
import { mapGetters } from 'vuex';
import Account from './account/index.vue';
import AccountSkeleton from './account/skeleton.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    Account,
    AccountSkeleton,
  },
  computed: {
    ...mapGetters(['currentAccount']),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
