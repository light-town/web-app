<template>
  <default-item-field
    :mode="mode"
    :viewing-control-btns="[]"
    :editing-control-btns="[]"
  >
    <template #head>
      <ui-grid
        class="avatar-item-field__name"
        align-items="center"
        justify="center"
      >
        <p class="avatar-item-field__title">{{ capitalNameLetter }}</p>
      </ui-grid>
    </template>
    <template #body(viewing)>
      <p class="avatar-item-field__title">{{ data }}</p>
    </template>
    <template #body(editing)>
      <ui-input
        v-model="data"
        :placeholder="placeholder"
        :value="name"
        :type="'text'"
        class="avatar-item-field__text_editing"
      ></ui-input>
    </template>
  </default-item-field>
</template>

<script>
import DefaultItemField from '../default/index.vue';
import UiInput from '~/ui/input/index.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'PasswordItemField',
  components: {
    DefaultItemField,
    UiInput,
    UiGrid,
  },
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'name',
    },
    mode: {
      type: String,
      required: false,
      default: 'viewing',
    },
  },
  data() {
    return {
      data: '',
    };
  },
  computed: {
    capitalNameLetter() {
      return this.data.length ? this.data[0].toUpperCase() : '';
    },
  },
  watch: {
    data() {
      this.$emit('input', this.data);
    },
    name() {
      this.data = this.name;
    },
  },
  created() {
    this.data = this.name;
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
