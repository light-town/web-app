<template>
  <ui-grid align-items="center" justify="center" class="empty-folder-stub">
    <ui-grid direction="column" align-items="center">
      <empty-folder-icon class="empty-folder-stub__icon"></empty-folder-icon>
      <p class="empty-folder-stub__text">{{ $t('The folder is empty') }}</p>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
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
