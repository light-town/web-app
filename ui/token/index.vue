<template>
  <span
    class="ui-token"
    @click.stop="$emit('click')"
    @keydown="$emit('keydown', $event)"
  >
    <p class="ui-token__text"><slot></slot></p>
    <close-icon
      v-if="!viewOnly"
      class="ui-token__close-btn"
      @click.stop="$emit('close')"
    ></close-icon>
  </span>
</template>

<script>
import CloseIcon from '~/assets/close.svg?inline';

export default {
  name: 'UiToken',
  components: {
    CloseIcon,
  },
  props: {
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
