<template>
  <entry-card class="folder-card">
    <template #body>
      <contained-folder-icon
        v-if="entriesCount > 0"
        class="folder-card__icon"
      ></contained-folder-icon>
      <opened-empty-folder-icon v-else class="folder-card__icon">
      </opened-empty-folder-icon>
      <p class="folder-card__name" :title="name">{{ name }}</p>
      <p v-if="desc.length > 0" class="folder-card__desc" :title="desc">
        {{ desc }}
      </p>
    </template>
    <template #footer>
      <ui-grid
        align-items="center"
        justify="center"
        class="folder-card__footer"
      >
        <ui-badge
          v-if="entriesCount > 0"
          variant="contained"
          color="green"
          class="folder-card__badge"
        >
          {{ entriesCount }}
        </ui-badge>
        <p class="folder-card__badge-desc">
          {{
            entriesCount > 0 ? $t('Entries inside') : $t('No entries inside')
          }}
        </p>
      </ui-grid>
    </template>
  </entry-card>
</template>

<script>
import EntryCard from '~/components/cards/entry/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiBadge from '~/ui/badge/index.vue';
import ContainedFolderIcon from '~/assets/folder-full.svg?inline';
import OpenedEmptyFolderIcon from '~/assets/opened-empty-folder.svg?inline';

export default {
  name: 'FolderCard',
  components: {
    UiGrid,
    UiBadge,
    EntryCard,
    ContainedFolderIcon,
    OpenedEmptyFolderIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
      default: '',
    },
    entriesCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
