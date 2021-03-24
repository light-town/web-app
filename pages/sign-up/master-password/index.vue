<template>
  <ui-grid class="page__container" justify="center">
    <ui-grid direction="column" align-items="center" class="page__form-layout">
      <logo></logo>
      <auth-form
        title="Sign Up"
        desc="Choose your Master Password"
        @submit="handleSubmitForm"
      >
        <template #content>
          <ui-input
            type="password"
            placeholder="Enter a password"
            class="auth-form__input"
          ></ui-input>
          <ui-input
            type="password"
            placeholder="Confirm your password"
            class="auth-form__input"
          ></ui-input>

          <ui-grid align-items="center" class="warning">
            <padlock-icon class="warning__icon"></padlock-icon>
            <p class="warning__title">
              <span>Remember:</span> the logner and more random your password,
              the better!
            </p>
          </ui-grid>
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
import PadlockIcon from '~/assets/padlock.svg?inline';

export default {
  name: 'SignUpPage',
  components: {
    UiGrid,
    UiInput,
    UiButton,
    Logo,
    AuthForm,
    LinksForm,
    PadlockIcon,
  },
  methods: {
    handleSubmitForm(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
