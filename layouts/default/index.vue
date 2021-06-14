<template>
  <ui-theme-provider class="app-page-layout" mode="light">
    <slot></slot>
  </ui-theme-provider>
</template>

<script>
import { mapActions } from 'vuex';
import { UiThemeProvider } from '@light-town/ui';
import * as accountsActionTypes from '~/store/accounts/types';
import * as deviceActionTypes from '~/store/devices/types';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  name: 'DefaultPageLayout',
  components: {
    UiThemeProvider,
  },
  mounted() {
    this.loadAccountsFromStorage();
    this.loadDeviceFromStorage();
    this.loadCache();

    document.addEventListener('contextmenu', this.handleContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
  },
  methods: {
    ...mapActions({
      loadAccountsFromStorage: accountsActionTypes.LOAD_ACCOUNTS_FROM_STORAGE,
      loadDeviceFromStorage: deviceActionTypes.LOAD_DEVICE,
      loadCache: cacheActionTypes.LOAD_CACHE,
    }),
    handleContextMenu(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
