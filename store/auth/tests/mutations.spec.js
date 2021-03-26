import * as faker from 'faker';
import mutations from '../mutations';
import * as types from '../mutation-types';
import state from '../state';
import * as fetchStatuses from '~/store/fetch-statuses';

describe('[Auth State] [Mutations]', () => {
  let localState;

  beforeEach(() => {
    localState = { ...state };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set username', () => {
    const TEST_PAYLOAD = {
      username: faker.internet.userName(),
    };

    mutations[types.SET_USERNAME](localState, TEST_PAYLOAD);

    expect(localState).toStrictEqual({
      ...state,
      username: TEST_PAYLOAD.username,
    });
  });

  it('should set error', () => {
    const TEST_PAYLOAD = {
      error: {
        type: faker.random.word(),
        message: faker.random.word(),
        statusCode: 400,
      },
    };

    mutations[types.SET_ERROR](localState, TEST_PAYLOAD);

    expect(localState).toStrictEqual({
      ...state,
      ...TEST_PAYLOAD,
    });
  });

  it('should set is init flag', () => {
    mutations[types.SET_IS_INIT](localState);

    expect(localState).toStrictEqual({
      ...state,
      isInit: true,
    });
  });

  it('should set fetch status', () => {
    const TEST_PAYLOAD = { status: fetchStatuses.LOADING };
    mutations[types.SET_FETCH_STATUS](localState, TEST_PAYLOAD);

    expect(localState).toStrictEqual({
      ...state,
      fetchStatus: TEST_PAYLOAD.status,
    });
  });

  it('should set account key', () => {
    const TEST_PAYLOAD = { accountKey: faker.random.uuid() };
    mutations[types.SET_ACCOUNT_KEY](localState, TEST_PAYLOAD);

    expect(localState).toStrictEqual({
      ...state,
      accountKey: TEST_PAYLOAD.accountKey,
    });
  });
});
