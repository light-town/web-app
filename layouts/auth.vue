<template>
  <div class="page" data-theme-mode="light">
    <ui-grid class="page__container" justify="center">
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

<style lang="scss" src="./auth.scss"></style>
