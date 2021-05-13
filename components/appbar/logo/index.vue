<template>
  <ui-grid align-items="center" class="app-logo">
    <logo-icon class="app-logo__icon" />
    <p class="app-logo__title">LightTown</p>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import LogoIcon from '~/assets/logo.svg?inline';

export default {
  name: 'Logo',
  components: {
    UiGrid,
    LogoIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
