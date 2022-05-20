import {ploggingActions} from './actions';
import {ActionType} from 'typesafe-actions';
import {AsyncState} from '../../lib/reducerUtils';
import {PloggingList} from '../../api/plogging';

export type PloggingAction = ActionType<typeof ploggingActions>;

export type PloggingState = {
  ploggingList: AsyncState<PloggingList, Error>;
};
