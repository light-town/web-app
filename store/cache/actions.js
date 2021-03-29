import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export default {
  async [actionTypes.INIT]({ commit }) {
    try {
      const cache = await this.$api.storage.getItem('__cache', {
        parseJson: true,
      });

      commit(mutationTypes.SET_RAWS, { raws: { ...cache } });
      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.SET_CACHE]({ commit }, payload) {
    try {
      if (typeof payload !== 'object' || !payload) {
        commit(mutationTypes.SET_ERROR, {
          error: new Error('The payload is not non-null object'),
        });
        return;
      }

      const cache = await this.$api.storage.getItem('__cache', {
        parseJson: true,
      });

      await this.$api.storage.setItem(
        '__cache',
        {
          ...cache,
          ...payload,
        },
        { json: true }
      );

      commit(mutationTypes.SET_RAWS, { raws: { ...cache, ...payload } });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.CLEAR_CACHE]({ commit }) {
    try {
      await this.$api.storage.removeItem('__cache');
      commit(mutationTypes.CLEAR_CACHE);
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
};
