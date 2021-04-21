<template>
  <span
    class="ui-menu-item-separator"
    :style="{
      height: `${weight}px`,
    }"
  ></span>
</template>

<script>
export default {
  name: 'UiMenuItemSeparator',
  props: {
    weight: {
      type: Number,
      required: false,
      default: 1,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
