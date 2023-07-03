import * as Effects from "redux-saga/effects";
import { SessionAction, Types, actions } from '../reducers/session';
import { actions as messagesActions } from '../reducers/messages';
import { actions as sessionActions } from '../reducers/session';
import { LoginResponse, login as loginApi } from '@/middleware/api';

const { takeLatest, fork, put } = Effects;
const call: any = Effects.call;

function* login(action: SessionAction) {
  console.info('login action', action);
    try {
        yield put(messagesActions.showLoading());
        const response: LoginResponse = yield call(loginApi, action.username, action.password);

        console.info("LOGIN RESPONSE", response);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            //yield call(storeAccessToken, response.data.token);
            yield put(sessionActions.loginSuccess(response.data.user?.username || "", response.data.user?.fullname || "", response.data.user?.avatar_url || ""));
            action.onSuccess && action.onSuccess();
        } else {
            yield put(sessionActions.loginFailure());
            action.onError && action.onError(response.data.error || "Unespected error");
        }
    } catch(err: any) {
        console.info(err);
        yield put(sessionActions.loginFailure());
        action.onError && action.onError(err.toSring() || "Unespected error");
    }
}

function* watchLoginRequest() {
    yield takeLatest(Types.LOGIN_REQUEST, login);
}

const sessionSagas = [
    fork(watchLoginRequest),
];

export default sessionSagas;