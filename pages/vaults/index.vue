<template>
  <ui-grid class="main-layout">
    <sidebar></sidebar>
    <listbar>
      <template #title> Vaults </template>
      <template #menu> <new-vault-form></new-vault-form> </template>
    </listbar>
    <ui-grid direction="column">
      <appbar> </appbar>
      <ui-grid class="vault-list" wrap="wrap">
        <template v-if="!loading || vaults.length > 0">
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
    </ui-grid>
  </ui-grid>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Listbar from '~/components/listbar/index.vue';
import NewVaultForm from '~/components/forms/new-vault/index.vue';
import VaultCard from '~/components/cards/vault/index.vue';
import VaultCardSkeleton from '~/components/cards/skeleton/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Listbar,
    NewVaultForm,
    VaultCard,
    VaultCardSkeleton,
  },
  layout: 'main',
  middleware: ['auth'],
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState({
      vaultServiceInit: state => state.vaults.isInit,
      vaults: state => Object.values(state.vaults.all),
      keySets: state => Object.values(state['key-sets'].all),
    }),
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
