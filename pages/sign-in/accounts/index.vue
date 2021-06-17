<template>
  <auth-page-layout>
    <auth-form v-if="showAuthForm" :title="$t('Choose an account')">
      <template #body>
        <ui-grid>
          <ui-alert v-if="error" variant="error" :message="error.message" />
        </ui-grid>
        <ui-grid direction="column" class="accounts__list">
          <auth-form-account
            v-for="account in accounts"
            :key="account.uuid"
            :version="getVersionAccountKey(account.key)"
            :uuid="getUuidAccountKey(account.key)"
            :name="account.name"
            class="accounts__account"
            @click="handleChooseAccount(account.uuid)"
          />
        </ui-grid>
      </template>
      <template #footer>
        <ui-grid justify="center">
          <ui-button
            variant="outlined"
            type="submit"
            @click="handleSignInAnotherAccount"
          >
            {{ $t('Sign in to another account') }}
          </ui-button>
        </ui-grid>
      </template>
    </auth-form>
    <auth-form-skeleton v-else :title="$t('Sign In')" />
  </auth-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UiGrid, UiButton, UiAlert } from '@light-town/ui';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormAccount from '~/components/forms/auth/account/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton/index.vue';
import * as accountsActionTypes from '~/store/accounts/types';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    UiButton,
    UiAlert,
    AuthForm,
    AuthFormAccount,
    AuthFormSkeleton,
    AuthPageLayout,
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState({
      accounts: state => Object.values(state.accounts.accounts),
    }),
    showAuthForm() {
      return !this.loading && this.accounts.length;
    },
  },
  async mounted() {
    this.loading = true;

    await this.loadAccountsFromStorage();

    if (!this.accounts.length) this.handleSignInAnotherAccount();

    this.loading = false;
  },
  methods: {
    ...mapActions({
      loadAccountsFromStorage: accountsActionTypes.LOAD_ACCOUNTS_FROM_STORAGE,
      setCurrentAccountUuid: accountsActionTypes.SET_CURRENT_ACCOUNT_UUID,
    }),
    getVersionAccountKey(key) {
      return key.split('-')[0];
    },
    getUuidAccountKey(key) {
      return key.split('-')[1];
    },
    async handleChooseAccount(accountUuid) {
      await this.setCurrentAccountUuid({ accountUuid });
      this.$router.push('/sign-in');
    },
    async handleSignInAnotherAccount() {
      await this.setCurrentAccountUuid({ accountUuid: null });
      this.$router.push('/sign-in');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
