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

      for (const keySet of response.data) {
        const symmetricKey = await core.vaults.decryptSymmetricKey({
          secretKey: state.masterUnlockKey.key,
          encryptedSymmetricKey: keySet.encSymmetricKey.key,
          iv: keySet.encSymmetricKey.iv,
          tag: keySet.encSymmetricKey.tag,
          tagLength: keySet.encSymmetricKey.tagLength,
        });
        const privateKey = core.vaults.decryptPrivateKey(
          keySet.encPrivateKey.key,
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
