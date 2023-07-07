import * as Effects from "redux-saga/effects";
import { SessionAction, Types, actions } from '../reducers/session';
import { actions as messagesActions } from '../reducers/messages';
import { actions as sessionActions } from '../reducers/session';
import { LoginResponse, RegisterResponse, login as loginApi, register as registerApi, getUserInfo as getUserInfoApi, GetUserInfoResponse } from '@/middleware/api';

const { takeLatest, fork, put } = Effects;
const call: any = Effects.call;

function* login(action: SessionAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: LoginResponse = yield call(loginApi, action.username, action.password);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(sessionActions.loginSuccess(response.data.user?.username || "", response.data.user?.fullname || "", response.data.user?.avatar_url || ""));
            action.onSuccess && action.onSuccess();
        } else {
            yield put(sessionActions.loginFailure());
            action.onError && action.onError(response.data.error || "Unexpected error");
        }
    } catch(err: any) {
        console.info(err);
        yield put(messagesActions.hideMessage());
        yield put(sessionActions.loginFailure());
        action.onError && action.onError(err.message || "Unexpected error");
    }
}

function* watchLoginRequest() {
    yield takeLatest(Types.LOGIN_REQUEST, login);
}

function* register(action: SessionAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: RegisterResponse = yield call(registerApi, action.username, action.password, action.fullname, action.avatar_url);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(sessionActions.registerSuccess());
            action.onSuccess && action.onSuccess();
        } else {
            yield put(sessionActions.registerFailure());
            action.onError && action.onError(response.data.error || "Unexpected error");
        }
    } catch(err: any) {
        console.info(err);
        yield put(messagesActions.hideMessage());
        yield put(sessionActions.registerFailure());
        action.onError && action.onError(err.message || "Unexpected error");
    }
}

function* watchRegisterRequest() {
    yield takeLatest(Types.REGISTER_REQUEST, register);
}

function* getUserInfo(action: SessionAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: GetUserInfoResponse = yield call(getUserInfoApi);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(sessionActions.getUserInfoSuccess(
                response.data.user?.username || "",
                response.data.user?.fullname || "",
                response.data.user?.avatar_url || ""
            ));
            action.onSuccess && action.onSuccess();
        } else {
            yield put(sessionActions.getUserInfoFailure());
            action.onError && action.onError(response.data.error || "Unexpected error");
        }
    } catch(err: any) {
        //console.info(err);
        yield put(messagesActions.hideMessage());
        yield put(sessionActions.getUserInfoFailure());
        action.onError && action.onError(err.message || "Unexpected error");
    }
}

function* watchGetUserInfoRequest() {
    yield takeLatest(Types.GET_USER_INFO_REQUEST, getUserInfo);
}

const sessionSagas = [
    fork(watchLoginRequest),
    fork(watchRegisterRequest),
    fork(watchGetUserInfoRequest),
];

export default sessionSagas;