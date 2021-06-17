<template>
  <ui-grid
    direction="column"
    class="team-category__dropdown"
    :class="{ 'team-category__dropdown_active': active }"
    @click="toggleActive"
  >
    <ui-grid
      align-items="center"
      justify="space-between"
      class="team-category__dropdown-header"
    >
      <p class="team-category__dropdown-header-title">{{ title }}</p>
      <arrow-icon class="team-category__dropdown-header-icon" />
    </ui-grid>
    <slot></slot>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'TeamCategory',
  components: {
    UiGrid,
    ArrowIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return { active: true };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
