import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as ContentViewWays from './content-view-ways';

export default {
  [actionTypes.LOAD_CONTENT_VIEW_WAY]({ commit }) {
    const contentViewWay =
      this.$cookies.get('content-view-way') ?? ContentViewWays.GRID;

    commit(mutationTypes.SET_CONTENT_VIEW_WAY, { way: contentViewWay });
  },
  [actionTypes.SET_CONTENT_VIEW_WAY]({ commit }, payload) {
    this.$cookies.set('content-view-way', payload.way ?? ContentViewWays.GRID);

    commit(mutationTypes.SET_CONTENT_VIEW_WAY, { way: payload.way });
  },
};
