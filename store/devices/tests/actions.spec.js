import * as faker from 'faker';
import actions from '../actions';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';
import commit from './__mocks__/commit';
import dispatch from './__mocks__/dispatch';
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

  it('should init device service', async () => {
    const TEST_DEVICE_UUID = faker.random.uuid();

    actions.$api.devices.getOne.mockResolvedValueOnce({
      data: { id: TEST_DEVICE_UUID },
    });
    actions.$api.storage.getItem.mockResolvedValueOnce(TEST_DEVICE_UUID);

    await actions[actionTypes.INIT]({ commit });

    expect(commit).toBeCalledTimes(2);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_DEVICE_UUID,
      {
        uuid: TEST_DEVICE_UUID,
      },
    ]);
    expect(commit.mock.calls[1]).toEqual([mutationTypes.SET_IS_INIT]);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');
  });

  it('should register new device while int device service', async () => {
    actions.$api.storage.getItem.mockResolvedValueOnce(undefined);

    await actions[actionTypes.INIT]({ commit, dispatch });

    expect(commit).toBeCalledTimes(1);
    expect(commit).toBeCalledWith(mutationTypes.SET_IS_INIT);

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(actionTypes.REGIESTER_DEVICE);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');
  });

  it('should throw error when occurred error in storage service', async () => {
    const TEST_ERROR = new Error('Service Error');
    actions.$api.storage.getItem.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.INIT]({ commit, dispatch });

    expect(commit).toBeCalledTimes(1);
    expect(commit).toBeCalledWith(mutationTypes.SET_ERROR, {
      error: TEST_ERROR,
    });
    expect(dispatch).toBeCalledTimes(0);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');
  });

  it('should throw error when occurred error in API', async () => {
    const TEST_DEVICE_UUID = faker.random.uuid();
    const TEST_ERROR = {
      response: {
        data: {
          type: 'Internal Found',
          message: 'Some message error',
          statusCode: 500,
        },
      },
    };

    actions.$api.storage.getItem.mockResolvedValueOnce(TEST_DEVICE_UUID);
    actions.$api.devices.getOne.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.INIT]({ commit, dispatch });

    expect(commit).toBeCalledTimes(1);
    expect(commit).toBeCalledWith(mutationTypes.SET_ERROR, {
      error: TEST_ERROR.response.data,
    });
    expect(dispatch).toBeCalledTimes(0);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');
  });

  it('should register device when an occurred error in API about not found the current device', async () => {
    const TEST_DEVICE_UUID = faker.random.uuid();
    const TEST_ERROR = {
      response: {
        data: {
          type: 'Not Found',
          message: 'The device was not found',
          statusCode: 404,
        },
      },
    };

    actions.$api.storage.getItem.mockResolvedValueOnce(TEST_DEVICE_UUID);
    actions.$api.devices.getOne.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.INIT]({ commit, dispatch });

    expect(commit).toBeCalledTimes(1);
    expect(commit).toBeCalledWith(mutationTypes.SET_IS_INIT);

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(actionTypes.REGIESTER_DEVICE);

    expect(actions.$api.storage.getItem).toBeCalledTimes(1);
    expect(actions.$api.storage.getItem).toBeCalledWith('deviceUuid');

    expect(actions.$api.storage.removeItem).toBeCalledTimes(1);
    expect(actions.$api.storage.removeItem).toBeCalledWith('deviceUuid');
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
