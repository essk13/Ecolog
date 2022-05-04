import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {User} from '../../api/user';
import {LoginData} from '../../api/auth';

export const LOGIN = 'user/LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'user/LOGIN_ERROR';

export const GET_MY_INFO = 'user/GET_MY_INFO';
export const GET_MY_INFO_SUCCESS = 'user/GET_MY_INFO_SUCCESS';
export const GET_MY_INFO_ERROR = 'user/GET_MY_INFO_ERROR';

const loginAsync = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  LoginData,
  any,
  AxiosError
>();

const getMyInfoAsync = createAsyncAction(
  GET_MY_INFO,
  GET_MY_INFO_SUCCESS,
  GET_MY_INFO_ERROR,
)<any, User, AxiosError>();

export const userActions = {
  loginAsync,
  getMyInfoAsync,
};
