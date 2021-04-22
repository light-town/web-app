import AbstractService from '../abstract-service';

export default class VaultFoldersService extends AbstractService {
  getRootVaultFolders(vaultUuid) {
    return this.axios
      .get(`/vaults/${vaultUuid}/folders?root=true`)
      .then(response => response.data);
  }

  getVaultFolders(vaultUuid) {
    return this.axios
      .get(`/vaults/${vaultUuid}/folders`)
      .then(response => response.data);
  }

  getNestedVaultFolders(vaultUuid, folderUuid) {
    return this.axios
      .get(`/vaults/${vaultUuid}/folders?parentFolderUuid=${folderUuid}`)
      .then(response => response.data);
  }

  createVaultFolder(vaultUuid, encVaultFolder, parentFolderUuid) {
    return this.axios
      .post(`/vaults/${vaultUuid}/folders`, {
        ...encVaultFolder,
        parentFolderUuid,
      })
      .then(response => response.data);
  }
}