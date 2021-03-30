<template>
  <ui-grid align-items="center" justify="space-between" class="links">
    <select-languages></select-languages>
    <ui-grid class="links__support">
      <ui-button variant="text" class="links__btn">{{ $t('Help') }}</ui-button>
      <ui-button variant="text" class="links__btn">{{
        $t('Privacy')
      }}</ui-button>
      <ui-button variant="text" class="links__btn">{{ $t('Terms') }}</ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script>
import SelectLanguages from './select-languages.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';

export default {
  name: 'Links',
  components: {
    UiGrid,
    UiButton,
    SelectLanguages,
  },
};
</script>

<style lang="scss" src="./links.scss"></style>
