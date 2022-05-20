import {createReducer} from 'typesafe-actions';
import {CommunityAction, CommunityState} from './types';
import {communityActions} from './actions';
import {
  asyncState,
  createAsyncReducer,
  transformToArray,
} from '../../lib/reducerUtils';

// --- recerUtils 의 asyncState 를 활용한 리팩토링 ---
const initialState: CommunityState = {
  postList: asyncState.initial(),
};

// --- reducerUtils 의 createAsyncReducer, transformToArray 를 활용한 리팩토링 ---
const community = createReducer<CommunityState, CommunityAction>(
  initialState,
).handleAction(
  transformToArray(communityActions.getUserPostAsync),
  createAsyncReducer(communityActions.getUserPostAsync, 'postList'),
);

export default community;
