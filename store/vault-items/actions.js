import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  [actionTypes.INIT]({ commit }) {
    commit(mutationTypes.SET_IS_INIT);
  },
  async [actionTypes.GET_VAULT_ITEMS](
    { commit },
    payload = { folderUuid: null }
  ) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      let response;

      if (payload.folderUuid) {
        response = await this.$api.vaultItems.getVaultItemsFromFolder(
          this.getters.currentVault.uuid,
          payload.folderUuid,
          { onlyOverview: true }
        );
      } else {
        response = await this.$api.vaultItems.getVaultItems(
          this.getters.currentVault.uuid,
          { onlyOverview: true }
        );
      }

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaultItems = await core.helpers.vaultItems.decryptVaultItemsHelper(
        response.data,
        this.getters.currentVault.key
      );

      vaultItems.forEach(item => {
        commit(mutationTypes.SET_VAULT_ITEM, {
          item,
        });
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.GET_VAULT_ITEM]({ commit }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultItems.getVaultItemFromFolder(
        this.getters.currentVault.uuid,
        payload.folderUuid,
        payload.uuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaultItem = await core.helpers.vaultItems.decryptVaultItemHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_VAULT_ITEM, {
        item: vaultItem,
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.CREATE_VAULT_ITEM]({ commit }, payload) {
    try {
      const encVaultItem = await core.helpers.vaultItems.createVaultItemHelper(
        payload.overview,
        payload.details,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultItems.createVaultItem(
        this.getters.currentVault.uuid,
        payload.folderUuid,
        encVaultItem,
        payload.categoryUuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaultItem = await core.helpers.vaultItems.decryptVaultItemHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_VAULT_ITEM, {
        item: vaultItem,
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  [actionTypes.SET_CURRENT_VAULT_ITEM]({ commit }, payload) {
    commit(mutationTypes.SET_CURRENT_VAULT_ITEM_UUID, { uuid: payload.uuid });
  },
};
