<template>
  <portal to="modals-location">
    <ui-grid v-if="open" class="ui-modal" align-items="center" justify="center">
      <ui-grid
        class="ui-modal__background"
        @click="handleBackgroundClick"
      ></ui-grid>
      <ui-grid class="ui-modal__content">
        <slot></slot>
      </ui-grid>
    </ui-grid>
  </portal>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiModal',
  components: {
    UiGrid,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
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
