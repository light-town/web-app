<template>
  <ui-modal
    :open="open"
    :title="$t('New vault')"
    content-class="w-96"
    @close="handleCloseModal"
  >
    <ui-grid
      component="form"
      direction="column"
      class="new-vault-form"
      align-items="center"
    >
      <ui-alert v-if="error" severity="error" class="auth-form__alert">
        {{ error.message }}
      </ui-alert>
      <ui-avatar :name="title" class="mb-1.5"></ui-avatar>
      <ui-grid direction="column">
        <ui-alert v-if="error" severity="error" class="new-vault-form__alert">
          {{ error.message }}
        </ui-alert>
        <ui-input
          v-model="title"
          :placeholder="$t('Title')"
          class="my-1.5"
        ></ui-input>
        <ui-input
          v-model="desc"
          :placeholder="$t('Description (optional)')"
          class="my-1.5"
        ></ui-input>
      </ui-grid>
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
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiModal from '~/ui/modal/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'CreateVaultFolderForm',
  components: {
    UiModal,
    UiGrid,
    UiButton,
    UiInput,
    UiAvatar,
    UiAlert,
  },
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      title: '',
      desc: '',
    };
  },
  computed: {
    ...mapState({
      currentAccountUuid: state => state.accounts.currentAccountUuid,
      error(state) {
        return this.localError ?? state.accounts.error ?? state.vaults.error;
      },
    }),
  },
  watch: {
    title() {
      if (!this.validate() && this.localError) return;

      this.localError = null;
    },
  },
  methods: {
    ...mapActions({
      createVault: vaultActionTypes.CREATE_VAULT,
    }),
    handleCloseModal(e) {
      this.$emit('close', e);
    },
    async handleClickCreateBtn(e) {
      if (!this.validate()) {
        this.localError = new Error(
          this.$t('The vault title must has more 8 symbols')
        );
        return;
      }

      await this.createVault({
        name: this.title.trim(),
        desc: this.desc.trim(),
      });

      this.handleCloseModal(e);
    },
    validate() {
      return this.title.trim().length >= 8;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
