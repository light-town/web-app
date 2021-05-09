<template>
  <auth-form
    :title="$t('Sign In')"
    :desc="$t('Use your LightTown Account')"
    @submit="handleFormSubmit"
  >
    <template #body>
      <ui-alert v-if="error" severity="error">
        {{ error.message }}
      </ui-alert>
      <auth-form-input
        v-model="accountKey"
        type="text"
        :placeholder="$t('Enter Account Key')"
      />
      <auth-form-link to="/" :text="$t('Forgot Account Key?')" />
    </template>
    <template #footer>
      <ui-button variant="outlined" @click="redirectToSignUpPage">
        {{ $t('Create Account') }}
      </ui-button>
      <ui-button variant="contained" type="submit" :disabled="isLock">
        {{ $t('Next') }}
      </ui-button>
    </template>
  </auth-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormInput from '~/components/forms/auth/input/index.vue';
import AuthFormLink from '~/components/forms/auth/link/index.vue';
import * as fetchStatuses from '~/store/fetch-statuses';
import * as accountsActionTypes from '~/store/accounts/types';

export default {
  name: 'IdentifierPage',
  components: {
    UiButton,
    UiAlert,
    AuthForm,
    AuthFormInput,
    AuthFormLink,
  },
  layout: 'auth',
  data() {
    return {
      accountKey: '',
      localError: null,
    };
  },
  computed: {
    ...mapState({
      isLock: state => state.devices.fetchStatus === fetchStatuses.LOADING,
      error(state) {
        return this.localError || state.accounts.error;
      },
    }),
  },
  watch: {
    accountKey() {
      if (this.localError) {
        this.localError = null;
      }
    },
  },
  methods: {
    ...mapActions({
      loadAccount: accountsActionTypes.LOAD_ACCOUNT,
      setCurrentAccountUuid: accountsActionTypes.SET_CURRENT_ACCOUNT_UUID,
    }),
    async handleFormSubmit(e) {
      e.preventDefault();

      if (!this.accountKey.length) {
        this.localError = new Error(this.$t('Incorrect Account Key'));
        return;
      }

      const response = await this.loadAccount({
        accountKey: this.accountKey,
      });

      if (this.error) return;

      await this.setCurrentAccountUuid({ accountUuid: response?.accountUuid });

      this.$router.push('/sign-in/pwd');
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
