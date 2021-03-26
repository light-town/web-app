import * as faker from 'faker';
import mutations from '../mutations';
import * as mutationTypes from '../mutation-types';
import state from '../state';
import * as fetchStatuses from '~/store/fetch-statuses';

describe('[Devices State] [Mutaions] ...', () => {
  let localState;

  beforeEach(() => {
    localState = { ...state };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new device', () => {
    const TEST_PAYLOAD = {
      deviceUuid: faker.random.uuid(),
    };

    mutations[mutationTypes.CREATE_DEVICE](localState, TEST_PAYLOAD);

    expect(localState).toStrictEqual({
      ...state,
      deviceUuid: TEST_PAYLOAD.deviceUuid,
    });
  });

  it('should set fetch status', () => {
    const TEST_FETCH_STATUS = {
      status: fetchStatuses.LOADING,
    };

    mutations[mutationTypes.SET_FETCH_STATUS](localState, TEST_FETCH_STATUS);

    expect(localState).toStrictEqual({
      ...state,
      fetchStatus: TEST_FETCH_STATUS.status,
    });
  });

  it('should set error', () => {
    const TEST_ERROR = {
      error: {
        type: 'Validation Error',
        message: '',
        statusCode: 400,
      },
    };

    mutations[mutationTypes.SET_ERROR](localState, TEST_ERROR);

    expect(localState).toStrictEqual({
      ...state,
      error: TEST_ERROR.error,
    });
  });

  it('should set device uuid', () => {
    const TEST_DEVICE_UUID = faker.random.uuid();

    mutations[mutationTypes.SET_DEVICE_UUID](localState, TEST_DEVICE_UUID);

    expect(localState).toStrictEqual({
      ...state,
      deviceUuid: TEST_DEVICE_UUID.deviceUuid,
    });
  });

  it('should set is init flag', () => {
    mutations[mutationTypes.SET_IS_INIT](localState);

    expect(localState).toStrictEqual({
      ...state,
      isInit: true,
    });
  });
});
