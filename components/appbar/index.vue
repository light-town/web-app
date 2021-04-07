<template>
  <ui-grid align-items="center" justify="space-between" class="appbar">
    <ui-grid align-items="center">
      <ui-button variant="outlined" class="appbar__new-vault-btn">
        <add-icon class="new-vault-btn__icon"></add-icon>
        <p class="new-vault-btn__text">New Vault</p>
      </ui-button>
    </ui-grid>
    <ui-grid align-items="center" justify="flex-end">
      <account></account>
    </ui-grid>
  </ui-grid>
</template>

<script>
import Account from './account/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import AddIcon from '~/assets/add.svg?inline';

export default {
  name: 'Appbar',
  components: {
    UiGrid,
    UiButton,
    AddIcon,
    Account,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
