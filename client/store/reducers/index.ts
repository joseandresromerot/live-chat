import { combineReducers } from "redux";
import simple, { SimpleState } from "./simple";
import messages, { MessagesState } from "./messages";
import session, { SessionState } from "./session";

export interface RootState {
  simple: SimpleState
  messages: MessagesState
  session: SessionState
}

export default combineReducers({
  simple,
  messages,
  session
});