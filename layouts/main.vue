<template>
  <app-page class="main-page">
    <Nuxt />
  </app-page>
</template>

<script>
import { mapActions } from 'vuex';
import AppPage from './app-page.vue';
import * as authActionTypes from '~/store/auth/types';
import * as devicesActionTypes from '~/store/devices/types';
import * as accountsActionTypes from '~/store/accounts/types';
import * as cacheActionTypes from '~/store/cache/types';
import * as keySetsActionTypes from '~/store/key-sets/types';

export default {
  name: 'DefaultLayout',
  components: {
    AppPage,
  },
  async created() {
    await this.initCacheService();
    await this.initAuthService();
    await this.initDevicesService();
    await this.initAccountsService();
    await this.loadKeySets();
  },
  beforeMount() {
    document.addEventListener('contextmenu', this.preventContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener('contextmenu', this.preventContextMenu);
  },
  methods: {
    ...mapActions({
      initCacheService: cacheActionTypes.INIT,
      initAuthService: authActionTypes.INIT,
      initDevicesService: devicesActionTypes.INIT,
      initAccountsService: accountsActionTypes.INIT,
      loadKeySets: keySetsActionTypes.LOAD_KEY_SETS,
    }),
    preventContextMenu(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss"></style>
