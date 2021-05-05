<template>
  <span :class="['ui-badge', `ui-badge_${color}`]"><slot></slot></span>
</template>

<script>
export default {
  name: 'UiBadge',
  props: {
    variant: {
      type: String,
      required: true,
      validator(val) {
        return ['contained', 'outlined'].includes(val);
      },
    },
    color: {
      type: String,
      required: true,
      validator(val) {
        return ['black', 'blue', 'green'].includes(val);
      },
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
