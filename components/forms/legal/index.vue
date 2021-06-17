<template>
  <ui-grid
    component="form"
    direction="column"
    align-items="center"
    class="legal-form ui-mb-18"
  >
    <ui-grid direction="column" align-items="center" class="ui-my-12 ui-mb-18">
      <p class="legal-form__title">{{ title }}</p>
      <p class="legal-form__desc">{{ desc }}</p>
    </ui-grid>
    <ui-grid direction="column" align-items="center" class="legal-form__groups">
      <slot></slot>
    </ui-grid>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';

export default {
  name: 'LegalForm',
  components: {
    UiGrid,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
