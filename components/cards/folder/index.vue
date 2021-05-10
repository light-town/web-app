<template>
  <primary-card v-bind="$attrs" v-on="$listeners">
    <template #icon>
      <ui-grid
        align-items="flex-end"
        justify="center"
        class="primary-card__icon"
      >
        <opened-empty-folder-icon v-if="isFolderEmpty" />
        <contained-folder-icon v-else />
      </ui-grid>
    </template>
  </primary-card>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import PrimaryCard from '~/components/cards/primary/index.vue';
import ContainedFolderIcon from '~/assets/illustrations/folder-with-contain.svg?inline';
import OpenedEmptyFolderIcon from '~/assets/illustrations/opened-empty-folder.svg?inline';

export default {
  name: 'FolderCard',
  components: {
    UiGrid,
    PrimaryCard,
    ContainedFolderIcon,
    OpenedEmptyFolderIcon,
  },
  computed: {
    isFolderEmpty() {
      return !this.$attrs['entries-count'];
    },
  },
};
</script>
