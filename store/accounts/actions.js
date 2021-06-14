import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';

export default {
  async [actionTypes.LOAD_ACCOUNTS_FROM_STORAGE]({ commit }) {
    const lastAccountUuid = await this.$api.storage.getItem('lastAccountUuid');

    if (typeof lastAccountUuid !== 'string' || !lastAccountUuid.length) return;

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
  },
  async [actionTypes.GET_ACCOUNT]({ commit }, payload) {
    const response = await this.$api.accounts.getAccount(payload.accountKey);
    const account = response.data[0];

    if (!account) throw new Error(`The account was not found`);

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
  },
  async [actionTypes.SET_CURRENT_ACCOUNT_UUID]({ commit }, payload) {
    await this.$api.storage.setItem(`lastAccountUuid`, payload.accountUuid);

    commit(mutationTypes.SET_CURRENT_ACCOUNT_UUID, {
      uuid: payload.accountUuid,
    });
  },
};
