<template>
  <ui-grid component="form" direction="column" @submit.native="onSubmit">
    <slot></slot>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiForm',
  components: {
    UiGrid,
  },
  methods: {
    onSubmit(e) {
      this.$emit('submit', e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
