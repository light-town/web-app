import core from '@light-town/core';
import * as faker from 'faker';
import actions from '../actions';
import * as actionTypes from '../action-types';
import * as mutationTypes from '../mutation-types';
import api from '~/__tests__/__mocks__/api';
import commit from '~/__tests__/__mocks__/commit';
import dispatch from '~/__tests__/__mocks__/dispatch';
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
        sessionVerify: {
          stage: faker.random.word(),
          MFAType: faker.random.word(),
        },
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
    const TEST_PRIVATE_KEY = faker.datatype.uuid();

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.getters = TEST_GETTERS;
    actions.$api.auth.createSession.mockResolvedValueOnce(
      TEST_CREATE_SESSION_RESPONSE
    );

    core.srp.client.derivePrivateKey.mockReturnValueOnce(TEST_PRIVATE_KEY);
    core.srp.client.generateEphemeralKeyPair.mockReturnValueOnce(TEST_EPEMERAL);
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
          srp: TEST_SESSION,
          ephemeralKeyPair: TEST_EPEMERAL,
          serverPublicEphemeralKey:
            TEST_CREATE_SESSION_RESPONSE.data.serverPublicEphemeral,
          verifing: {
            stage: TEST_CREATE_SESSION_RESPONSE.data.sessionVerify.stage,
            MFAType: TEST_CREATE_SESSION_RESPONSE.data.sessionVerify.MFAType,
          },
        },
      },
    ]);

    expect(core.srp.client.generateEphemeralKeyPair).toBeCalledTimes(1);

    expect(core.srp.client.deriveSession).toBeCalledTimes(1);
    expect(core.srp.client.deriveSession).toBeCalledWith(
      TEST_EPEMERAL.secret,
      TEST_CREATE_SESSION_RESPONSE.data.serverPublicEphemeral,
      TEST_CREATE_SESSION_RESPONSE.data.salt,
      TEST_GETTERS.currentAccount.key,
      TEST_PRIVATE_KEY
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

    expect(core.srp.client.generateEphemeralKeyPair).toBeCalledTimes(0);
    expect(core.srp.client.deriveSession).toBeCalledTimes(0);
  });

  it('should create session', async () => {
    const TEST_SESSION = {
      uuid: faker.datatype.uuid(),
      ephemeralKeyPair: {
        public: faker.datatype.uuid(),
      },
      srp: {
        proof: faker.datatype.uuid(),
        key: faker.datatype.uuid(),
      },
    };
    const TEST_START_SESSION_RESPONSE = {
      data: {
        serverSessionProof: faker.datatype.uuid(),
        token: faker.datatype.uuid(),
      },
      statusCode: 200,
    };

    actions.$api.auth.startSession.mockResolvedValueOnce(
      TEST_START_SESSION_RESPONSE
    );

    await actions[actionTypes.START_SESSION]({
      commit,
      state: { session: TEST_SESSION },
    });

    expect(commit).toBeCalledTimes(3);

    expect(commit.mock.calls[0][0]).toStrictEqual(
      mutationTypes.SET_FETCH_STATUS
    );
    expect(commit.mock.calls[0][1]).toStrictEqual({
      status: fetchStatuses.LOADING,
    });

    expect(commit.mock.calls[1][0]).toStrictEqual(
      mutationTypes.SET_FETCH_STATUS
    );
    expect(commit.mock.calls[1][1]).toStrictEqual({
      status: fetchStatuses.SUCCESS,
    });

    expect(commit.mock.calls[2][0]).toStrictEqual(mutationTypes.SET_SESSION);
    expect(commit.mock.calls[2][1]).toStrictEqual({
      session: {
        uuid: TEST_SESSION.uuid,
        token: TEST_START_SESSION_RESPONSE.data.token,
      },
    });

    expect(actions.$api.auth.startSession).toBeCalledTimes(1);
    expect(actions.$api.auth.startSession.mock.calls[0][0]).toStrictEqual(
      TEST_SESSION.uuid
    );
    expect(actions.$api.auth.startSession.mock.calls[0][1]).toStrictEqual({
      clientPublicEphemeralKey: TEST_SESSION.ephemeralKeyPair.public,
      clientSessionProofKey: TEST_SESSION.srp.proof,
    });
  });

  it('should throw error while creating session when occurred error in API', async () => {
    const TEST_SESSION = {
      uuid: faker.datatype.uuid(),
      ephemeralKeyPair: {
        public: faker.datatype.uuid(),
      },
      srp: {
        proof: faker.datatype.uuid(),
        key: faker.datatype.uuid(),
      },
    };
    const TEST_STATE = { session: TEST_SESSION };
    const TEST_START_SESSION_RESPONSE = {
      error: {
        type: 'Forbitten',
        message: 'The session was not verified',
      },
      statusCode: 200,
    };

    commit.mockImplementationOnce(
      () => (TEST_STATE.fetchStatus = fetchStatuses.LOADING)
    );

    actions.$api.auth.startSession.mockRejectedValueOnce(
      TEST_START_SESSION_RESPONSE
    );

    await actions[actionTypes.START_SESSION]({
      commit,
      state: TEST_STATE,
    });

    expect(commit).toBeCalledTimes(3);

    expect(commit.mock.calls[0][0]).toStrictEqual(
      mutationTypes.SET_FETCH_STATUS
    );
    expect(commit.mock.calls[0][1]).toStrictEqual({
      status: fetchStatuses.LOADING,
    });

    expect(commit.mock.calls[1][0]).toStrictEqual(
      mutationTypes.SET_FETCH_STATUS
    );
    expect(commit.mock.calls[1][1]).toStrictEqual({
      status: fetchStatuses.ERROR,
    });

    expect(commit.mock.calls[2][0]).toStrictEqual(mutationTypes.SET_ERROR);
    expect(commit.mock.calls[2][1]).toStrictEqual({
      error: TEST_START_SESSION_RESPONSE.error,
    });

    expect(actions.$api.auth.startSession).toBeCalledTimes(1);
    expect(actions.$api.auth.startSession.mock.calls[0][0]).toStrictEqual(
      TEST_SESSION.uuid
    );
    expect(actions.$api.auth.startSession.mock.calls[0][1]).toStrictEqual({
      clientPublicEphemeralKey: TEST_SESSION.ephemeralKeyPair.public,
      clientSessionProofKey: TEST_SESSION.srp.proof,
    });
  });
});
