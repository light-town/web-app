import core from '@light-town/core';
import findAccountPrimaryKey from '../key-sets/helpers/find-account-primary-key-set';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as keySetActionTypes from '~/store/key-sets/types';

export default {
  async [actionTypes.CREATE_TEAM]({ commit, rootState }, payload) {
    const accountPrimaryKeySet = findAccountPrimaryKey(
      Object.values(rootState['key-sets'].all),
      rootState.accounts.currentAccountUuid
    );

    const encTeam = await core.helpers.teams.createTeamHelper(
      {
        name: payload.name,
        desc: payload.desc,
      },
      accountPrimaryKeySet.publicKey
    );

    const team = await core.helpers.teams.decryptTeamByPrivateKeyHelper(
      encTeam,
      accountPrimaryKeySet.privateKey
    );

    const muk = await core.helpers.masterUnlockKey.deriveMasterUnlockKeyHelper(
      team.key,
      team.key
    );

    const teamPrimaryKeySet =
      await core.helpers.keySets.createPrimaryKeySetHelper(muk);

    const response = await this.$api.teams.createTeam({
      salt: muk.salt,
      encKey: encTeam.encKey,
      encOverview: encTeam.encOverview,
      primaryKeySet: teamPrimaryKeySet,
    });

    commit(mutationTypes.SET_TEAM, {
      team: {
        ...response.data,
        ...decTeam,
      },
    });

    return {
      ...response.data,
      ...decTeam,
    };
  },
  [actionTypes.SET_CURRENT_TEAM_UUID]({ commit }, payload) {
    commit(mutationTypes.SET_CURRENT_TEAM_UUID, {
      uuid: payload.uuid,
    });
  },
  async [actionTypes.GET_TEAMS]({ commit, rootState }) {
    const { data: encTeams } = await this.$api.teams.getTeams();

    const teams = await Promise.all(
      encTeams.map(encTeam => {
        const keySet = rootState['key-sets'].all[encTeam.keySetUuid];

        if (keySet.isPrimary) {
          return core.helpers.teams.decryptTeamByPrivateKeyHelper(
            encTeam,
            keySet.privateKey
          );
        } else {
          return core.helpers.teams.decryptTeamBySecretKeyHelper(
            encTeam,
            keySet.symmetricKey
          );
        }
      })
    );

    teams.forEach(team =>
      commit(mutationTypes.SET_TEAM, {
        team,
      })
    );

    return teams;
  },
  async [actionTypes.GET_TEAM]({ commit, dispatch, rootState }, payload) {
    const { data: encTeam } = await this.$api.teams.getTeam(payload.uuid);

    let keySet = rootState['key-sets'].all[encTeam.keySetUuid];

    if (!keySet) {
      keySet = await dispatch(
        keySetActionTypes.GET_ACCOUNT_KEY_SET,
        { uuid: encTeam.keySetUuid },
        { root: true }
      );
    }

    let team;

    if (keySet.isPrimary) {
      team = await core.helpers.teams.decryptTeamByPrivateKeyHelper(
        encTeam,
        keySet.privateKey
      );
    } else {
      team = await core.helpers.teams.decryptTeamBySecretKeyHelper(
        encTeam,
        keySet.symmetricKey
      );
    }

    commit(mutationTypes.SET_TEAM, {
      team,
    });

    return team;
  },
  [actionTypes.SET_TEAM]({ commit }, payload) {
    commit(mutationTypes.SET_TEAM, {
      team: payload.team,
    });
  },
};
