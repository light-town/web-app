export const getters = {
  currentAccount: state =>
    state.accounts.accounts[state.accounts.currentAccountUuid],
  primaryKeySet: state =>
    Object.values(state['key-sets']).find(keySet => keySet?.isPrimary),
};
