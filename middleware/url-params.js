import * as vaultActionTypes from '~/store/vaults/types';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';

export default ({ app, route }) => {
  return Promise.all([
    app.store.dispatch(vaultActionTypes.SET_CURRENT_VAULT, {
      uuid: route.params.vaultUuid,
    }),
    app.store.dispatch(vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER, {
      uuid: route.params.vaultFolderUuid,
    }),
  ]);
};
