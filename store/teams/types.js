import * as actionTypes from './action-types';

export const namespace = 'teams';

export const CREATE_TEAM = `${namespace}/${actionTypes.CREATE_TEAM}`;
export const SET_CURRENT_TEAM_UUID = `${namespace}/${actionTypes.SET_CURRENT_TEAM_UUID}`;
export const GET_TEAM = `${namespace}/${actionTypes.GET_TEAM}`;
export const GET_TEAMS = `${namespace}/${actionTypes.GET_TEAMS}`;
export const SET_TEAM = `${namespace}/${actionTypes.SET_TEAM}`;
