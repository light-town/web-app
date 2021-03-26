import * as faker from 'faker';
import actions from '../actions';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';
import commit from './__mocks__/commit';
import api from './__mocks__/api';
import identifyDevice from '~/services/devices/identify-device';
import * as fetchStatuses from '~/store/fetch-statuses';

jest.mock('../../../services/devices/identify-device');

describe('[Devices State] [Actions] ...', () => {
  beforeAll(() => {
    actions.$api = api;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register new device', async () => {
    const TEST_DEVICE_UUID = faker.random.uuid();
    const TEST_FINGERPRINT_DEVICE = {
      os: {
        name: 'Windows',
      },
    };

    identifyDevice.init.mockReturnValueOnce(TEST_FINGERPRINT_DEVICE);
    actions.$api.devices.registerDevice.mockResolvedValueOnce({
      data: {
        deviceUuid: TEST_DEVICE_UUID,
      },
    });

    await actions[actionTypes.REGIESTER_DEVICE]({ commit });

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      {
        status: fetchStatuses.LOADING,
      },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_DEVICE_UUID,
      {
        uuid: TEST_DEVICE_UUID,
      },
    ]);
    expect(commit.mock.calls[2]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      {
        status: fetchStatuses.SUCCESS,
      },
    ]);

    expect(actions.$api.devices.registerDevice).toBeCalledTimes(1);
    expect(actions.$api.devices.registerDevice).toBeCalledWith({
      os: TEST_FINGERPRINT_DEVICE.os.name,
    });

    expect(actions.$api.storage.setItem).toBeCalledTimes(1);
    expect(actions.$api.storage.setItem).toBeCalledWith(
      'deviceUuid',
      TEST_DEVICE_UUID
    );

    expect(identifyDevice.init).toBeCalledTimes(1);
  });

  it('should set error when api request return error', async () => {
    const TEST_STATE = {
      fetchStatus: null,
    };
    const TEST_FINGERPRINT_DEVICE = {
      os: {
        name: 'Windows',
      },
    };
    const TEST_ERROR = {
      type: 'Validation Error',
      message: 'some error',
      statusCode: 500,
    };

    identifyDevice.init.mockReturnValueOnce(TEST_FINGERPRINT_DEVICE);
    actions.$api.devices.registerDevice.mockRejectedValueOnce(TEST_ERROR);

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    await actions[actionTypes.REGIESTER_DEVICE]({
      commit,
      state: TEST_STATE,
    });

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      {
        status: fetchStatuses.LOADING,
      },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      {
        status: fetchStatuses.ERROR,
      },
    ]);
    expect(commit.mock.calls[2]).toEqual([
      mutationTypes.SET_ERROR,
      {
        error: TEST_ERROR,
      },
    ]);
    expect(actions.$api.devices.registerDevice).toBeCalledTimes(1);
    expect(actions.$api.devices.registerDevice).toBeCalledWith({
      os: TEST_FINGERPRINT_DEVICE.os.name,
    });

    expect(actions.$api.storage.setItem).toBeCalledTimes(0);

    expect(identifyDevice.init).toBeCalledTimes(1);
  });

  it('should set device uuid', async () => {
    const TEST_DEVICE_UUID = faker.random.uuid();

    actions.$api.storage.getItem.mockResolvedValueOnce(TEST_DEVICE_UUID);

    await actions[actionTypes.LOAD_DEVICE_UUID]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_DEVICE_UUID,
      {
        uuid: TEST_DEVICE_UUID,
      },
    ]);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');
  });

  it('should set nullable device uuid when device uuid was not found', async () => {
    actions.$api.storage.getItem.mockResolvedValueOnce(undefined);

    await actions[actionTypes.LOAD_DEVICE_UUID]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_DEVICE_UUID,
      {
        uuid: null,
      },
    ]);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');
  });

  it('should do not send request to API when device already registered', async () => {
    const TEST_DEVICE_UUID = faker.random.uuid();
    const TEST_STATE = {
      fetchStatus: null,
    };
    const TEST_FINGERPRINT_DEVICE = {
      os: {
        name: 'Windows',
      },
    };

    identifyDevice.init.mockReturnValueOnce(TEST_FINGERPRINT_DEVICE);
    actions.$api.storage.getItem.mockResolvedValueOnce(TEST_DEVICE_UUID);

    await actions[actionTypes.REGIESTER_DEVICE]({
      commit,
      state: TEST_STATE,
    });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_DEVICE_UUID,
      {
        uuid: TEST_DEVICE_UUID,
      },
    ]);
    expect(actions.$api.devices.registerDevice).toBeCalledTimes(0);
    expect(actions.$api.storage.setItem).toBeCalledTimes(0);

    expect(identifyDevice.init).toBeCalledTimes(1);
  });
});
