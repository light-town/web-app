<template>
  <ui-button
    variant="outlined"
    class="showcase-card__footer-button add-folder-button"
  >
    <opened-empty-folder-icon
      class="showcase-card__footer-button-icon"
    ></opened-empty-folder-icon>
    <p class="showcase-card__footer-button-text add-folder-button__text">
      Add Folder
    </p>
  </ui-button>
</template>

<script>
import { UiButton } from '@light-town/ui';
import OpenedEmptyFolderIcon from '~/assets/opened-empty-folder.svg?inline';

export default {
  name: 'AddFolderButton',
  components: {
    UiButton,
    OpenedEmptyFolderIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
