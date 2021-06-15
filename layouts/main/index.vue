<template>
  <default-page-layout>
    <ui-grid direction="column" class="ui-h-full">
      <appbar class="app-page__appbar" />
      <ui-grid
        class="app-page__header-layout"
        direction="column"
        justify="center"
      >
        <ui-grid class="app-page__breadcrumbs-layout" align-items="center">
          <slot name="breadcrumbs">
            <p class="app-page__desc">{{ desc }}</p>
          </slot>
        </ui-grid>
        <ui-grid class="app-page__title-layout">
          <slot name="title">
            <p class="app-page__title">{{ title }}</p>
          </slot>
        </ui-grid>
      </ui-grid>
      <ui-grid class="app-page__nav-layout">
        <slot name="nav"></slot>
      </ui-grid>
      <ui-grid class="app-page__main-layout">
        <slot name="main"></slot>
      </ui-grid>
    </ui-grid>
  </default-page-layout>
</template>

<script>
import DefaultPageLayout from '@/layouts/default/index.vue';
import { UiGrid } from '@light-town/ui';

export default {
  name: 'MainPageLayout',
  components: {
    UiGrid,
    DefaultPageLayout,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    desc: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
