import AbstractService from '../abstract-service';

export default class VaultsService extends AbstractService {
  getVaults() {
    return this.axios.get(`/vaults`).then(response => response.data);
  }

  createVault(vault) {
    return this.axios.post(`/vaults`, vault).then(response => response.data);
  }
}
