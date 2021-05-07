<template>
  <primary-card v-bind="$attrs" v-on="$listeners">
    <template #icon>
      <contained-folder-icon
        v-if="$attrs['entries-count'] > 0"
        class="primary-card__icon"
      ></contained-folder-icon>
      <opened-empty-folder-icon v-else class="primary-card__icon">
      </opened-empty-folder-icon>
    </template>
  </primary-card>
</template>

<script>
import PrimaryCard from '~/components/cards/primary/index.vue';
import ContainedFolderIcon from '~/assets/illustrations/folder-with-contain.svg?inline';
import OpenedEmptyFolderIcon from '~/assets/illustrations/opened-empty-folder.svg?inline';

export default {
  name: 'FolderCard',
  components: {
    PrimaryCard,
    ContainedFolderIcon,
    OpenedEmptyFolderIcon,
  },
};
</script>
