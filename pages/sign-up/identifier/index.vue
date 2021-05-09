<template>
  <auth-form
    :title="$t('Sign Up')"
    :desc="$t('Welcom to LightTown Platform')"
    class="indentifier-form"
    @submit="handleFormSubmit"
  >
    <template #body>
      <ui-alert v-if="error" severity="error">
        {{ error.message }}
      </ui-alert>
      <auth-form-input
        v-model="username"
        type="text"
        :placeholder="$t('Enter your username')"
      />
      <auth-form-link to="/sign-in" :text="$t('Already has an account?')" />
    </template>
    <template #footer>
      <ui-button
        variant="contained"
        type="submit"
        class="indentifier-form__submit-btn"
      >
        {{ $t('Next') }}
      </ui-button>
    </template>
  </auth-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormLink from '~/components/forms/auth/link/index.vue';
import AuthFormInput from '~/components/forms/auth/input/index.vue';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'IdentifierPage',
  components: {
    UiButton,
    UiAlert,
    AuthForm,
    AuthFormLink,
    AuthFormInput,
  },
  layout: 'auth',
  data() {
    return { username: '', localError: null };
  },
  computed: {
    ...mapState({
      isCacheServiceInit: state => state.cache.isInit,
      cachedUsername: state => state.cache.raws.username,
      error(state) {
        return this.localError ?? state.cache.error;
      },
    }),
  },
  watch: {
    isCacheServiceInit() {
      if (this.isCacheServiceInit && this.cachedUsername?.length)
        this.username = this.cachedUsername;
    },
  },
  mounted() {
    if (this.isCacheServiceInit && this.cachedUsername?.length)
      this.username = this.cachedUsername;
  },
  methods: {
    ...mapActions({
      setCache: cacheActionTypes.SET_CACHE,
    }),
    async handleFormSubmit(e) {
      e.preventDefault();

      if (this.username.length < 6) {
        this.localError = new Error(
          this.$t('The username must has length more 6 characters')
        );
        return;
      }

      await this.setCache({ username: this.username });

      if (!this.error) this.$router.push('/sign-up/pwd');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
