import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_CURRENT_VAULT_FOLDER_UUID](state, payload) {
    state.currentVaultFolderUuid = payload.uuid;
  },
  [mutationTypes.SET_VAULT_FOLDER](state, payload) {
    Vue.set(state.all, payload?.folder?.uuid, {
      ...payload?.folder,
      ...(state.all[payload.folder?.uuid] ?? { expanded: false }),
    });
  },
  [mutationTypes.CLEAR_VAULT_FOLDER_LIST](state) {
    state.all = {};
  },
  [mutationTypes.INCREASE_CONTAINED_VAULT_FOLDER_COUNT](state, payload) {
    state.all[payload.uuid].containedFoldersCount++;
  },
  [mutationTypes.SET_EXPANDED_VAULT_FOLDER](state, payload) {
    state.all[payload.uuid].expanded = payload.expanded;
  },
};
