import { combineReducers } from "redux";
import simple, { SimpleState } from "./simple";

export interface RootState {
  simple: SimpleState
}

export default combineReducers({
  simple
});