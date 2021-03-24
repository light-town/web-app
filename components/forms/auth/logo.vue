<template>
  <ui-grid class="logo" align-items="center" justify="center">
    <p class="logo__title">LightTown</p>
    <logo-icon class="logo__icon"></logo-icon>
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

<style lang="scss" src="./logo.scss"></style>
