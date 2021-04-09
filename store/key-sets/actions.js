import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.INIT]({ commit, state, rootState }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.keySets.getKeySets(
        rootState.accounts.currentAccountUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      /// [TODO] add support fot not primary key sets

      for (const keySet of response.data) {
        if (keySet.isPrimary) {
          const symmetricKey = await core.vaults.symmetricKey.decryptBySecretKey(
            keySet.encSymmetricKey,
            state.masterUnlockKey.key
          );
          const privateKey = await core.vaults.privateKey.decryptBySymmetricKey(
            keySet.encPrivateKey,
            symmetricKey
          );
          const publicKey = core.vaults.publicKeyFromString(keySet.publicKey);

          commit(mutationTypes.SET_KEY_SET, {
            keySet: {
              uuid: keySet.uuid,
              vaultUuid: keySet.vaultUuid,
              publicKey,
              privateKey,
              symmetricKey,
              isPrimary: keySet.isPrimary,
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
  async [actionTypes.SET_MASTER_UNLOCK_KEY](
    { commit, state, rootState },
    payload
  ) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.keySets.getPrimaryKeySet(
        rootState.accounts.currentAccountUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const normalizedMasterPassword = core.common.normalizeMasterPassword(
        payload.password
      );

      const keySet = response.data[0];

      const masterUnlockKey = core.common.deriveMasterUnlockKey(
        this.getters.currentAccount.key,
        normalizedMasterPassword,
        keySet.encSymmetricKey.salt
      );

      commit(mutationTypes.SET_MASTER_UNLOCK_KEY, {
        key: masterUnlockKey,
      });

      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
};
