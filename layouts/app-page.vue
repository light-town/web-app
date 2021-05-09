<template>
  <ui-grid id="app" class="app-page" data-theme-mode="light">
    <ui-grid id="app-page-content" class="app-page__layout">
      <slot></slot>
    </ui-grid>
    <portal-target name="modals-location" multiple> </portal-target>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'AppPage',
  components: {
    UiGrid,
  },
};
</script>

<style lang="scss">
.app-page {
  width: 100%;
  height: 100vh;

  overflow: auto;
}
</style>
