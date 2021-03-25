import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import identifyDevice from '~/services/devices/identify-device';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  [actionTypes.REGIESTER_DEVICE]({ commit }) {
    const device = identifyDevice.init();

    commit(mutationTypes.SET_FETCH_STATUS, {
      status: fetchStatuses.LOADING,
    });

    return this.$api.devices
      .registerDevice({
        os: device.os.name,
      })
      .then(({ data }) => {
        commit(mutationTypes.SET_DEVICE_UUID, { uuid: data.deviceUuid });
        return this.$api.storage.setItem('deviceUuid', data.deviceUuid);
      })
      .then(() => {
        commit(mutationTypes.SET_FETCH_STATUS, {
          status: fetchStatuses.SUCCESS,
        });
      })
      .catch(e => {
        commit(mutationTypes.SET_FETCH_STATUS, {
          status: fetchStatuses.ERROR,
        });
        commit(mutationTypes.SET_ERROR, {
          error: e,
        });
      });
  },
  async [actionTypes.LOAD_DEVICE_UUID]({ commit }) {
    const deviceUuid = (await this.$api.storage.getItem('deviceUuid')) || null;

    commit(mutationTypes.SET_DEVICE_UUID, { uuid: deviceUuid });
  },
};
