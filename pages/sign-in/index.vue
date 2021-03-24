<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Sign In"
        desc="Use your LightTown Account"
        @submit="handleSubmitForm"
      >
        <template #content>
          <ui-input
            type="text"
            placeholder="Enter Account Key"
            class="auth-form__input"
          ></ui-input>
          <NuxtLink to="/" class="link">Forgot account Key?</NuxtLink>
        </template>
        <template #footer>
          <ui-button variant="outlined" @click="redirectToSignUpPage">
            Create Account
          </ui-button>
          <ui-button variant="contained" type="submit">Next</ui-button>
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

export default {
  name: 'SignInPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    Logo,
    AuthForm,
    LinksForm,
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
