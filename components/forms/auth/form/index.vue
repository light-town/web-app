<template>
  <ui-form class="auth-form" @submit.prevent="onSubmit">
    <ui-grid direction="column" align-items="center" class="auth-form__header">
      <p class="auth-form__title">{{ title }}</p>
      <p v-if="desc && desc.length" class="auth-form__desc">{{ desc }}</p>
    </ui-grid>
    <ui-grid direction="column" class="auth-form__body">
      <ui-alert
        v-if="error"
        variant="error"
        :message="error.message"
        class="auth-form__alert"
      />
      <slot name="body"></slot>
    </ui-grid>
    <ui-grid justify="space-between" class="auth-form__footer"
      ><slot name="footer"></slot
    ></ui-grid>
  </ui-form>
</template>

<script>
import { UiForm, UiGrid, UiAlert } from '@light-town/ui';

export default {
  name: 'AuthForm',
  components: {
    UiGrid,
    UiForm,
    UiAlert,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
      default: '',
    },
    error: {
      type: Error,
      requird: false,
      default: null,
    },
  },
  methods: {
    onSubmit(e) {
      this.$emit('submit', e);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
