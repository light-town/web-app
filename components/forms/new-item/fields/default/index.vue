<template>
  <ui-grid class="item-field" align-items="center">
    <ui-grid class="item-field__head" justify="flex-end">
      <slot name="head"></slot>
    </ui-grid>
    <ui-grid class="item-field__body">
      <default-controls-item-field
        v-if="mode === 'viewing'"
        :btns="viewingControlBtns"
        @click="$emit('body-click')"
      >
        <slot name="body(viewing)"></slot>
      </default-controls-item-field>
      <default-controls-item-field
        v-if="mode === 'editing'"
        :btns="editingControlBtns"
        @click="$emit('body-click')"
      >
        <template #default>
          <slot name="body(editing)"></slot>
        </template>
        <template #btn-template="{ btn, activate, deactivate }">
          <slot
            :name="`control-btn-template`"
            :btn="btn"
            :activate="activate"
            :deactivate="deactivate"
          >
            <slot
              :name="`control-btn-template(${btn.key})`"
              :btn="btn"
              :activate="activate"
              :deactivate="deactivate"
            ></slot>
          </slot>
        </template>
      </default-controls-item-field>
    </ui-grid>
  </ui-grid>
</template>

<script>
import DefaultControlsItemField from './controls/index.vue';

import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'DefaultItemField',
  components: {
    UiGrid,
    DefaultControlsItemField,
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'viewing',
      validator(val) {
        return ['viewing', 'editing'].includes(val);
      },
    },
    viewingControlBtns: {
      type: Array,
      required: false,
      default: () => [],
    },
    editingControlBtns: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
