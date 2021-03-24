<template>
  <ui-grid align-items="center" justify="space-between" class="links">
    <ui-button variant="text" class="links__btn">
      <ui-grid align-items="center">
        <p>English (US)</p>
        <arrow-icon class="links__icon"></arrow-icon>
      </ui-grid>
    </ui-button>
    <ui-grid class="links__support">
      <ui-button variant="text" class="links__btn">Help</ui-button>
      <ui-button variant="text" class="links__btn">Privacy</ui-button>
      <ui-button variant="text" class="links__btn">Terms</ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import ArrowIcon from '~/assets/right-arrow.svg?inline';

export default {
  name: 'Links',
  components: {
    UiGrid,
    UiButton,
    ArrowIcon,
  },
};
</script>

<style lang="scss" src="./links.scss"></style>
