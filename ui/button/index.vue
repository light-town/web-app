<template>
  <button :class="['btn', `btn--${variant}`]" @click="e => $emit('click', e)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    variant: {
      type: String,
      required: true,
      validator(val) {
        return ['contained', 'outlined', 'text'].includes(val);
      },
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
