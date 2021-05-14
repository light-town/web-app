<template>
  <search-params-parser :query="query" class="overflow-auto h-full">
    <template #default="{ items, loading }">
      <folders-grid :items="items" :loading="loading" />
    </template>
  </search-params-parser>
</template>

<script>
import FoldersGrid from './folders.vue';
import SearchParamsParser from '~/components/search-params-parser/index.vue';

export default {
  name: 'SearchGrid',
  components: {
    SearchParamsParser,
    FoldersGrid,
  },
  props: {
    query: {
      type: Object,
      required: true,
    },
  },
};
</script>
