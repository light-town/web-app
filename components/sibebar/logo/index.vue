<template>
  <ui-grid align-items="center" class="sidebar__logo">
    <logo-icon class="sidebar__logo-icon"></logo-icon>
    <p class="sidebar__logo-title">LightTown</p>
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
