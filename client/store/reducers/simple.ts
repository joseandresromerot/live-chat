import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  SET_VISIBLE_REQUEST: "simple/SET_VISIBLE_REQUEST",
  SET_VISIBLE_SUCCESS: "simple/SET_VISIBLE_SUCCESS",
  SET_VISIBLE_FAILURE: "simple/SET_VISIBLE_FAILURE",
};

export interface SimpleState {
  visible: boolean
  text: string
  amount: number
}

export interface SimpleAction {
  type: string
  visible?: boolean,
  payload?: any
}

const initialState: SimpleState = {
  visible: false,
  text: "",
  amount: 0
};

const simpleReducer = (state = initialState, action: SimpleAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    case Types.SET_VISIBLE_SUCCESS:
      return {
        ...state,
        visible: true,
      };
    case Types.SET_VISIBLE_FAILURE:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

export const actions = {
  setVisibleRequest: (visible: boolean): SimpleAction => ({
    type: Types.SET_VISIBLE_REQUEST,
    visible
  }),
  
  setVisibleSuccess: (): SimpleAction => ({
    type: Types.SET_VISIBLE_SUCCESS,
    visible: true
  }),
  
  setVisibleFailure: (): SimpleAction => ({
    type: Types.SET_VISIBLE_FAILURE,
    visible: false
  })
};

export default simpleReducer;