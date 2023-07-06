import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  SET_SIDEBAR_MODE_REQUEST: "chat/SET_SIDEBAR_MODE_REQUEST",
};

export const SIDEBAR_MODES = {
  CHANNEL_INFO: "sidebar_modes/CHANNEL_INFO",
  CHANNELS_LIST: "sidebar_modes/CHANNELS_LIST",
};

export interface ChatState {
  sidebarMode: string
}

export interface ChatAction {
  type: string
  sidebarMode?: string,
  payload?: any
}

const initialState: ChatState = {
  sidebarMode: SIDEBAR_MODES.CHANNELS_LIST
};

const chatReducer = (state = initialState, action: ChatAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case Types.SET_SIDEBAR_MODE_REQUEST:
      return {
        ...state,
        sidebarMode: action.sidebarMode,
      };
    default:
      return state;
  }
};

export const actions = {
  setSidebarMode: (
    sidebarMode: string
  ) => {
    return {
      type: Types.SET_SIDEBAR_MODE_REQUEST,
      sidebarMode
    }
  }
};

export default chatReducer;