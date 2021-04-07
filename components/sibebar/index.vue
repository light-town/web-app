<template>
  <ui-grid direction="column" class="sidebar">
    <sidebar-logo></sidebar-logo>
    <sidebar-menu></sidebar-menu>
  </ui-grid>
</template>

<script>
import SidebarLogo from './logo/index.vue';
import SidebarMenu from './menu/index.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'Sidebar',
  components: {
    UiGrid,
    SidebarMenu,
    SidebarLogo,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
