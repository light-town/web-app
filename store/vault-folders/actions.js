import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.INIT]({ commit }) {
    try {
      commit(mutationTypes.SET_IS_INIT);

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultFolders.getRootVaultFolders(
        this.getters.currentVault.uuid
      );

      const vaultFolders = await core.helpers.vaultFolders.decryptVaultFoldersHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      vaultFolders.forEach(folder =>
        commit(mutationTypes.SET_VAULT_FOLDER, {
          folder,
        })
      );
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.CREATE_VAULT_FOLDER]({ commit, rootState }, payload) {
    try {
      const vault = rootState.vaults.all[payload.vaultUuid];

      debugger;

      const encVaultFolder = await core.helpers.vaultFolders.createVaultFolderHelper(
        {
          name: payload.folderName,
          desc: payload.folderDesc,
        },
        vault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultFolders.createVaultFolder(
        vault.uuid,
        encVaultFolder,
        payload.parentFolderUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaultFolder = await core.helpers.vaultFolders.decryptVaultFolderHelper(
        response.data,
        vault.key
      );

      commit(mutationTypes.SET_VAULT_FOLDER, {
        folder: vaultFolder,
      });

      commit(mutationTypes.INCREASE_CONTAINED_VAULT_FOLDER_COUNT, {
        uuid: payload.parentFolderUuid,
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.GET_NESTED_VAULT_FOLDERS]({ commit }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultFolders.getNestedVaultFolders(
        this.getters.currentVault.uuid,
        payload.parentFolderUuid
      );

      const vaultFolders = await core.helpers.vaultFolders.decryptVaultFoldersHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      vaultFolders.forEach(folder =>
        commit(mutationTypes.SET_VAULT_FOLDER, {
          folder,
        })
      );
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.GET_ROOT_VAULT_FOLDERS]({ commit }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultFolders.getRootVaultFolders(
        this.getters.currentVault.uuid
      );

      const vaultFolders = await core.helpers.vaultFolders.decryptVaultFoldersHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      vaultFolders.forEach(folder =>
        commit(mutationTypes.SET_VAULT_FOLDER, {
          folder,
        })
      );
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  [actionTypes.CLEAR_VAULT_FOLDER_LIST]({ commit }) {
    commit(mutationTypes.CLEAR_VAULT_FOLDER_LIST);
  },
  [actionTypes.SET_CURRENT_VAULT_FOLDER]({ commit }, payload) {
    commit(mutationTypes.SET_CURRENT_VAULT_FOLDER_UUID, { uuid: payload.uuid });
  },
  [actionTypes.SET_EXPANDED_VAULT_FOLDER]({ commit }, payload) {
    commit(mutationTypes.SET_EXPANDED_VAULT_FOLDER, {
      uuid: payload.uuid,
      expanded: payload.expanded,
    });
  },
  async [actionTypes.GET_VAULT_FOLDER]({ commit }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultFolders.getVaultFolder(
        this.getters.currentVault.uuid,
        payload.uuid
      );

      const vaultFolder = await core.helpers.vaultFolders.decryptVaultFolderHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      commit(mutationTypes.SET_VAULT_FOLDER, {
        folder: vaultFolder,
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
};
