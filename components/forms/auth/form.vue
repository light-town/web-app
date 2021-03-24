<template>
  <form @submit.prevent="e => $emit('submit', e)">
    <ui-grid direction="column" class="auth-form">
      <ui-grid
        direction="column"
        align-items="center"
        class="auth-form__section"
      >
        <p class="auth-form__title">{{ title }}</p>
        <p v-if="desc && desc.length" class="auth-form__desc">{{ desc }}</p>
      </ui-grid>
      <ui-grid direction="column" class="auth-form__section">
        <slot name="content"></slot>
      </ui-grid>
      <ui-grid class="auth-form__section" justify="space-between"
        ><slot name="footer"></slot
      ></ui-grid>
    </ui-grid>
  </form>
</template>

<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'AuthForm',
  components: {
    UiGrid,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" src="./form.scss"></style>
