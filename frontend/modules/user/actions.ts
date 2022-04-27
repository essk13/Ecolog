import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {User} from '../../api/types';

export const GET_USER_INFO = 'user/GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'user/GET_USER_INFO_ERROR';

const getUserInfoAsync = createAsyncAction(
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
)<number, User, AxiosError>();

export const userActions = {
  getUserInfoAsync,
};
