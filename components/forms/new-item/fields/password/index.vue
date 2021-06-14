<template>
  <default-item-field
    :mode="mode"
    :viewing-control-btns="[copyBtn, revealBtn, ...controlBtns]"
    :editing-control-btns="[revealBtn, ...controlBtns]"
    @body-click="copy"
  >
    <template #head>
      <p class="password-item-field__title">{{ title }}</p>
    </template>
    <template #body(viewing)>
      <p class="password-item-field__text">
        {{ isRevealed ? data : '••••••••••' }}
      </p>
    </template>
    <template #body(editing)>
      <ui-input
        v-model="data"
        :placeholder="placeholder"
        :value="value"
        :type="isRevealed ? 'text' : 'password'"
        class="password-item-field__text password-item-field__text_editing"
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
  name: 'PasswordItemField',
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
      isRevealed: false,
      copyBtn: {
        key: 'copy',
        name: this.$t('Copy'),
        click: this.copy,
      },
    };
  },
  computed: {
    revealBtn() {
      return {
        key: 'reveal-toggle',
        name: this.isRevealed ? this.$t('Conceal') : this.$t('Reveal'),
        click: this.revealToggle,
      };
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
      navigator.clipboard.writeText(this.data);
    },
    revealToggle() {
      this.isRevealed = !this.isRevealed;
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
