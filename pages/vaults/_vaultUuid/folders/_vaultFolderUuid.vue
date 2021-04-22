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
import { mapGetters, mapActions } from 'vuex';
import FolderContentLayout from '~/layouts/folder-content/index.vue';
import FolderContentTable from '~/components/tables/folder-content/index.vue';
import EmptyFolderStub from '~/components/stubs/empty-folder/index.vue';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'VaultFolderPage',
  components: {
    FolderContentTable,
    FolderContentLayout,
    EmptyFolderStub,
  },
  middleware: ['auth'],
  computed: {
    ...mapGetters(['currentVaultFolder']),
    currentVaultFolderUuid() {
      return this.currentVaultFolder?.uuid;
    },
  },
  async created() {
    await this.setCurrentVaultFolder({
      uuid: this.$route.params.vaultFolderUuid ?? null,
    });
  },
  methods: {
    ...mapActions({
      setCurrentVaultFolder: vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER,
    }),
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
