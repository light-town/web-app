<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Sign Up"
        desc="Welcom to LightTown Platform"
        @submit="handleFormSubmit"
      >
        <template #content>
          <ui-alert v-if="error" severity="error">
            {{ error.message }}
          </ui-alert>
          <ui-input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="auth-form__input"
          ></ui-input>
          <NuxtLink to="/sign-in" class="link">
            Already has an account?
          </NuxtLink>
        </template>
        <template #footer>
          <ui-button variant="contained" type="submit" class="btn">
            Next
          </ui-button>
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
import * as fetchStatuses from '~/store/fetch-statuses';
import * as authActions from '~/store/auth/types';

export default {
  name: 'SignUpPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    UiAlert,
    Logo,
    AuthForm,
    LinksForm,
  },
  data() {
    return { username: '', validationError: null };
  },
  computed: {
    ...mapState({
      isAuthServiceInit: state => state.auth.isInit,
      loadedUsername: state => state.auth.username || '',
      isLock: state => state.auth.fetchStatus === fetchStatuses.LOADING,
      error(state) {
        return this.validationError || state.auth.error;
      },
    }),
  },
  watch: {
    isAuthServiceInit() {
      this.username = this.loadedUsername;
    },
  },
  mounted() {
    if (this.isAuthServiceInit) {
      this.username = this.loadedUsername;
    }
  },
  methods: {
    ...mapActions({
      setUsername: authActions.SET_USERNAME,
    }),
    async handleFormSubmit(e) {
      e.preventDefault();

      if (!this.username.length) {
        this.validationError = new Error(
          'The username must has length more 6 characters'
        );
        return;
      }

      await this.setUsername({ username: this.username });

      this.$router.push('/sign-up/pwd');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
