<template>
  <div class="page" data-theme-mode="light">
    <ui-grid class="page-layout auth-page-layout" justify="center">
      <ui-grid
        direction="column"
        align-items="center"
        class="auth-form__layout"
      >
        <project-logo></project-logo>
        <Nuxt />
        <links-form></links-form>
      </ui-grid>
    </ui-grid>
    <portal-target name="modals-location" multiple> </portal-target>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
.page[data-theme-mode='light'] {
  --color--color-sign-in-page-bg: var(--color-gray-50);
  --color-sign-in-page-link-text: var(--color-green-400);
  --color-sign-in-page-link-hover-text: var(--color-green-500);
}

.page-layout {
  width: 100%;
  height: 100vh;
}

.auth-page-layout {
  background-color: var(--color--color-sign-in-page-bg);
}

.auth-form__layout {
  width: auto !important;
}

.link {
  font-size: 15px;
  color: var(--color-sign-in-page-link-text);

  &:hover {
    color: var(--color-sign-in-page-link-hover-text);
  }
}
</style>
