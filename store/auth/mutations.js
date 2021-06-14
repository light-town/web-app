import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_SESSION](state, payload) {
    state.session = payload.session;
  },
  [mutationTypes.SET_TOKEN](state, payload) {
    state.session.token = payload.token;
  },
};
