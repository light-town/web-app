import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as cacheActionTypes from '~/store/cache/types';

export default {
  async [actionTypes.SIGN_UP]({ rootState, dispatch }, payload) {
    const accountKey = core.encryption.common.generateAccountKey(
      'A3',
      core.encryption.common.generateCryptoRandomString(32)
    );

    const normalizedMasterPassword =
      core.encryption.common.normalizeMasterPassword(payload.password);

    const masterUnlockKey =
      core.helpers.masterUnlockKey.deriveMasterUnlockKeyHelper(
        accountKey,
        normalizedMasterPassword
      );

    const verifier = core.srp.client.deriveVerifier(
      accountKey,
      normalizedMasterPassword
    );

    const encPrimaryKeySet =
      await core.helpers.keySets.createPrimaryKeySetHelper(masterUnlockKey);

    const primaryKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
      encPrimaryKeySet,
      masterUnlockKey
    );

    const encPrimaryVault = await core.helpers.vaults.createVaultHelper(
      {
        name: this.$i18n.t('Personal'),
        desc: this.$i18n.t('Your default vault for storing elements.'),
      },
      primaryKeySet.publicKey
    );

    const primaryVault =
      await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
        encPrimaryVault,
        primaryKeySet.privateKey
      );

    const encPrimaryVaultItemCategories =
      await core.helpers.vaultItemCategories.createDefaultVaultItemCategories(
        primaryVault.key
      );

    const encVaultItem = await core.helpers.vaultItems.createVaultItemHelper(
      {
        name: this.$i18n.t('LightTown Account'),
        fields: [
          {
            fieldName: 'Avatar',
            id: 'D1E6541DED5553DA53DB08A34B30DD96',
            name: 'Avatar',
            position: 1,
            value: this.$i18n.t('LightTown Account'),
          },
          {
            fieldName: 'Username',
            id: 'B3D2D99F04045A0959B99174859D3D2B',
            name: 'Username',
            position: 2,
            value: accountKey,
          },
          {
            fieldName: 'Website URL',
            id: 'BC6A0C0D1E82D1C01C41B64153F8047E',
            name: 'Website URL',
            position: 4,
            value: location.origin,
          },
        ],
      },
      {
        fields: [
          {
            fieldName: 'Password',
            id: 'D40060FA72CC884AA36D097AEC7CB242',
            name: 'Password',
            position: 3,
            value: payload.password,
          },
        ],
      },
      primaryVault.key
    );

    await this.$api.auth.signUp(
      rootState.devices.deviceUuid,
      {
        verifier: verifier.verifier,
        salt: verifier.salt,
      },
      { accountKey, username: rootState.cache.raws.username },
      {
        ...encPrimaryKeySet,
      },
      {
        ...encPrimaryVault,
        encCategories: encPrimaryVaultItemCategories,
        encPrimaryVaultItems: [
          {
            ...encVaultItem,
            category: encPrimaryVaultItemCategories[0],
          },
        ],
      }
    );

    await dispatch(cacheActionTypes.SET_CACHE, { accountKey }, { root: true });
  },
  async [actionTypes.CREATE_SESSION]({ commit, dispatch, rootState }, payload) {
    const response = await this.$api.auth.createSession({
      accountKey: this.getters.currentAccount.key,
      deviceUuid: rootState.devices.deviceUuid,
    });

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
          ...response.data.sessionVerification,
        },
      },
    });

    if (response.data.sessionVerification?.verificationDevice) {
      dispatch(
        cacheActionTypes.SET_CACHE,
        {
          verificationDevice: {
            os: response.data.sessionVerification.verificationDevice.os,
            model: response.data.sessionVerification.verificationDevice.model,
          },
        },
        { root: true }
      );
    }
  },
  async [actionTypes.START_SESSION]({ commit, state }) {
    const response = await this.$api.auth.startSession(state.session.uuid, {
      clientPublicEphemeralKey: state.session.ephemeralKeyPair.public,
      clientSessionProofKey: state.session.srp.proof,
    });

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
  },
  [actionTypes.SET_TOKEN]({ commit }, payload) {
    commit(mutationTypes.SET_TOKEN, { token: payload.token });
  },
};
