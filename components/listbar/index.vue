<template>
  <ui-grid direction="column" class="listbar">
    <p class="listbar__title">Vaults</p>
    <span class="listbar__separator"></span>
    <ui-grid direction="column" class="listbar__menu">
      <new-vault-form></new-vault-form>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import NewVaultForm from '~/components/forms/new-vault/index.vue';

export default {
  name: 'Listbar',
  components: {
    UiGrid,
    NewVaultForm,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
