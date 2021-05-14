<template>
  <ui-grid></ui-grid>
</template>

<script>
import { mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
  },
  layout: 'main',
  middleware: ['auth'],
  computed: {
    ...mapState({}),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
