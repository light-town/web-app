<template>
  <div class="page" data-theme-mode="light">
    <Nuxt />
    <portal-target name="modals-location" multiple> </portal-target>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as authActionTypes from '~/store/auth/types';
import * as devicesActionTypes from '~/store/devices/types';
import * as accountsActionTypes from '~/store/accounts/types';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'DefaultLayout',
  mounted() {
    this.initCacheService();
    this.initAuthService();
    this.initDevicesService();
    this.initAccountsService();
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
