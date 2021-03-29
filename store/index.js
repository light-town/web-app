export const getters = {
  currentAccount: state =>
    state.accounts.accounts[state.accounts.currentAccountUuid],
};
