import core from '@light-town/core';
import * as faker from 'faker';
import actions from '../actions';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';
import api from './__mocks__/api';
import commit from './__mocks__/commit';
import * as fetchStatuses from '~/store/fetch-statuses';

jest.mock('@light-town/core');

describe('[Auth State] [Actions]', () => {
  beforeAll(() => {
    actions.$api = api;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should init auth service', async () => {
    const TEST_USERNAME = faker.internet.userName();
    const TEST_ACCOUNT_KEY = faker.random.uuid();

    actions.$api.storage.getItem.mockResolvedValueOnce({
      username: TEST_USERNAME,
      accountKey: TEST_ACCOUNT_KEY,
    });

    await actions[actionTypes.INIT]({ commit });

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_USERNAME,
      {
        username: TEST_USERNAME,
      },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_ACCOUNT_KEY,
      {
        accountKey: TEST_ACCOUNT_KEY,
      },
    ]);
    expect(commit.mock.calls[2]).toEqual([mutationTypes.SET_IS_INIT]);
  });

  it('should init service without load username', async () => {
    actions.$api.storage.getItem.mockResolvedValueOnce(undefined);

    await actions[actionTypes.INIT]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([mutationTypes.SET_IS_INIT]);
  });

  it('should throw error while init service when occurred error in storage service', async () => {
    const TEST_ERROR = new Error('Service error');
    actions.$api.storage.getItem.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.INIT]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_ERROR,
      { error: TEST_ERROR },
    ]);
  });

  it('should set username', async () => {
    const TEST_PAYLOAD = { username: faker.internet.userName() };

    await actions[actionTypes.SET_USERNAME]({ commit }, TEST_PAYLOAD);

    expect(commit).toBeCalledTimes(1);
    expect(commit).toBeCalledWith(mutationTypes.SET_USERNAME, TEST_PAYLOAD);

    expect(actions.$api.storage.setItem).toBeCalledTimes(1);
    expect(actions.$api.storage.setItem).toBeCalledWith(
      'auth-cache',
      { username: TEST_PAYLOAD.username },
      { json: true }
    );
  });

  it('should throw error when was  occurred an error in storage', async () => {
    const TEST_PAYLOAD = { username: faker.internet.userName() };
    const TEST_ERROR = new Error('Service Error');

    actions.$api.storage.setItem.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.SET_USERNAME]({ commit }, TEST_PAYLOAD);

    expect(commit).toBeCalledTimes(1);
    expect(commit).toBeCalledWith(mutationTypes.SET_ERROR, {
      error: TEST_ERROR,
    });

    expect(actions.$api.storage.setItem).toBeCalledTimes(1);
    expect(actions.$api.storage.setItem).toBeCalledWith(
      'auth-cache',
      { username: TEST_PAYLOAD.username },
      { json: true }
    );
  });

  it('should sign up', async () => {
    const TEST_PAYLOAD = { password: faker.random.word() };
    const TEST_STATE = { username: faker.internet.userName() };
    const TEST_ROOT_STATE = { devices: { deviceUuid: faker.random.uuid() } };
    const TEST_ACCOUNT_KEY = faker.random.word();
    const TEST_VERIFIER = {
      salt: faker.random.word(),
      verifier: faker.random.word(),
    };

    actions.$api.auth.signUp.mockResolvedValueOnce({});
    core.common.generateAccountKey.mockReturnValueOnce(TEST_ACCOUNT_KEY);
    core.srp.client.deriveVerifier.mockReturnValueOnce(TEST_VERIFIER);

    await actions[actionTypes.SIGN_UP](
      { commit, state: TEST_STATE, rootState: TEST_ROOT_STATE },
      TEST_PAYLOAD
    );

    expect(commit).toBeCalledTimes(3);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.LOADING },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.SUCCESS },
    ]);
    expect(commit.mock.calls[2]).toEqual([
      mutationTypes.SET_ACCOUNT_KEY,
      { accountKey: TEST_ACCOUNT_KEY },
    ]);

    expect(actions.$api.auth.signUp).toBeCalledTimes(1);
    expect(actions.$api.auth.signUp).toBeCalledWith({
      accountKey: TEST_ACCOUNT_KEY,
      salt: TEST_VERIFIER.salt,
      verifier: TEST_VERIFIER.verifier,
      username: TEST_STATE.username,
      deviceUuid: TEST_ROOT_STATE.devices.deviceUuid,
    });
  });

  it('should throw error while sign up when occurred error in storage service', async () => {
    const TEST_PAYLOAD = { password: faker.random.word() };
    const TEST_STATE = { username: faker.internet.userName() };
    const TEST_ROOT_STATE = { devices: { deviceUuid: faker.random.uuid() } };
    const TEST_ACCOUNT_KEY = faker.random.word();
    const TEST_VERIFIER = {
      salt: faker.random.word(),
      verifier: faker.random.word(),
    };
    const TEST_ERROR = new Error('Service error');

    actions.$api.storage.getItem.mockRejectedValueOnce(TEST_ERROR);
    actions.$api.auth.signUp.mockResolvedValueOnce({});
    core.common.generateAccountKey.mockReturnValueOnce(TEST_ACCOUNT_KEY);
    core.srp.client.deriveVerifier.mockReturnValueOnce(TEST_VERIFIER);

    await actions[actionTypes.SIGN_UP](
      { commit, state: TEST_STATE, rootState: TEST_ROOT_STATE },
      TEST_PAYLOAD
    );

    expect(commit).toBeCalledTimes(4);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.LOADING },
    ]);
    expect(commit.mock.calls[1]).toEqual([
      mutationTypes.SET_FETCH_STATUS,
      { status: fetchStatuses.SUCCESS },
    ]);
    expect(commit.mock.calls[2]).toEqual([
      mutationTypes.SET_ACCOUNT_KEY,
      { accountKey: TEST_ACCOUNT_KEY },
    ]);
    expect(commit.mock.calls[3]).toEqual([
      mutationTypes.SET_ERROR,
      { error: TEST_ERROR },
    ]);

    expect(actions.$api.auth.signUp).toBeCalledTimes(1);
    expect(actions.$api.auth.signUp).toBeCalledWith({
      accountKey: TEST_ACCOUNT_KEY,
      salt: TEST_VERIFIER.salt,
      verifier: TEST_VERIFIER.verifier,
      username: TEST_STATE.username,
      deviceUuid: TEST_ROOT_STATE.devices.deviceUuid,
    });
  });

  it('should throw error while sign up when occurred error in API', async () => {
    const TEST_PAYLOAD = { password: faker.random.word() };
    const TEST_STATE = { username: faker.internet.userName() };
    const TEST_ROOT_STATE = { devices: { deviceUuid: faker.random.uuid() } };
    const TEST_ACCOUNT_KEY = faker.random.word();
    const TEST_VERIFIER = {
      salt: faker.random.word(),
      verifier: faker.random.word(),
    };
    const TEST_ERROR = {
      response: {
        data: {
          type: 'Internal Error',
          message: 'All is very bad!',
          statusCide: 500,
        },
      },
    };

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.$api.auth.signUp.mockRejectedValueOnce(TEST_ERROR);
    core.common.generateAccountKey.mockReturnValueOnce(TEST_ACCOUNT_KEY);
    core.srp.client.deriveVerifier.mockReturnValueOnce(TEST_VERIFIER);

    await actions[actionTypes.SIGN_UP](
      { commit, state: TEST_STATE, rootState: TEST_ROOT_STATE },
      TEST_PAYLOAD
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
      { error: TEST_ERROR.response.data },
    ]);

    expect(actions.$api.auth.signUp).toBeCalledTimes(1);
    expect(actions.$api.auth.signUp).toBeCalledWith({
      accountKey: TEST_ACCOUNT_KEY,
      salt: TEST_VERIFIER.salt,
      verifier: TEST_VERIFIER.verifier,
      username: TEST_STATE.username,
      deviceUuid: TEST_ROOT_STATE.devices.deviceUuid,
    });
  });

  it('should clear auth cache', async () => {
    await actions[actionTypes.CLEAR_CACHE]({ commit });

    expect(commit).toBeCalledTimes(0);

    expect(actions.$api.storage.removeItem).toBeCalledTimes(1);
    expect(actions.$api.storage.removeItem).toBeCalledWith('auth-cache');
  });

  it('should throw error while clear auth cache when occurred error in storage service', async () => {
    const TEST_ERROR = new Error('Service Error');

    actions.$api.storage.removeItem.mockRejectedValueOnce(TEST_ERROR);

    await actions[actionTypes.CLEAR_CACHE]({ commit });

    expect(commit).toBeCalledTimes(1);
    expect(commit.mock.calls[0]).toEqual([
      mutationTypes.SET_ERROR,
      {
        error: TEST_ERROR,
      },
    ]);

    expect(actions.$api.storage.removeItem).toBeCalledTimes(1);
    expect(actions.$api.storage.removeItem).toBeCalledWith('auth-cache');
  });
});
