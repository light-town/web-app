import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export default {
  async [actionTypes.LOAD_CACHE]({ commit }) {
    const cache = await this.$api.storage.getItem('__cache', {
      parseJson: true,
    });

    commit(mutationTypes.SET_RAWS, { raws: { ...cache } });
  },
  async [actionTypes.SET_CACHE]({ commit }, payload) {
    if (typeof payload !== 'object' || !payload)
      throw new Error('The payload is not non-null object');

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
  },
  async [actionTypes.CLEAR_CACHE]({ commit }) {
    await this.$api.storage.removeItem('__cache');

    commit(mutationTypes.CLEAR_CACHE);
  },
};
