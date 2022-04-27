import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {Plogging, PloggingList} from '../../api/types';

export const GET_PLOGGING_LIST = 'plogging/GET_PLOGGING_LIST';
export const GET_PLOGGING_LIST_SUCCESS = 'plogging/GET_PLOGGING_LIST_SUCCESS';
export const GET_PLOGGING_LIST_ERROR = 'plogging/GET_PLOGGING_LIST_ERROR';

export const GET_PLOGGING_DETAIL = 'plogging/GET_PLOGGING_DETAIL';
export const GET_PLOGGING_DETAIL_SUCCESS =
  'plogging/GET_PLOGGING_DETAIL_SUCCESS';
export const GET_PLOGGING_DETAIL_ERROR = 'plogging/GET_PLOGGING_DETAIL_ERROR';

const getPloggingListAsync = createAsyncAction(
  GET_PLOGGING_LIST,
  GET_PLOGGING_LIST_SUCCESS,
  GET_PLOGGING_LIST_ERROR,
)<number, PloggingList, AxiosError>();

const getPloggingDetailAsync = createAsyncAction(
  GET_PLOGGING_DETAIL,
  GET_PLOGGING_DETAIL_SUCCESS,
  GET_PLOGGING_DETAIL_ERROR,
)<number, Plogging, AxiosError>();

export const ploggingActions = {
  getPloggingListAsync,
  getPloggingDetailAsync,
};
