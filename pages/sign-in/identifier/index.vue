<template>
  <auth-page-layout>
    <auth-form
      :title="$t('Sign In')"
      :desc="$t('Use your LightTown Account')"
      :error="error"
      @submit="handleFormSubmit"
    >
      <template #body>
        <auth-form-input
          v-model="accountKey"
          :placeholder="$t('Enter Account Key')"
        />
        <auth-form-link to="/" :text="$t('Forgot Account Key?')" />
      </template>
      <template #footer>
        <ui-button variant="outlined" @click="redirectToSignUpPage">
          {{ $t('Create Account') }}
        </ui-button>
        <ui-button variant="contained" type="submit" :disabled="loading">
          {{ $t('Next') }}
        </ui-button>
      </template>
    </auth-form>
  </auth-page-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { UiButton } from '@light-town/ui';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormInput from '~/components/forms/auth/input/index.vue';
import AuthFormLink from '~/components/forms/auth/link/index.vue';
import * as accountsActionTypes from '~/store/accounts/types';

export default {
  name: 'SignInIdentifierPage',
  components: {
    UiButton,
    AuthPageLayout,
    AuthForm,
    AuthFormInput,
    AuthFormLink,
  },
  data() {
    return {
      accountKey: '',
      loading: false,
      error: null,
    };
  },
  methods: {
    ...mapActions({
      getAccount: accountsActionTypes.GET_ACCOUNT,
      setCurrentAccountUuid: accountsActionTypes.SET_CURRENT_ACCOUNT_UUID,
    }),
    async handleFormSubmit() {
      try {
        this.loading = true;

        const response = await this.getAccount({
          accountKey: this.accountKey,
        });

        await this.setCurrentAccountUuid({
          accountUuid: response?.accountUuid,
        });

        this.$router.push('/sign-in/pwd');
      } catch (e) {
        this.error = new Error(this.$t('Incorrect Account Key'));
      } finally {
        this.loading = false;
      }
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
