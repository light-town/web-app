<template>
  <ui-grid>
    <client-only>
      <auth-form v-if="showAuthForm" title="Welcome" @submit="handleSubmitForm">
        <template #content>
          <ui-alert v-if="error" severity="error">
            {{ error.message }}
          </ui-alert>
          <account
            :version="versionAccountKey"
            :uuid="uuidAccountKey"
            :name="currentAccount.name"
          ></account>
          <ui-input
            v-model="password"
            type="password"
            placeholder="Enter Master Password"
            class="auth-form__input"
          ></ui-input>
          <NuxtLink to="/" class="link">Forgot Master Password?</NuxtLink>
        </template>
        <template #footer>
          <ui-grid direction="row-reverse">
            <ui-button variant="contained" type="submit">Next</ui-button>
          </ui-grid>
        </template>
      </auth-form>
      <auth-form-skeleton
        v-if="!showAuthForm"
        title="Sign In"
      ></auth-form-skeleton>
      <template slot="placeholder">
        <auth-form-skeleton title="Sign In"></auth-form-skeleton>
      </template>
    </client-only>
  </ui-grid>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import Account from '~/components/forms/auth/account.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
import * as authActionTypes from '~/store/auth/types';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    UiAlert,
    AuthForm,
    Account,
    AuthFormSkeleton,
  },
  layout: 'auth',
  data() {
    return {
      password: '',
      localError: null,
    };
  },
  computed: {
    ...mapState({
      isAccountServiceInit: state => state.accounts.isInit,
      error(state) {
        return this.localError || state.auth.error;
      },
    }),
    ...mapGetters(['currentAccount']),
    versionAccountKey() {
      return this.currentAccount.key.split('-')[0];
    },
    uuidAccountKey() {
      return this.currentAccount.key.split('-')[1];
    },
    showAuthForm() {
      return this.isAccountServiceInit && this.currentAccount;
    },
  },
  watch: {
    isAccountServiceInit() {
      if (this.isAccountServiceInit && !this.currentAccount)
        this.$router.push('/sign-in');
    },
  },
  methods: {
    ...mapActions({
      createSession: authActionTypes.CREATE_SESSION,
    }),
    async handleSubmitForm(e) {
      e.preventDefault();

      await this.createSession({ password: this.password });

      /* if (!this.error) this.$router.push('/'); */
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
