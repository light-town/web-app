<template>
  <entry-card class="skeleton-card">
    <template #header>
      <ui-skeleton
        width="32px"
        height="16px"
        class="skeleton-card__edit-btn"
      ></ui-skeleton>
    </template>
    <template #body>
      <template v-if="isPrimary">
        <ui-skeleton
          width="120px"
          height="120px"
          class="skeleton-card__avatar"
        ></ui-skeleton>
        <ui-skeleton
          width="260px"
          height="16px"
          class="skeleton-card__name"
        ></ui-skeleton>
        <ui-skeleton
          width="180px"
          height="16px"
          class="skeleton-card__desc"
        ></ui-skeleton>
      </template>
      <template v-else-if="isSecondary">
        <ui-grid align-items="center">
          <ui-grid align-items="center" class="skeleton-card__category">
            <ui-skeleton
              width="20px"
              height="20px"
              class="skeleton-card__category-icon"
            ></ui-skeleton>
            <ui-skeleton
              width="50px"
              height="16px"
              class="skeleton-card__category-name"
            ></ui-skeleton>
          </ui-grid>
        </ui-grid>
        <ui-grid direction="column">
          <ui-skeleton
            width="100px"
            height="16px"
            class="skeleton-card__datetime"
          ></ui-skeleton>
          <ui-skeleton
            width="220px"
            height="20px"
            class="skeleton-card__name"
          ></ui-skeleton>
          <ui-skeleton
            width="150px"
            height="16px"
            class="skeleton-card__desc"
          ></ui-skeleton>
        </ui-grid>
        <ui-grid
          direction="row"
          align-items="center"
          wrap="wrap"
          class="skeleton-card__tags"
        >
          <ui-skeleton
            width="80px"
            height="32px"
            class="skeleton-card__badge"
            radius="10px"
          ></ui-skeleton>
        </ui-grid>
      </template>
    </template>
    <template #footer>
      <template v-if="isPrimary">
        <ui-grid
          align-items="center"
          justify="center"
          class="skeleton-card__footer"
        >
          <ui-skeleton
            width="34px"
            height="24px"
            class="skeleton-card__badge"
            radius="10px"
          ></ui-skeleton>
          <ui-skeleton
            width="150px"
            height="14px"
            class="skeleton-card__badge-text"
          ></ui-skeleton>
        </ui-grid>
      </template>
    </template>
  </entry-card>
</template>

<script>
import EntryCard from '~/components/cards/template/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiSkeleton from '~/ui/skeleton/index.vue';

export default {
  name: 'SkeletonCard',
  components: {
    UiGrid,
    UiSkeleton,
    EntryCard,
  },
  props: {
    variant: {
      type: String,
      required: false,
      default: 'primary',
      validator(val) {
        return ['primary', 'secondary'].includes(val);
      },
    },
  },
  computed: {
    isPrimary() {
      return this.variant === 'primary';
    },
    isSecondary() {
      return this.variant === 'secondary';
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
