<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Sign Up"
        desc="Choose your Master Password"
        @submit="handleSubmitForm"
      >
        <template #content>
          <ui-alert v-if="error" severity="error">{{ error.message }}</ui-alert>
          <ui-input
            v-model="password"
            type="password"
            placeholder="Enter a password"
            class="auth-form__input"
          ></ui-input>
          <ui-input
            v-model="repeatPassword"
            type="password"
            placeholder="Confirm your password"
            class="auth-form__input"
          ></ui-input>

          <ui-grid align-items="center" class="warning">
            <padlock-icon class="warning__icon"></padlock-icon>
            <p class="warning__title">
              <span>Remember:</span> the logner and more random your password,
              the better!
            </p>
          </ui-grid>
        </template>
        <template #footer>
          <ui-button variant="outlined" @click="handleBackBtnClick">
            Back
          </ui-button>
          <ui-button variant="contained" type="submit"> Next </ui-button>
        </template>
      </auth-form>
      <links-form></links-form>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import Logo from '~/components/forms/auth/logo.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import PadlockIcon from '~/assets/padlock.svg?inline';
import * as fetchStatuses from '~/store/fetch-statuses';
import * as authActions from '~/store/auth/types';

export default {
  name: 'MasterPasswordPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    UiAlert,
    Logo,
    AuthForm,
    LinksForm,
    PadlockIcon,
  },
  data() {
    return { password: '', repeatPassword: '', validationError: null };
  },
  computed: {
    ...mapState({
      isAuthServiceInit: state => state.auth.isInit,
      username: state => state.auth.username,
      isLock: state => state.auth.fetchStatus === fetchStatuses.LOADING,
      error(state) {
        return this.validationError || state.auth.error;
      },
    }),
  },
  watch: {
    password() {
      if (this.validationError) {
        this.validationError = null;
      }
    },
    repeatPassword() {
      if (this.validationError) {
        this.validationError = null;
      }
    },
    isAuthServiceInit() {
      if (this.isAuthServiceInit && !this.username)
        this.$router.push('/sign-up');
    },
  },
  methods: {
    ...mapActions({
      signUp: authActions.SIGN_UP,
    }),
    async handleSubmitForm(e) {
      e.preventDefault();

      if (!this.password.length || !this.repeatPassword.length) {
        this.validationError = new Error('All fields is required to fill');
        return;
      }

      if (this.password !== this.repeatPassword) {
        this.validationError = new Error('The passwords is not match');
        return;
      }

      if (this.password.length < 8) {
        this.validationError = new Error(
          'The password must has more 8 characters'
        );
        return;
      }

      await this.signUp({ password: this.password });

      if (!this.error) this.$router.push('/sign-up/verify');
    },
    handleBackBtnClick() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
