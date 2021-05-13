<template>
  <app-page-layout :title="title">
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #nav>
      <account-navbar
        :vaults-number="vaultsNumber"
        :teams-number="teamsNumber"
      />
    </template>
    <template #main>
      <slot name="main"></slot>
      <slot></slot>
    </template>
  </app-page-layout>
</template>

<script>
import { mapState } from 'vuex';
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
  computed: {
    ...mapState({
      vaults: state => Object.values(state.vaults.all),
    }),
    vaultsNumber() {
      return this.vaults.length;
    },
    teamsNumber() {
      return 0;
    },
  },
};
</script>
