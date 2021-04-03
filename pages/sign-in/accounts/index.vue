<template>
  <ui-grid>
    <client-only>
      <auth-form v-if="showAuthForm" :title="$t('Choose an account')">
        <template #content>
          <ui-alert v-if="error" severity="error">
            {{ error.message }}
          </ui-alert>
          <ui-grid direction="column" class="account__list">
            <account
              v-for="account in accounts"
              :key="account.uuid"
              :version="getVersionAccountKey(account.key)"
              :uuid="getUuidAccountKey(account.key)"
              :name="account.name"
              @click="handleChooseAccount(account.uuid)"
            ></account>
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
      <auth-form-skeleton
        v-if="!showAuthForm"
        :title="$t('Sign In')"
      ></auth-form-skeleton>
      <template slot="placeholder">
        <auth-form-skeleton :title="$t('Sign In')"></auth-form-skeleton>
      </template>
    </client-only>
  </ui-grid>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import Account from '~/components/forms/auth/account.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
import * as accountsActionTypes from '~/store/accounts/types';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    UiButton,
    UiAlert,
    AuthForm,
    Account,
    AuthFormSkeleton,
  },
  layout: 'auth',
  data() {
    return {
      localError: null,
    };
  },
  computed: {
    ...mapState({
      isAccountServiceInit: state => state.accounts.isInit,
      accounts: state => Object.values(state.accounts.accounts),
      error(state) {
        return this.localError || state.auth.error;
      },
    }),

    showAuthForm() {
      return this.isAccountServiceInit && this.accounts.length;
    },
  },
  methods: {
    ...mapActions({
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
