import * as actionTypes from './action-types';

export const namespace = 'auth';

export const INIT = `${namespace}/${actionTypes.INIT}`;

export const SIGN_UP = `${namespace}/${actionTypes.SIGN_UP}`;

export const CREATE_SESSION = `${namespace}/${actionTypes.CREATE_SESSION}`;
export const START_SESSION = `${namespace}/${actionTypes.START_SESSION}`;
export const SET_TOKEN = `${namespace}/${actionTypes.SET_TOKEN}`;
export const CLEAR_ERRORS = `${namespace}/${actionTypes.CLEAR_ERRORS}`;
