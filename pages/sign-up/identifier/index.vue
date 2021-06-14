<template>
  <auth-page-layout>
    <auth-form
      :title="$t('Sign Up')"
      :desc="$t('Welcom to LightTown Platform')"
      :error="error"
      class="indentifier-form"
      @submit="handleFormSubmit"
    >
      <template #body>
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
  </auth-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UiButton } from '@light-town/ui';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormLink from '~/components/forms/auth/link/index.vue';
import AuthFormInput from '~/components/forms/auth/input/index.vue';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'IdentifierPage',
  components: {
    UiButton,
    AuthForm,
    AuthFormLink,
    AuthFormInput,
    AuthPageLayout,
  },
  data() {
    return { username: '', error: null };
  },
  computed: {
    ...mapState({
      cachedUsername: state => state.cache.raws.username,
    }),
  },
  mounted() {
    this.username = this.cachedUsername ?? '';
  },
  methods: {
    ...mapActions({
      setCache: cacheActionTypes.SET_CACHE,
    }),
    async handleFormSubmit() {
      try {
        this.loading = true;

        if (this.username.length < 6)
          throw new Error(
            this.$t('The username must has length more 6 characters')
          );

        await this.setCache({ username: this.username });

        this.$router.push('/sign-up/pwd');
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
