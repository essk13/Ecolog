import {GET_USER_INFO, userActions} from './actions';
import {getUserInfo} from '../../api/user';
import {call, put, takeEvery} from 'redux-saga/effects';
import {User} from '../../api/types';

function* getUserInfoSaga(
  action: ReturnType<typeof userActions.getUserInfoAsync.request>,
) {
  try {
    const userInfo: User = yield call(getUserInfo, action.payload);
    yield put(userActions.getUserInfoAsync.success(userInfo));
  } catch (e: any) {
    yield put(userActions.getUserInfoAsync.failure(e));
    console.error(e);
  }
}

export function* userSaga() {
  yield takeEvery(GET_USER_INFO, getUserInfoSaga);
}
