import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_KEY_SET](state, payload) {
    Vue.set(state.all, payload?.keySet?.uuid, payload?.keySet);
  },
  [mutationTypes.SET_MASTER_UNLOCK_KEY](state, payload) {
    state.masterUnlockKey = payload.key;
  },
};
