import SimpleSagas from './simple';
import SessionSagas from './session';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...SimpleSagas,
        ...SessionSagas,
    ]);
}
