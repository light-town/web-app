<template>
  <ui-grid class="main-layout">
    <sidebar></sidebar>
    <ui-grid direction="column">
      <appbar>
        <new-vault-form></new-vault-form>
      </appbar>
      <ui-grid class="vault-list" wrap="wrap">
        <template v-if="showVaultList">
          <vault
            v-for="vault in vaults"
            :key="vault.uuid"
            :title="vault.metadata.title"
            :desc="vault.metadata.desc"
            class="vault-list__vault"
            @manage="manageVault(vaults.uuid)"
            @open-vault="openVault(vaults.uuid)"
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
import { mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import Sidebar from '~/components/sibebar/index.vue';
import Appbar from '~/components/appbar/index.vue';
import Vault from '~/components/vault/index.vue';
import VaultSkeleton from '~/components/vault/skeleton/index.vue';
import NewVaultForm from '~/components/forms/new-vault/index.vue';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    Sidebar,
    Appbar,
    Vault,
    VaultSkeleton,
    NewVaultForm,
  },
  middleware: ['auth'],
  computed: {
    ...mapState({
      showVaultList: state => state.vaults.isInit,
      vaults: state => Object.values(state.vaults.all),
    }),
  },
  methods: {
    openVault() {},
    manageVault() {},
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
