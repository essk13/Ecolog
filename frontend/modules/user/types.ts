import {userActions} from './actions';
import {ActionType} from 'typesafe-actions';
import {AsyncState} from '../../lib/reducerUtils';
import {User} from '../../api/types';

export type UserAction = ActionType<typeof userActions>;

export type UserState = {
  user: AsyncState<User, Error>;
};
