import * as Effects from "redux-saga/effects";
import { ChannelAction, Types, actions as channelActions } from '../reducers/channel';
import { actions as messagesActions } from '../reducers/messages';
import { getChannelInfo as getChannelInfoApi, GetChannelInfoResponse } from '@/middleware/api';

const { takeLatest, fork, put } = Effects;
const call: any = Effects.call;

function* getChannelInfo(action: ChannelAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: GetChannelInfoResponse = yield call(getChannelInfoApi, action.channelId);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(channelActions.getChannelInfoSuccess(response.data.channel));
            action.onSuccess && action.onSuccess();
        } else {
            yield put(channelActions.getChannelInfoFailure());
            action.onError && action.onError(response.data.error || "Unexpected error");
        }
    } catch(err: any) {
        //console.info(err);
        yield put(messagesActions.hideMessage());
        yield put(channelActions.getChannelInfoFailure());
        action.onError && action.onError(err.message || "Unexpected error");
    }
}

function* watchGetChannelInfoRequest() {
    yield takeLatest(Types.GET_CHANNEL_INFO_REQUEST, getChannelInfo);
}

const channelSagas = [
    fork(watchGetChannelInfoRequest),
];

export default channelSagas;