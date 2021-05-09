<template>
  <div class="page" data-theme-mode="light">
    <div class="page-layout"><Nuxt /></div>
    <portal-target name="modals-location" multiple> </portal-target>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  created() {
    this.$axios
      .get('/auth/csrf-token')
      .then(response =>
        this.$axios.setHeader(
          'X-CSRF-TOKEN',
          response.data.data['X-CSRF-TOKEN']
        )
      );
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

<style lang="scss">
.page-layout {
  width: 100%;
  min-height: 100vh;
}
</style>
