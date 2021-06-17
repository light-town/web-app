import AbstractService from '../abstract-service';

export default class AuthService extends AbstractService {
  signUp(
    deviceUuid,
    { verifier, salt },
    { accountKey, username, avatarUrl },
    { publicKey, encPrivateKey, encSymmetricKey },
    { encKey, encOverview, encCategories, encPrimaryVaultItems }
  ) {
    return this.axios
      .post('/auth/sign-up', {
        deviceUuid,
        srp: {
          verifier,
          salt,
        },
        account: {
          key: accountKey,
          username,
          avatarUrl,
        },
        primaryKeySet: {
          publicKey,
          encPrivateKey,
          encSymmetricKey,
        },
        primaryVault: {
          encKey,
          encOverview,
          encCategories,
        },
        primaryVaultItems: encPrimaryVaultItems,
      })
      .then(response => response.data)
      .catch(({ response }) => {
        throw response.data;
      });
  }

  createSession({ accountKey, deviceUuid }) {
    return this.axios
      .post('/auth/sessions', {
        accountKey,
        deviceUuid,
      })
      .then(response => response.data)
      .catch(({ response }) => {
        throw response.data;
      });
  }

  startSession(
    sessionUuid,
    { clientPublicEphemeralKey, clientSessionProofKey }
  ) {
    return this.axios
      .post(`/auth/sessions/${sessionUuid}/start`, {
        sessionUuid,
        clientPublicEphemeralKey,
        clientSessionProofKey,
      })
      .then(response => response.data)
      .catch(({ response }) => {
        throw response.data;
      });
  }

  getCsrfToken() {
    return this.axios.get('/auth/csrf-token').then(response => response.data);
  }
}
