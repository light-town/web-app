import core from '@light-town/core';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  [actionTypes.INIT]({ commit }) {
    commit(mutationTypes.SET_IS_INIT);
  },
  async [actionTypes.GET_VAULT_CATEGORIES]({ commit }) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultCategories.getVaultCategories(
        this.getters.currentVault.uuid,
        { onlyOverview: true }
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaultCategories = await core.helpers.vaultItemCategories.decryptVaultItemCategoriesHelper(
        response.data,
        this.getters.currentVault.key
      );

      vaultCategories.forEach(category => {
        commit(mutationTypes.SET_VAULT_CATEGORY, {
          category,
        });
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.GET_VAULT_CATEGORY]({ commit }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.vaultCategories.getVaultCategory(
        this.getters.currentVault.uuid,
        payload.uuid
      );

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });

      const vaultCategory = await core.helpers.vaultItemCategories.decryptVaultItemCategoryHelper(
        response.data,
        this.getters.currentVault.key
      );

      commit(mutationTypes.SET_VAULT_CATEGORY, {
        category: vaultCategory,
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
};
