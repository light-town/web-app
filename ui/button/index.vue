<template>
  <component
    :is="component"
    :type="type"
    :class="['ui-btn', `ui-btn--${variant}`]"
    :disabled="loading"
    @click="$emit('click', $event)"
  >
    <ui-loading v-if="loading" class="ui-btn_loading"></ui-loading>
    <slot></slot>
  </component>
</template>

<script>
import UiLoading from '~/ui/loading/index.vue';

export default {
  name: 'UiButton',
  components: { UiLoading },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
      validator(val) {
        return ['button', 'submit', 'reset'].includes(val);
      },
    },
    component: {
      type: String,
      required: false,
      default: 'button',
      validator(val) {
        return ['button', 'li', 'input', 'a'].includes(val);
      },
    },
    variant: {
      type: String,
      required: true,
      validator(val) {
        return ['contained', 'outlined', 'text'].includes(val);
      },
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
