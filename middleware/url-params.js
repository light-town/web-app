import * as vaultActionTypes from '~/store/vaults/types';
import * as vaultFolderActionTypes from '~/store/vault-folders/types';
import * as vaultItemActionTypes from '~/store/vault-items/types';
import * as teamActionTypes from '~/store/teams/types';

export default ({ app, route }) => {
  return Promise.all([
    app.store.dispatch(vaultActionTypes.SET_CURRENT_VAULT, {
      uuid: route.params.vaultUuid,
    }),
    app.store.dispatch(vaultFolderActionTypes.SET_CURRENT_VAULT_FOLDER, {
      uuid: route.params.vaultFolderUuid,
    }),
    app.store.dispatch(vaultItemActionTypes.SET_CURRENT_VAULT_ITEM, {
      uuid: route.params.vaultItemUuid,
    }),
    app.store.dispatch(teamActionTypes.SET_CURRENT_TEAM_UUID, {
      uuid: route.params.teamUuid,
    }),
  ]);
};
