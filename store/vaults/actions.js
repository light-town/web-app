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
        const keySet = Object.values(rootState['key-sets'].all).find(
          keySet => keySet.vaultUuid === vault.uuid
        );
        const key = core.vaults.decryptVaultKey(
          vault.encKey.key,
          keySet.privateKey
        );
        const metadata = await core.vaults.decryptVaultMetadata(
          key,
          vault.encMetadata
        );

        commit(mutationTypes.SET_VAULT, {
          vault: {
            uuid: vault.uuid,
            key,
            metadata,
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
  async [actionTypes.CREATE_VAULT]({ commit, state, rootState }, payload) {
    try {
      const symmetricKey = core.common.generateCryptoRandomString(32);
      const vaultKey = core.common.generateCryptoRandomString(32);

      const { publicKey, privateKey } = await core.vaults.generateKeyPair();
      const encVaultKey = core.vaults.encryptVaultKey(vaultKey, publicKey);
      const encPrivateKey = core.vaults.encryptPrivateKey(
        privateKey,
        symmetricKey
      );

      const encSymmetricKey = core.vaults.encryptSymmetricKey({
        symmetricKey,
        secretKey: rootState['key-sets'].masterUnlockKey.key,
        salt: rootState['key-sets'].masterUnlockKey.salt,
      });

      const vaultMetadata = {
        title: payload.title,
        desc: payload.desc,
      };
      const encVaultMetadata = await core.vaults.encryptVaultMetadata(
        vaultKey,
        vaultMetadata
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaults.createVault(
        rootState.accounts.currentAccountUuid,
        {
          publicKey: core.vaults.publicKeyToString(publicKey),
          encPrivateKey,
          encSymmetricKey,
        },
        { encKey: encVaultKey, encMetadata: encVaultMetadata }
      );

      commit(mutationTypes.SET_VAULT, {
        vault: {
          uuid: response.data.uuid,
          key: vaultKey,
          metadata: vaultMetadata,
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
