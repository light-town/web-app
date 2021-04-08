<template>
  <auth-form-skeleton :title="$t('Sign In')"></auth-form-skeleton>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';

export default {
  name: 'SignInPage',
  components: {
    AuthFormSkeleton,
  },
  layout: 'auth',
  computed: {
    ...mapState({
      isAccountServiceInit: state => state.accounts.isInit,
    }),
    ...mapGetters(['currentAccount']),
  },
  watch: {
    isAccountServiceInit() {
      this.redirect();
    },
  },
  mounted() {
    this.redirect();
  },
  methods: {
    redirect() {
      if (!this.isAccountServiceInit) return;

      if (this.currentAccount) this.$router.push('/sign-in/pwd');
      else this.$router.push('/sign-in/identifier');
    },
  },
};
</script>
