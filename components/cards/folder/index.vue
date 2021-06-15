<template>
  <primary-card v-bind="$attrs" v-on="$listeners">
    <template #icon>
      <ui-grid
        align-items="flex-end"
        justify="center"
        class="ui-w-32 ui-h-32 ui-mb-3.5 ui-flex-fixed"
      >
        <opened-empty-folder-icon
          v-if="isFolderEmpty"
          class="ui-w-32 ui-mb-3.5"
        />
        <contained-folder-icon v-else />
      </ui-grid>
    </template>
  </primary-card>
</template>

<script>
import { UiGrid } from '@light-town/ui';
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
