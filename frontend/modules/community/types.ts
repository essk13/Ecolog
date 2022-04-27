import {communityActions} from './actions';
import {ActionType} from 'typesafe-actions';
import {AsyncState} from '../../lib/reducerUtils';
import {CommunityList} from '../../api/types';

export type CommunityAction = ActionType<typeof communityActions>;

export type CommunityState = {
  communityList: AsyncState<CommunityList, Error>;
};
