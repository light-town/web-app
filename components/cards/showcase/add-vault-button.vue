<template>
  <ui-button
    variant="contained"
    class="showcase-card__footer-button add-vault-button"
  >
    <locker-icon
      class="showcase-card__footer-button-icon add-vault-button__icon"
    ></locker-icon>
    <p class="showcase-card__footer-button-text add-vault-button__text">
      Add Vault
    </p>
  </ui-button>
</template>

<script>
import { UiButton } from '@light-town/ui';
import LockerIcon from '~/assets/vault.svg?inline';

export default {
  name: 'AddVaultButton',
  components: {
    UiButton,
    LockerIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
