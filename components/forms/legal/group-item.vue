<template>
  <ui-grid component="p" direction="column" class="legal-form__group-item">
    <slot></slot>
  </ui-grid>
</template>

<script>
import { UiGrid } from '@light-town/ui';

export default {
  name: 'LegalGroupItemForm',
  components: {
    UiGrid,
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
