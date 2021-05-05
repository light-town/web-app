<template>
  <ui-grid
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="ui-avatar"
  >
    <img v-if="src" class="ui-avatar__img" :src="src" :alt="alt" />
    <div
      v-else
      class="ui-avatar__badge"
      :style="{ 'font-size': `${size / 2.6}px` }"
    >
      {{ firstNameSymbol }}
    </div>
  </ui-grid>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'UiAvatar',
  components: {
    UiGrid,
  },
  props: {
    src: {
      type: String,
      required: false,
      default: null,
    },
    alt: {
      type: String,
      required: false,
      default: 'avatar',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: Number,
      reqired: false,
      default: 64,
    },
  },
  computed: {
    firstNameSymbol() {
      return this.name.length ? this.name[0] : '';
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
