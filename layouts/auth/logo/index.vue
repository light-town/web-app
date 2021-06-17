<template>
  <ui-grid
    class="logo"
    align-items="center"
    justify="center"
    @click.native="redirect"
  >
    <p class="logo__title">LightTown</p>
    <logo-icon class="logo__icon"></logo-icon>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import LogoIcon from '@/assets/logo.svg?inline';

export default {
  name: 'Logo',
  components: {
    UiGrid,
    LogoIcon,
  },
  methods: {
    redirect() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
