import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.INIT]({ commit }) {
    try {
      const authCache = await this.$api.storage.getItem('auth-cache', {
        parseJson: true,
      });

      if (typeof authCache !== 'object' || authCache === null) {
        commit(mutationTypes.SET_IS_INIT);
        return;
      }

      commit(mutationTypes.SET_USERNAME, { username: authCache.username });
      commit(mutationTypes.SET_ACCOUNT_KEY, {
        accountKey: authCache.accountKey,
      });
      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.SET_USERNAME]({ commit }, payload) {
    try {
      await this.$api.storage.setItem(
        'auth-cache',
        {
          username: payload.username,
        },
        { json: true }
      );

      commit(mutationTypes.SET_USERNAME, { username: payload.username });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.SIGN_UP]({ commit, state, rootState }, payload) {
    try {
      const accountKey = core.common.generateAccountKey({
        versionCode: 'A3',
        secret: core.common.generateCryptoRandomString(32),
      });

      const verifier = core.srp.client.deriveVerifier(
        accountKey,
        payload.password
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      await this.$api.auth.signUp({
        accountKey,
        salt: verifier.salt,
        verifier: verifier.verifier,
        username: state.username,
        deviceUuid: rootState.devices.deviceUuid,
      });

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      commit(mutationTypes.SET_ACCOUNT_KEY, { accountKey });

      const authCache =
        (await this.$api.storage.getItem('auth-cache', {
          parseJson: true,
        })) || {};
      await this.$api.storage.setItem(
        'auth-cache',
        { ...authCache, accountKey },
        { json: true }
      );
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      if (e?.response && e.response?.data) {
        commit(mutationTypes.SET_ERROR, { error: e.response.data });
        return;
      }

      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.CLEAR_CACHE]({ commit }) {
    try {
      await this.$api.storage.removeItem('auth-cache');
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
};
