import * as Effects from "redux-saga/effects";
import { SessionAction, Types, actions } from '../reducers/session';
import { actions as messagesActions } from '../reducers/messages';
import { actions as sessionActions } from '../reducers/session';
import { LoginResponse, login as loginApi } from '@/pages/middleware/api';

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
            //yield call(BaseApi.registerSuccessfulLoginForJwt, action.payload.username, response.token);
            
            yield put(sessionActions.loginSuccess(response.data.user?.username || "", response.data.user?.fullname || "", response.data.user?.avatar_url || ""));
        } else {
            yield put(messagesActions.showMessage(
              response.data.error || "Error",
              "Ok",
              () => {
                action.messageHideHandler && action.messageHideHandler();
              },
              null,
              null
            ));

            yield put(sessionActions.loginFailure());
        }
    } catch(err: any) {
        console.info(err);

        yield put(messagesActions.hideMessage());

        yield put(messagesActions.showMessage(
          err.toSring(),
          "Ok",
          () => {
            action.messageHideHandler && action.messageHideHandler();
          },
          null,
          null
        ));

        yield put(sessionActions.loginFailure());
    }
}

function* watchLoginRequest() {
    yield takeLatest(Types.LOGIN_REQUEST, login);
}

const sessionSagas = [
    fork(watchLoginRequest),
];

export default sessionSagas;