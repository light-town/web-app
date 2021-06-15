import core from '@light-town/core';
import findTeamPrimaryKey from '../key-sets/helpers/find-team-primary-key-set';
import findAccountPrimaryKey from '../key-sets/helpers/find-account-primary-key-set';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as teamActionTypes from '~/store/teams/types';

export default {
  async [actionTypes.CREATE_ACCOUNT_VAULT]({ commit, rootState }, payload) {
    const primaryKeySet = findAccountPrimaryKey(
      Object.values(rootState['key-sets'].all),
      rootState.accounts.currentAccountUuid
    );

    const encNewVault = await core.helpers.vaults.createVaultHelper(
      {
        name: payload.name,
        desc: payload.desc,
      },
      primaryKeySet.publicKey
    );
    const newVault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
      encNewVault,
      primaryKeySet.privateKey
    );
    const encCategories =
      await core.helpers.vaultItemCategories.createDefaultVaultItemCategories(
        newVault.key
      );

    const response = await this.$api.vaults.createVault({
      ...encNewVault,
      encCategories,
    });

    const vault = {
      ...newVault,
      ...response.data,
    };

    commit(mutationTypes.SET_VAULT, {
      vault,
    });

    return vault;
  },
  [actionTypes.SET_CURRENT_VAULT]({ commit }, payload) {
    commit(mutationTypes.SET_CURRENT_VAULT_UUID, {
      uuid: payload.uuid,
    });
  },
  async [actionTypes.GET_ACCOUNT_VAULTS]({ commit, rootState }) {
    const { data: encVaults } = await this.$api.vaults.getVaults(
      rootState.accounts.currentAccountUuid
    );

    const vaults = await Promise.all(
      encVaults.map(encVault => {
        const keySet = rootState['key-sets'].all[encVault.keySetUuid];

        if (keySet.isPrimary)
          return core.helpers.vaults.decryptVaultByPrivateKeyHelper(
            encVault,
            keySet.privateKey
          );

        return core.helpers.vaults.decryptVaultBySecretKeyHelper(
          encVault,
          keySet.symmetricKey
        );
      })
    );

    vaults.forEach(vault =>
      commit(mutationTypes.SET_VAULT, {
        vault,
      })
    );

    return vaults;
  },
  async [actionTypes.GET_ACCOUNT_VAULT]({ commit, rootState }, payload) {
    const { data: encVault } = await this.$api.vaults.getVault(payload.uuid);

    const keySet = rootState['key-sets'].all[encVault.keySetUuid];

    let vault;

    if (keySet.isPrimary)
      vault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
        encVault,
        keySet.privateKey
      );
    else
      vault = await core.helpers.vaults.decryptVaultBySecretKeyHelper(
        encVault,
        keySet.symmetricKey
      );

    commit(mutationTypes.SET_VAULT, {
      vault,
    });
  },
  async [actionTypes.CREATE_TEAM_VAULT](
    { commit, dispatch, rootState },
    payload
  ) {
    const { teamUuid, name, desc } = payload;

    let primaryKeySet = findTeamPrimaryKey(
      Object.values(rootState['key-sets'].all),
      teamUuid
    );

    if (!primaryKeySet) {
      const keySets = await this.$api.keySets.getTeamPrimaryKeySet(teamUuid);
      primaryKeySet = keySets.data[0];
    }

    const encNewVault = await core.helpers.vaults.createVaultHelper(
      {
        name,
        desc,
      },
      primaryKeySet.publicKey
    );

    const newVault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
      encNewVault,
      primaryKeySet.privateKey
    );

    const encCategories =
      await core.helpers.vaultItemCategories.createDefaultVaultItemCategories(
        newVault.key
      );

    const response = await this.$api.vaults.createTeamVault(teamUuid, {
      ...encNewVault,
      encCategories,
    });

    const team = rootState.teams.all[teamUuid];
    dispatch(
      teamActionTypes.SET_TEAM,
      {
        team: { ...team, vaultsCount: team.vaultsCount + 1 },
      },
      { root: true }
    );

    commit(mutationTypes.SET_VAULT, {
      vault: {
        ...response.data,
        ...newVault,
      },
    });
  },
  async [actionTypes.GET_TEAM_VAULTS]({ commit, rootState }) {
    const { data: encVaults } = await this.$api.vaults.getTeamVaults(
      rootState.teams.currentTeamUuid
    );

    const vaults = await Promise.all(
      encVaults.map(encVault => {
        const keySet = rootState['key-sets'].all[encVault.keySetUuid];

        if (keySet.isPrimary)
          return core.helpers.vaults.decryptVaultByPrivateKeyHelper(
            encVault,
            keySet.privateKey
          );

        return core.helpers.vaults.decryptVaultBySecretKeyHelper(
          encVault,
          keySet.symmetricKey
        );
      })
    );

    vaults.forEach(vault =>
      commit(mutationTypes.SET_VAULT, {
        vault,
      })
    );

    return vaults;
  },
  async [actionTypes.GET_TEAM_VAULT]({ commit, rootState }, payload) {
    const { data: encVault } = await this.$api.vaults.getTeamVault(
      payload.uuid
    );

    const keySet = rootState['key-sets'].all[encVault.keySetUuid];

    let vault;

    if (keySet.isPrimary)
      vault = await core.helpers.vaults.decryptVaultByPrivateKeyHelper(
        encVault,
        keySet.privateKey
      );
    else
      vault = await core.helpers.vaults.decryptVaultBySecretKeyHelper(
        encVault,
        keySet.symmetricKey
      );

    commit(mutationTypes.SET_VAULT, {
      vault,
    });
  },
};
