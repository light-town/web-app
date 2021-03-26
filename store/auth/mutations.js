import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_USERNAME](state, payload) {
    state.username = payload.username;
  },
  [mutationTypes.SET_ACCOUNT_KEY](state, payload) {
    state.accountKey = payload.accountKey;
  },
  [mutationTypes.SET_FETCH_STATUS](state, payload) {
    state.fetchStatus = payload.status;
  },
  [mutationTypes.SET_ERROR](state, payload) {
    state.error = payload.error;
  },
  [mutationTypes.SET_IS_INIT](state) {
    state.isInit = true;
  },
};
