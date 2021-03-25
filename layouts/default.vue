<template>
  <div class="page" data-theme-mode="light">
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as deviceActions from '~/store/devices/types';

export default {
  name: 'DefaultLayout',
  async mounted() {
    await this.initDeviceState();
  },
  methods: {
    ...mapActions({
      initDeviceState: deviceActions.LOAD_DEVICE_UUID,
    }),
  },
};
</script>
