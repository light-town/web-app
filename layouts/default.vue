<template>
  <div class="page" data-theme-mode="light">
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as authActions from '~/store/auth/types';
import * as deviceActions from '~/store/devices/types';

export default {
  name: 'DefaultLayout',
  mounted() {
    this.initAuthService();
    this.initDeviceService();
  },
  methods: {
    ...mapActions({
      initAuthService: authActions.INIT,
      initDeviceService: deviceActions.INIT,
    }),
  },
};
</script>
