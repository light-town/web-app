<template>
  <entry-card class="item-card">
    <template #body>
      <ui-grid align-items="center">
        <ui-grid align-items="center" class="item-card__category">
          <key-icon class="item-card__category-icon"> </key-icon>
          <p class="item-card__category-name" :title="categoryName">
            {{ categoryName }}
          </p>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column">
        <p class="item-card__datetime" :title="datetime">{{ datetime }}</p>
        <p class="item-card__name" :title="name">{{ name }}</p>
        <p class="item-card__desc" :title="desc">{{ desc }}</p>
      </ui-grid>
      <ui-grid
        direction="row"
        align-items="center"
        wrap="wrap"
        class="item-card__tags"
      >
        <ui-badge
          v-for="tag in tags"
          :key="tag"
          variant="contained"
          color="green"
          class="item-card__badge"
        >
          {{ tag }}
        </ui-badge>
      </ui-grid>
    </template>
  </entry-card>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import EntryCard from '~/components/cards/entry/index.vue';
import UiBadge from '~/ui/badge/index.vue';
import KeyIcon from '~/assets/key.svg?inline';

export default {
  name: 'ItemCard',
  components: {
    UiGrid,
    EntryCard,
    UiBadge,
    KeyIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
