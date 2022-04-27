import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {Community, CommunityList} from '../../api/types';

export const GET_COMMUNITY_LIST = 'community/GET_COMMUNITY_LIST';
export const GET_COMMUNITY_LIST_SUCCESS =
  'community/GET_COMMUNITY_LIST_SUCCESS';
export const GET_COMMUNITY_LIST_ERROR = 'community/GET_COMMUNITY_LIST_ERROR';

export const GET_COMMUNITY_DETAIL = 'community/GET_COMMUNITY_DETAIL';
export const GET_COMMUNITY_DETAIL_SUCCESS =
  'community/GET_COMMUNITY_DETAIL_SUCCESS';
export const GET_COMMUNITY_DETAIL_ERROR =
  'community/GET_COMMUNITY_DETAIL_ERROR';

const getCommunityListAsync = createAsyncAction(
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
)<any, CommunityList, AxiosError>();

const getCommunityDetailAsync = createAsyncAction(
  GET_COMMUNITY_DETAIL,
  GET_COMMUNITY_DETAIL_SUCCESS,
  GET_COMMUNITY_DETAIL_ERROR,
)<any, Community, AxiosError>();

export const communityActions = {
  getCommunityListAsync,
  getCommunityDetailAsync,
};
