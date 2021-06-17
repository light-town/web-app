<template>
  <ui-grid direction="column" align-items="center" class="legal-form__group">
    <p class="legal-form__group-title">{{ title }}</p>
    <slot></slot>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';

export default {
  name: 'LegalGroupForm',
  components: {
    UiGrid,
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
