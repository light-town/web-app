<template>
  <ui-grid align-items="center" class="team-category__avatar">
    <ui-avatar :name="name" :alt="name" class="ui-mr-8" :size="32" />
    <p class="team-category__avatar-title">{{ name }}</p>
  </ui-grid>
</template>

<script>
import { UiGrid, UiAvatar } from '@light-town/ui';

export default {
  name: 'TeamCategory',
  components: {
    UiGrid,
    UiAvatar,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
