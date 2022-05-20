import {createAsyncAction} from 'typesafe-actions';
import {AxiosError} from 'axios';
import {PloggingList} from '../../api/plogging';

export const GET_PLOGGING_LIST = 'plogging/GET_PLOGGING_LIST';
export const GET_PLOGGING_LIST_SUCCESS = 'plogging/GET_PLOGGING_LIST_SUCCESS';
export const GET_PLOGGING_LIST_ERROR = 'plogging/GET_PLOGGING_LIST_ERROR';

const getPloggingListAsync = createAsyncAction(
  GET_PLOGGING_LIST,
  GET_PLOGGING_LIST_SUCCESS,
  GET_PLOGGING_LIST_ERROR,
)<number, PloggingList, AxiosError>();

export const ploggingActions = {
  getPloggingListAsync,
};
