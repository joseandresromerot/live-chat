import SimpleSagas from './simple';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...SimpleSagas,
    ]);
}
