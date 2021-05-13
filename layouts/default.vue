<template>
  <!-- <default-page-template class="default-page"> -->
  <Nuxt />
  <!--   </default-page-template> -->
</template>

<script>
/* import DefaultPageTemplate from './default-page-template.vue'; */

export default {
  name: 'DefaultLayout',
  /* components: {
    DefaultPageTemplate,
  }, */
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
