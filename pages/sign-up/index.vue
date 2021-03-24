<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Sign Up"
        desc="Welcom to LightTown Platform"
        @submit="handleSubmitForm"
      >
        <template #content>
          <ui-input
            type="text"
            placeholder="Enter your username"
            class="auth-form__input"
          ></ui-input>
          <NuxtLink to="/sign-in" class="link">
            Already has an account?
          </NuxtLink>
        </template>
        <template #footer>
          <ui-button variant="contained" type="submit" class="btn">
            Next
          </ui-button>
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
  name: 'SignUpPage',
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
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
