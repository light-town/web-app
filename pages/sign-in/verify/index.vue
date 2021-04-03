<template>
  <ui-grid>
    <client-only>
      <auth-form
        v-if="showAuthForm"
        :title="$t('2-Step Verification')"
        :desc="$t('This extra step shows it’s really you trying to sign in')"
        @submit="handleSubmitForm"
      >
        <template #content>
          <account
            :version="versionAccountKey"
            :uuid="uuidAccountKey"
            :name="currentAccount.name"
          ></account>
          <auth-illustration class="illustration"></auth-illustration>
          <p class="title">{{ $t('Check your phone') }}</p>
          <i18n
            path="LightTown sent a notification to your {model} and {os}. Finish fingerprint authorization to continue."
            tag="p"
            class="desc"
          >
            <template #model>
              <span>{{ model }}</span>
            </template>
            <template #os>
              <span>{{ os }}</span>
            </template>
          </i18n>
          <ui-button variant="text" class="link-btn">{{
            $t('Try another way?')
          }}</ui-button>
        </template>
      </auth-form>
      <auth-form-skeleton
        v-if="!showAuthForm"
        :title="$t('Sign In')"
      ></auth-form-skeleton>
      <template slot="placeholder">
        <auth-form-skeleton :title="$t('Sign In')"></auth-form-skeleton>
      </template>
    </client-only>
  </ui-grid>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import Account from '~/components/forms/auth/account.vue';
import AuthIllustration from '~/assets/illustrations/2fa.svg?inline';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
import { ChangedSessionVerificationStageEvent } from '~/services/subscriptions';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    UiButton,
    AuthForm,
    Account,
    AuthIllustration,
    AuthFormSkeleton,
  },
  layout: 'auth',
  data() {
    return {
      event: null,
    };
  },
  computed: {
    ...mapState({
      isAccountServiceInit: state => state.accounts.isInit,
      sessionUuid: state => state.auth.session?.uuid,
      deviceUuid: state => state.devices.deviceUuid,
      isCacheServiceInit: state => state.cache.isInit,
      error(state) {
        return this.localError || state.auth.error;
      },
      versionAccountKey() {
        return this.currentAccount.key.split('-')[0];
      },
      uuidAccountKey() {
        return this.currentAccount.key.split('-')[1];
      },
      showAuthForm() {
        return (
          this.isCacheServiceInit &&
          this.isAccountServiceInit &&
          this.currentAccount &&
          this.os &&
          this.model
        );
      },
      os: state => state.cache.raws.verificationDevice?.os,
      model: state => state.cache.raws.verificationDevice?.model,
    }),
    ...mapGetters(['currentAccount']),
  },
  mounted() {
    this.event = new ChangedSessionVerificationStageEvent({
      sessionUuid: this.sessionUuid,
      deviceUuid: this.deviceUuid,
    });

    this.$api.subscriptions.subscribe(
      this.event,
      this.onChangedSessionVerificationStageEvent
    );
  },
  beforeDestroy() {
    if (
      this.$api.subscriptions.hasSubscribed(
        this.event,
        this.onChangedSessionVerificationStageEvent
      )
    )
      this.$api.subscriptions.unsubscribe(
        this.event,
        this.onChangedSessionVerificationStageEvent
      );
  },
  methods: {
    handleSubmitForm(e) {
      e.preventDefault();
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
    onChangedSessionVerificationStageEvent(response) {
      if (response.data?.stage === 'COMPLETED') {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
