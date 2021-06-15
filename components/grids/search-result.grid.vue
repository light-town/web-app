<template>
  <folder-contents-grid v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import FolderContentsGrid from './folder-contents.grid.vue';

export default {
  name: 'SearchGrid',
  components: {
    FolderContentsGrid,
  },
};
</script>
