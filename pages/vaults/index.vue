<template>
  <main-page-layout :title="$t('My vaults')" :desc="$t('Account management')">
    <template #nav>
      <account-navbar>
        <template #creation-button>
          <creation-vaults-button />
        </template>
      </account-navbar>
    </template>
    <template #main>
      <account-vaults-grid
        :items="vaults"
        :loading="loading"
        @item-dbl-click="openVault"
      />
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MainPageLayout from '~/layouts/main/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';
import CreationVaultsButton from '~/components/navbars/creation-vaults-button/index.vue';
import AccountVaultsGrid from '~/components/grids/account-vaults.grid.vue';
import * as vaultActionTypes from '~/store/vaults/types';
import * as keySetsActionTypes from '~/store/key-sets/types';
import * as teamsActionTypes from '~/store/teams/types';

export default {
  name: 'VaultsPage',
  components: {
    MainPageLayout,
    AccountVaultsGrid,
    AccountNavbar,
    CreationVaultsButton,
  },
  middleware: ['auth'],
  data() {
    return { loading: false };
  },
  computed: {
    ...mapState({
      vaults: state =>
        Object.values(state.vaults.all).filter(
          v => v.ownerAccountUuid === state.accounts.currentAccountUuid
        ),
    }),
  },
  async created() {
    this.loading = true;

    await this.getKeySets();
    await this.getVaults();
    await this.getTeams();

    this.loading = false;
  },
  methods: {
    ...mapActions({
      getKeySets: keySetsActionTypes.GET_ACCOUNT_KEY_SETS,
      getVaults: vaultActionTypes.GET_ACCOUNT_VAULTS,
      setCurrentVault: vaultActionTypes.SET_CURRENT_VAULT,
      getVault: vaultActionTypes.GET_ACCOUNT_VAULT,
      getTeams: teamsActionTypes.GET_TEAMS,
    }),
    async openVault(_, vault) {
      await this.setCurrentVault({ uuid: vault.uuid });
      await this.getVault({ uuid: vault.uuid });

      this.$router.push(`/vaults/${vault.uuid}`);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
