<template>
  <vault-content-layout>
    <vault-content-table>
      <template #empty-table>
        <empty-folder-stub></empty-folder-stub>
      </template>
    </vault-content-table>
  </vault-content-layout>
</template>

<script>
import VaultContentLayout from '~/layouts/vault-content/index.vue';
import VaultContentTable from '~/components/tables/content/vault.vue';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';

export default {
  name: 'VaultPage',
  components: {
    VaultContentLayout,
    VaultContentTable,
    EmptyFolderStub,
  },
  middleware: ['auth'],
};
</script>

<style lang="scss" src="./index.scss"></style>
