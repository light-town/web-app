export const getters = {
  currentAccount: state =>
    state.accounts.accounts[state.accounts.currentAccountUuid],
  primaryKeySet: state =>
    Object.values(state['key-sets']).find(keySet => keySet?.isPrimary),
  currentVault: state => state.vaults.all[state.vaults.currentVaultUuid],
  currentVaultFolder: state =>
    state['vault-folders'].all[state['vault-folders'].currentVaultFolderUuid],
  currentVaultItem: state =>
    state['vault-items'].all[state['vault-items'].currentVaultItemUuid],
  pathToFolder: state => folderUuid => {
    const folders = [];
    let currentFolder = state['vault-folders'].all[folderUuid];

    while (currentFolder) {
      folders.unshift(currentFolder);
      currentFolder =
        state['vault-folders'].all[currentFolder?.parentFolderUuid];
    }

    return folders;
  },
  vault: state => vaultUuid => state.vaults.all[vaultUuid],
};
