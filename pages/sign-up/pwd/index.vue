<template>
  <auth-page-layout>
    <auth-form
      v-if="showAuthForm"
      :title="$t('Sign Up')"
      :desc="$t('Choose your Master Password')"
      :error="error"
      class="pwd-form"
      @submit="handleSubmitForm"
    >
      <template #body>
        <ui-input
          v-model="password"
          type="password"
          :placeholder="$t('Enter a password')"
          class="pwd-form__input"
          autocomplete="off"
        ></ui-input>
        <ui-input
          v-model="repeatPassword"
          type="password"
          :placeholder="$t('Confirm your password')"
          class="pwd-form__input"
          autocomplete="off"
        ></ui-input>
        <ui-grid align-items="center" class="pwd-form__warning">
          <padlock-icon class="pwd-form__warning-icon"></padlock-icon>
          <p class="pwd-form__warning-title">
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
    <auth-form-skeleton v-else title="Sign Up"></auth-form-skeleton>
  </auth-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UiGrid, UiInput, UiButton } from '@light-town/ui';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton/index.vue';
import PadlockIcon from '~/assets/padlock.svg?inline';
import * as authActionTypes from '~/store/auth/types';

export default {
  name: 'PwdPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    AuthForm,
    PadlockIcon,
    AuthFormSkeleton,
    AuthPageLayout,
  },
  data() {
    return { password: '', repeatPassword: '', error: null };
  },
  computed: {
    ...mapState({
      cachedUsername: state => state.cache.raws.username,
    }),
    showAuthForm() {
      return this.cachedUsername;
    },
  },
  methods: {
    ...mapActions({
      signUp: authActionTypes.SIGN_UP,
    }),
    async handleSubmitForm() {
      try {
        this.loading = true;

        if (!this.password.length || !this.repeatPassword.length)
          throw new Error('All fields is required to fill');

        if (this.password !== this.repeatPassword)
          throw new Error('The passwords is not match');

        await this.signUp({ password: this.password });

        this.$router.push('/sign-up/verify');
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    handleBackBtnClick() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss" scoped></style>
