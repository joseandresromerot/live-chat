import { ChannelInfo, Message } from '@/middleware/api';
import { HYDRATE } from 'next-redux-wrapper';

export const Types = {
  SET_SIDEBAR_MODE_REQUEST: "channel/SET_SIDEBAR_MODE_REQUEST",

  GET_CHANNEL_INFO_REQUEST: "channel/GET_CHANNEL_INFO_REQUEST",
  GET_CHANNEL_INFO_SUCCESS: "channel/GET_CHANNEL_INFO_SUCCESS",
  GET_CHANNEL_INFO_FAILURE: "channel/GET_CHANNEL_INFO_FAILURE",

  GET_CHANNEL_MESSAGES_REQUEST: "channel/GET_CHANNEL_MESSAGES_REQUEST",
  GET_CHANNEL_MESSAGES_SUCCESS: "channel/GET_CHANNEL_MESSAGES_SUCCESS",
  GET_CHANNEL_MESSAGES_FAILURE: "channel/GET_CHANNEL_MESSAGES_FAILURE",
  
  GET_CHANNELS_REQUEST: "channel/GET_CHANNELS_REQUEST",
  GET_CHANNELS_SUCCESS: "channel/GET_CHANNELS_SUCCESS",
  GET_CHANNELS_FAILURE: "channel/GET_CHANNELS_FAILURE",
};

export const SIDEBAR_MODES = {
  CHANNEL_INFO: "sidebar_modes/CHANNEL_INFO",
  CHANNELS_LIST: "sidebar_modes/CHANNELS_LIST",
};

export interface ChannelState {
  sidebarMode: string
  channelInfo: ChannelInfo | null | undefined
  messages: Message[]
  channels: ChannelInfo[]
}

export interface ChannelAction {
  type: string
  sidebarMode?: string
  channelInfo?: ChannelInfo
  messages?: Message[]
  channelId?: string
  keyword?: string
  channels?: ChannelInfo[]
  onSuccess?: () => void
  onError?: (message: string) => void
  payload?: any
}

const initialState: ChannelState = {
  sidebarMode: SIDEBAR_MODES.CHANNELS_LIST,
  channelInfo: null,
  messages: [],
  channels: []
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

    case Types.GET_CHANNEL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };

    case Types.GET_CHANNEL_MESSAGES_FAILURE:
      return {
        ...state,
        messages: [],
      };

    case Types.GET_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.channels,
      };

    case Types.GET_CHANNELS_FAILURE:
      return {
        ...state,
        channels: [],
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
  },
  
  getChannelMessagesRequest: (
    channelId: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_MESSAGES_REQUEST,
      channelId,
      onSuccess,
      onError
    }
  },
  
  getChannelMessagesSuccess: (
    messages: Message[] | undefined
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_MESSAGES_SUCCESS,
      messages
    }
  },
  
  getChannelMessagesFailure: (): ChannelAction => {
    return {
      type: Types.GET_CHANNEL_MESSAGES_FAILURE
    }
  },
  
  getChannelsRequest: (
    keyword: string,
    onSuccess: () => void,
    onError: (message: string) => void
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNELS_REQUEST,
      keyword,
      onSuccess,
      onError
    }
  },
  
  getChannelsSuccess: (
    channels: ChannelInfo[] | undefined
  ): ChannelAction => {
    return {
      type: Types.GET_CHANNELS_SUCCESS,
      channels
    }
  },
  
  getChannelsFailure: (): ChannelAction => {
    return {
      type: Types.GET_CHANNELS_FAILURE
    }
  }
};

export default channelReducer;