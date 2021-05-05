<template>
  <ui-grid direction="column" class="ui-card">
    <ui-grid align-items="center" class="ui-card__header">
      <slot name="header"></slot>
    </ui-grid>
    <ui-grid align-items="center" class="ui-card__body">
      <slot name="body"></slot>
    </ui-grid>
    <ui-grid align-items="center" class="ui-card__footer">
      <slot name="footer"></slot>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiCard',
  components: {
    UiGrid,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
