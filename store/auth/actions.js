import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  [actionTypes.INIT]({ commit }) {
    try {
      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.SIGN_UP]({ commit, state, rootState, dispatch }, payload) {
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
        username: rootState.cache.raws.username,
        deviceUuid: rootState.devices.deviceUuid,
      });

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      await dispatch(
        cacheActionTypes.SET_CACHE,
        { accountKey },
        { root: true }
      );
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
  async [actionTypes.CREATE_SESSION]({ commit, state, rootState }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.auth.createSession({
        accountKey: this.getters.currentAccount.key,
        deviceUuid: rootState.devices.deviceUuid,
      });

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const clientEphemeralKeyPair = core.srp.client.generateEphemeral();

      const clientSRPSession = core.srp.client.deriveSession(
        response.data.salt,
        this.getters.currentAccount.key,
        payload.password,
        clientEphemeralKeyPair.secret,
        response.data.serverPublicEphemeral
      );

      commit(mutationTypes.SET_SESSION, {
        session: {
          uuid: response.data.sessionUuid,
          srpSession: clientSRPSession,
          ephemeralKeyPair: clientEphemeralKeyPair,
          serverPublicEphemeralKey: response.data.serverPublicEphemeral,
        },
      });
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
};
