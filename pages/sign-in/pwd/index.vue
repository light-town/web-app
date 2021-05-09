<template>
  <ui-grid>
    <client-only>
      <auth-form
        v-if="showAuthForm"
        :title="$t('Welcome')"
        :error="error"
        @submit="handleSubmitForm"
      >
        <template #body>
          <auth-form-account
            :version="versionAccountKey"
            :uuid="uuidAccountKey"
            :name="currentAccount.name"
          />
          <auth-form-input
            v-model="password"
            type="password"
            :placeholder="$t('Enter Master Password')"
            autocomplete="on"
          />
          <auth-form-link to="/" :text="$t('Forgot Master Password?')" />
        </template>
        <template #footer>
          <ui-grid direction="row-reverse" justify="space-between">
            <ui-button variant="contained" type="submit" :loading="loading">
              {{ $t('Next') }}
            </ui-button>
            <ui-button
              v-if="showChooseAccountBtn"
              variant="outlined"
              @click="handleChooseAccountBtnClick"
            >
              {{ $t('Choose another account') }}
            </ui-button>
          </ui-grid>
        </template>
      </auth-form>
      <auth-form-skeleton v-else :title="$t('Sign In')"></auth-form-skeleton>
      <template slot="placeholder">
        <auth-form-skeleton :title="$t('Sign In')"></auth-form-skeleton>
      </template>
    </client-only>
  </ui-grid>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormLink from '~/components/forms/auth/link/index.vue';
import AuthFormInput from '~/components/forms/auth/input/index.vue';
import AuthFormAccount from '~/components/forms/auth/account/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
import * as authActionTypes from '~/store/auth/types';
import * as keySetsActionTypes from '~/store/key-sets/types';
import { SessionVerifyStagesEnum } from '~/store/auth/enums';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    UiButton,
    AuthForm,
    AuthFormLink,
    AuthFormInput,
    AuthFormAccount,
    AuthFormSkeleton,
  },
  layout: 'auth',
  data() {
    return {
      password: '',
      error: null,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      isAccountServiceInit: state => state.accounts.isInit,
      session: state => state.auth.session,
      authError: state => state.auth.error,
      showChooseAccountBtn: state =>
        Object.keys(state.accounts.accounts).length,
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
    password() {
      if (this.error) this.error = null;
    },
  },
  methods: {
    ...mapActions({
      clearErrors: authActionTypes.CLEAR_ERRORS,
      createSession: authActionTypes.CREATE_SESSION,
      startSession: authActionTypes.START_SESSION,
      setMasterUnlockKey: keySetsActionTypes.SET_MASTER_UNLOCK_KEY,
    }),
    async handleSubmitForm(e) {
      e.preventDefault();

      try {
        this.loading = true;

        await this.createSession({ password: this.password });

        if (this.authError) throw this.authError;

        if (this.session.verifing.stage === SessionVerifyStagesEnum.REQUIRED) {
          this.$router.push('/sign-in/verify');
          return;
        }

        await this.startSession();

        if (this.authError) throw this.authError;

        await this.setMasterUnlockKey({ password: this.password });

        this.$router.push('/vaults');
      } catch (e) {
        if (e.message === 'The authentication fails') {
          this.error = new Error(this.$t('Incorrect master password'));
        } else {
          this.error = e;
        }
        this.clearErrors();
      } finally {
        this.loading = false;
      }
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
    handleChooseAccountBtnClick() {
      this.$router.push('/sign-in/accounts');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
