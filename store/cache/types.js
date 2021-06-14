import * as actionTypes from './action-types';

export const namespace = 'cache';

export const LOAD_CACHE = `${namespace}/${actionTypes.LOAD_CACHE}`;
export const SET_CACHE = `${namespace}/${actionTypes.SET_CACHE}`;
export const CLEAR_CACHE = `${namespace}/${actionTypes.CLEAR_CACHE}`;
