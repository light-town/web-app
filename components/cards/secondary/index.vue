<template>
  <template-card
    class="secondary-card"
    @click.native="handleCardClick"
    @dblclick.native="handleCardDblClick"
  >
    <template #body>
      <ui-grid align-items="center" class="mb-4">
        <ui-grid align-items="center" class="secondary-card__category">
          <key-icon class="secondary-card__category-icon"> </key-icon>
          <p class="secondary-card__category-name" :title="categoryName">
            {{ categoryName }}
          </p>
        </ui-grid>
      </ui-grid>
      <ui-grid direction="column">
        <p class="secondary-card__datetime" :title="datetime">{{ datetime }}</p>
        <p class="secondary-card__name" :title="name">{{ name }}</p>
        <p class="secondary-card__desc" :title="desc">{{ desc }}</p>
      </ui-grid>
      <ui-grid
        direction="row"
        align-items="center"
        wrap="wrap"
        class="secondary-card__tags"
      >
        <ui-badge
          v-for="tag in tags"
          :key="tag"
          variant="contained"
          color="green"
          class="secondary-card__badge"
        >
          {{ tag }}
        </ui-badge>
      </ui-grid>
    </template>
  </template-card>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import TemplateCard from '~/components/cards/template/index.vue';
import UiBadge from '~/ui/badge/index.vue';
import KeyIcon from '~/assets/key.svg?inline';

export default {
  name: 'SecondaryCard',
  components: {
    UiGrid,
    TemplateCard,
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
  methods: {
    handleCardClick(e) {
      this.$emit('click', e);
    },
    handleCardDblClick(e) {
      this.$emit('dblclick', e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
