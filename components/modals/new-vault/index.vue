<template>
  <ui-modal :open="open" :title="$t('New vault')" @close="handleCloseModal">
    <ui-grid
      component="form"
      direction="column"
      class="new-vault-form"
      align-items="center"
    >
      <ui-alert
        v-if="error"
        variant="error"
        class="auth-form__alert"
        :message="error.message"
      />
      <ui-avatar :name="title" :alt="title" class="ui-mb-2" />
      <ui-grid direction="column">
        <ui-input v-model="title" :placeholder="$t('Title')" class="ui-my-2" />
        <ui-input
          v-model="desc"
          :placeholder="$t('Description (optional)')"
          class="ui-my-2"
        />
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
import {
  UiGrid,
  UiButton,
  UiModal,
  UiInput,
  UiAvatar,
  UiAlert,
} from '@light-town/ui';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'CreateVaultForm',
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
      error: null,
    };
  },
  computed: {
    ...mapState({
      currentAccountUuid: state => state.accounts.currentAccountUuid,
    }),
  },
  watch: {
    title() {
      if (!this.validate() && this.error) return;

      this.error = null;
    },
  },
  created() {
    this.title = '';
    this.desc = '';
    this.error = null;
  },
  methods: {
    ...mapActions({
      createVault: vaultActionTypes.CREATE_ACCOUNT_VAULT,
    }),
    handleCloseModal(e) {
      this.$emit('close', e);
    },
    async handleClickCreateBtn(e) {
      if (!this.validate()) {
        this.error = new Error(
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
