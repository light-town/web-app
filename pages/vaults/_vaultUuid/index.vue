<template>
  <folder-content-layout>
    <folder-content-table>
      <template #empty-table>
        <empty-folder-stub></empty-folder-stub>
      </template>
    </folder-content-table>
  </folder-content-layout>
</template>

<script>
import FolderContentLayout from '~/layouts/folder-content/index.vue';
import FolderContentTable from '~/components/tables/folder-content/index.vue';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';

export default {
  name: 'VaultPage',
  components: {
    FolderContentTable,
    FolderContentLayout,
    EmptyFolderStub,
  },
  middleware: ['auth'],
};
</script>

<style lang="scss" src="./index.scss"></style>
