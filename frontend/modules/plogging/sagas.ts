import {GET_PLOGGING_LIST, ploggingActions} from './actions';
import {getPloggingList} from '../../api/plogging';
import {call, put, takeEvery} from 'redux-saga/effects';
import {PloggingList} from '../../api/types';

function* getPloggingListSaga(
  action: ReturnType<typeof ploggingActions.getPloggingListAsync.request>,
) {
  try {
    const ploggingList: PloggingList = yield call(
      getPloggingList,
      action.payload,
    );
    yield put(ploggingActions.getPloggingListAsync.success(ploggingList));
  } catch (e: any) {
    yield put(ploggingActions.getPloggingListAsync.failure(e));
    console.error(e);
  }
}

export function* ploggingSaga() {
  yield takeEvery(GET_PLOGGING_LIST, getPloggingListSaga);
}
