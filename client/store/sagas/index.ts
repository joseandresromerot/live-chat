import SimpleSagas from './simple';
import SessionSagas from './session';
import ChannelSagas from './channel';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        ...SimpleSagas,
        ...SessionSagas,
        ...ChannelSagas,
    ]);
}
