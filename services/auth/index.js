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

  signIn({ accountKey, deviceUuid }) {
    return this.axios
      .post('/auth/sign-in', {
        accountKey,
        deviceUuid,
      })
      .then(response => response.data);
  }

  startSession({
    sessionUuid,
    clientPublicEphemeralKey,
    clientSessionProofKey,
  }) {
    return this.axios
      .post('/auth/start-session', {
        sessionUuid,
        clientPublicEphemeralKey,
        clientSessionProofKey,
      })
      .then(response => response.data);
  }

  getCsrfToken() {
    return this.axios.get('/auth/csrf-token').then(response => response.data);
  }
}
