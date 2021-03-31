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

      const clientEphemeralKeyPair = core.srp.client.generateEphemeralKeyPair();
      const privateKey = core.srp.client.derivePrivateKey(
        this.getters.currentAccount.key,
        payload.password,
        response.data.salt
      );

      const clientSRPSession = core.srp.client.deriveSession(
        clientEphemeralKeyPair.secret,
        response.data.serverPublicEphemeral,
        response.data.salt,
        this.getters.currentAccount.key,
        privateKey
      );

      commit(mutationTypes.SET_SESSION, {
        session: {
          uuid: response.data.sessionUuid,
          srp: clientSRPSession,
          ephemeralKeyPair: clientEphemeralKeyPair,
          serverPublicEphemeralKey: response.data.serverPublicEphemeral,
          verifing: {
            stage: response.data.sessionVerify.stage,
            MFAType: response.data.sessionVerify.MFAType,
          },
        },
      });
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
  async [actionTypes.START_SESSION]({ commit, state }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.auth.startSession(state.session.uuid, {
        clientPublicEphemeralKey: state.session.ephemeralKeyPair.public,
        clientSessionProofKey: state.session.srp.proof,
      });

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      core.srp.client.verifySession(
        state.session.ephemeralKeyPair.public,
        state.session.srp,
        response.data.serverSessionProof
      );

      commit(mutationTypes.SET_SESSION, {
        session: {
          uuid: state.session.uuid,
          token: response.data.token,
        },
      });
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.error || e });
    }
  },
};
