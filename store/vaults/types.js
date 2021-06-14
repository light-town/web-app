import * as actionTypes from './action-types';

export const namespace = 'vaults';

export const CREATE_ACCOUNT_VAULT = `${namespace}/${actionTypes.CREATE_ACCOUNT_VAULT}`;

export const GET_ACCOUNT_VAULT = `${namespace}/${actionTypes.GET_ACCOUNT_VAULT}`;
export const GET_ACCOUNT_VAULTS = `${namespace}/${actionTypes.GET_ACCOUNT_VAULTS}`;

export const CREATE_TEAM_VAULT = `${namespace}/${actionTypes.CREATE_TEAM_VAULT}`;

export const GET_TEAM_VAULT = `${namespace}/${actionTypes.GET_TEAM_VAULT}`;
export const GET_TEAM_VAULTS = `${namespace}/${actionTypes.GET_TEAM_VAULTS}`;

export const SET_CURRENT_VAULT = `${namespace}/${actionTypes.SET_CURRENT_VAULT}`;
