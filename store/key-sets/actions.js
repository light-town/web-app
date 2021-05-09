import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.LOAD_KEY_SETS]({ commit, state, rootState }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const { data: encKeySets } = await this.$api.keySets.getKeySets(
        rootState.accounts.currentAccountUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const encPrimaryKeySet = encKeySets.find(k => k.isPrimary);

      if (!encPrimaryKeySet)
        throw new Error('The primary key set was not found');

      const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
        encPrimaryKeySet,
        state.masterUnlockKey
      );

      const encSecondaryKeySets = encKeySets.filter(k => !k.isPrimary);
      const secondaryKeySets = await Promise.all(
        encSecondaryKeySets.map(k =>
          core.helpers.keySets.decryptKeySetHelper(k, primaryKeySet.privateKey)
        )
      );

      [primaryKeySet, ...secondaryKeySets].forEach(keySet =>
        commit(mutationTypes.SET_KEY_SET, {
          keySet,
        })
      );
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
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
};
