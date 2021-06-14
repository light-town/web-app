<template>
  <ui-button
    variant="contained"
    class="showcase-card__footer-button add-item-button"
  >
    <item-icon
      class="showcase-card__footer-button-icon add-item-button__icon"
    ></item-icon>
    <p class="showcase-card__footer-button-text add-item-button__text">
      Add Item
    </p>
  </ui-button>
</template>

<script>
import { UiButton } from '@light-town/ui';
import ItemIcon from '~/assets/item.svg?inline';

export default {
  name: 'AddItemButton',
  components: {
    UiButton,
    ItemIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
