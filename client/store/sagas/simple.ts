import { takeLatest, call, fork, put } from 'redux-saga/effects';
import { SimpleAction, Types, actions } from '../reducers/simple';

function* setVisible(action: SimpleAction) {
  if (action.visible === true) {
    yield put(actions.setVisibleSuccess());
  } else {
    yield put(actions.setVisibleFailure());
  }
}

function* watchSetVisibleRequest() {
    yield takeLatest(Types.SET_VISIBLE_REQUEST, setVisible);
}

const simpleSagas = [
    fork(watchSetVisibleRequest),
];

export default simpleSagas;