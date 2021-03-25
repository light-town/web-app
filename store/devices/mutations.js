import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.CREATE_DEVICE](state, payload) {
    state.deviceUuid = payload.deviceUuid;
  },
  [mutationTypes.SET_ERROR](state, payload) {
    state.error = payload.error;
  },
  [mutationTypes.SET_FETCH_STATUS](state, payload) {
    state.fetchStatus = payload.status;
  },
  [mutationTypes.SET_DEVICE_UUID](state, payload) {
    state.deviceUuid = payload.uuid;
  },
};
