import {createReducer} from 'typesafe-actions';
import {PloggingAction, PloggingState} from './types';
import {ploggingActions} from './actions';
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils';

// --- recerUtils 의 asyncState 를 활용한 리팩토링 ---
const initialState: PloggingState = {
  ploggingList: asyncState.initial(),
};

// --- reducerUtils 의 createAsyncReducer, transformToArray 를 활용한 리팩토링 ---
const plogging = createReducer<PloggingState, PloggingAction>(
  initialState,
).handleAction(
  transformToArray(ploggingActions.getPloggingListAsync),
  createAsyncReducer(ploggingActions.getPloggingListAsync, 'ploggingList'),
);

export default plogging;
