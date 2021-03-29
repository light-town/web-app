import * as actionTypes from './action-types';

export const namespace = 'cache';

export const INIT = `${namespace}/${actionTypes.INIT}`;

export const SET_CACHE = `${namespace}/${actionTypes.SET_CACHE}`;
export const CLEAR_CACHE = `${namespace}/${actionTypes.CLEAR_CACHE}`;
