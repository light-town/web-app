<template>
  <folder-content-layout>
    <folder-content-table
      v-if="currentVaultFolderUuid"
      :folder-uuid="currentVaultFolderUuid"
    >
      <template #empty-table>
        <empty-folder-stub></empty-folder-stub>
      </template>
    </folder-content-table>
  </folder-content-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import FolderContentLayout from '~/layouts/folder-content/index.vue';
import FolderContentTable from '~/components/tables/content/folder.vue';
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
    ...mapGetters(['currentVaultFolder']),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
