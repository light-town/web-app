<template>
  <app-page class="default-page">
    <Nuxt />
  </app-page>
</template>

<script>
import AppPage from './app-page.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppPage,
  },
  mounted() {
    document.addEventListener('contextmenu', this.preventContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener('contextmenu', this.preventContextMenu);
  },
  methods: {
    preventContextMenu(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss"></style>
