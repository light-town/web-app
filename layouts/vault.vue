<template>
  <main-page-layout :title="currentVaultName">
    <ui-grid class="h-full overflow-auto">
      <ui-grid direction="column" class="app-page__sidebar">
        <folder-tree-view />
      </ui-grid>
      <ui-grid direction="column" class="h-full overflow-auto">
        <slot></slot>
      </ui-grid>
    </ui-grid>
  </main-page-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MainPageLayout from './main.vue';
import UiGrid from '~/ui/grid/index.vue';
import FolderTreeView from '~/components/treeviews/folders/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'VaultPageLayout',
  components: {
    UiGrid,
    MainPageLayout,
    FolderTreeView,
  },
  computed: {
    ...mapGetters(['currentVault']),
    currentVaultName() {
      return this.currentVault?.overview.name ?? '';
    },
  },
  created() {
    Promise.all([this.getVault({ uuid: this.$route.params.vaultUuid })]);
  },
  methods: {
    ...mapActions({
      getVault: vaultActionTypes.GET_VAULT,
    }),
  },
};
</script>

<style lang="scss">
.app-page {
  &__sidebar {
    flex: 0 0 300px;

    height: 100%;

    padding: 0.625rem 0;
    padding-right: 40px;
  }
}
</style>
