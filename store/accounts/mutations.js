import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
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
