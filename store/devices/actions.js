import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import identifyDevice from '~/services/devices/identify-device';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.INIT]({ commit, dispatch }) {
    try {
      const deviceUuid =
        (await this.$api.storage.getItem('deviceUuid')) || null;

      if (!deviceUuid) {
        await dispatch(actionTypes.REGIESTER_DEVICE);
        commit(mutationTypes.SET_IS_INIT);
        return;
      }

      const response = await this.$api.devices.getOne({ uuid: deviceUuid });

      commit(mutationTypes.SET_DEVICE_UUID, { uuid: response.data.id });
      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      if (e?.response && e.response?.data) {
        if (e.response.data.message === 'The device was not found') {
          await this.$api.storage.removeItem('deviceUuid');
          await dispatch(actionTypes.REGIESTER_DEVICE);

          commit(mutationTypes.SET_IS_INIT);
          return;
        }

        commit(mutationTypes.SET_ERROR, { error: e.response.data });
        return;
      }

      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
  async [actionTypes.REGIESTER_DEVICE]({ commit, state }) {
    const device = identifyDevice.init();
    try {
      const existsDeviceUuid = await this.$api.storage.getItem('deviceUuid');

      if (existsDeviceUuid) {
        commit(mutationTypes.SET_DEVICE_UUID, { uuid: existsDeviceUuid });
        return;
      }

      commit(mutationTypes.SET_FETCH_STATUS, {
        status: fetchStatuses.LOADING,
      });

      const response = await this.$api.devices.registerDevice({
        os: device.os.name,
      });

      commit(mutationTypes.SET_DEVICE_UUID, { uuid: response.data.deviceUuid });

      await this.$api.storage.setItem('deviceUuid', response.data.deviceUuid);

      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.SUCCESS });
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING) {
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });
      }

      commit(mutationTypes.SET_ERROR, {
        error: e,
      });
    }
  },
};
