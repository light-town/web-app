<template>
  <portal to="modals-location">
    <ui-grid v-if="open" class="ui-popup">
      <ui-grid
        class="ui-popup__background"
        @click="handleBackgroundClick"
      ></ui-grid>
      <popup-content
        :anchor="anchor"
        :position="position"
        :class="contentClass"
      >
        <slot></slot>
      </popup-content>
    </ui-grid>
  </portal>
</template>

<script>
import PopupContent from './content.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiPopup',
  components: {
    UiGrid,
    PopupContent,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
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
  },
  methods: {
    handleBackgroundClick() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
