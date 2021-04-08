import AbstractService from '../abstract-service';

export default class VaultsService extends AbstractService {
  getVaults(accountUuid) {
    return this.axios
      .get(`/accounts/${accountUuid}/vaults`)
      .then(response => response.data);
  }

  createVault(accountUuid, keySet, vault) {
    return this.axios
      .post(`/accounts/${accountUuid}/vaults`, {
        keySet,
        vault,
      })
      .then(response => response.data);
  }
}
