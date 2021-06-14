<template>
  <main-page-layout :title="$t('My Vaults')" :desc="$t('Account Management')">
    <template #nav>
      <account-navbar>
        <template #creation-button>
          <creation-vaults-button />
        </template>
      </account-navbar>
    </template>
    <template #main>
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
    </template>
  </main-page-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { UiGrid } from '@light-town/ui';
import MainPageLayout from '~/layouts/main/index.vue';
import VaultCard from '~/components/cards/vault/index.vue';
import AccountNavbar from '~/components/navbars/account/index.vue';
import VaultCardSkeleton from '~/components/cards/skeleton/index.vue';
import CreationVaultsButton from '~/components/navbars/creation-vaults-button/index.vue';
import * as vaultActionTypes from '~/store/vaults/types';
import * as keySetsActionTypes from '~/store/key-sets/types';
import * as teamsActionTypes from '~/store/teams/types';

export default {
  name: 'VaultsPage',
  components: {
    UiGrid,
    MainPageLayout,
    VaultCard,
    VaultCardSkeleton,
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
    showVaults() {
      return !this.loading && this.vaults.length > 0;
    },
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
    async openVault(vault) {
      await this.setCurrentVault({ uuid: vault.uuid });
      await this.getVault({ uuid: vault.uuid });

      this.$router.push(`/vaults/${vault.uuid}`);
    },
  },
};
</script>

<style lang="scss" src="./index.scss"></style>
