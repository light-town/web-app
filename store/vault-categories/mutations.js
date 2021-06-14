import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_VAULT_CATEGORY](state, payload) {
    Vue.set(state.all, payload.category.uuid, {
      ...payload.category,
    });
  },
};
