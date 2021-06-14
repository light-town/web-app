import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_CONTENT_VIEW_WAY](state, payload) {
    state.contentViewWay = payload.way;
  },
};
