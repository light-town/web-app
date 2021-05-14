<template>
  <app-page-layout :title="title">
    <template #nav>
      <account-navbar />
    </template>
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </app-page-layout>
</template>

<script>
import AppPageLayout from './app-page.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';

export default {
  name: 'VaultsPageLayout',
  components: {
    AppPageLayout,
    AccountNavbar,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
