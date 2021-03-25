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
          <ui-grid align-items="center" class="field">
            <p class="account-key">
              A3-A6488L-A6488L-A6488L-A6488L-A6488L-A6488L
            </p>
            <ui-button variant="text" class="copy-btn">
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
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import Logo from '~/components/forms/auth/logo.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import CopyIcon from '~/assets/copy.svg?inline';

export default {
  name: 'MasterPasswordPage',
  components: {
    UiGrid,
    UiButton,
    Logo,
    AuthForm,
    LinksForm,
    CopyIcon,
  },
  methods: {
    handleSubmitForm(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
