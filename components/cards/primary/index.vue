<template>
  <template-card
    class="primary-card"
    :class="{ 'primary-card_active': active }"
    @click.native="handleCardClick"
    @dblclick.native="handleCardDblClick"
  >
    <template #body>
      <slot name="icon">
        <ui-avatar
          :name="name"
          :alt="name"
          :size="128"
          class="primary-card__icon"
        />
      </slot>
      <p class="primary-card__name" :title="name">{{ name }}</p>
      <p v-if="desc.length > 0" class="primary-card__desc" :title="desc">
        {{ desc }}
      </p>
    </template>
    <template #footer>
      <ui-grid
        align-items="center"
        justify="center"
        class="primary-card__footer"
      >
        <template v-if="entriesInsideExists">
          <ui-badge
            v-if="entriesCount > 0"
            variant="contained"
            color="green"
            class="primary-card__badge"
          >
            {{ entriesCount }}
          </ui-badge>
          <p class="primary-card__badge-desc">
            {{ $tc(labelEntriesInside, entriesCount) }}
          </p>
        </template>
      </ui-grid>
    </template>
  </template-card>
</template>

<script>
import { UiGrid, UiAvatar, UiBadge } from '@light-town/ui';
import TemplateCard from '~/components/cards/template/index.vue';

export default {
  name: 'PrimaryCard',
  components: {
    UiGrid,
    UiAvatar,
    UiBadge,
    TemplateCard,
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
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    labelEntriesInside: {
      type: String,
      required: false,
      default: '{n} Entries inside',
    },
    entriesInsideExists: {
      type: Boolean,
      required: false,
      default: true,
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
