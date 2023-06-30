import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  LOGIN_REQUEST: "session/LOGIN_REQUEST",
  LOGIN_SUCCESS: "session/LOGIN_SUCCESS",
  LOGIN_FAILURE: "session/LOGIN_FAILURE",

  REGISTER_REQUEST: "session/REGISTER_REQUEST",
  REGISTER_SUCCESS: "session/REGISTER_SUCCESS",
  REGISTER_FAILURE: "session/REGISTER_FAILURE",
};

export interface SessionState {
  authenticated: boolean
  username: string | null
  fullname: string | null
  avatar_url: string | null
}

export interface SessionAction {
  type: string
  username?: string
  password?: string
  fullname?: string
  avatar_url?: string | null
  messageHideHandler?: () => void
  payload?: any
}

const initialState: SessionState = {
  authenticated: false,
  username: null,
  fullname: null,
  avatar_url: null
};

const sessionReducer = (state = initialState, action: SessionAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        username: action.username,
        fullname: action.fullname,
        avatar_url: action.avatar_url
      };
    case Types.LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        username: null,
        fullname: null,
        avatar_url: null
      };
    default:
      return state;
  }
};

export const actions = {
  loginRequest: (username: string, password: string, messageHideHandler: () => void): SessionAction => ({
    type: Types.LOGIN_REQUEST,
    username,
    password,
    messageHideHandler
  }),
  
  loginSuccess: (username: string, fullname: string, avatar_url: string): SessionAction => ({
    type: Types.LOGIN_SUCCESS,
    username,
    fullname,
    avatar_url
  }),
  
  loginFailure: (): SessionAction => ({
    type: Types.LOGIN_FAILURE
  })
};

export default sessionReducer;