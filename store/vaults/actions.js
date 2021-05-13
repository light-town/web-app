import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.CREATE_VAULT]({ commit, state, rootState }, payload) {
    try {
      const primaryKeySet = Object.values(rootState['key-sets'].all).find(
        keySet => keySet.isPrimary
      );

      const encNewVault = await core.helpers.vaults.createVaultHelper(
        {
          name: payload.name,
          desc: payload.desc,
        },
        primaryKeySet.publicKey
      );
      const newVault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
        encNewVault,
        primaryKeySet.privateKey
      );
      const encCategories = await core.helpers.vaultItemCategories.createDefaultVaultItemCategories(
        newVault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaults.createVault({
        ...encNewVault,
        encCategories,
      });

      commit(mutationTypes.SET_VAULT, {
        vault: {
          uuid: response.data.uuid,
          ...newVault,
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
  [actionTypes.SET_CURRENT_VAULT]({ commit }, payload) {
    commit(mutationTypes.SET_CURRENT_VAULT_UUID, {
      uuid: payload.uuid,
    });
  },
  async [actionTypes.GET_VAULTS]({ commit, state, rootState }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const { data: encVaults } = await this.$api.vaults.getVaults(
        rootState.accounts.currentAccountUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaults = await Promise.all(
        encVaults.map(encVault => {
          const keySet = rootState['key-sets'].all[encVault.keySetUuid];

          if (keySet.isPrimary)
            return core.helpers.vaults.decryptVaultByPrivateKeyHelper(
              encVault,
              keySet.privateKey
            );

          return core.helpers.vaults.decryptVaultBySecretKeyHelper(
            encVault,
            keySet.symmetricKey
          );
        })
      );

      vaults.forEach(vault =>
        commit(mutationTypes.SET_VAULT, {
          vault,
        })
      );
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
  async [actionTypes.GET_VAULT]({ commit, state, rootState }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const { data: encVault } = await this.$api.vaults.getVault(payload.uuid);

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const keySet = rootState['key-sets'].all[encVault.keySetUuid];
      let vault;

      if (keySet.isPrimary)
        vault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
          encVault,
          keySet.privateKey
        );
      else
        vault = await core.helpers.vaults.decryptVaultBySecretKeyHelper(
          encVault,
          keySet.symmetricKey
        );

      commit(mutationTypes.SET_VAULT, {
        vault,
      });
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
};
