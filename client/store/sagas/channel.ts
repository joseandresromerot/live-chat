import * as Effects from "redux-saga/effects";
import { ChannelAction, SIDEBAR_MODES, Types, actions as channelActions } from '../reducers/channel';
import { actions as messagesActions } from '../reducers/messages';
import {
    getChannelInfo as getChannelInfoApi,
    getChannels as getChannelsApi,
    getChannelMessages as getChannelMessagesApi,
    GetChannelInfoResponse,
    GetChannelsResponse,
    GetChannelMessagesResponse
} from '@/middleware/api';

const { takeLatest, fork, put } = Effects;
const call: any = Effects.call;

function* getChannelInfo(action: ChannelAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: GetChannelInfoResponse = yield call(getChannelInfoApi, action.channelId);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(channelActions.getChannelInfoSuccess(response.data.channel));
            yield put(channelActions.setSidebarMode(SIDEBAR_MODES.CHANNEL_INFO));
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

function* getChannelMessages(action: ChannelAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: GetChannelMessagesResponse = yield call(getChannelMessagesApi, action.channelId);
console.info('response', response);
        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(channelActions.getChannelMessagesSuccess(response.data.messages));
            action.onSuccess && action.onSuccess();
        } else {
            yield put(channelActions.getChannelMessagesFailure());
            action.onError && action.onError(response.data.error || "Unexpected error");
        }
    } catch(err: any) {
        //console.info(err);
        yield put(messagesActions.hideMessage());
        yield put(channelActions.getChannelMessagesFailure());
        action.onError && action.onError(err.message || "Unexpected error");
    }
}

function* watchGetChannelMessagesRequest() {
    yield takeLatest(Types.GET_CHANNEL_MESSAGES_REQUEST, getChannelMessages);
}

function* getChannels(action: ChannelAction) {
    try {
        yield put(messagesActions.showLoading());
        const response: GetChannelsResponse = yield call(getChannelsApi, action.keyword);

        yield put(messagesActions.hideMessage());

        if (response.data.success === true) {
            yield put(channelActions.getChannelsSuccess(response.data.channels));
            action.onSuccess && action.onSuccess();
        } else {
            yield put(channelActions.getChannelsFailure());
            action.onError && action.onError(response.data.error || "Unexpected error");
        }
    } catch(err: any) {
        //console.info(err);
        yield put(messagesActions.hideMessage());
        yield put(channelActions.getChannelsFailure());
        action.onError && action.onError(err.message || "Unexpected error");
    }
}

function* watchGetChannelsRequest() {
    yield takeLatest(Types.GET_CHANNELS_REQUEST, getChannels);
}

const channelSagas = [
    fork(watchGetChannelInfoRequest),
    fork(watchGetChannelsRequest),
    fork(watchGetChannelMessagesRequest),
];

export default channelSagas;