import { combineReducers } from "redux";
import simple, { SimpleState } from "./simple";
import messages, { MessagesState } from "./messages";
import session, { SessionState } from "./session";
import chat, { ChatState } from "./chat";

export interface RootState {
  simple: SimpleState
  messages: MessagesState
  session: SessionState
  chat: ChatState
}

export default combineReducers({
  simple,
  messages,
  session,
  chat
});