import {GET_MY_INFO, LOGIN, userActions} from './actions';
import {getMyInfo} from '../../api/user';
import {call, put, takeEvery} from 'redux-saga/effects';
import {User} from '../../api/user';
import {login, LoginResponseHeaders} from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* loginSaga(action: ReturnType<typeof userActions.loginAsync.request>) {
  try {
    const loginTokens: LoginResponseHeaders = yield call(login, action.payload);
    AsyncStorage.setItem('accessToken', loginTokens.accessToken);
    AsyncStorage.setItem('refreshToken', loginTokens.refreshToken);
    yield put(userActions.getMyInfoAsync.request(null));
  } catch (e: any) {
    console.error(e);
  }
}

function* getMyInfoSaga() {
  try {
    const user: User = yield call(getMyInfo);
    yield put(userActions.getMyInfoAsync.success(user));
  } catch (e: any) {
    yield put(userActions.getMyInfoAsync.failure(e));
    console.error(e);
  }
}

export function* userSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(GET_MY_INFO, getMyInfoSaga);
}
