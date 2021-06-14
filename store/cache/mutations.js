import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_RAWS](state, payload) {
    state.raws = payload.raws;
  },
  [mutationTypes.CLEAR_CACHE](state) {
    state.raws = {};
  },
};
