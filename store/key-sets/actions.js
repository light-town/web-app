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

      for (const encKeySet of response.data) {
        if (encKeySet.isPrimary) {
          const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
            encKeySet,
            state.masterUnlockKey
          );

          commit(mutationTypes.SET_KEY_SET, {
            keySet: {
              uuid: encKeySet.uuid,
              vaultUuid: encKeySet.vaultUuid,
              ...primaryKeySet,
              isPrimary: encKeySet.isPrimary,
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

      const primaryKeySet = response.data[0];

      const masterUnlockKey = core.helpers.masterUnlockKey.deriveMasterUnlockKeyHelper(
        this.getters.currentAccount.key,
        payload.password,
        primaryKeySet.encSymmetricKey.salt
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
