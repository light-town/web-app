<template>
  <main-page-layout title="Vaults">
    <ui-grid class="vault-list" wrap="wrap">
      <template v-if="showVaults">
        <vault-card
          v-for="vault in vaults"
          :key="vault.uuid"
          :name="vault.overview.name"
          :desc="vault.overview.desc"
          class="vault-list__vault"
          @dblclick="openVault(vault)"
        />
      </template>
      <template v-else>
        <vault-card-skeleton
          v-for="i in 6"
          :key="i"
          class="vault-list__vault"
        />
      </template>
    </ui-grid>
  </main-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import MainPageLayout from '~/layouts/main.vue';
import VaultCard from '~/components/cards/vault/index.vue';
import VaultCardSkeleton from '~/components/cards/skeleton/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    MainPageLayout,
    VaultCard,
    VaultCardSkeleton,
  },
  middleware: ['auth'],
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState({
      vaults: state => Object.values(state.vaults.all),
      keySets: state => Object.values(state['key-sets'].all),
    }),
    showVaults() {
      return !this.loading || this.vaults.length > 0;
    },
  },
  watch: {
    keySets() {
      if (!this.keySets.length) return;

      this.loading = true;

      this.getVaults().finally(() => (this.loading = false));
    },
  },
  created() {
    if (!this.keySets.length) return;

    this.loading = true;

    this.getVaults().finally(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      getVaults: vaultActionTypes.GET_VAULTS,
      setCurrentVault: vaultActionTypes.SET_CURRENT_VAULT,
    }),
    async openVault(vault) {
      await this.setCurrentVault({ uuid: vault.uuid });

      this.$router.push(`/vaults/${vault.uuid}`);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
