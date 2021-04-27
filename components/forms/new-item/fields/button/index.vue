<template>
  <default-item-field>
    <template #body(viewing)>
      <slot name="button-template" :title="title">
        <ui-button :variant="variant" class="button-item-field__btn">
          {{ title }}
        </ui-button>
      </slot>
    </template>
  </default-item-field>
</template>

<script>
import DefaultItemField from '../default/index.vue';
import UiButton from '~/ui/button/index.vue';

export default {
  name: 'TextItemField',
  components: {
    UiButton,
    DefaultItemField,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: 'text',
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
