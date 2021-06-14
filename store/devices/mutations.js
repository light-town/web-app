import * as mutationTypes from './mutation-types';

export default {
  [mutationTypes.CREATE_DEVICE](state, payload) {
    state.deviceUuid = payload.deviceUuid;
  },
  [mutationTypes.SET_DEVICE_UUID](state, payload) {
    state.deviceUuid = payload.uuid;
  },
};
