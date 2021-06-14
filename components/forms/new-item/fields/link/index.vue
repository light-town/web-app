<template>
  <default-item-field
    :mode="mode"
    :viewing-control-btns="[openBtn, copyBtn, ...controlBtns]"
    :editing-control-btns="[...controlBtns]"
  >
    <template #head>
      <p class="link-item-field__title">{{ title }}</p>
    </template>
    <template #body(viewing)>
      <a
        target="_blank"
        rel="noopener noreferrer"
        :href="data"
        class="link-item-field__text link-item-field__link"
        >{{ data }}</a
      >
    </template>
    <template #body(editing)>
      <ui-input
        v-model="data"
        :placeholder="placeholder"
        :value="value"
        type="url"
        class="link-item-field__text link-item-field__text_editing"
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
import { UiInput } from '@light-town/ui';
import DefaultItemField from '../default/index.vue';

export default {
  name: 'LinkItemField',
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
  },
  data() {
    return {
      data: '',
      copyBtn: {
        key: 'copy',
        name: this.$t('Copy'),
        click: this.copy,
      },
      openBtn: {
        key: 'open',
        name: this.$t('Open'),
        click: this.open,
      },
    };
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
      navigator.clipboard.writeText(this.data);
    },
    open() {
      window.open(this.data, '_blank');
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
