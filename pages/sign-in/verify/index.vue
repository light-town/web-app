<template>
  <auth-page-layout>
    <auth-form
      v-if="showAuthForm"
      :title="$t('2-Step Verification')"
      :desc="$t('This extra step shows it’s really you trying to sign in')"
      class="verify-page"
      @submit="handleSubmitForm"
    >
      <template #body>
        <auth-form-account
          :version="versionAccountKey"
          :uuid="uuidAccountKey"
          :name="currentAccount.name"
        />
        <phone-access-illustration class="verify-page__illustration" />
        <p class="verify-page__title">{{ $t('Check your phone') }}</p>
        <i18n
          path="LightTown sent a notification to your {model} and {os}. Finish fingerprint authorization to continue."
          tag="p"
          class="verify-page__desc"
        >
          <template #model>
            <span>{{ model }}</span>
          </template>
          <template #os>
            <span>{{ os }}</span>
          </template>
        </i18n>
        <ui-button variant="text" class="verify-page__link-btn">{{
          $t('Try another way?')
        }}</ui-button>
      </template>
    </auth-form>
    <auth-form-skeleton v-else :title="$t('Sign In')"></auth-form-skeleton>
    <template slot="placeholder">
      <auth-form-skeleton :title="$t('Sign In')"></auth-form-skeleton>
    </template>
  </auth-page-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { UiButton } from '@light-town/ui';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormAccount from '~/components/forms/auth/account/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton/index.vue';
import PhoneAccessIllustration from '~/assets/illustrations/2fa.svg?inline';
import { ChangedSessionVerificationStageEvent } from '~/services/subscriptions';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'VerifyPage',
  components: {
    UiButton,
    AuthForm,
    AuthFormAccount,
    AuthFormSkeleton,
    AuthPageLayout,
    PhoneAccessIllustration,
  },
  data() {
    return {
      event: null,
      error: null,
      loading: false,
    };
  },
  computed: {
    ...mapState({
      sessionUuid: state => state.auth.session?.uuid,
      deviceUuid: state => state.devices.deviceUuid,
      versionAccountKey() {
        return this.currentAccount.key.split('-')[0];
      },
      uuidAccountKey() {
        return this.currentAccount.key.split('-')[1];
      },
      showAuthForm() {
        return this.currentAccount && this.os && this.model;
      },
      os: state => state.cache.raws.verificationDevice?.os,
      model: state => state.cache.raws.verificationDevice?.model,
    }),
    ...mapGetters(['currentAccount']),
  },
  created() {
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
    ...mapActions({
      clearCache: cacheActionTypes.CLEAR_CACHE,
    }),
    handleSubmitForm() {},
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
    async onChangedSessionVerificationStageEvent(response) {
      if (response.data?.stage === 'COMPLETED') {
        await this.clearCache();

        this.$router.push('/vaults');
      }
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
