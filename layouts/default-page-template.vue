<template>
  <ui-grid id="app" class="app-page" data-theme-mode="light">
    <ui-grid id="app-page-layout" class="app-page__layout">
      <slot></slot>
    </ui-grid>
    <portal-target name="modals-location" multiple> </portal-target>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'DefaultPageTemplate',
  components: {
    UiGrid,
  },
};
</script>

<style lang="scss">
#app[data-theme-mode='light'] {
  --color-app-page-title-text: var(--color-gray-650);
}

.app-page {
  width: 100%;
  height: 100vh;

  flex-grow: 0;
  flex-shrink: 0;

  overflow: auto;

  &__layout {
    height: 100%;
  }
}
</style>
