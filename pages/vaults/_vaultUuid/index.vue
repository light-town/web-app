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
import { mapActions } from 'vuex';
import FolderContentLayout from '~/layouts/folder-content/index.vue';
import FolderContentTable from '~/components/tables/folder-content/index.vue';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'VaultPage',
  components: {
    FolderContentTable,
    FolderContentLayout,
    EmptyFolderStub,
  },
  middleware: ['auth'],
  async created() {
    await this.setCurrentVaultFolder({ uuid: null });
  },
  methods: {
    ...mapActions({
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
