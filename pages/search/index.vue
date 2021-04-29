<template>
  <search-content-layout>
    <global-content-table :query="query"></global-content-table>
  </search-content-layout>
</template>

<script>
import SearchContentLayout from '~/layouts/contents/search.vue';
import GlobalContentTable from '~/components/tables/content/global.vue';

export default {
  name: 'SearchPage',
  components: {
    SearchContentLayout,
    GlobalContentTable,
  },
  middleware: ['auth'],
  computed: {
    query() {
      return this.$route.query;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
