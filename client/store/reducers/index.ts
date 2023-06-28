import { combineReducers } from "redux";
import simple, { SimpleState } from "./simple";
import messages, { MessagesState } from "./messages";

export interface RootState {
  simple: SimpleState
  messages: MessagesState
}

export default combineReducers({
  simple,
  messages
});