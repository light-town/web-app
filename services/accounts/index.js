import AbstractService from '../abstract-service';

export default class AccountsService extends AbstractService {
  getAccount(accountKey) {
    return this.axios
      .get(`/accounts?key=${accountKey}`)
      .then(response => response.data);
  }
}
