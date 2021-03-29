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
  [mutationTypes.SET_CURRENT_ACCOUNT_UUID](state, payload) {
    state.currentAccountUuid = payload.uuid;
  },
  [mutationTypes.SET_USER](state, payload) {
    Vue.set(state.users, payload.user.uuid, payload.user);
  },
  [mutationTypes.SET_ACCOUNT](state, payload) {
    Vue.set(state.accounts, payload.account.uuid, payload.account);
  },
};
