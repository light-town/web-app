<template>
  <search-content-layout> </search-content-layout>
</template>

<script>
import SearchContentLayout from '~/layouts/search-content/index.vue';

export default {
  name: 'SearchPage',
  components: {
    SearchContentLayout,
  },
  middleware: ['auth'],
};
</script>

<style lang="scss" src="./index.scss"></style>
