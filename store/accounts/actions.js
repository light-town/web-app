import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as fetchStatuses from '~/store/fetch-statuses';

export default {
  async [actionTypes.INIT]({ commit }) {
    try {
      const lastAccountUuid = await this.$api.storage.getItem(
        'lastAccountUuid'
      );

      if (typeof lastAccountUuid !== 'string' || !lastAccountUuid.length) {
        commit(mutationTypes.SET_IS_INIT);
        return;
      }

      commit(mutationTypes.SET_CURRENT_ACCOUNT_UUID, { uuid: lastAccountUuid });

      await this.$api.storage
        .getAllItems()
        .filter(({ key, value }) => key === `account-${value?.accountUuid}`)
        .forEach(({ value }) => {
          commit(mutationTypes.SET_ACCOUNT, {
            account: {
              uuid: value?.accountUuid,
              key: value?.accountKey,
              name: value?.accountName,
              avatarUrl: value?.accountAvatarUrl,
            },
          });
          commit(mutationTypes.SET_USER, {
            user: {
              uuid: value?.userUuid,
              name: value?.userName,
              avatarUrl: value?.userAvatarUrl,
            },
          });
        });

      commit(mutationTypes.SET_IS_INIT);
    } catch (e) {
      commit(mutationTypes.SET_USER, { error: e });
    }
  },
  async [actionTypes.LOAD_ACCOUNT]({ commit, state }, payload) {
    try {
      commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.LOADING });

      const response = await this.$api.accounts.getAccount(payload.accountKey);
      const account = response.data[0];

      commit(mutationTypes.SET_FETCH_STATUS, {
        status: fetchStatuses.SUCCESS,
      });

      commit(mutationTypes.SET_ACCOUNT, {
        account: {
          uuid: account.accountUuid,
          key: payload.accountKey,
          name: account.accountName,
          avatarUrl: account.accountAvatarUrl,
        },
      });
      commit(mutationTypes.SET_USER, {
        user: {
          uuid: account.userUuid,
          name: account.userName,
          avatarUrl: account.userAvatarUrl,
        },
      });

      await this.$api.storage.setItem(
        `account-${account.accountUuid}`,
        {
          accountUuid: account.accountUuid,
          accountKey: payload.accountKey,
          accountName: account.accountName,
          accountAvatarUrl: account.accountAvatarUrl,
          userUuid: account.userUuid,
          userName: account.userName,
          userAvatarUrl: account.userAvatarUrl,
        },
        { json: true }
      );

      return { accountUuid: account.accountUuid };
    } catch (e) {
      if (state.fetchStatus === fetchStatuses.LOADING)
        commit(mutationTypes.SET_FETCH_STATUS, { status: fetchStatuses.ERROR });

      commit(mutationTypes.SET_ERROR, { error: e?.response?.data?.error || e });
    }
  },
  async [actionTypes.SET_CURRENT_ACCOUNT_UUID]({ commit }, payload) {
    try {
      await this.$api.storage.setItem(`lastAccountUuid`, payload.accountUuid);

      commit(mutationTypes.SET_CURRENT_ACCOUNT_UUID, {
        uuid: payload.accountUuid,
      });
    } catch (e) {
      commit(mutationTypes.SET_ERROR, { error: e });
    }
  },
};
