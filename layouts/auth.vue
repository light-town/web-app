<template>
  <default-page-template class="auth-page">
    <ui-grid direction="column" justify="center" class="auth-page__layout">
      <project-logo></project-logo>
      <Nuxt />
      <links-form></links-form>
    </ui-grid>
  </default-page-template>
</template>

<script>
import { mapActions } from 'vuex';
import DefaultPageTemplate from './default-page-template.vue';
import UiGrid from '~/ui/grid/index.vue';
import ProjectLogo from '~/components/forms/auth/logo.vue';
import LinksForm from '~/components/forms/auth/links.vue';
import * as authActionTypes from '~/store/auth/types';
import * as devicesActionTypes from '~/store/devices/types';
import * as accountsActionTypes from '~/store/accounts/types';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'AuthLayout',
  components: {
    UiGrid,
    DefaultPageTemplate,
    ProjectLogo,
    LinksForm,
  },
  async mounted() {
    await this.initCacheService();
    await this.initAuthService();
    await this.initDevicesService();
    await this.initAccountsService();
  },
  methods: {
    ...mapActions({
      initCacheService: cacheActionTypes.INIT,
      initAuthService: authActionTypes.INIT,
      initDevicesService: devicesActionTypes.INIT,
      initAccountsService: accountsActionTypes.INIT,
    }),
  },
};
</script>

<style lang="scss">
#app[data-theme-mode='light'] {
  --color-auth-page-bg: var(--color-gray-50);
}

.auth-page {
  background-color: var(--color-auth-page-bg);

  & > .app-page__layout {
    justify-content: center !important;
  }

  &__layout {
    width: auto !important;
  }
}
</style>
