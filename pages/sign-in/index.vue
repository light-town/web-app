<template>
  <auth-page-layout>
    <auth-form-skeleton :title="$t('Sign In')"></auth-form-skeleton>
  </auth-page-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton/index.vue';
import * as accountsActionTypes from '~/store/accounts/types';

export default {
  name: 'SignInPage',
  components: {
    AuthPageLayout,
    AuthFormSkeleton,
  },
  computed: {
    ...mapGetters(['currentAccount']),
  },
  mounted() {
    this.loadAccountsFromStorage().then(() => this.redirect());
  },
  methods: {
    ...mapActions({
      loadAccountsFromStorage: accountsActionTypes.LOAD_ACCOUNTS_FROM_STORAGE,
    }),
    redirect() {
      if (this.currentAccount) this.$router.push('/sign-in/pwd');
      else this.$router.push('/sign-in/identifier');
    },
  },
};
</script>
