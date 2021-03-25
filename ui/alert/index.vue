<template>
  <ui-grid align-items="center" :class="['ui-alert', `ui-alert--${severity}`]">
    <error-icon v-if="severity === 'error'" class="ui-alert__icon"></error-icon>
    <warning-icon
      v-if="severity === 'warning'"
      class="ui-alert__icon"
    ></warning-icon>
    <check-icon
      v-if="severity === 'success'"
      class="ui-alert__icon"
    ></check-icon>
    <info-icon v-if="severity === 'info'" class="ui-alert__icon"></info-icon>
    <p class="ui-alert__text"><slot></slot></p>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';
import ErrorIcon from '~/assets/cancel.svg?inline';
import WarningIcon from '~/assets/warning.svg?inline';
import CheckIcon from '~/assets/check.svg?inline';
import InfoIcon from '~/assets/info.svg?inline';

export default {
  name: 'UiAlert',
  components: {
    UiGrid,
    ErrorIcon,
    WarningIcon,
    CheckIcon,
    InfoIcon,
  },
  props: {
    severity: {
      type: String,
      required: true,
      validator(val) {
        return ['info', 'warning', 'success', 'error'].includes(val);
      },
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
