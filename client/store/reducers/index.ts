import { combineReducers } from "redux";
import simple, { SimpleState } from "./simple";
import messages, { MessagesState } from "./messages";
import session, { SessionState } from "./session";
import channel, { ChannelState } from "./channel";

export interface RootState {
  simple: SimpleState
  messages: MessagesState
  session: SessionState
  channel: ChannelState
}

export default combineReducers({
  simple,
  messages,
  session,
  channel
});