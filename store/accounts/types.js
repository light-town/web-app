import * as actionTypes from './action-types';

export const namespace = 'accounts';

export const INIT = `${namespace}/${actionTypes.INIT}`;

export const LOAD_ACCOUNT = `${namespace}/${actionTypes.LOAD_ACCOUNT}`;
export const SET_CURRENT_ACCOUNT_UUID = `${namespace}/${actionTypes.SET_CURRENT_ACCOUNT_UUID}`;

export const MFATypeEnum = {
  NONE: 'NONE',
  FINGERPRINT: 'FINGERPRINT',
  ONE_TIME_PASSWORD: 'ONE_TIME_PASSWORD',
};
