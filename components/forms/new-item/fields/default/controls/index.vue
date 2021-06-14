<template>
  <ui-grid
    :class="[
      'item-field__controls',
      { 'item-field__controls_disabled': !btns.length },
      { 'item-field__controls_active': active },
    ]"
    align-items="center"
    @click="$emit('click', $event)"
  >
    <slot></slot>
    <template v-for="btn in btns">
      <slot
        :name="`btn-template`"
        :btn="btn"
        :activate="activate"
        :deactivate="deactivate"
      >
        <slot
          :name="`btn-template(${btn.key})`"
          :btn="btn"
          :activate="activate"
          :deactivate="deactivate"
        >
          <ui-button
            :key="btn.key"
            variant="outlined"
            class="item-field__control-btn"
            @click="btn.click"
          >
            {{ btn.name }}
          </ui-button>
        </slot>
      </slot>
    </template>
  </ui-grid>
</template>

<script>
import { UiGrid, UiButton } from '@light-town/ui';

export default {
  name: 'DefaultControlsItemField',
  components: {
    UiGrid,
    UiButton,
  },
  props: {
    btns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    activate() {
      this.active = true;
    },
    deactivate() {
      this.active = false;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
