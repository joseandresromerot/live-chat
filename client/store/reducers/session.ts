import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  LOGIN_REQUEST: "session/LOGIN_REQUEST",
  LOGIN_SUCCESS: "session/LOGIN_SUCCESS",
  LOGIN_FAILURE: "session/LOGIN_FAILURE",

  REGISTER_REQUEST: "session/REGISTER_REQUEST",
  REGISTER_SUCCESS: "session/REGISTER_SUCCESS",
  REGISTER_FAILURE: "session/REGISTER_FAILURE",

  GET_USER_INFO_REQUEST: "session/GET_USER_INFO_REQUEST",
  GET_USER_INFO_SUCCESS: "session/GET_USER_INFO_SUCCESS",
  GET_USER_INFO_FAILURE: "session/GET_USER_INFO_FAILURE",
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
  onSuccess?: () => void
  onError?: (message: string) => void
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
      console.info('LOGIN_SUCCESS', action);
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
    case Types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        authenticated: true,
        username: action.username,
        fullname: action.fullname,
        avatar_url: action.avatar_url
      };
    case Types.GET_USER_INFO_FAILURE:
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
  loginRequest: (username: string, password: string, onSuccess: () => void, onError: (message: string) => void): SessionAction => ({
    type: Types.LOGIN_REQUEST,
    username,
    password,
    onSuccess,
    onError
  }),
  
  loginSuccess: (username: string, fullname: string, avatar_url: string): SessionAction => ({
    type: Types.LOGIN_SUCCESS,
    username,
    fullname,
    avatar_url
  }),
  
  loginFailure: (): SessionAction => ({
    type: Types.LOGIN_FAILURE
  }),

  registerRequest: (
    username: string,
    password: string,
    fullname: string,
    avatar_url: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ) => ({
    type: Types.REGISTER_REQUEST,
    username,
    password,
    fullname,
    avatar_url,
    onSuccess,
    onError
  }),
  
  registerSuccess: (): SessionAction => ({
    type: Types.REGISTER_SUCCESS
  }),
  
  registerFailure: (): SessionAction => ({
    type: Types.REGISTER_FAILURE
  }),

  getUserInfoRequest: (onSuccess: () => void, onError: (message: string) => void): SessionAction => ({
    type: Types.GET_USER_INFO_REQUEST,
    onSuccess,
    onError
  }),
  
  getUserInfoSuccess: (username: string, fullname: string, avatar_url: string): SessionAction => ({
    type: Types.GET_USER_INFO_SUCCESS,
    username,
    fullname,
    avatar_url
  }),
  
  getUserInfoFailure: (): SessionAction => ({
    type: Types.GET_USER_INFO_FAILURE
  })
};

export default sessionReducer;