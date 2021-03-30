import AbstractService from '../abstract-service';

export default class AuthService extends AbstractService {
  signUp({ accountKey, salt, verifier, username, deviceUuid }) {
    return this.axios
      .post('/auth/sign-up', {
        accountKey,
        salt,
        verifier,
        username,
        deviceUuid,
      })
      .then(response => response.data);
  }

  createSession({ accountKey, deviceUuid }) {
    return this.axios
      .post('/auth/sessions', {
        accountKey,
        deviceUuid,
      })
      .then(response => response.data);
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
      .catch(response => {
        throw response.data;
      });
  }

  getCsrfToken() {
    return this.axios.get('/auth/csrf-token').then(response => response.data);
  }
}
