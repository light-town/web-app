import AbstractService from '../abstract-service';

export default class VaultsService extends AbstractService {
  /* ACCOUNT */

  getVaults() {
    return this.axios.get(`/vaults`).then(response => response.data);
  }

  getVault(uuid) {
    return this.axios.get(`/vaults/${uuid}`).then(response => response.data);
  }

  createVault(vault) {
    return this.axios.post(`/vaults`, vault).then(response => response.data);
  }

  /* TEAM */

  getTeamVaults(teamUuid) {
    return this.axios
      .get(`/teams/${teamUuid}/vaults`)
      .then(response => response.data);
  }

  createTeamVault(teamUuid, vault) {
    return this.axios
      .post(`/teams/${teamUuid}/vaults`, vault)
      .then(response => response.data);
  }
}
