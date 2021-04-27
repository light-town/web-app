<template>
  <portal to="modals-location">
    <portal-content
      :anchor="anchor"
      :position="position"
      :x="x"
      :y="y"
      @keydown.native="$emit('keydown', $event)"
    >
      <slot></slot>
    </portal-content>
  </portal>
</template>

<script>
import PortalContent from './content.vue';

export default {
  name: 'UiPortal',
  components: {
    PortalContent,
  },
  props: {
    anchor: {
      type: Object,
      required: false,
      default: null,
    },
    position: {
      type: String,
      required: false,
      default: 'left-top',
      validator(val) {
        return [
          'left-top',
          'left-bottom',
          'right-top',
          'right-bottom',
        ].includes(val);
      },
    },
    contentClass: {
      type: String,
      required: false,
      default: '',
    },
    x: {
      type: Number,
      required: false,
      default: null,
    },
    y: {
      type: Number,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
