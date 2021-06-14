import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export default {
  async [actionTypes.GET_VAULT_CATEGORIES]({ commit }) {
    const response = await this.$api.vaultCategories.getVaultCategories(
      this.getters.currentVault.uuid,
      { onlyOverview: true }
    );

    const vaultCategories =
      await core.helpers.vaultItemCategories.decryptVaultItemCategoriesHelper(
        response.data,
        this.getters.currentVault.key
      );

    vaultCategories.forEach(category => {
      commit(mutationTypes.SET_VAULT_CATEGORY, {
        category,
      });
    });
  },
  async [actionTypes.GET_VAULT_CATEGORY]({ commit }, payload) {
    const response = await this.$api.vaultCategories.getVaultCategory(
      this.getters.currentVault.uuid,
      payload.uuid
    );

    const vaultCategory =
      await core.helpers.vaultItemCategories.decryptVaultItemCategoryHelper(
        response.data,
        this.getters.currentVault.key
      );

    commit(mutationTypes.SET_VAULT_CATEGORY, {
      category: vaultCategory,
    });
  },
};
