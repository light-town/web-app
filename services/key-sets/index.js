import AbstractService from '../abstract-service';

export default class KeySetsService extends AbstractService {
  getAccountKeySets() {
    return this.axios.get(`/key-sets`).then(response => response.data);
  }

  getAccountKeySet(keySetUuid) {
    return this.axios
      .get(`/key-sets/${keySetUuid}`)
      .then(response => response.data);
  }

  getAccountPrimaryKeySet() {
    return this.axios
      .get(`/key-sets?primary=true`)
      .then(response => response.data);
  }

  getTeamKeySets(teamUuid) {
    return this.axios
      .get(`/teams/${teamUuid}/key-sets`)
      .then(response => response.data);
  }

  getTeamKeySet(teamUuid, keySetUuid) {
    return this.axios
      .get(`/teams/${teamUuid}/key-sets/${keySetUuid}`)
      .then(response => response.data);
  }

  getTeamPrimaryKeySet(teamUuid) {
    return this.axios
      .get(`/teams/${teamUuid}/key-sets?primary=true`)
      .then(response => response.data);
  }
}
