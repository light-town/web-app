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

  it('should set session', () => {
    const TEST_PAYLOAD = {
      session: {
        uuid: faker.datatype.uuid(),
      },
    };

    mutations[types.SET_SESSION](localState, TEST_PAYLOAD);

    expect(localState).toStrictEqual({
      ...state,
      session: TEST_PAYLOAD.session,
    });
  });
});
