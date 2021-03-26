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
          <auth-illustration class="illustration"></auth-illustration>
          <p class="title">Check your phone</p>
          <p class="desc">
            LightTown sent a notification to your <span>{{ phone }}</span> and
            <span>{{ os }}</span
            >. Finish fingerprint authorization to continue.
          </p>
          <NuxtLink to="/" class="link">Try another way?</NuxtLink>
        </template>
      </auth-form>
      <links-form></links-form>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import Logo from '~/components/forms/auth/logo.vue';
import AuthForm from '~/components/forms/auth/form.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import Account from '~/components/forms/auth/account.vue';
import AuthIllustration from '~/assets/illustrations/2fa.svg?inline';

export default {
  name: 'VerifyPage',
  components: {
    UiGrid,
    Logo,
    AuthForm,
    LinksForm,
    Account,
    AuthIllustration,
  },
  data() {
    return {
      phone: 'Redmi Note 7',
      os: 'Android',
    };
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
