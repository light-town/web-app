import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_VAULT](state, payload) {
    Vue.set(state.all, payload?.vault?.uuid, payload?.vault);
  },
  [mutationTypes.SET_CURRENT_VAULT_UUID](state, payload) {
    state.currentVaultUuid = payload.uuid;
  },
  [mutationTypes.SET_VAULTS](state, payload) {
    state.all = payload.vaults;
  },
};
