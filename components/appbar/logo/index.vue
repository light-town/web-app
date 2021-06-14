<template>
  <ui-grid align-items="center" class="app-logo" @click.native="openStartPage">
    <logo-icon class="app-logo__icon" />
    <p class="app-logo__title">LightTown</p>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import LogoIcon from '~/assets/logo.svg?inline';

export default {
  name: 'Logo',
  components: {
    UiGrid,
    LogoIcon,
  },
  methods: {
    openStartPage() {
      this.$router.push('/vaults');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
