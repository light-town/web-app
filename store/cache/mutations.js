import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_IS_INIT](state) {
    state.isInit = true;
  },
  [mutationTypes.SET_ERROR](state, payload) {
    state.error = payload.error;
  },
  [mutationTypes.SET_RAWS](state, payload) {
    state.raws = payload.raws;
  },
  [mutationTypes.CLEAR_CACHE](state) {
    state.raws = {};
  },
};
