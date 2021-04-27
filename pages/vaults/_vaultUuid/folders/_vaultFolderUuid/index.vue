<template>
  <folder-content-layout>
    <folder-content-table :folder-uuid="currentVaultFolderUuid">
      <template #empty-table>
        <empty-folder-stub></empty-folder-stub>
      </template>
    </folder-content-table>
  </folder-content-layout>
</template>

<script>
import { mapState } from 'vuex';
import FolderContentLayout from '~/layouts/folder-content/index.vue';
import FolderContentTable from '~/components/tables/folder-content/index.vue';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';

export default {
  name: 'VaultFolderPage',
  components: {
    FolderContentTable,
    FolderContentLayout,
    EmptyFolderStub,
  },
  middleware: ['auth'],
  computed: {
    ...mapState({
      currentVaultFolderUuid: state =>
        state['vault-folders'].currentVaultFolderUuid,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
