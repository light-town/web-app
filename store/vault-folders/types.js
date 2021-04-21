import * as actionTypes from './action-types';

export const namespace = 'vault-folders';

export const INIT = `${namespace}/${actionTypes.INIT}`;
export const SET_CURRENT_VAULT_FOLDER = `${namespace}/${actionTypes.SET_CURRENT_VAULT_FOLDER}`;
export const CREATE_VAULT_FOLDER = `${namespace}/${actionTypes.CREATE_VAULT_FOLDER}`;
export const GET_NESTED_VAULT_FOLDERS = `${namespace}/${actionTypes.GET_NESTED_VAULT_FOLDERS}`;
export const GET_ROOT_VAULT_FOLDERS = `${namespace}/${actionTypes.GET_ROOT_VAULT_FOLDERS}`;
export const CLEAR_VAULT_FOLDER_LIST = `${namespace}/${actionTypes.CLEAR_VAULT_FOLDER_LIST}`;
