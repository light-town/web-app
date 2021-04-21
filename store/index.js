export const getters = {
  currentAccount: state =>
    state.accounts.accounts[state.accounts.currentAccountUuid],
  primaryKeySet: state =>
    Object.values(state['key-sets']).find(keySet => keySet?.isPrimary),
  currentVault: state => state.vaults.all[state.vaults.currentVaultUuid],
  currentVaultFolder: state =>
    state['vault-folders'].all[state['vault-folders'].currentVaultFolderUuid],
};
