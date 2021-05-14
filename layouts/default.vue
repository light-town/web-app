<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'DefaultLayout',
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
