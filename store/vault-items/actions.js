import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export default {
  async [actionTypes.GET_VAULT_ITEMS]({ commit }, payload = {}) {
    let response;

    if (payload.folderUuid) {
      response = await this.$api.vaultItems.getVaultItemsFromFolder(
        this.getters.currentVault.uuid,
        payload.folderUuid
      );
    } else {
      response = await this.$api.vaultItems.getVaultItems(
        this.getters.currentVault.uuid
      );
    }

    const vaultItems = await core.helpers.vaultItems.decryptVaultItemsHelper(
      response.data,
      this.getters.currentVault.key
    );

    vaultItems.forEach(item => {
      commit(mutationTypes.SET_VAULT_ITEM, {
        item,
      });
    });
  },
  async [actionTypes.GET_VAULT_ITEM]({ commit }, payload) {
    let response;

    if (payload.folderUuid)
      response = await this.$api.vaultItems.getVaultItemFromFolder(
        this.getters.currentVault.uuid,
        payload.folderUuid,
        payload.uuid,
        { onlyOverview: false }
      );
    else
      response = await this.$api.vaultItems.getVaultItem(
        this.getters.currentVault.uuid,
        payload.uuid,
        { onlyOverview: false }
      );

    const vaultItem = await core.helpers.vaultItems.decryptVaultItemHelper(
      response.data,
      this.getters.currentVault.key
    );

    commit(mutationTypes.SET_VAULT_ITEM, {
      item: vaultItem,
    });
  },
  async [actionTypes.CREATE_VAULT_ITEM]({ commit }, payload) {
    debugger;

    const encVaultItem = await core.helpers.vaultItems.createVaultItemHelper(
      payload.overview,
      payload.details,
      this.getters.currentVault.key
    );

    const response = await this.$api.vaultItems.createVaultItem(
      this.getters.currentVault.uuid,
      payload.folderUuid,
      encVaultItem,
      payload.categoryUuid
    );

    const vaultItem = await core.helpers.vaultItems.decryptVaultItemHelper(
      response.data,
      this.getters.currentVault.key
    );

    commit(mutationTypes.SET_VAULT_ITEM, {
      item: vaultItem,
    });
  },
  [actionTypes.SET_CURRENT_VAULT_ITEM]({ commit }, payload) {
    commit(mutationTypes.SET_CURRENT_VAULT_ITEM_UUID, { uuid: payload.uuid });
  },
};
