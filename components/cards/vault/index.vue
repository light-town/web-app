<template>
  <entry-card class="vault-card">
    <template #body>
      <ui-avatar :name="name" :size="120" class="vault-card__avatar">
      </ui-avatar>
      <p class="vault-card__name" :title="name">{{ name }}</p>
      <p v-if="desc.length > 0" class="vault-card__desc" :title="desc">
        {{ desc }}
      </p>
    </template>
    <template #footer>
      <ui-grid align-items="center" justify="center" class="vault-card__footer">
        <ui-badge
          v-if="entriesCount > 0"
          variant="contained"
          color="green"
          class="vault-card__badge"
        >
          {{ entriesCount }}
        </ui-badge>
        <p class="vault-card__badge-desc">
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
import UiAvatar from '~/ui/avatar/index.vue';
import UiBadge from '~/ui/badge/index.vue';

export default {
  name: 'VaultCard',
  components: {
    UiGrid,
    UiAvatar,
    UiBadge,
    EntryCard,
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
