import {createReducer} from 'typesafe-actions';
import {UserAction, UserState} from './types';
import {userActions} from './actions';
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils';

// --- recerUtils 의 asyncState 를 활용한 리팩토링 ---
const initialState: UserState = {
  userInfo: asyncState.initial(),
};

// --- reducerUtils 의 createAsyncReducer, transformToArray 를 활용한 리팩토링 ---
const user = createReducer<UserState, UserAction>(initialState).handleAction(
  transformToArray(userActions.getUserInfoAsync),
  createAsyncReducer(userActions.getUserInfoAsync, 'userInfo'),
);

export default user;
