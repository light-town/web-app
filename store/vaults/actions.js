import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.INIT]({ commit, state, rootState }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaults.getVaults(
        rootState.accounts.currentAccountUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      for (const vault of response.data) {
        const keySet = Object.values(rootState['key-sets'].all).find(
          keySet => keySet.vaultUuid === vault.uuid
        );
        const key = core.vaults.decryptVaultKey(
          vault.encKey.key,
          keySet.privateKey
        );
        const metadata = await core.vaults.decryptVaultMetadata(
          key,
          vault.encMetadata
        );

        commit(mutationTypes.SET_VAULT, {
          vault: {
            uuid: vault.uuid,
            key,
            metadata,
          },
        });
      }

      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
};
