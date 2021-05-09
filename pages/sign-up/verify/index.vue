<template>
  <auth-form
    v-if="isCacheServiceInit && accountKey"
    :title="$t('Meet your Account Key')"
    :desc="$t('Not keep is secret, keep it anywhere')"
    class="verify-form"
    @submit="handleSubmitForm"
  >
    <template #body>
      <ui-alert v-if="showTips" severity="success">
        {{ $t('Copied to clipboard') }}
      </ui-alert>
      <ui-grid align-items="center" class="verify-form__field">
        <p class="verify-form__account-key">
          {{ accountKey }}
        </p>
        <ui-button
          variant="text"
          class="verify-form__copy-btn"
          @click="handleCopyBtnClick"
        >
          <copy-icon></copy-icon>
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AuthForm from '~/components/forms/auth/form/index.vue';
import AuthFormSkeleton from '~/components/forms/auth/skeleton.vue';
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
    CopyIcon,
  },
  layout: 'auth',
  data() {
    return {
      showTips: false,
    };
  },
  computed: {
    ...mapState({
      isCacheServiceInit: state => state.cache.isInit,
      accountKey: state => state.cache.raws.accountKey,
    }),
  },
  watch: {
    isCacheServiceInit() {
      if (this.isCacheServiceInit && !this.accountKey)
        this.$router.push('/sign-up');
    },
  },
  methods: {
    ...mapActions({
      clearCache: cacheActionTypes.CLEAR_CACHE,
    }),
    async handleSubmitForm(e) {
      e.preventDefault();

      await this.clearCache();

      if (!this.error) this.$router.push('/sign-in');
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
