<template>
  <main-page-layout
    :title="currentVaultItemName"
    :loading="!currentVaultItemName"
  >
    <template #breadcrumbs>
      <breadcrumbs class="-ui-ml-2" />
    </template>
    <template #nav>
      <account-navbar />
    </template>
    <template #main>
      <ui-grid class="ui-h-full ui-overflow-auto">
        <ui-grid direction="column" class="app-page__sidebar">
          <folder-tree-view />
        </ui-grid>
        <ui-grid direction="column" class="ui-h-full ui-overflow-auto">
          <slot></slot>
        </ui-grid>
      </ui-grid>
    </template>
  </main-page-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { UiGrid } from '@light-town/ui';
import MainPageLayout from './main/index.vue';
import FolderTreeView from '~/components/treeviews/folders/index.vue';
import Breadcrumbs from '~/components/breadcrumbs/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';

export default {
  name: 'ItemPageLayout',
  components: {
    UiGrid,
    Breadcrumbs,
    FolderTreeView,
    MainPageLayout,
    AccountNavbar,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return { currentVaultItemName: '' };
  },
  computed: {
    ...mapGetters(['currentVaultItem']),
  },
  created() {
    this.currentVaultItemName = this.currentVaultItem?.overview?.name ?? '';
  },
};
</script>
