<template>
  <default-item-field
    :mode="mode"
    :viewing-control-btns="viewingControlBtns"
    :editing-control-btns="controlBtns"
    @body-click="copy"
  >
    <template #head>
      <p class="text-item-field__title">{{ title }}</p>
    </template>
    <template #body(viewing)>
      <p class="text-item-field__text">{{ data }}</p>
    </template>
    <template #body(editing)>
      <ui-input
        v-model="data"
        :placeholder="placeholder"
        :value="value"
        class="text-item-field__text text-item-field__text_editing"
      ></ui-input>
    </template>
    <template #control-btn-template="{ btn, activate, deactivate }">
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
  </default-item-field>
</template>

<script>
import DefaultItemField from '../default/index.vue';
import UiInput from '~/ui/input/index.vue';

export default {
  name: 'TextItemField',
  components: {
    DefaultItemField,
    UiInput,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'new value',
    },
    mode: {
      type: String,
      required: false,
      default: 'viewing',
    },
    controlBtns: {
      type: Array,
      required: false,
      default: () => [],
    },
    copyable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      data: '',
      copyBtn: {
        key: 'copy',
        name: this.$t('Copy'),
        click: this.copy,
      },
    };
  },
  computed: {
    viewingControlBtns() {
      if (!this.copyable) return this.controlBtns;

      return [this.copyBtn, ...this.controlBtns];
    },
  },
  watch: {
    data() {
      this.$emit('input', this.data);
    },
    value() {
      this.data = this.value;
    },
  },
  created() {
    this.data = this.value;
  },
  methods: {
    copy() {
      if (!this.copyable || this.editing) return;

      navigator.clipboard.writeText(this.data);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
