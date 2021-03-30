<template>
  <auth-form
    :title="$t('Sign Up')"
    :desc="$t('Welcom to LightTown Platform')"
    @submit="handleFormSubmit"
  >
    <template #content>
      <ui-alert v-if="error" severity="error">
        {{ error.message }}
      </ui-alert>
      <ui-input
        v-model="username"
        type="text"
        :placeholder="$t('Enter your username')"
        class="auth-form__input"
      ></ui-input>
      <NuxtLink to="/sign-in" class="link">{{
        $t('Already has an account?')
      }}</NuxtLink>
    </template>
    <template #footer>
      <ui-button variant="contained" type="submit" class="btn">
        {{ $t('Next') }}
      </ui-button>
    </template>
  </auth-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'SignUpPage',
  components: {
    UiInput,
    UiButton,
    UiAlert,
    AuthForm,
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
        return this.localError || state.cache.error;
      },
    }),
  },
  watch: {
    isCacheServiceInit() {
      if (this.isCacheServiceInit && this.cachedUsername?.length)
        this.username = this.cachedUsername;
    },
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
