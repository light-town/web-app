<template>
  <component
    :is="component"
    :class="{
      'ui-grid': true,
      [`ui-grid_dir-${direction}`]: direction,
      [`ui-grid_justify-${justify}`]: justify,
      [`ui-grid_align-${alignItems}`]: alignItems,
      [`ui-grid_wrap-${wrap}`]: wrap,
    }"
    @click="$emit('click', $event)"
    @contextmenu="$emit('contextmenu', $event)"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'UiGrid',
  props: {
    justify: {
      type: String,
      default: 'flex-start',
      validator(val) {
        return [
          'center',
          'start',
          'center',
          'end',
          'flex-start',
          'flex-end',
          'space-between',
          'space-around',
        ].includes(val);
      },
    },
    alignItems: {
      type: String,
      default: 'flex-start',
      validator(val) {
        return [
          'center',
          'start',
          'center',
          'end',
          'flex-start',
          'flex-end',
          'space-between',
          'space-around',
        ].includes(val);
      },
    },
    wrap: {
      type: String,
      default: 'nowrap',
      validator(val) {
        return ['nowrap', 'wrap', 'wrap-reverse'].includes(val);
      },
    },
    direction: {
      type: String,
      default: 'row',
      validator(val) {
        return ['row', 'column', 'row-reverse', 'column-reverse'].includes(val);
      },
    },
    component: {
      type: String,
      required: false,
      default: 'div',
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
