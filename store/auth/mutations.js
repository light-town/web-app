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
  [mutationTypes.SET_SESSION](state, payload) {
    state.session = payload.session;
  },
  [mutationTypes.SET_TOKEN](state, payload) {
    if (state.session) state.session.token = payload.token;
  },
};
