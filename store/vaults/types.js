import * as actionTypes from './action-types';

export const namespace = 'vaults';

export const GET_VAULTS = `${namespace}/${actionTypes.GET_VAULTS}`;
export const CREATE_VAULT = `${namespace}/${actionTypes.CREATE_VAULT}`;
export const SET_CURRENT_VAULT = `${namespace}/${actionTypes.SET_CURRENT_VAULT}`;
