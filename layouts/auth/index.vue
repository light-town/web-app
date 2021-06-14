<template>
  <default-page-layout>
    <ui-grid class="auth-page-layout" justify="center">
      <ui-grid
        direction="column"
        align-items="center"
        class="auth-page-layout__layout"
      >
        <app-logo />
        <slot></slot>
        <app-links />
      </ui-grid>
    </ui-grid>
  </default-page-layout>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import DefaultPageLayout from '@/layouts/default/index.vue';
import AppLogo from './logo/index.vue';
import AppLinks from './links/index.vue';

export default {
  name: 'AuthPageLayout',
  components: {
    UiGrid,
    AppLogo,
    AppLinks,
    DefaultPageLayout,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
