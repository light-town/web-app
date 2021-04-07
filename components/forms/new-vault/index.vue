<template>
  <ui-grid>
    <ui-button
      variant="outlined"
      class="appbar__new-vault-btn"
      @click="openForm"
    >
      <add-icon class="new-vault-btn__icon"></add-icon>
      <p class="new-vault-btn__text">New Vault</p>
    </ui-button>
    <ui-modal :open="open" @close="handleCloseForm">
      <form @submit.prevent="handleFormSubmit">
        <ui-grid direction="column" class="new-vault-form" align-items="center">
          <p class="new-vault-form__title">New Vault</p>
          <ui-avatar name="V" class="new-vault-form__avatar"></ui-avatar>
          <ui-grid direction="column">
            <ui-input
              v-model="title"
              placeholder="Vault Title"
              class="new-vault-form__input"
              tabindex="1"
            ></ui-input>
            <ui-input
              v-model="desc"
              placeholder="Description (optional)"
              class="new-vault-form__input"
              tabindex="2"
            ></ui-input>
          </ui-grid>
          <ui-grid
            align-items="center"
            justify="space-between"
            class="new-vault-form__controls"
          >
            <ui-button variant="outlined" tabindex="4" @click="handleCloseForm">
              Cancel
            </ui-button>
            <ui-button variant="contained" type="submit" tabindex="3">
              Create Vault
            </ui-button>
          </ui-grid>
        </ui-grid>
      </form>
    </ui-modal>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiModal from '~/ui/modal/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import UiInput from '~/ui/input/index.vue';
import AddIcon from '~/assets/add.svg?inline';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    UiButton,
    UiModal,
    UiAvatar,
    UiInput,
    AddIcon,
  },
  data() {
    return {
      open: false,
      title: '',
      desc: '',
    };
  },
  methods: {
    handleCloseForm() {
      this.open = false;
    },
    openForm() {
      this.open = true;
    },
    handleFormSubmit() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
