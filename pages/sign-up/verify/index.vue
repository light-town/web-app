<template>
  <auth-page-layout>
    <auth-form
      v-if="!loading"
      :title="$t('Meet your Account Key')"
      :desc="$t('Not keep is secret, keep it anywhere')"
      :error="error"
      class="verify-form"
      @submit="handleSubmitForm"
    >
      <template #body>
        <ui-grid>
          <ui-alert
            v-if="showTips"
            variant="success"
            :message="$t('Copied to clipboard')"
          />
        </ui-grid>
        <ui-grid align-items="center" class="verify-form__field">
          <p class="verify-form__account-key">
            {{ accountKey }}
          </p>
          <ui-button
            variant="text"
            class="verify-form__copy-btn"
            @click="handleCopyBtnClick"
          >
            <copy-icon />
          </ui-button>
        </ui-grid>
        <ui-grid align-items="center" class="verify-form__warning">
          <p class="verify-form__warning-title">
            <span>{{ $t('Explain') }}:</span>
            {{
              $t(
                'you can safely store your account key anywhere, it does not contain any secrets'
              )
            }}
          </p>
        </ui-grid>
      </template>
      <template #footer>
        <ui-grid direction="row-reverse" alight-items="center">
          <ui-button variant="contained" type="submit">{{
            $t(`I've got it`)
          }}</ui-button>
        </ui-grid>
      </template>
    </auth-form>
    <auth-form-skeleton v-else :title="$t('Sign Up')" />
  </auth-page-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UiGrid, UiButton, UiAlert } from '@light-town/ui';
import AuthPageLayout from '~/layouts/auth/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton/index.vue';
import CopyIcon from '~/assets/copy.svg?inline';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'MasterPasswordPage',
  components: {
    UiGrid,
    UiButton,
    UiAlert,
    AuthForm,
    AuthFormSkeleton,
    AuthPageLayout,
    CopyIcon,
  },
  data() {
    return {
      loading: false,
      showTips: false,
      error: null,
    };
  },
  computed: {
    ...mapState({
      accountKey: state => state.cache.raws.accountKey,
    }),
  },
  methods: {
    ...mapActions({
      clearCache: cacheActionTypes.CLEAR_CACHE,
    }),
    async handleSubmitForm() {
      try {
        this.loading = true;

        await this.clearCache();

        this.$router.push('/sign-in');
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    async handleCopyBtnClick() {
      await navigator.clipboard.writeText(this.accountKey);

      this.showTips = true;

      setTimeout(() => (this.showTips = false), 3000);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
