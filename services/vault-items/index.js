import AbstractService from '../abstract-service';

export default class VaultItemsService extends AbstractService {
  getItems({ onlyOverview = true, folderUuid = null } = {}) {
    if (folderUuid)
      return this.axios
        .get(`/items?only-overview=${onlyOverview}&folder-uuid=${folderUuid}`)
        .then(response => response.data);

    return this.axios
      .get(`/items?only-overview=${onlyOverview}`)
      .then(response => response.data);
  }

  getVaultItems(vaultUuid, { onlyOverview = true, folderUuid = null } = {}) {
    if (folderUuid)
      return this.axios
        .get(
          `/vaults/${vaultUuid}/items?only-overview=${onlyOverview}&folder-uuid=${folderUuid}`
        )
        .then(response => response.data);
    else
      return this.axios
        .get(`/vaults/${vaultUuid}/items?only-overview=${onlyOverview}`)
        .then(response => response.data);
  }

  getVaultItem(
    vaultUuid,
    vaultItemUuid,
    { onlyOverview } = { onlyOverview: true }
  ) {
    return this.axios
      .get(
        `/vaults/${vaultUuid}/items/${vaultItemUuid}?only-overview=${onlyOverview}`
      )
      .then(response => response.data);
  }

  getVaultItemsFromFolder(
    vaultUuid,
    folderUuid,
    { onlyOverview } = { onlyOverview: true }
  ) {
    return this.axios
      .get(
        `/vaults/${vaultUuid}/folders/${folderUuid}/items?only-overview=${onlyOverview}`
      )
      .then(response => response.data);
  }

  getVaultItemFromFolder(
    vaultUuid,
    folderUuid,
    vaultItemUuid,
    { onlyOverview } = { onlyOverview: true }
  ) {
    return this.axios
      .get(
        `/vaults/${vaultUuid}/folders/${folderUuid}/items/${vaultItemUuid}?only-overview=${onlyOverview}`
      )
      .then(response => response.data);
  }

  createVaultItem(vaultUuid, folderUuid, encVaultItem, categoryUuid) {
    if (folderUuid)
      return this.axios
        .post(`/vaults/${vaultUuid}/folders/${folderUuid}/items`, {
          ...encVaultItem,
          categoryUuid,
        })
        .then(response => response.data);
    else
      return this.axios
        .post(`/vaults/${vaultUuid}/items`, {
          ...encVaultItem,
          categoryUuid,
        })
        .then(response => response.data);
  }
}
