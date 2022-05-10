import {communityActions, GET_USER_POST} from './actions';
import {call, put, takeEvery} from 'redux-saga/effects';
import {getUserPost, UserPostList} from '../../api/user';

function* getUserPostSaga(
  action: ReturnType<typeof communityActions.getUserPostAsync.request>,
) {
  try {
    const postList: UserPostList = yield call(getUserPost, action.payload);
    yield put(communityActions.getUserPostAsync.success(postList));
  } catch (e: any) {
    yield put(communityActions.getUserPostAsync.failure(e));
    console.error(e);
  }
}

export function* communitySaga() {
  yield takeEvery(GET_USER_POST, getUserPostSaga);
}
