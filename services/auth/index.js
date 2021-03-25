import AbstractService from '../abstract-service';

export default class AuthService extends AbstractService {
  getCsrfToken() {
    return this.axios.get('/auth/csrf-token').then(response => response.data);
  }
}
