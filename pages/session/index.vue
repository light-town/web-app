<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form title="Welcome" @submit="handleSubmitForm">
        <template #content>
          <account
            version="A3"
            uuid="A6488L"
            username="Michael Shcherbakov"
          ></account>
          <ui-input
            type="password"
            placeholder="Enter Master Password"
            class="auth-form__input"
          ></ui-input>
          <NuxtLink to="/" class="link">Forgot Master Password?</NuxtLink>
        </template>
        <template #footer>
          <ui-grid direction="row-reverse">
            <ui-button variant="contained" type="submit">Next</ui-button>
          </ui-grid>
        </template>
      </auth-form>
      <links-form></links-form>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiButton from '~/ui/button/index.vue';
import Logo from '~/components/forms/auth/logo.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import Account from '~/components/forms/auth/account.vue';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    Logo,
    AuthForm,
    LinksForm,
    Account,
  },
  methods: {
    handleSubmitForm(e) {
      e.preventDefault();
    },
    redirectToSignUpPage() {
      this.$router.push('/sign-up');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
