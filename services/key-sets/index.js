import AbstractService from '../abstract-service';

export default class KeySetsService extends AbstractService {
  getKeySets(accountUuid) {
    return this.axios
      .get(`/accounts/${accountUuid}/key-sets`)
      .then(response => response.data);
  }

  getPrimaryKeySet(accountUuid) {
    return this.axios
      .get(`/accounts/${accountUuid}/key-sets?primary=true`)
      .then(response => response.data);
  }
}
