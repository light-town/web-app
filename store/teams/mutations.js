import Vue from 'vue';
import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.SET_TEAM](state, payload) {
    Vue.set(state.all, payload?.team?.uuid, payload?.team);
  },
  [mutationTypes.SET_CURRENT_TEAM_UUID](state, payload) {
    state.currentTeamUuid = payload.uuid;
  },
};
