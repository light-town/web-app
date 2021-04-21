import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_IS_INIT](state) {
    state.isInit = true;
  },
  [mutationTypes.SET_FETCH_STATUS](state, payload) {
    state.fetchStatus = payload.status;
  },
  [mutationTypes.SET_ERROR](state, payload) {
    state.error = payload.error;
  },
  [mutationTypes.SET_ERROR](state, payload) {
    state.error = payload.error;
  },
  [mutationTypes.SET_CURRENT_VAULT_FOLDER_UUID](state, payload) {
    state.currentVaultFolderUuid = payload.uuid;
  },
  [mutationTypes.SET_VAULT_FOLDER](state, payload) {
    Vue.set(state.all, payload?.folder?.uuid, payload?.folder);
  },
  [mutationTypes.CLEAR_VAULT_FOLDER_LIST](state) {
    state.all = {};
  },
  [mutationTypes.INCREASE_CONTAINED_VAULT_FOLDER_COUNT](state, payload) {
    state.all[payload.uuid].containedFoldersCount++;
  },
};
