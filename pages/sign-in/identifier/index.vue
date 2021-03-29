<template>
  <auth-form
    title="Sign In"
    desc="Use your LightTown Account"
    @submit="handleFormSubmit"
  >
    <template #content>
      <ui-alert v-if="error" severity="error">
        {{ error.message }}
      </ui-alert>
      <ui-input
        v-model="accountKey"
        type="text"
        placeholder="Enter Account Key"
        class="auth-form__input"
      ></ui-input>
      <NuxtLink to="/" class="link">Forgot Account Key?</NuxtLink>
    </template>
    <template #footer>
      <ui-button variant="outlined" @click="redirectToSignUpPage">
        Create Account
      </ui-button>
      <ui-button variant="contained" type="submit" :disabled="isLock">
        Next
      </ui-button>
    </template>
  </auth-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import * as fetchStatuses from '~/store/fetch-statuses';
import * as accountsActionTypes from '~/store/accounts/types';

export default {
  name: 'IdentifierPage',
  components: {
    UiInput,
    UiButton,
    AuthForm,
    UiAlert,
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
        this.localError = new Error('Incorrect Account Key');
        return;
      }

      const { accountUuid } = await this.loadAccount({
        accountKey: this.accountKey,
      });

      await this.setCurrentAccountUuid({ accountUuid });

      if (!this.error) this.$router.push('/sign-in/pwd');
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
