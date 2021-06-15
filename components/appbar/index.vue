<template>
  <ui-grid align-items="center" justify="space-between" class="appbar">
    <ui-grid align-items="center">
      <logo class="appbar__logo" />
      <global-searcher />
    </ui-grid>
    <ui-grid align-items="center" justify="flex-end">
      <ui-button variant="text" class="appbar__tool-btn">
        <question-icon class="appbar__tool-btn-icon" />
      </ui-button>
      <ui-button variant="text" class="appbar__tool-btn">
        <settings-icon class="appbar__tool-btn-icon" />
      </ui-button>
      <account v-if="currentAccount" :name="currentAccount.name"></account>
      <account-skeleton v-else></account-skeleton>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapGetters } from 'vuex';
import { UiGrid, UiButton } from '@light-town/ui';
import Logo from './logo/index.vue';
import Account from './account/index.vue';
import AccountSkeleton from './account/skeleton.vue';
import GlobalSearcher from '~/components/search-lines/vault-content/index.vue';
import SettingsIcon from '~/assets/settings.svg?inline';
import QuestionIcon from '~/assets/question.svg?inline';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    UiButton,
    Logo,
    Account,
    AccountSkeleton,
    GlobalSearcher,
    SettingsIcon,
    QuestionIcon,
  },
  computed: {
    ...mapGetters(['currentAccount']),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
