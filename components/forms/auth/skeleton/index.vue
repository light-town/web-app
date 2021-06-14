<template>
  <auth-form :title="title">
    <template #body>
      <ui-skeleton
        width="100%"
        height="68px"
        radius="4px"
        class="skeleton__block"
      ></ui-skeleton>
      <ui-skeleton
        width="100%"
        height="48px"
        radius="4px"
        class="skeleton__block"
      ></ui-skeleton>
      <ui-skeleton
        width="180px"
        height="20px"
        radius="4px"
        class="skeleton__block"
      ></ui-skeleton>
    </template>
    <template #footer>
      <ui-grid direction="row-reverse">
        <ui-skeleton
          width="70px"
          height="34px"
          radius="4px"
          class="skeleton__button"
        ></ui-skeleton>
      </ui-grid>
    </template>
  </auth-form>
</template>

<script>
import { UiGrid, UiSkeleton } from '@light-town/ui';
import AuthForm from '../form/index.vue';

export default {
  name: 'FormSkeleton',
  components: {
    UiGrid,
    UiSkeleton,
    AuthForm,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
