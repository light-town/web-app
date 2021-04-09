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
        const keySet = rootState['key-sets'].all[vault.keySetUuid];

        if (keySet.isPrimary) {
          const vaultKey = await core.vaults.vaultKey.decryptByPrivateKey(
            vault.encKey,
            keySet.privateKey
          );
          const metadata = await core.vaults.vaultMetadata.decryptByVaultKey(
            vault.encMetadata,
            vaultKey
          );

          commit(mutationTypes.SET_VAULT, {
            vault: {
              uuid: vault.uuid,
              key: vaultKey,
              metadata,
            },
          });
        }
      }

      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
  async [actionTypes.CREATE_VAULT]({ commit, state, rootState }, payload) {
    try {
      const vaultKey = core.common.generateCryptoRandomString(32);

      const primaryKeySet = Object.values(rootState['key-sets'].all).find(
        keySet => keySet.isPrimary
      );

      const encKey = await core.vaults.symmetricKey.encryptByPublicKey(
        vaultKey,
        primaryKeySet.publicKey
      );

      const vaultMetadata = {
        title: payload.title,
        desc: payload.desc,
      };
      const encVaultMetadata = await core.vaults.vaultMetadata.encryptByVaultKey(
        vaultMetadata,
        vaultKey
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaults.createVault({
        encKey,
        encMetadata: encVaultMetadata,
      });

      commit(mutationTypes.SET_VAULT, {
        vault: {
          uuid: response.data.uuid,
          key: vaultKey,
          metadata: vaultMetadata,
          accountUuid: response.data.accountUuid,
          keySetUuid: response.data.keySetUuid,
        },
      });

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
};
