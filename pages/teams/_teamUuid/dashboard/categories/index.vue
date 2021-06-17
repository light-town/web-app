<template>
  <ui-grid direction="column" class="team-category">
    <ui-grid
      align-items="center"
      justify="space-between"
      class="team-category__header"
    >
      <p class="team-category__header-title">{{ title }}</p>
      <add-icon class="team-category__header-icon" />
    </ui-grid>
    <slot></slot>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';
import AddIcon from '~/assets/add.svg?inline';

export default {
  name: 'TeamCategory',
  components: {
    UiGrid,
    AddIcon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
