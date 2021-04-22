<template>
  <ui-grid>
    <ui-button variant="outlined" class="new-vault-btn" @click="openForm">
      <add-icon class="new-vault-btn__icon"></add-icon>
      <p class="new-vault-btn__text">{{ $t('New Vault') }}</p>
    </ui-button>
    <ui-modal :open="open" :title="$t('New vault')" @close="handleCloseForm">
      <ui-grid
        component="form"
        direction="column"
        class="new-vault-form"
        align-items="center"
        @submit.prevent="handleFormSubmit"
      >
        <ui-avatar :name="name" class="new-vault-form__avatar"></ui-avatar>
        <ui-grid direction="column">
          <ui-alert v-if="error" severity="error" class="new-vault-form__alert">
            {{ error.message }}
          </ui-alert>
          <ui-input
            v-model="name"
            :placeholder="$t('Title')"
            class="new-vault-form__input"
            tabindex="1"
          ></ui-input>
          <ui-input
            v-model="desc"
            :placeholder="$t('Description (optional)')"
            class="new-vault-form__input"
            tabindex="2"
          ></ui-input>
        </ui-grid>
      </ui-grid>
      <template #footer>
        <ui-button variant="text" tabindex="4" @click="handleCloseForm">
          {{ $t('Cancel') }}
        </ui-button>
        <ui-button variant="contained" tabindex="3" @click="handleFormSubmit">
          {{ $t('Create') }}
        </ui-button>
      </template>
    </ui-modal>
  </ui-grid>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiModal from '~/ui/modal/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiAlert from '~/ui/alert/index.vue';
import AddIcon from '~/assets/add.svg?inline';
import * as vaultsActionTypes from '~/store/vaults/types';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    UiButton,
    UiModal,
    UiAvatar,
    UiInput,
    UiAlert,
    AddIcon,
  },
  data() {
    return {
      localError: null,
      open: false,
      name: '',
      desc: '',
    };
  },
  computed: {
    ...mapState({
      currentAccountUuid: state => state.accounts.currentAccountUuid,
      error(state) {
        return this.localError || state.accounts.error;
      },
    }),
  },
  watch: {
    name() {
      this.localError = this.localError ? null : this.localError;
    },
  },
  methods: {
    ...mapActions({
      createVault: vaultsActionTypes.CREATE_VAULT,
    }),
    handleCloseForm() {
      this.open = false;
    },
    openForm() {
      this.open = true;
    },
    async handleFormSubmit() {
      if (this.name.trim().length < 8) {
        this.localError = new Error('The vault title must has more 8 symbols');
        return;
      }

      await this.createVault({
        name: this.name.trim(),
        desc: this.desc.trim(),
      });

      this.open = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
