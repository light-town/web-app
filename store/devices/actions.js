import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import identifyDevice from '~/services/devices/identify-device';

export default {
  async [actionTypes.LOAD_DEVICE]({ commit, dispatch }) {
    try {
      const deviceUuid =
        (await this.$api.storage.getItem('deviceUuid')) || null;

      if (!deviceUuid) {
        await dispatch(actionTypes.REGIESTER_DEVICE);
        return;
      }

      const response = await this.$api.devices.getOne({ uuid: deviceUuid });

      commit(mutationTypes.SET_DEVICE_UUID, { uuid: response.data.id });
    } catch (e) {
      if (e?.response && e.response?.data?.error) {
        if (e.response.data.error.message === 'The device was not found') {
          await this.$api.storage.removeItem('deviceUuid');
          await dispatch(actionTypes.REGIESTER_DEVICE);

          return;
        }

        throw e;
      }

      throw e;
    }
  },
  async [actionTypes.REGIESTER_DEVICE]({ commit }) {
    const device = identifyDevice.init();

    const existsDeviceUuid = await this.$api.storage.getItem('deviceUuid');

    if (existsDeviceUuid) {
      commit(mutationTypes.SET_DEVICE_UUID, { uuid: existsDeviceUuid });
      return;
    }

    const response = await this.$api.devices.registerDevice({
      os: device.os.name,
    });

    commit(mutationTypes.SET_DEVICE_UUID, { uuid: response.data.deviceUuid });

    await this.$api.storage.setItem('deviceUuid', response.data.deviceUuid);
  },
};
