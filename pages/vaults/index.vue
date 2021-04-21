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
          <vault
            v-for="vault in vaults"
            :key="vault.uuid"
            :title="vault.overview.name"
            :desc="vault.overview.desc"
            class="vault-list__vault"
            @manage="manageVault(vault.uuid)"
            @open-vault="openVault(vault.uuid)"
          ></vault>
        </template>
        <template v-else>
          <vault-skeleton
            v-for="i in 6"
            :key="i"
            class="vault-list__vault"
          ></vault-skeleton>
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
import Vault from '~/components/vault/index.vue';
import VaultSkeleton from '~/components/vault/skeleton/index.vue';
import NewVaultForm from '~/components/forms/new-vault/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Vault,
    VaultSkeleton,
    Listbar,
    NewVaultForm,
  },
  middleware: ['auth'],
  data() {
    return { loading: true };
  },
  computed: {
    ...mapState({
      vaultServiceInit: state => state.vaults.isInit,
      vaults: state => Object.values(state.vaults.all),
    }),
  },
  watch: {
    vaultServiceInit() {
      if (this.vaultServiceInit)
        this.getVaults().finally(() => (this.loading = false));
    },
  },
  created() {
    if (this.vaultServiceInit)
      this.getVaults().finally(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      getVaults: vaultActionTypes.GET_VAULTS,
      setCurrentVault: vaultActionTypes.SET_CURRENT_VAULT,
    }),
    async openVault(uuid) {
      await this.setCurrentVault({ uuid });
      this.$router.push(`/vaults/${uuid}`);
    },
    manageVault() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
