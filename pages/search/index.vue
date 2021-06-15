<template>
  <search-params-parser :query="query">
    <template #default="{ items, loading }">
      <main-page-layout
        :title="
          loading
            ? $t('Search for items...')
            : $tc('{n} items found', items.length)
        "
        :desc="$t('Search result')"
      >
        <template #main>
          <content-viewer>
            <template #table>
              <search-result-table :rows="items" :loading="loading" />
            </template>
            <template #grid>
              <search-result-grid :items="items" :loading="loading" />
            </template>
          </content-viewer>
        </template>
      </main-page-layout>
    </template>
  </search-params-parser>
</template>

<script>
import MainPageLayout from '~/layouts/main/index.vue';
import SearchResultTable from '~/components/tables/search-result.table.vue';
import SearchResultGrid from '~/components/grids/search-result.grid.vue';
import ContentViewer from '~/components/content-viewer/index.vue';
import SearchParamsParser from '~/components/search-params-parser/index.vue';

export default {
  name: 'SearchPage',
  components: {
    MainPageLayout,
    SearchResultTable,
    SearchResultGrid,
    ContentViewer,
    SearchParamsParser,
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
