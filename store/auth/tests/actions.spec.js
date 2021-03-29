import core from '@light-town/core';
import * as faker from 'faker';
import actions from '../actions';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';
import api from '~/tests/__mocks__/api';
import commit from '~/tests/__mocks__/commit';
import dispatch from '~/tests/__mocks__/dispatch';
import * as fetchStatuses from '~/store/fetch-statuses';
import * as cacheActionTypes from '~/store/cache/types';

jest.mock('@light-town/core');

describe('[Auth State] [Actions]', () => {
  beforeAll(() => {
    actions.$api = api;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should init auth service', async () => {
    await actions[actionTypes.INIT]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([mutationTypes.SET_IS_INIT]);
  });

  it('should init auth service without load last account uuid', async () => {
    actions.$api.storage.getItem.mockResolvedValueOnce(undefined);

    await actions[actionTypes.INIT]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([mutationTypes.SET_IS_INIT]);
  });

  it('should sign up', async () => {
    const TEST_PASSWORD = faker.random.word();
    const TEST_STATE = { fetchStatus: null };
    const TEST_ROOT_STATE = {
      devices: { deviceUuid: faker.datatype.uuid() },
      cache: { raws: { username: faker.internet.userName() } },
    };
    const TEST_ACCOUNT_KEY = faker.random.word();
    const TEST_VERIFIER = {
      salt: faker.random.word(),
      verifier: faker.random.word(),
    };

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.$api.auth.signUp.mockResolvedValueOnce({});
    core.common.generateAccountKey.mockReturnValueOnce(TEST_ACCOUNT_KEY);
    core.srp.client.deriveVerifier.mockReturnValueOnce(TEST_VERIFIER);

    await actions[actionTypes.SIGN_UP](
      { commit, state: TEST_STATE, rootState: TEST_ROOT_STATE, dispatch },
      { password: TEST_PASSWORD }
    );

    expect(commit).toBeCalledTimes(2);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.LOADING },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.SUCCESS },
    ]);

    expect(actions.$api.auth.signUp).toBeCalledTimes(1);
    expect(actions.$api.auth.signUp).toBeCalledWith({
      accountKey: TEST_ACCOUNT_KEY,
      salt: TEST_VERIFIER.salt,
      verifier: TEST_VERIFIER.verifier,
      username: TEST_ROOT_STATE.cache.raws.username,
      deviceUuid: TEST_ROOT_STATE.devices.deviceUuid,
    });

    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(
      cacheActionTypes.SET_CACHE,
      { accountKey: TEST_ACCOUNT_KEY },
      { root: true }
    );
  });

  it('should throw error while sign up when occurred error in API', async () => {
    const TEST_PASSWORD = faker.random.word();
    const TEST_STATE = { fetchStatus: null };
    const TEST_ROOT_STATE = {
      devices: { deviceUuid: faker.datatype.uuid() },
      cache: { raws: { username: faker.internet.userName() } },
    };
    const TEST_ACCOUNT_KEY = faker.random.word();
    const TEST_VERIFIER = {
      salt: faker.random.word(),
      verifier: faker.random.word(),
    };
    const TEST_ERROR_RESPONSE = {
      response: {
        data: {
          error: {
            type: 'Internal Error',
            message: 'All is very bad!',
          },
          statusCide: 500,
        },
      },
    };

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.$api.auth.signUp.mockRejectedValueOnce(TEST_ERROR_RESPONSE);
    core.common.generateAccountKey.mockReturnValueOnce(TEST_ACCOUNT_KEY);
    core.srp.client.deriveVerifier.mockReturnValueOnce(TEST_VERIFIER);

    await actions[actionTypes.SIGN_UP](
      { commit, state: TEST_STATE, rootState: TEST_ROOT_STATE },
      { password: TEST_PASSWORD }
    );

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.LOADING },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.ERROR },
    ]);
    expect(commit.mock.calls[2]).toEqual([
      mutationTypes.SET_ERROR,
      { error: TEST_ERROR_RESPONSE.response.data.error },
    ]);

    expect(actions.$api.auth.signUp).toBeCalledTimes(1);
    expect(actions.$api.auth.signUp).toBeCalledWith({
      accountKey: TEST_ACCOUNT_KEY,
      salt: TEST_VERIFIER.salt,
      verifier: TEST_VERIFIER.verifier,
      username: TEST_ROOT_STATE.cache.raws.username,
      deviceUuid: TEST_ROOT_STATE.devices.deviceUuid,
    });
  });

  it('should create session', async () => {
    const TEST_PASSWORD = faker.random.word();
    const TEST_STATE = { fetchStatus: null };
    const TEST_CREATE_SESSION_RESPONSE = {
      data: {
        sessionUuid: faker.datatype.uuid(),
        salt: faker.random.word(),
        serverPublicEphemeral: faker.random.word(),
      },
      statusCode: 200,
    };
    const TEST_ROOT_STATE = { devices: { deviceUuid: faker.datatype.uuid() } };
    const TEST_GETTERS = {
      currentAccount: {
        key: faker.datatype.uuid(),
      },
    };
    const TEST_EPEMERAL = {
      key: faker.datatype.uuid(),
      secret: faker.datatype.uuid(),
    };
    const TEST_SESSION = {
      key: faker.datatype.uuid(),
      proof: faker.datatype.uuid(),
    };

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.getters = TEST_GETTERS;
    actions.$api.auth.createSession.mockResolvedValueOnce(
      TEST_CREATE_SESSION_RESPONSE
    );

    core.srp.client.generateEphemeral.mockReturnValueOnce(TEST_EPEMERAL);
    core.srp.client.deriveSession.mockReturnValueOnce(TEST_SESSION);

    await actions[actionTypes.CREATE_SESSION](
      {
        commit,
        state: TEST_STATE,
        rootState: TEST_ROOT_STATE,
      },
      { password: TEST_PASSWORD }
    );

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toMatchObject([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.LOADING },
    ]);
    expect(commit.mock.calls[1]).toMatchObject([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.SUCCESS },
    ]);
    expect(commit.mock.calls[2]).toMatchObject([
      mutationTypes.SET_SESSION,
      {
        session: {
          uuid: TEST_CREATE_SESSION_RESPONSE.data.sessionUuid,
          srpSession: TEST_SESSION,
          ephemeralKeyPair: TEST_EPEMERAL,
          serverPublicEphemeralKey:
            TEST_CREATE_SESSION_RESPONSE.data.serverPublicEphemeral,
        },
      },
    ]);

    expect(core.srp.client.generateEphemeral).toBeCalledTimes(1);

    expect(core.srp.client.deriveSession).toBeCalledTimes(1);
    expect(core.srp.client.deriveSession).toBeCalledWith(
      TEST_CREATE_SESSION_RESPONSE.data.salt,
      TEST_GETTERS.currentAccount.key,
      TEST_PASSWORD,
      TEST_EPEMERAL.secret,
      TEST_CREATE_SESSION_RESPONSE.data.serverPublicEphemeral
    );
  });

  it('should throw error while creating session when occurred error in API', async () => {
    const TEST_ERROR = {
      response: {
        data: {
          error: {
            type: 'Forbidden',
            message: 'Invalid password',
          },
          statusCode: 403,
        },
      },
    };
    const TEST_PASSWORD = faker.random.word();
    const TEST_STATE = { fetchStatus: null };
    const TEST_ROOT_STATE = { devices: { deviceUuid: faker.datatype.uuid() } };
    const TEST_GETTERS = {
      currentAccount: {
        key: faker.datatype.uuid(),
      },
    };

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.getters = TEST_GETTERS;
    actions.$api.auth.createSession.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.CREATE_SESSION](
      {
        commit,
        state: TEST_STATE,
        rootState: TEST_ROOT_STATE,
      },
      { password: TEST_PASSWORD }
    );

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toMatchObject([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.LOADING },
    ]);
    expect(commit.mock.calls[1]).toMatchObject([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.ERROR },
    ]);
    expect(commit.mock.calls[2]).toMatchObject([
      mutationTypes.SET_ERROR,
      {
        error: TEST_ERROR.response.data.error,
      },
    ]);

    expect(core.srp.client.generateEphemeral).toBeCalledTimes(0);
    expect(core.srp.client.deriveSession).toBeCalledTimes(0);
  });
});
