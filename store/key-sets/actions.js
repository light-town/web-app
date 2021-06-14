import core from '@light-town/core';
import * as actionTypes from './action-types';
import findAccountPrimaryKey from './helpers/find-account-primary-key-set';
import findTeamPrimaryKey from './helpers/find-team-primary-key-set';
import * as mutationTypes from './mutation-types';

export default {
  async [actionTypes.GET_ACCOUNT_KEY_SETS]({ commit, state }) {
    const { data: encAccountKeySets } =
      await this.$api.keySets.getAccountKeySets();

    const encAccountPrimaryKeySet = encAccountKeySets.find(k => k.isPrimary);

    if (!encAccountPrimaryKeySet)
      throw new Error('The account primary key set was not found');

    const accountPrimaryKeySet =
      await core.helpers.keySets.decryptPrimaryKeySetHelper(
        encAccountPrimaryKeySet,
        state.masterUnlockKey
      );

    const encAccountSecondaryKeySets = encAccountKeySets.filter(
      k => !k.isPrimary
    );
    const accountSecondaryKeySets = await Promise.all(
      encAccountSecondaryKeySets.map(k =>
        core.helpers.keySets.decryptKeySetHelper(
          k,
          accountPrimaryKeySet.privateKey
        )
      )
    );

    const accountKeySets = [accountPrimaryKeySet, ...accountSecondaryKeySets];

    accountKeySets.forEach(keySet =>
      commit(mutationTypes.SET_KEY_SET, {
        keySet,
      })
    );

    return accountKeySets;
  },
  async [actionTypes.GET_ACCOUNT_KEY_SET](
    { commit, state, rootState },
    payload
  ) {
    const existsAccountPrimaryKeySet = await findAccountPrimaryKey(
      state.all,
      rootState.accounts.currentAccountUuid
    );
    const { data: encAccountKeySet } = await this.$api.keySets.getKeySet(
      payload.uuid
    );

    let accountKeySet;

    if (encAccountKeySet.isPrimary) {
      accountKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
        encAccountKeySet,
        state.masterUnlockKey
      );
    } else {
      accountKeySet = core.helpers.keySets.decryptKeySetHelper(
        encAccountKeySet,
        existsAccountPrimaryKeySet.privateKey
      );
    }

    commit(mutationTypes.SET_KEY_SET, {
      accountKeySet,
    });

    return accountKeySet;
  },
  async [actionTypes.SET_MASTER_UNLOCK_KEY]({ commit }, payload) {
    const response = await this.$api.keySets.getAccountPrimaryKeySet();

    const accountPrimaryKeySet = response.data[0];

    const masterUnlockKey =
      core.helpers.masterUnlockKey.deriveMasterUnlockKeyHelper(
        this.getters.currentAccount.key,
        payload.password,
        accountPrimaryKeySet.encSymmetricKey.salt
      );

    commit(mutationTypes.SET_MASTER_UNLOCK_KEY, {
      key: masterUnlockKey,
    });

    return accountPrimaryKeySet;
  },
  async [actionTypes.GET_TEAM_KEY_SETS]({ commit }) {
    const team = this.getters.currentTeam;

    const { data: encTeamKeySets } = await this.$api.keySets.getTeamKeySets(
      team.uuid
    );

    const encTeamPrimaryKeySet = encTeamKeySets.find(k => k.isPrimary);

    if (!encTeamPrimaryKeySet)
      throw new Error('The team primary key set was not found');

    const muk = await core.helpers.masterUnlockKey.deriveMasterUnlockKeyHelper(
      team.key,
      team.key,
      team.salt
    );

    const teamPrimaryKeySet =
      await core.helpers.keySets.decryptPrimaryKeySetHelper(
        encTeamPrimaryKeySet,
        muk
      );

    const encTeamSecondaryKeySets = encTeamKeySets.filter(k => !k.isPrimary);
    const teamSecondaryKeySets = await Promise.all(
      encTeamSecondaryKeySets.map(k =>
        core.helpers.keySets.decryptKeySetHelper(
          k,
          teamPrimaryKeySet.privateKey
        )
      )
    );

    const teamKeySets = [teamPrimaryKeySet, ...teamSecondaryKeySets];

    teamKeySets.forEach(keySet =>
      commit(mutationTypes.SET_KEY_SET, {
        keySet,
      })
    );

    return teamKeySets;
  },
  async [actionTypes.GET_TEAM_KEY_SET]({ commit, state }, payload) {
    const team = this.getters.currentTeam;
    const existsTeamPrimaryKeySet = await findTeamPrimaryKey(
      state.all,
      team.uuid
    );

    const { data: encTeamKeySet } = await this.$api.keySets.getTeamKeySet(
      team.uuid,
      payload.uuid
    );

    const muk = await core.helpers.masterUnlockKey.deriveMasterUnlockKeyHelper(
      team.key,
      team.key,
      team.salt
    );

    let teamKeySet;

    if (encTeamKeySet.isPrimary) {
      teamKeySet = await core.helpers.keySets.decryptPrimaryKeySetHelper(
        encTeamKeySet,
        muk
      );
    } else {
      teamKeySet = core.helpers.keySets.decryptKeySetHelper(
        encTeamKeySet,
        existsTeamPrimaryKeySet.privateKey
      );
    }

    commit(mutationTypes.SET_KEY_SET, {
      keySet: teamKeySet,
    });

    return teamKeySet;
  },
};
