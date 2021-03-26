<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Meet your Account Key"
        desc="Not keep is secret, keep it anywhere"
        @submit="handleSubmitForm"
      >
        <template #content>
          <ui-alert v-if="showTips" severity="success"
            >Copied to clipboard</ui-alert
          >
          <ui-grid align-items="center" class="field">
            <p class="account-key">
              {{ accountKey }}
            </p>
            <ui-button
              variant="text"
              class="copy-btn"
              @click="handleCopyBtnClick"
            >
              <copy-icon></copy-icon>
            </ui-button>
          </ui-grid>
          <ui-grid align-items="center" class="warning">
            <p class="warning__title">
              <span>Explain:</span> you can safely store your account key
              anywhere, it does not contain any secrets.
            </p>
          </ui-grid>
        </template>
        <template #footer>
          <ui-grid direction="row-reverse" alight-items="center">
            <ui-button variant="contained" type="submit">I've got it</ui-button>
          </ui-grid>
        </template>
      </auth-form>
      <links-form></links-form>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import Logo from '~/components/forms/auth/logo.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import CopyIcon from '~/assets/copy.svg?inline';
import * as authActions from '~/store/auth/types';

export default {
  name: 'MasterPasswordPage',
  components: {
    UiGrid,
    UiButton,
    UiAlert,
    Logo,
    AuthForm,
    LinksForm,
    CopyIcon,
  },
  data() {
    return {
      showTips: false,
    };
  },
  computed: {
    ...mapState({
      accountKey: state => state.auth.accountKey,
    }),
  },
  methods: {
    ...mapActions({
      clearAuthCache: authActions.CLEAR_CACHE,
    }),
    async handleSubmitForm(e) {
      e.preventDefault();

      await this.clearAuthCache();

      this.$router.push('/sign-in');
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
