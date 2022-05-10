import {communityActions} from './actions';
import {ActionType} from 'typesafe-actions';
import {AsyncState} from '../../lib/reducerUtils';
import {UserPostList} from '../../api/user';

export type CommunityAction = ActionType<typeof communityActions>;

export type CommunityState = {
  postList: AsyncState<UserPostList, Error>;
};
