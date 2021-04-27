import AbstractService from '../abstract-service';

export default class VaultCategoriesService extends AbstractService {
  getVaultCategories(vaultUuid, { onlyOverview } = { onlyOverview: false }) {
    return this.axios
      .get(`/vaults/${vaultUuid}/categories?only-overview=${onlyOverview}`)
      .then(response => response.data);
  }

  getVaultCategory(
    vaultUuid,
    categoryUuid,
    { onlyOverview } = { onlyOverview: false }
  ) {
    return this.axios
      .get(
        `/vaults/${vaultUuid}/categories/${categoryUuid}?only-overview=${onlyOverview}`
      )
      .then(response => response.data);
  }
}
