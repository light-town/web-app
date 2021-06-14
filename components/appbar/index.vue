<template>
  <ui-grid align-items="center" justify="space-between" class="appbar">
    <ui-grid align-items="center">
      <logo class="appbar__logo" />
      <global-searcher />
    </ui-grid>
    <ui-grid align-items="center" justify="flex-end">
      <account v-if="currentAccount" :name="currentAccount.name"></account>
      <account-skeleton v-else></account-skeleton>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapGetters } from 'vuex';
import { UiGrid } from '@light-town/ui';
import Logo from './logo/index.vue';
import Account from './account/index.vue';
import AccountSkeleton from './account/skeleton.vue';
import GlobalSearcher from '~/components/search-lines/vault-content/index.vue';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    Logo,
    Account,
    AccountSkeleton,
    GlobalSearcher,
  },
  computed: {
    ...mapGetters(['currentAccount']),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
