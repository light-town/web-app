<template>
  <ui-grid
    direction="column"
    align-items="center"
    justify="center"
    class="empty-folder-stub"
  >
    <empty-folder-icon class="empty-folder-stub__illustrate" />
    <ui-grid
      direction="column"
      align-items="center"
      class="empty-folder-stub__text"
    >
      <p class="empty-folder-stub__title">
        {{ $t('Your folder is empty') }}
      </p>
      <p class="empty-folder-stub__desc">
        {{ $t('To create a folder or item, right-click on an empty space') }}
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import EmptyFolderIcon from '~/assets/empty-folder.svg?inline';

export default {
  name: 'EmptyFolderStub',
  components: {
    UiGrid,
    EmptyFolderIcon,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
