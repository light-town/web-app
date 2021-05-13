<template>
  <template-card
    class="primary-card"
    @click.native="handleCardClick"
    @dblclick.native="handleCardDblClick"
  >
    <template #body>
      <slot name="icon">
        <ui-avatar :name="name" :size="128" class="primary-card__icon" />
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
        <ui-badge
          v-if="entriesCount > 0"
          variant="contained"
          color="green"
          class="primary-card__badge"
        >
          {{ entriesCount }}
        </ui-badge>
        <p class="primary-card__badge-desc">
          {{
            entriesCount > 0 ? $t('Entries inside') : $t('No entries inside')
          }}
        </p>
      </ui-grid>
    </template>
  </template-card>
</template>

<script>
import TemplateCard from '~/components/cards/template/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiAvatar from '~/ui/avatar/index.vue';
import UiBadge from '~/ui/badge/index.vue';

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
