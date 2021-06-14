import * as actionTypes from './action-types';

export const namespace = 'accounts';

export const LOAD_ACCOUNTS_FROM_STORAGE = `${namespace}/${actionTypes.LOAD_ACCOUNTS_FROM_STORAGE}`;
export const GET_ACCOUNT = `${namespace}/${actionTypes.GET_ACCOUNT}`;
export const SET_CURRENT_ACCOUNT_UUID = `${namespace}/${actionTypes.SET_CURRENT_ACCOUNT_UUID}`;

export const MFATypeEnum = {
  NONE: 'NONE',
  FINGERPRINT: 'FINGERPRINT',
  ONE_TIME_PASSWORD: 'ONE_TIME_PASSWORD',
};
