import AbstractService from '../abstract-service';

export default class KeySetsService extends AbstractService {
  getKeySets() {
    return this.axios.get(`/key-sets`).then(response => response.data);
  }

  getPrimaryKeySet() {
    return this.axios
      .get(`/key-sets?primary=true`)
      .then(response => response.data);
  }
}
