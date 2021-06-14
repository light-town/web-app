<template>
  <main-page-layout :title="$t('Nothing to find')" :desc="$t('Search results')">
    <template #main>
      <content-viewer class="ui-h-full ui-overflow-auto">
        <template #table>
          <search-content-table :query="query" />
        </template>
        <template #grid>
          <search-content-grid :query="query" />
        </template>
      </content-viewer>
    </template>
  </main-page-layout>
</template>

<script>
import MainPageLayout from '~/layouts/main/index.vue';
import SearchContentTable from '~/components/tables/content/search.vue';
import SearchContentGrid from '~/components/grids/content/search.vue';

export default {
  name: 'SearchPage',
  components: {
    MainPageLayout,
    SearchContentTable,
    SearchContentGrid,
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
