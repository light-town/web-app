<template>
  <ui-modal
    :open="open"
    :title="$t('Create Folder')"
    content-class="w-96"
    @close="handleCloseModal"
  >
    <ui-grid
      component="form"
      direction="column"
      class="new-vault-folder-modal__form"
    >
      <ui-input
        v-model="title"
        class="new-vault-folder-modal__input"
        :placeholder="$t('Title')"
      ></ui-input>
      <ui-input
        v-model="desc"
        class="new-vault-folder-modal__input"
        :placeholder="$t('Description (optional)')"
      ></ui-input>
    </ui-grid>
    <template #footer>
      <ui-button variant="text" @click="handleCloseModal">
        {{ $t('Cancel') }}
      </ui-button>
      <ui-button variant="contained" @click="handleClickCreateBtn">
        {{ $t('Create') }}
      </ui-button>
    </template>
  </ui-modal>
</template>

<script>
import { mapActions } from 'vuex';
import { UiGrid, UiButton, UiModal, UiInput } from '@light-town/ui';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default {
  name: 'CreateVaultFolderForm',
  components: {
    UiModal,
    UiGrid,
    UiButton,
    UiInput,
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
    folderUuid: {
      type: String,
      required: false,
      default: null,
    },
    vaultUuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      desc: '',
    };
  },
  methods: {
    ...mapActions({
      createVaultFolder: vaultFolderActionTypes.CREATE_VAULT_FOLDER,
    }),
    handleCloseModal(e) {
      this.$emit('close', e);
    },
    async handleClickCreateBtn(e) {
      await this.createVaultFolder({
        folderName: this.title.trim(),
        folderDesc: this.desc.trim(),
        parentFolderUuid: this.folderUuid,
        vaultUuid: this.vaultUuid,
      });

      this.handleCloseModal(e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
