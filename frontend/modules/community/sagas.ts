import {communityActions, GET_COMMUNITY_LIST} from './actions';
import {getCommunityList} from '../../api/community';
import {call, put, takeEvery} from 'redux-saga/effects';
import {CommunityList} from '../../api/types';

function* getCommunityListSaga() {
  try {
    const communityList: CommunityList = yield call(getCommunityList);
    yield put(communityActions.getCommunityListAsync.success(communityList));
  } catch (e: any) {
    yield put(communityActions.getCommunityListAsync.failure(e));
    console.error(e);
  }
}

export function* communitySaga() {
  yield takeEvery(GET_COMMUNITY_LIST, getCommunityListSaga);
}
