<template>
  <ui-grid>
    <auth-form
      v-if="showAuthForm"
      :title="$t('Sign Up')"
      :desc="$t('Choose your Master Password')"
      @submit="handleSubmitForm"
    >
      <template #content>
        <ui-alert v-if="error" severity="error">{{ error.message }}</ui-alert>
        <ui-input
          v-model="password"
          type="password"
          :placeholder="$t('Enter a password')"
          class="auth-form__input"
        ></ui-input>
        <ui-input
          v-model="repeatPassword"
          type="password"
          :placeholder="$t('Confirm your password')"
          class="auth-form__input"
        ></ui-input>

        <ui-grid align-items="center" class="warning">
          <padlock-icon class="warning__icon"></padlock-icon>
          <p class="warning__title">
            <span>{{ $t('Remember') }}:</span>
            {{ $t('the logner and more random your password, the better!') }}
          </p>
        </ui-grid>
      </template>
      <template #footer>
        <ui-button variant="outlined" @click="handleBackBtnClick">
          {{ $t('Back') }}
        </ui-button>
        <ui-button variant="contained" type="submit"
          >{{ $t('Next') }}
        </ui-button>
      </template>
    </auth-form>
    <auth-form-skeleton
      v-if="!showAuthForm"
      title="Sign Up"
    ></auth-form-skeleton>
  </ui-grid>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
import PadlockIcon from '~/assets/padlock.svg?inline';
import * as authActionTypes from '~/store/auth/types';

export default {
  name: 'PwdPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    UiAlert,
    AuthForm,
    PadlockIcon,
    AuthFormSkeleton,
  },
  layout: 'auth',
  data() {
    return { password: '', repeatPassword: '', localError: null };
  },
  computed: {
    ...mapState({
      isCacheServiceInit: state => state.cache.isInit,
      cachedUsername: state => state.cache.raws.username,
      error(state) {
        return this.localError || state.cache.error;
      },
    }),
    showAuthForm() {
      return this.isCacheServiceInit && this.cachedUsername;
    },
  },
  watch: {
    password() {
      if (this.localError) {
        this.localError = null;
      }
    },
    repeatPassword() {
      if (this.localError) {
        this.localError = null;
      }
    },
    isCacheServiceInit() {
      if (this.isCacheServiceInit && !this.cachedUsername)
        this.$router.push('/sign-up');
    },
  },
  methods: {
    ...mapActions({
      signUp: authActionTypes.SIGN_UP,
    }),
    async handleSubmitForm(e) {
      e.preventDefault();

      if (this.password.length < 8) {
        this.localError = new Error('The password must has more 8 characters');
        return;
      }

      if (!this.password.length || !this.repeatPassword.length) {
        this.localError = new Error('All fields is required to fill');
        return;
      }

      if (this.password !== this.repeatPassword) {
        this.localError = new Error('The passwords is not match');
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
