import { ChannelInfo } from '@/middleware/api';
import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  SET_SIDEBAR_MODE_REQUEST: "channel/SET_SIDEBAR_MODE_REQUEST",

  GET_CHANNEL_INFO_REQUEST: "channel/GET_CHANNEL_INFO_REQUEST",
  GET_CHANNEL_INFO_SUCCESS: "channel/GET_CHANNEL_INFO_SUCCESS",
  GET_CHANNEL_INFO_FAILURE: "channel/GET_CHANNEL_INFO_FAILURE",
};

export const SIDEBAR_MODES = {
  CHANNEL_INFO: "sidebar_modes/CHANNEL_INFO",
  CHANNELS_LIST: "sidebar_modes/CHANNELS_LIST",
};

export interface ChannelState {
  sidebarMode: string
  channelInfo: ChannelInfo | null | undefined
}

export interface ChannelAction {
  type: string
  sidebarMode?: string
  channelInfo?: ChannelInfo
  channelId?: string
  onSuccess?: () => void
  onError?: (message: string) => void
  payload?: any
}

const initialState: ChannelState = {
  sidebarMode: SIDEBAR_MODES.CHANNELS_LIST,
  channelInfo: null
};

const channelReducer = (state = initialState, action: ChannelAction) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload }
    }

    case Types.SET_SIDEBAR_MODE_REQUEST:
      return {
        ...state,
        sidebarMode: action.sidebarMode,
      };

    case Types.GET_CHANNEL_INFO_SUCCESS:
      return {
        ...state,
        channelInfo: action.channelInfo,
      };

    case Types.GET_CHANNEL_INFO_FAILURE:
      return {
        ...state,
        channelInfo: null,
      };

    default:
      return state;
  }
};

export const actions = {
  setSidebarMode: (
    sidebarMode: string
  ): ChannelAction => {
    return {
      type: Types.SET_SIDEBAR_MODE_REQUEST,
      sidebarMode
    }
  },
  
  getChannelInfoRequest: (
    channelId: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_INFO_REQUEST,
      channelId,
      onSuccess,
      onError
    }
  },
  
  getChannelInfoSuccess: (
    channelInfo: ChannelInfo | undefined
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_INFO_SUCCESS,
      channelInfo
    }
  },
  
  getChannelInfoFailure: (): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_INFO_FAILURE
    }
  }
};

export default channelReducer;