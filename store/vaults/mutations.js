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
  [mutationTypes.SET_VAULT](state, payload) {
    Vue.set(state.all, payload?.vault?.uuid, payload?.vault);
  },
};
