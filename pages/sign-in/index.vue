<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Sign In"
        desc="Use your LightTown Account"
        @submit="handleFormSubmit"
      >
        <template #content>
          <ui-alert v-if="errorMessage" severity="error">
            {{ errorMessage }}
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
      <links-form></links-form>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import Logo from '~/components/forms/auth/logo.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import * as deviceActionTypes from '~/store/devices/types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  name: 'SignInPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    Logo,
    AuthForm,
    LinksForm,
    UiAlert,
  },
  data() {
    return {
      accountKey: '',
      validationError: null,
    };
  },
  computed: {
    ...mapState({
      isLock: state => state.devices.fetchStatus === fetchStatuses.LOADING,
      errorMessage(state) {
        return this.validationError || state.devices.error?.message;
      },
    }),
  },
  watch: {
    accountKey() {
      if (this.validationError) {
        this.validationError = null;
      }
    },
  },
  methods: {
    ...mapActions({
      registerDevice: deviceActionTypes.REGIESTER_DEVICE,
    }),
    handleFormSubmit(e) {
      e.preventDefault();

      if (!this.accountKey.length) {
        this.validationError = 'Incorrect Account Key';
        return;
      }

      this.registerDevice();
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
