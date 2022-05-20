import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {UserPostList} from '../../api/user';

export const GET_USER_POST = 'community/GET_USER_POST';
export const GET_USER_POST_SUCCESS = 'community/GET_USER_POST_SUCCESS';
export const GET_USER_POST_ERROR = 'community/GET_USER_POST_ERROR';

const getUserPostAsync = createAsyncAction(
  GET_USER_POST,
  GET_USER_POST_SUCCESS,
  GET_USER_POST_ERROR,
)<number, UserPostList, AxiosError>();

export const communityActions = {
  getUserPostAsync,
};
